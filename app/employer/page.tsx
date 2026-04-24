import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services | HCCS",
  description:
    "HCCS provides end-to-end HR consulting services in Singapore - from EP/PR applications and HR compliance to AI-powered HR solutions.",
};

const serviceHighlights = [
  {
    title: "Singapore Market Entry & Business Setup",
    desc: "Helping foreign founders establish and operate in Singapore with full compliance.",
  },
  {
    title: "Work Pass & Residency Strategy",
    desc: "Strategic EP, EntrePass, and PR solutions designed to improve approval success.",
  },
  {
    title: "HR Compliance & Risk Advisory",
    desc: "Protect your business with structured HR frameworks aligned to Singapore regulations.",
  },
  {
    title: "AIHR Compliance Intelligence Platform",
    desc: "AI-powered HR guidance and compliance monitoring backed by expert advisory.",
  },
];

const services = [
  {
    icon: "EP",
    slug: "employment-pass",
    title: "New EP/PR Application & Renewals",
    desc: "Strategic guidance for professionals earning S$5,600+. Eligibility assessment and comprehensive application support.",
  },
  {
    icon: "PR",
    slug: "permanent-residence",
    title: "Permanent Residency",
    desc: "Secure your long-term future in Singapore. Expert handling of PTS scheme applications for pass holders.",
  },
  {
    icon: "EN",
    slug: "entrepass",
    title: "EntrePass & Startup",
    desc: "For foreign entrepreneurs wanting to start a business. Complete incorporation and visa strategy.",
  },
  {
    icon: "HR",
    slug: "hr-compliance-audit",
    title: "HR Compliance & Advisory",
    desc: "Ensure your company meets all MOM regulatory requirements. Avoid penalties and improve approval odds.",
  },
  {
    icon: "AI",
    slug: "aihr-retainer",
    title: "AI HR",
    desc: "Cost-effective, tech-enabled HR support for SMEs. Transform your HR into a strategic growth engine.",
  },
  {
    icon: "SG",
    slug: "market-entry",
    title: "Singapore Market Entry & Business Setup",
    desc: "Helping foreign founders establish and operate in Singapore with full compliance.",
  },
  {
    icon: "FB",
    slug: "fractional-hr",
    title: "Fractional HR Business Partner",
    desc: "Access senior HR leadership on a part-time or project basis to drive strategic initiatives.",
  },
  {
    icon: "WP",
    slug: "workforce-planning",
    title: "Workforce Planning & Organisation Design",
    desc: "Align workforce capabilities with growth plans, automation, and AI readiness.",
  },
  {
    icon: "LD",
    slug: "learning-development",
    title: "Learning & Development",
    desc: "Strategic upskilling and AI-focused training to future-proof your workforce.",
  },
  {
    icon: "PC",
    slug: "performance-culture",
    title: "Performance & Culture",
    desc: "Building high-performing teams through OKRs, KPIs, and leadership development.",
  },
];

export default function EmployerPage() {
  return (
    <div className="bg-white">
      <section className="bg-emerald-950 py-20 lg:py-28 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200 mb-6">
            HCCS Services
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            HCCS offers the following services in accordance with HR trends 2025 as per the World Economic Forum.
          </p>
        </div>
      </section>

      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="w-2 h-8 bg-amber-500 rounded-full mb-4" />
                <h2 className="font-semibold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className="group h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4 text-sm font-bold tracking-wide">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{service.desc}</p>
                <p className="inline-flex items-center gap-1 text-amber-700 text-sm font-medium">
                  Speak with HCCS
                  <span aria-hidden>{"->"}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-12 px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Not sure which service you need?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Book a free 30-minute consultation and our team will assess your situation and recommend the right solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/compliance-scan"
              className="border border-white text-white hover:bg-white hover:text-emerald-800 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Free HR Compliance Scan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
