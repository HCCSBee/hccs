"use client";

export const dynamic = "force-dynamic";

import { useLang } from "@/lib/i18n";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/calendar-hccs/30min?back=1";
const EXPERT_ADVISORY_CHECKOUT_URL = "/checkout?plan=expert-advisory&planId=8&billing=annual";

export default function ConsultationPage() {
  const { t } = useLang();
  const c = t.consultation;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{c.title}</h1>
        <p className="text-gray-600">{c.subtitle}</p>
      </div>

      {/* Consultation type selector */}
      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {/* Free Consultation */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start gap-3 border-2 border-emerald-200 bg-emerald-50 hover:border-emerald-500 hover:bg-emerald-100 rounded-2xl p-6 transition-all cursor-pointer"
        >
          <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1">
            {c.freeTag}
          </span>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-lg font-bold text-emerald-900 leading-tight">{c.freeTitle}</p>
              <p className="text-2xl font-extrabold text-emerald-900 mt-1">S$0</p>
            </div>
          </div>
          <p className="text-sm font-semibold text-emerald-800">{c.freeDuration}</p>
          <ul className="text-sm text-emerald-800 space-y-1">
            {c.freeFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 group-hover:underline">
            {c.freeCta}
          </span>
        </a>

        {/* Expert Advisory */}
        <Link
          href={EXPERT_ADVISORY_CHECKOUT_URL}
          className="group flex flex-col items-start gap-3 border-2 rounded-2xl p-6 transition-all text-left border-gray-200 bg-white hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          <span className="inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-700 group-hover:bg-amber-500/20 group-hover:text-amber-300">
            {c.expertTag}
          </span>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💼</span>
            <div>
              <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-300">{c.expertLabel}</p>
              <p className="text-lg font-bold leading-tight text-gray-900 group-hover:text-white">
                {c.expertTitle}
              </p>
              <p className="text-2xl font-extrabold mt-1 text-gray-900 group-hover:text-white">
                {c.expertPrice}
              </p>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-200">{c.expertDuration}</p>
          <ul className="text-sm space-y-1 text-gray-600 group-hover:text-gray-200">
            {c.expertFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <span className="mt-auto text-sm font-semibold text-gray-700 group-hover:text-emerald-300 group-hover:underline">
            {c.expertCta}
          </span>
        </Link>
      </div>

      <p className="text-xs text-gray-400 text-center">
        {t.footer.bilingualNote}
      </p>
    </div>
  );
}

