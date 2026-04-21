import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Employer Services — EP / PR, HR Compliance & Workforce Planning | HCCS",
  description:
    "Strategic EP, EntrePass, and PR applications. Fractional HR, workforce planning, compliance & risk management for Singapore businesses.",
};

const services = [
  {
    icon: "🌏",
    title: "New EP / PR Applications & Renewals",
    desc: "Strategic eligibility assessment, deep EP scoring analysis, comprehensive document preparation, submission management, and appeal support.",
    items: [
      "Strategic eligibility assessment",
      "Deep assessment of EP scoring framework",
      "Comprehensive document preparation",
      "Submission & status management",
      "Appeal support and escalation",
    ],
  },
  {
    icon: "📋",
    title: "PR Application Strategy",
    desc: "Growth milestone planning, community integration guidance, and strategic work pass pathway planning towards Singapore PR.",
    items: [
      "Growth milestones planning",
      "Community integration profile guidance",
      "Strategic work pass planning",
      "Document curation & narrative building",
      "Application submission & follow-up",
    ],
  },
  {
    icon: "🧑‍💼",
    title: "Fractional / Outsourced HR Leadership",
    desc: "Dedicated part-time HR leadership for SMEs and startups that need strategic HR without a full-time hire.",
    items: [
      "HR policy development",
      "Employee handbook creation",
      "Performance management setup",
      "HR process design & documentation",
      "Ongoing HR advisory retainer",
    ],
  },
  {
    icon: "🏢",
    title: "Workforce Planning & Org Design",
    desc: "Manpower budgeting, organisational structure design, succession planning and talent pipeline strategy.",
    items: [
      "Manpower budgeting & headcount planning",
      "Org chart design & role scoping",
      "Succession planning",
      "Talent pipeline strategy",
      "Local vs foreign workforce ratio compliance",
    ],
  },
  {
    icon: "📈",
    title: "Performance Management & Culture",
    desc: "KPI frameworks, appraisal systems, engagement surveys, and culture building programmes.",
    items: [
      "KPI framework design",
      "Appraisal & review system setup",
      "Employee engagement surveys",
      "Culture alignment workshops",
      "Recognition programme design",
    ],
  },
  {
    icon: "⚖️",
    title: "Compliance & Risk Management",
    desc: "MOM, CPF, TAFEP, and Fair Hiring compliance audits with corrective action plans and staff training.",
    items: [
      "HR compliance audit",
      "Employment Act gap analysis",
      "CPF contribution review",
      "TAFEP fair hiring assessment",
      "Corrective action plan development",
    ],
  },
];

const whoWeHelp = [
  { icon: "✈️", who: "Foreign Founders & Entrepreneurs", desc: "Navigating EP, EntrePass, and business setup." },
  { icon: "🌐", who: "Foreign Companies Entering Singapore", desc: "Establishing regional HQ with compliant HR." },
  { icon: "🏭", who: "Growing SMEs", desc: "Facing regulatory scrutiny as headcount scales." },
  { icon: "👔", who: "Senior Executives", desc: "Managing EP/PR renewal risks and strategies." },
  { icon: "🚀", who: "Innovative Startups", desc: "Tech Pass, EntrePass, and talent acquisition." },
];

export default function EmployerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Employer Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          End-to-end HR consulting for Singapore businesses — from EP/PR applications to workforce strategy
          and compliance risk management.
        </p>
      </section>

      {/* Services Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{s.icon}</span>
                <h2 className="text-lg font-bold text-gray-900">{s.title}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
              <ul className="space-y-1">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Who We Help</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whoWeHelp.map((item) => (
            <div key={item.who} className="flex gap-3 bg-white rounded-xl p-4 shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{item.who}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-emerald-700 text-white rounded-2xl py-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Not sure which service you need?</h2>
        <p className="text-emerald-200 mb-6 max-w-xl mx-auto">
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
      </section>
    </div>
  );
}
