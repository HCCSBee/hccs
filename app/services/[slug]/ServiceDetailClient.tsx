"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

type Feature = { id: number; text: string | null; text_cn: string | null };

type Props = {
  service: {
    title: string | null;
    title_cn: string | null;
    short_description: string | null;
    short_description_cn: string | null;
    long_description: string | null;
    long_description_cn: string | null;
  };
  featureList: Feature[];
  helpList: Feature[];
};

export default function ServiceDetailClient({ service, featureList, helpList }: Props) {
  const { t, lang } = useLang();
  const sd = t.serviceDetail;
  const title = lang === "zh" ? (service.title_cn ?? service.title ?? "") : (service.title ?? service.title_cn ?? "");
  const shortDescription = lang === "zh"
    ? (service.short_description_cn ?? service.short_description)
    : (service.short_description ?? service.short_description_cn);
  const longDescription = lang === "zh"
    ? (service.long_description_cn ?? service.long_description)
    : (service.long_description ?? service.long_description_cn);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-emerald-950 py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-1 text-emerald-300 text-sm hover:text-white transition-colors mb-6">
            <span aria-hidden>{"<-"}</span> {sd.allServices}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3">{sd.badge}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
          {shortDescription && (
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{shortDescription}</p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* Long description */}
        {longDescription && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{sd.overview}</h2>
            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">{longDescription}</p>
          </section>
        )}

        {/* Features */}
        {featureList.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{sd.whatsIncluded}</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {featureList.map((f) => {
                const featureText = lang === "zh" ? (f.text_cn ?? f.text ?? "") : (f.text ?? f.text_cn ?? "");
                return (
                <li key={f.id} className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{featureText}</span>
                </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Help / Who this helps */}
        {helpList.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{sd.whoHelps}</h2>
            <ul className="space-y-3">
              {helpList.map((h) => {
                const helpText = lang === "zh" ? (h.text_cn ?? h.text ?? "") : (h.text ?? h.text_cn ?? "");
                return (
                <li key={h.id} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-slate-600 text-sm leading-relaxed">{helpText}</span>
                </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-12 px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">{sd.readyTitle}</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto text-sm">{sd.readyDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {sd.ctaButton}
            </Link>
            <Link
              href="/services"
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {sd.allServices}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
