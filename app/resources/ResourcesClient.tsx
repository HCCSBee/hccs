"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

const governmentUrls: Record<string, string> = {
  "CPF Board": "https://www.cpf.gov.sg",
  "Ministry of Manpower": "https://www.mom.gov.sg",
  "Inland Revenue Authority": "https://www.iras.gov.sg",
  "Accounting & Corporate Regulatory Authority": "https://www.acra.gov.sg",
  "Immigration & Checkpoints Authority": "https://www.ica.gov.sg",
  "Singapore National Employers Federation": "https://www.snef.org.sg",
  "Tripartite Alliance for Fair & Progressive Employment": "https://www.tafep.sg",
  "National Trades Union Congress": "https://www.ntuc.org.sg",
};

const hccsUrls: Record<string, string> = {
  "About HCCS": "/about",
  "HR News & Updates": "/hr-news",
  "Media": "/media",
  "Contact": "/contact",
  "Membership": "/membership",
};

export default function ResourcesClient() {
  const { t } = useLang();
  const r = t.resources;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{r.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{r.desc}</p>
      </section>

      {/* Government Links */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{r.govLinksTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {r.governmentLinks.map((link) => (
            <a
              key={link.label}
              href={link.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                  {link.label}
                </h3>
                <p className="text-sm text-gray-500">{link.description}</p>
              </div>
              <span className="mt-3 text-xs font-semibold text-emerald-600">{r.visitLink}</span>
            </a>
          ))}
        </div>
      </section>

      {/* HCCS Internal Links */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{r.hccsLinksTitle}</h2>
        <div className="flex flex-wrap gap-3">
          {r.hccsLinks.map((link) => (
            <Link
              key={link.label}
              href={hccsUrls[link.label] ?? "/"}
              className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-emerald-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700 text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">{r.ctaTitle}</h2>
        <p className="text-emerald-100 mb-6 max-w-xl mx-auto">{r.ctaDesc}</p>
        <Link
          href="/consultation"
          className="inline-block bg-white text-emerald-700 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
        >
          {r.ctaButton}
        </Link>
      </section>
    </div>
  );
}
