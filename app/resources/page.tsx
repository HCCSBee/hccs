import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HR Resources — Templates, SOPs & Guides | HCCS",
  description:
    "Download free and premium HR templates, SOPs, employment contract templates, and compliance guides for Singapore businesses.",
};

const freeResources = [
  { icon: "📄", title: "Employment Contract Template (Singapore)", type: "DOCX", size: "128 KB" },
  { icon: "📊", title: "CPF Contribution Rate Table 2026", type: "PDF", size: "256 KB" },
  { icon: "📋", title: "Leave Policy Template", type: "DOCX", size: "98 KB" },
  { icon: "📝", title: "Itemised Payslip Format Guide", type: "PDF", size: "120 KB" },
  { icon: "📌", title: "Fair Hiring Checklist (TAFEP Compliant)", type: "PDF", size: "88 KB" },
];

const premiumResources = [
  { icon: "📦", title: "Complete HR Policy Pack (20+ policies)", badge: "Essential+" },
  { icon: "🔒", title: "HR SOPs Library (30+ Standard Operating Procedures)", badge: "Essential+" },
  { icon: "📐", title: "Organisational Design Toolkit", badge: "Professional+" },
  { icon: "🤖", title: "AI HR Chatbot (Singapore MOM, CPF, TAFEP knowledge base)", badge: "Essential+" },
  { icon: "🎬", title: "Video Insights Library (Singapore HR & Compliance)", badge: "Essential+" },
  { icon: "📊", title: "Workforce Planning Excel Toolkit", badge: "Professional+" },
  { icon: "📈", title: "KPI & Performance Management Template Pack", badge: "Professional+" },
  { icon: "💰", title: "Salary Benchmarking Guide 2026", badge: "Strategic" },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">HR Resources</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Free and premium HR templates, SOPs, compliance guides, and toolkits designed for Singapore businesses.
        </p>
      </section>

      {/* Free Resources */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Downloads</h2>
        <div className="space-y-3">
          {freeResources.map((r) => (
            <div
              key={r.title}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{r.title}</p>
                  <p className="text-xs text-gray-400">
                    {r.type} · {r.size}
                  </p>
                </div>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-800 font-semibold border border-emerald-300 px-4 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Resources */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Premium Resources</h2>
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            Members Only
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {premiumResources.map((r) => (
            <div
              key={r.title}
              className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-4 relative overflow-hidden"
            >
              <span className="text-2xl">{r.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{r.title}</p>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {r.badge}
                </span>
              </div>
              <span className="text-gray-400 text-xl">🔒</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/membership"
            className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Unlock Premium Resources — View Plans
          </Link>
        </div>
      </section>

      {/* Custom Request */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Need a Custom HR Document?</h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mb-5">
          Our consultants can draft custom employment contracts, HR policies, SOPs, and compliance documentation
          tailored to your specific business needs.
        </p>
        <Link
          href="/contact"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
        >
          Request Custom Document
        </Link>
      </section>
    </div>
  );
}
