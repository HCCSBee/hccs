"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function MembershipClient() {
  const { t } = useLang();
  const m = t.membership;
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{m.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{m.desc}</p>
      </section>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <span className={`text-sm font-medium ${billing === "monthly" ? "text-gray-900" : "text-gray-400"}`}>
          Monthly
        </span>
        <button
          onClick={() => setBilling(billing === "monthly" ? "annually" : "monthly")}
          className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none ${
            billing === "annually" ? "bg-emerald-600" : "bg-gray-300"
          }`}
          aria-label="Toggle billing period"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              billing === "annually" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${billing === "annually" ? "text-gray-900" : "text-gray-400"}`}>
          Annually
        </span>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {m.plans.map((plan) => {
          const isHighlight = plan.name === "Essential";

          // plan.price is the annual price (e.g. "S$5,988")
          const rawPrice = plan.price.replace(/[^0-9.]/g, "");
          const annualNum = parseFloat(rawPrice);
          const monthlyNum = isNaN(annualNum) ? null : Math.round(annualNum / 12);

          const isFree = plan.price === "S$0" || plan.price === "Free";
          const displayPrice = isFree
            ? "Free"
            : billing === "annually"
            ? plan.price
            : monthlyNum !== null
            ? `S$${monthlyNum.toLocaleString()}`
            : plan.price;
          const displayPeriod = isFree
            ? ""
            : billing === "annually"
            ? "/ year"
            : "/ month";

          return (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 flex flex-col ${
                isHighlight
                  ? "border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-500"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {isHighlight && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1 self-start mb-3">
                  {m.mostPopular}
                </span>
              )}
              <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-xs text-gray-500 mt-1 mb-3">{plan.target}</p>
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-gray-900">{displayPrice}</span>
                {displayPeriod && (
                  <span className="text-sm text-gray-500 ml-1">{displayPeriod}</span>
                )}
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`text-center py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isHighlight
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          );
        })}
      </section>

      {/* Essential 3-Month Bundle — separate package */}
      {(() => {
        const essentialPlan = m.plans.find((p) => p.name === "Essential");
        if (!essentialPlan) return null;
        const annualNum = parseFloat(essentialPlan.price.replace(/[^0-9.]/g, ""));
        const monthlyNum = isNaN(annualNum) ? 0 : Math.round(annualNum / 12);
        const bundleOriginal = monthlyNum * 3;
        const bundlePrice = bundleOriginal - 500;
        return (
          <div className="mb-16 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-amber-800 bg-amber-200 rounded-full px-3 py-1">
                  Limited Offer
                </span>
                <span className="text-xs text-amber-700 font-medium">Essential Plan</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">3-Month Starter Bundle</h3>
              <p className="text-sm text-gray-600 max-w-lg">
                Try out the Essential plan for 3 months at a special introductory rate. All Essential features included — no long-term commitment required.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {essentialPlan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-1 text-xs text-gray-600">
                    <span className="text-emerald-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-500 line-through">S${bundleOriginal.toLocaleString()} for 3 months</p>
                <p className="text-3xl font-extrabold text-amber-700">S${bundlePrice.toLocaleString()}</p>
                <p className="text-xs text-amber-600 font-semibold">Save S$500</p>
              </div>
              <Link
                href="/checkout?plan=essential-bundle"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Claim Bundle
              </Link>
            </div>
          </div>
        );
      })()}

      <section>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{m.faqTitle}</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {m.faqs.map((faq) => (
            <div key={faq.q} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
