import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consultation Booked! | HCCS",
};

export default function ConsultationSuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Consultation Booked!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for booking your free 30-minute consultation with HCCS. We'll confirm your appointment
        within 1 business day via email.
      </p>
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-900 mb-8 text-left space-y-2">
        <p>📧 A confirmation will be sent to your email address.</p>
        <p>📞 You may also reach us at <a href="tel:+6594362866" className="underline">+65 9436-2866</a></p>
        <p>💬 Or WhatsApp us at <a href="https://wa.me/6565943628" className="underline" target="_blank" rel="noopener noreferrer">+65 6594-3628</a></p>
      </div>
      <Link
        href="/"
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
      >
        Return to Home
      </Link>
    </div>
  );
}
