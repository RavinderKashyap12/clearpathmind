interface FormConsentProps {
  /** Unique id prefix so multiple forms on one page get distinct checkbox ids. */
  idPrefix?: string;
  disabled?: boolean;
}

// TCPA-style dual SMS consent (service + optional marketing) plus a
// Terms/Privacy acknowledgement. Field names — sms_consent,
// marketing_sms_consent — match the API.
export function FormConsent({ idPrefix = "form", disabled = false }: FormConsentProps) {
  return (
    <div className="space-y-2">
      {/* Service-related SMS */}
      <div className="flex items-start gap-2">
        <input
          id={`${idPrefix}_sms_consent`}
          name="sms_consent"
          type="checkbox"
          value="on"
          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded border-neutral-300"
          disabled={disabled}
        />
        <label htmlFor={`${idPrefix}_sms_consent`} className="text-[11px] leading-snug text-neutral-500">
          By checking this box, you provide consent to receive service-related SMS, MMS, or RCS
          messages from Clear Path Behavioral Health regarding admissions inquiries, treatment
          information, appointment scheduling, and care coordination. Message frequency may vary.
          Message and data rates may apply. Consent is not a condition of purchase or receiving
          services. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
        </label>
      </div>

      {/* Marketing SMS (optional) */}
      <div className="flex items-start gap-2">
        <input
          id={`${idPrefix}_marketing_sms_consent`}
          name="marketing_sms_consent"
          type="checkbox"
          value="on"
          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded border-neutral-300"
          disabled={disabled}
        />
        <label
          htmlFor={`${idPrefix}_marketing_sms_consent`}
          className="text-[11px] leading-snug text-neutral-500"
        >
          By checking this box, you provide consent to receive promotional and marketing SMS, MMS,
          or RCS messages from Clear Path Behavioral Health, including program updates and service
          announcements. This consent is optional and is not required to receive treatment or any
          service. Message frequency may vary. Message and data rates may apply. Reply{" "}
          <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
        </label>
      </div>

      <p className="text-[10px] leading-snug text-neutral-400">
        By submitting this form, you acknowledge that you have read and agree to our Terms &amp;
        Conditions and Privacy Policy. Your information is kept confidential.
      </p>
    </div>
  );
}
