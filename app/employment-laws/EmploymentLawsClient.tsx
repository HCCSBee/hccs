"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function EmploymentLawsClient() {
  const { t } = useLang();
  const el = t.employmentLaws;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{el.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{el.desc}</p>
      </section>

      <section className="space-y-8">
        {el.laws.map((law) => (
          <div key={law.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{law.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{law.name}</h2>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    {law.short}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{law.desc}</p>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">{el.keyPoints}</h3>
                  <ul className="space-y-1.5">
                    {law.keyPoints.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={law.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs text-emerald-600 hover:text-emerald-800 underline"
                >
                  {el.readMore} →
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-amber-900 mb-2">{el.ctaTitle}</h2>
        <p className="text-sm text-amber-800 mb-4">{el.ctaDesc}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/compliance-scan"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
          >
            {el.ctaButton}
          </Link>
          <Link
            href="/consultation"
            className="border border-emerald-600 text-emerald-700 px-6 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-semibold"
          >
            {t.common.bookFreeConsultation}
          </Link>
        </div>
      </div>
    </div>
  );
}
