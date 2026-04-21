import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HCCS",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

      <div className="text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using the HCCS website and services, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">2. Services</h2>
          <p className="text-gray-600">
            HCCS provides HR consulting, immigration advisory, compliance scanning tools, and AI-powered HR resources.
            Our services are provided on a professional advisory basis and do not constitute legal advice.
            For legal matters, please consult a qualified Singapore advocate and solicitor.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">3. Intellectual Property</h2>
          <p className="text-gray-600">
            All content on this website, including text, templates, tools, and branding, is the property of
            Human Capital Consulting &amp; Services (Spore) Pte Ltd. Reproduction or redistribution without
            written consent is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">4. Membership & Payment</h2>
          <p className="text-gray-600">
            Membership plans are billed annually. All payments are processed securely via Stripe. Refunds are
            evaluated on a case-by-case basis. By subscribing, you authorise HCCS to charge your designated
            payment method for the applicable subscription fee.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">5. Disclaimer of Warranties</h2>
          <p className="text-gray-600">
            Our services and website content are provided "as is" without warranty of any kind, express or
            implied. HCCS makes no representations regarding the accuracy, completeness, or suitability of
            information for any particular purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">6. Limitation of Liability</h2>
          <p className="text-gray-600">
            To the maximum extent permitted by Singapore law, HCCS shall not be liable for any indirect,
            incidental, special, or consequential damages arising out of or in connection with your use of
            our services, even if advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">7. Governing Law</h2>
          <p className="text-gray-600">
            These Terms of Service are governed by the laws of the Republic of Singapore. Any disputes shall
            be subject to the exclusive jurisdiction of the Singapore courts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">8. Contact</h2>
          <p className="text-gray-600">
            For any queries regarding these terms, contact{" "}
            <a href="mailto:enquiry@hccs.sg" className="text-emerald-600 underline">enquiry@hccs.sg</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
