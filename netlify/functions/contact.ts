// POST /api/contact — first/last name, dual SMS consent, optional insurance
// + message, for Clear Path.
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
  insurance: z.string().max(150).optional(),
  message: z.string().max(2000).optional(),
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
  const rows: Array<[string, string]> = [
    ["First Name", data.first_name],
    ["Last Name", data.last_name],
    ["Phone", data.phone],
    ["Email", data.email || "Not provided"],
    ["Insurance Provider", data.insurance || "Not provided"],
    ["Service SMS Consent", data.sms_consent === "on" ? "Yes" : "No"],
    ["Marketing SMS Consent", data.marketing_sms_consent === "on" ? "Yes" : "No"],
    ["Message", data.message || "None"],
  ];

  const html = buildEmailHtml(
    "Contact Form Submission",
    `New Message, ${fullName}`,
    "A new contact form submission was received via the Clear Path website.",
    rows,
    { phone: data.phone, email: data.email || undefined },
  );
  const text = [
    `Name: ${fullName}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    data.insurance ? `Insurance: ${data.insurance}` : null,
    `Service SMS Consent: ${data.sms_consent === "on" ? "Yes" : "No"}`,
    `Marketing SMS Consent: ${data.marketing_sms_consent === "on" ? "Yes" : "No"}`,
    data.message ? `\nMessage:\n${data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const mail = await sendNotification({
    subject: `Contact Form, ${fullName}`,
    html,
    text,
    replyTo: data.email || undefined,
  });
  if (!mail.configured) {
    console.error("[contact] Mailgun env vars missing (MAILGUN_API_KEY / MAILGUN_DOMAIN / NOTIFICATION_EMAIL)");
    return json({ error: "Mail service not configured" }, 503);
  }
  if (!mail.ok) {
    console.error("[contact] Mailgun error:", mail.error);
    return json({ error: "Failed to send" }, 500);
  }

  // Forward to CTM Form Reactor.
  const ctm = new URLSearchParams();
  ctm.set("phone_number", formatPhoneE164(data.phone));
  ctm.set("caller_name", fullName);
  ctm.set("email", data.email || "");
  ctm.set("custom_fields[insurance_provider]", data.insurance || "");
  ctm.set("custom_fields[how_can_we_help]", data.message || "");
  await forwardToCtm(process.env.CONTACT_URL, ctm);

  return json({ ok: true });
};
