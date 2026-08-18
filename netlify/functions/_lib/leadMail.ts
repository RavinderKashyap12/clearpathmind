// Shared helpers for the lead / contact form Netlify Functions.
//
// Shared reference pattern: zod-validated POST → honeypot → Mailgun
// notification → CTM Form Reactor. Rebranded for Clear Path Behavioral
// Health. No clinic phone number is shown
// on the public site; the lead's own phone is still captured and included in
// the internal notification email so staff can call them back.

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";
const MAILGUN_REGION = (process.env.MAILGUN_REGION || "us").toLowerCase();
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "";
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Clear Path Behavioral Health";
const EMAIL_FROM_ADDRESS =
  process.env.EMAIL_FROM_ADDRESS || `noreply@${MAILGUN_DOMAIN || "clearpathmentalhealth.com"}`;

/** Public email used in the "email us" failure fallback (site is forms-only, no phone). */
export const CONTACT_EMAIL = NOTIFICATION_EMAIL || "info@clearpathmind.com";

/** Mailgun is only usable when the key, sending domain, and destination inbox all exist. */
export function mailgunConfigured(): boolean {
  return Boolean(MAILGUN_API_KEY && MAILGUN_DOMAIN && NOTIFICATION_EMAIL);
}

/** Normalize a US phone number to E.164 (+1XXXXXXXXXX). */
export function formatPhoneE164(raw: string | undefined | null): string {
  const rawPhone = raw || "";
  const cleanPhone = rawPhone.replace(/\D/g, "");
  if (cleanPhone.length === 10) return `+1${cleanPhone}`;
  if (cleanPhone.length === 11 && cleanPhone.startsWith("1")) return `+${cleanPhone}`;
  if (cleanPhone.length === 12 && cleanPhone.startsWith("1")) return `+${cleanPhone}`;
  return rawPhone;
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface EmailCta {
  /** Lead's phone — rendered as a "Call …" button for staff (internal email only). */
  phone?: string;
  /** Lead's email — rendered as an "Email …" button. */
  email?: string;
}

/**
 * Branded notification email (Clear Path purple header). `rows` is a list of
 * [label, value] pairs; `cta` optionally adds Call/Email buttons for staff.
 * Rebranded layout, with no clinic phone.
 */
export function buildEmailHtml(
  eyebrow: string,
  heading: string,
  intro: string,
  rows: Array<[string, string]>,
  cta?: EmailCta,
): string {
  const tableRows = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:10px 16px;background:#f8f7fb;font-size:13px;font-weight:600;color:#4a0066;width:40%;border-bottom:1px solid #ece9f2;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:10px 16px;font-size:13px;color:#111827;border-bottom:1px solid #ece9f2;white-space:pre-wrap;">${escapeHtml(
        value,
      )}</td>
    </tr>`,
    )
    .join("");

  const ctaBlock = cta?.phone
    ? `
        <tr>
          <td style="padding:0 32px 32px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#4a0066;border-radius:8px;">
                  <a href="tel:${escapeHtml(cta.phone).replace(/[^\d+]/g, "")}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                    Call ${escapeHtml(cta.phone)} &rarr;
                  </a>
                </td>
                ${
                  cta.email
                    ? `<td style="width:12px;"></td>
                <td style="border:1px solid #d1d5db;border-radius:8px;">
                  <a href="mailto:${escapeHtml(cta.email)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#374151;text-decoration:none;">
                    Email ${escapeHtml(cta.email)} &rarr;
                  </a>
                </td>`
                    : ""
                }
              </tr>
            </table>
          </td>
        </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:#4a0066;padding:24px 32px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c79a3c;">${escapeHtml(
              eyebrow,
            )}</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;">${escapeHtml(
              heading,
            )}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;">
            <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">${escapeHtml(intro)}</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ece9f2;border-radius:8px;overflow:hidden;">
              ${tableRows}
            </table>
          </td>
        </tr>
        ${ctaBlock}
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #ece9f2;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">Clear Path Behavioral Health &middot; Orange County, CA &middot; Generated automatically from a website form submission.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

interface NotificationInput {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

interface NotificationResult {
  ok: boolean;
  configured: boolean;
  error?: string;
}

/** Send a notification email through the Mailgun HTTP API. */
export async function sendNotification({
  subject,
  html,
  text,
  replyTo,
}: NotificationInput): Promise<NotificationResult> {
  if (!mailgunConfigured()) {
    return { ok: false, configured: false, error: "Mailgun is not configured" };
  }

  const baseUrl =
    MAILGUN_REGION === "eu"
      ? "https://api.eu.mailgun.net/v3"
      : "https://api.mailgun.net/v3";

  const body = new URLSearchParams({
    from: `${EMAIL_FROM_NAME} <${EMAIL_FROM_ADDRESS}>`,
    to: NOTIFICATION_EMAIL,
    subject,
    text,
    html,
    ...(replyTo ? { "h:Reply-To": replyTo } : {}),
  });

  try {
    const res = await fetch(`${baseUrl}/${MAILGUN_DOMAIN}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      return { ok: false, configured: true, error: `Mailgun ${res.status}: ${errBody}` };
    }
    return { ok: true, configured: true };
  } catch (err) {
    return {
      ok: false,
      configured: true,
      error: err instanceof Error ? err.message : "Unknown Mailgun error",
    };
  }
}

/**
 * Forward a lead to a CallTrackingMetrics Form Reactor URL as
 * application/x-www-form-urlencoded. No-op when the URL is empty.
 */
export async function forwardToCtm(
  ctmUrl: string | undefined,
  params: URLSearchParams,
): Promise<void> {
  if (!ctmUrl) return;
  try {
    await fetch(ctmUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch (err) {
    // A CTM failure must not fail the user's submission — email is the source of truth.
    console.error("CTM Form Reactor error:", err);
  }
}

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
