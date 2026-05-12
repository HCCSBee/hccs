"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function ComplianceScanCoverPage() {
  const { t } = useLang();
  const cs = t.complianceScan;
  const [qrId, setQrId] = useState("");
  const nextHref = qrId
    ? `/compliance-scan/company-details?id=${encodeURIComponent(qrId)}`
    : "/compliance-scan/company-details";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const id = new URLSearchParams(window.location.search).get("id")?.trim() ?? "";
    setQrId(id);

    if (!id) {
      return;
    }

    sessionStorage.setItem("cs_qr", id);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            {cs.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            {cs.title}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {cs.desc}
          </p>
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors shadow-lg"
          >
            {cs.startScan}
            <span aria-hidden>→</span>
          </Link>
          <p className="text-white/40 text-xs mt-4">{cs.takesNote}</p>
        </div>
      </section>

      {/* What you'll get */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">{cs.whatYouReceive}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {cs.receiveItems.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas covered */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{cs.areasTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {cs.areas.map((area, i) => (
              <div key={area} className="flex flex-col items-center bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-emerald-700 mb-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-slate-800 leading-tight">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 px-4 bg-emerald-950 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">{cs.ctaTitle}</h2>
        <p className="text-white/60 mb-6 text-sm">{cs.ctaDesc}</p>
        <Link
          href={nextHref}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {cs.ctaButton}
        </Link>
      </section>
    </div>
  );
}
