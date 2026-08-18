import { useState, type FormEvent } from "react";
import { FormConsent } from "./FormConsent";

// Public email used in the failure fallback (site is forms-only, no phone).
const CONTACT_EMAIL = "info@clearpathmind.com";

const inputCls =
  "w-full rounded-lg border border-[#ADAAA7] bg-white px-4 py-3 text-[15px] text-neutral-800 outline-none transition focus:border-purple-700 focus:ring-1 focus:ring-purple-700";
const labelCls = "mb-1.5 block text-sm font-medium text-neutral-800";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 80 }, (_, i) => CURRENT_YEAR - i);

// First/last name, split DOB, phone, insurance + policy number, dual SMS
// consent, posting to /api/verify-insurance. Email-only failure fallback.
export default function VerifyInsuranceForm() {
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
      dob_month: (fd.get("dob_month") as string) || "",
      dob_day: (fd.get("dob_day") as string) || "",
      dob_year: (fd.get("dob_year") as string) || "",
      insurance: fd.get("insurance") as string,
      policy_number: (fd.get("policy_number") as string) || "",
      sms_consent: fd.get("sms_consent") === "on" ? "on" : "",
      marketing_sms_consent: fd.get("marketing_sms_consent") === "on" ? "on" : "",
      honeypot: (fd.get("honeypot") as string) || "",
    };

    try {
      const res = await fetch("/api/verify-insurance", {
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
        <p className="text-xl font-bold text-green-800">Request Received</p>
        <p className="mt-2 text-[15px] leading-relaxed text-green-700">
          Our team will contact you shortly to verify your insurance benefits.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vip_first" className={labelCls}>First Name *</label>
          <input id="vip_first" name="first_name" type="text" required placeholder="First name" className={inputCls} disabled={status === "loading"} />
        </div>
        <div>
          <label htmlFor="vip_last" className={labelCls}>Last Name *</label>
          <input id="vip_last" name="last_name" type="text" required placeholder="Last name" className={inputCls} disabled={status === "loading"} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Date of Birth *</label>
        <div className="grid grid-cols-3 gap-2">
          <select name="dob_month" required defaultValue="" className={inputCls} disabled={status === "loading"}>
            <option value="" disabled>Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
            ))}
          </select>
          <select name="dob_day" required defaultValue="" className={inputCls} disabled={status === "loading"}>
            <option value="" disabled>Day</option>
            {DAYS.map((d) => (
              <option key={d} value={String(d).padStart(2, "0")}>{d}</option>
            ))}
          </select>
          <select name="dob_year" required defaultValue="" className={inputCls} disabled={status === "loading"}>
            <option value="" disabled>Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="vip_phone" className={labelCls}>Phone *</label>
        <input id="vip_phone" name="phone" type="tel" required placeholder="(000) 000-0000" className={inputCls} disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="vip_email" className={labelCls}>
          Email Address <span className="font-normal text-neutral-400">(Optional)</span>
        </label>
        <input id="vip_email" name="email" type="email" placeholder="email@example.com" className={inputCls} disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="vip_insurance" className={labelCls}>Insurance Provider *</label>
        <input id="vip_insurance" name="insurance" type="text" required placeholder="e.g. Aetna, Cigna, Blue Shield…" className={inputCls} disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="vip_policy" className={labelCls}>Policy / Member ID *</label>
        <input id="vip_policy" name="policy_number" type="text" required placeholder="Policy or Member ID" className={inputCls} disabled={status === "loading"} />
      </div>

      <FormConsent idPrefix="vip" disabled={status === "loading"} />

      {status === "error" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-blue-600 py-4 text-[16px] font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Verify Insurance & Get Started"}
      </button>
      <p className="text-center text-[11px] text-neutral-400">
        Confidential · No obligation · Your information is protected
      </p>
    </form>
  );
}
