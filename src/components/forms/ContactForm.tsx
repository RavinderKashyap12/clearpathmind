import React, { useState } from "react";

export default function ContactForm({ heading = "Send Us a Message" }: { heading?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-[#1a2b49] mb-6">{heading}</h2>

      {isSubmitted ? (
        <div className="p-6 bg-green-50 border border-green-200 text-green-800 rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
          <p>Your message has been received. Our team will get back to you shortly.</p>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Netlify Hidden Fields */}
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="(000) 000-0000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Insurance Provider */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Insurance Provider <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="insuranceProvider"
              placeholder="e.g. Aetna, Cigna, Blue Shield..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* How can we help? */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">How can we help?</label>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us about yourself or your loved one..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y"
            ></textarea>
          </div>

          {/* Checkbox 1: Service SMS */}
          <div className="flex items-start gap-2 mt-1">
            <input
              type="checkbox"
              name="consentServiceSms"
              id="consentServiceSms"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            <label htmlFor="consentServiceSms" className="text-[11px] leading-4 text-gray-600">
              By checking this box, you provide consent to receive service-related SMS, MMS, or RCS messages from Clear Path Behavioral Health regarding admissions inquiries, treatment information, appointment scheduling, and care coordination. Message frequency may vary. Message and data rates may apply. Consent is not a condition of purchase or receiving services. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
            </label>
          </div>

          {/* Checkbox 2: Marketing SMS */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="consentMarketingSms"
              id="consentMarketingSms"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            <label htmlFor="consentMarketingSms" className="text-[11px] leading-4 text-gray-600">
              By checking this box, you provide consent to receive promotional and marketing SMS, MMS, or RCS messages from Clear Path Behavioral Health, including program updates and service announcements. This consent is optional and is not required to receive treatment or any service. Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
            </label>
          </div>

          {/* Legal / Policy Text */}
          <p className="text-[11px] leading-4 text-gray-500 mt-1">
            By submitting this form, you acknowledge that you have read and agree to our{" "}
            <a href="/terms/" className="underline text-gray-700 hover:text-black">Terms & Conditions</a> and{" "}
            <a href="/privacy-policy/" className="underline text-gray-700 hover:text-black">Privacy Policy</a>. Your information is kept confidential.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition-all duration-200 mt-2 disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Send Message"}
          </button>

          {/* Footer Subtext */}
          <p className="text-center text-xs text-gray-500 mt-1">
            Confidential · No obligation · Your information is protected
          </p>
        </form>
      )}
    </div>
  );
}