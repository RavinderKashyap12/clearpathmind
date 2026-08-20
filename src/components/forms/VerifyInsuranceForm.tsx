import React, { useState } from "react";

export default function VerifyInsuranceForm() {
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
      {isSubmitted ? (
        <div className="p-6 bg-green-50 border border-green-200 text-green-800 rounded-xl text-center">
          <h4 className="text-xl font-semibold mb-2">Verification Request Received!</h4>
          <p>Our admissions team will verify your insurance benefits and reach out shortly.</p>
        </div>
      ) : (
        <form
          name="verify-insurance"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Netlify Hidden Fields */}
          <input type="hidden" name="form-name" value="verify-insurance" />
          <p className="hidden">
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(000) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Insurance Provider & Member ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Insurance Provider *</label>
              <input
                type="text"
                name="insuranceProvider"
                required
                placeholder="e.g. Aetna, Anthem, Cigna"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Member / Policy ID *</label>
              <input
                type="text"
                name="memberId"
                required
                placeholder="Policy or Member ID"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Additional Information (Optional)</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Any details about the subscriber or specific benefits you want checked..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#543783] hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 mt-2 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Benefits"}
          </button>
        </form>
      )}
    </div>
  );
}