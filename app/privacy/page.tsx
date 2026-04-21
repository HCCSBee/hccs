import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HCCS",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

      <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect personal information that you provide directly to us, including but not limited to:
            name, email address, phone number, company name, and any information submitted through our
            consultation booking forms, contact forms, or compliance scan tools.
          </p>
          <p className="text-gray-600">
            We also automatically collect certain information when you use our website, including IP address,
            browser type, pages visited, and time spent on pages.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>To respond to your enquiries and provide requested services</li>
            <li>To schedule and manage consultation appointments</li>
            <li>To send service-related communications and updates</li>
            <li>To improve our website and services</li>
            <li>To comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">3. Disclosure of Your Information</h2>
          <p className="text-gray-600">
            We do not sell, trade, or rent your personal information to third parties. We may share your
            information with trusted service providers who assist in operating our website and delivering
            our services, subject to confidentiality obligations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">4. Data Retention</h2>
          <p className="text-gray-600">
            We retain personal data for as long as necessary to fulfil the purposes for which it was collected,
            including to comply with legal, accounting, or reporting requirements. HR records are typically
            retained for a minimum of 2 years in line with MOM guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">5. Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organisational measures to protect your personal information
            against unauthorised access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">6. Your Rights</h2>
          <p className="text-gray-600">
            Under the Personal Data Protection Act (PDPA) of Singapore, you have the right to access,
            correct, or withdraw consent to the use of your personal data held by HCCS. To exercise these
            rights, please contact us at{" "}
            <a href="mailto:enquiry@hccs.sg" className="text-emerald-600 underline">enquiry@hccs.sg</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">7. Governing Law</h2>
          <p className="text-gray-600">
            This Privacy Policy is governed by the laws of the Republic of Singapore, including the Personal
            Data Protection Act 2012 (PDPA).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">8. Contact Us</h2>
          <p className="text-gray-600">
            For privacy-related enquiries, please contact our Data Protection Officer at{" "}
            <a href="mailto:enquiry@hccs.sg" className="text-emerald-600 underline">enquiry@hccs.sg</a> or
            write to us at: 10 Anson Road #33-15, International Plaza, Singapore 079903.
          </p>
        </section>
      </div>
    </div>
  );
}
