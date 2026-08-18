// POST /api/verify-insurance — first/last name, split DOB, insurance +
// policy number, dual SMS consent, for Clear Path.
import { z } from "zod";
import {
  buildEmailHtml,
  forwardToCtm,
  formatPhoneE164,
  json,
  sendNotification,
} from "./_lib/leadMail";

const schema = z.object({
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  phone: z.string().min(7).max(30),
  email: z.string().email().optional().or(z.literal("")),
  dob_month: z.string().optional(),
  dob_day: z.string().optional(),
  dob_year: z.string().optional(),
  insurance: z.string().min(1).max(150),
  policy_number: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
  sms_consent: z.union([z.literal("on"), z.literal("")]).optional(),
  marketing_sms_consent: z.union([z.literal("on"), z.literal("")]).optional(),
  honeypot: z.string().max(0).optional(),
});

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Invalid form data", details: parsed.error.flatten() }, 422);
  }
  const data = parsed.data;

  // Honeypot — silently discard bots.
  if (data.honeypot) return json({ ok: true });

  const fullName = `${data.first_name} ${data.last_name}`;
  const dob =
    data.dob_month && data.dob_day && data.dob_year
      ? `${data.dob_month}/${data.dob_day}/${data.dob_year}`
      : "";

  const rows: Array<[string, string]> = [
    ["First Name", data.first_name],
    ["Last Name", data.last_name],
    ["Phone", data.phone],
    ["Email", data.email || "Not provided"],
    ["Date of Birth", dob || "Not provided"],
    ["Insurance Provider", data.insurance],
    ["Policy / Member ID", data.policy_number || "Not provided"],
    ["Service SMS Consent", data.sms_consent === "on" ? "Yes" : "No"],
    ["Marketing SMS Consent", data.marketing_sms_consent === "on" ? "Yes" : "No"],
    ["Additional Notes", data.notes || "None"],
  ];

  const html = buildEmailHtml(
    "Insurance Verification Request",
    `New Submission, ${fullName}`,
    "A new insurance verification request was submitted via the Clear Path website. Review the details below and contact the prospective client promptly.",
    rows,
    { phone: data.phone, email: data.email || undefined },
  );
  const text = [
    `Name: ${fullName}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `DOB: ${dob || "Not provided"}`,
    `Insurance: ${data.insurance}`,
    data.policy_number ? `Policy #: ${data.policy_number}` : null,
    `Service SMS Consent: ${data.sms_consent === "on" ? "Yes" : "No"}`,
    `Marketing SMS Consent: ${data.marketing_sms_consent === "on" ? "Yes" : "No"}`,
    data.notes ? `Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const mail = await sendNotification({
    subject: `Insurance Verification, ${fullName} (${data.insurance})`,
    html,
    text,
    replyTo: data.email || undefined,
  });
  if (!mail.configured) {
    console.error("[verify-insurance] Mailgun env vars missing (MAILGUN_API_KEY / MAILGUN_DOMAIN / NOTIFICATION_EMAIL)");
    return json({ error: "Mail service not configured" }, 503);
  }
  if (!mail.ok) {
    console.error("[verify-insurance] Mailgun error:", mail.error);
    return json({ error: "Failed to send" }, 500);
  }

  // Forward to CTM Form Reactor.
  const ctm = new URLSearchParams();
  ctm.set("phone_number", formatPhoneE164(data.phone));
  ctm.set("caller_name", fullName);
  ctm.set("email", data.email || "");
  ctm.set("custom_fields[date_of_birth]", dob);
  ctm.set("custom_fields[insurance_provider]", data.insurance);
  ctm.set("custom_fields[member_id]", data.policy_number || "");
  await forwardToCtm(process.env.VERIFY_INSURANCE_URL, ctm);

  return json({ ok: true });
};
