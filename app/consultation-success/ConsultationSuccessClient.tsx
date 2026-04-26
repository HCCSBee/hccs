"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function ConsultationSuccessClient() {
  const { t } = useLang();
  const cs = t.consultationSuccess;

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{cs.title}</h1>
      <p className="text-gray-600 mb-6">{cs.desc}</p>
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-900 mb-8 text-left space-y-2">
        <p>{cs.emailNote}</p>
        <p>{cs.phoneNote} <a href="tel:+6594362866" className="underline">+65 9436-2866</a></p>
        <p>{cs.whatsappNote} <a href="https://wa.me/6565943628" className="underline" target="_blank" rel="noopener noreferrer">+65 6594-3628</a></p>
      </div>
      <Link
        href="/"
        className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
      >
        {cs.returnHome}
      </Link>
    </div>
  );
}
