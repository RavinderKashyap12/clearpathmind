import { useState, type FormEvent } from "react";
import { FormConsent } from "./FormConsent";

// Public email used in the failure fallback (site is forms-only, no phone).
const CONTACT_EMAIL = "info@clearpathmind.com";

const inputCls =
  "w-full rounded-lg border border-[#ADAAA7] bg-white px-4 py-3 text-[15px] text-neutral-800 outline-none transition focus:border-purple-700 focus:ring-1 focus:ring-purple-700";
const labelCls = "mb-1.5 block text-[13px] font-medium text-neutral-800";

interface ContactFormProps {
  heading?: string;
}

// First/last name, phone, optional email + insurance, message, dual SMS
// consent, posting to /api/contact. Email-only failure fallback, no phone.
export default function ContactForm({ heading }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      first_name: fd.get("first_name") as string,
      last_name: fd.get("last_name") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || "",
      insurance: (fd.get("insurance") as string) || "",
      message: (fd.get("message") as string) || "",
      sms_consent: fd.get("sms_consent") === "on" ? "on" : "",
      marketing_sms_consent: fd.get("marketing_sms_consent") === "on" ? "on" : "",
      honeypot: (fd.get("honeypot") as string) || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setErrorMsg(`We couldn't submit your request right now. Please email us at ${CONTACT_EMAIL}.`);
        setStatus("error");
      }
    } catch {
      setErrorMsg(`Network error. Please try again or email us at ${CONTACT_EMAIL}.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="mb-3 text-3xl">✓</p>
        <p className="text-xl font-bold text-green-800">Message Sent</p>
        <p className="mt-2 text-[15px] leading-relaxed text-green-700">
          Thank you — our team will be in touch shortly, typically the same day.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-2 space-y-4" onSubmit={handleSubmit} noValidate>
      {heading ? <h2 className="!text-3xl">{heading}</h2> : null}

      {/* Honeypot */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf_first" className={labelCls}>First Name *</label>
          <input id="cf_first" name="first_name" type="text" required placeholder="First name" className={inputCls} disabled={status === "loading"} />
        </div>
        <div>
          <label htmlFor="cf_last" className={labelCls}>Last Name *</label>
          <input id="cf_last" name="last_name" type="text" required placeholder="Last name" className={inputCls} disabled={status === "loading"} />
        </div>
      </div>

      <div>
        <label htmlFor="cf_phone" className={labelCls}>Phone Number *</label>
        <input id="cf_phone" name="phone" type="tel" required placeholder="(000) 000-0000" className={inputCls} disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="cf_email" className={labelCls}>
          Email Address <span className="font-normal text-neutral-400">(Optional)</span>
        </label>
        <input id="cf_email" name="email" type="email" placeholder="email@example.com" className={inputCls} disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="cf_insurance" className={labelCls}>
          Insurance Provider <span className="font-normal text-neutral-400">(Optional)</span>
        </label>
        <input id="cf_insurance" name="insurance" type="text" placeholder="e.g. Aetna, Cigna, Blue Shield…" className={inputCls} disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="cf_message" className={labelCls}>How can we help?</label>
        <textarea id="cf_message" name="message" rows={4} placeholder="Tell us about yourself or your loved one…" className={`${inputCls} resize-none`} disabled={status === "loading"} />
      </div>

      <FormConsent idPrefix="cf" disabled={status === "loading"} />

      {status === "error" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-blue-600 px-7 py-4 text-[15px] font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      <p className="text-center text-[11px] text-neutral-400">
        Confidential · No obligation · Your information is protected
      </p>
    </form>
  );
}
