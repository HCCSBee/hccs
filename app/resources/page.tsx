import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | HCCS",
  description:
    "External HR and compliance resources for Singapore employers, including CPF, MOM, IRAS, ACRA, ICA, SNEF, TAFEP, and NTUC links.",
};

const governmentLinks = [
  {
    label: "CPF Board",
    href: "https://www.cpf.gov.sg",
    description: "Central Provident Fund rules, employer obligations, and contribution guidance.",
  },
  {
    label: "Ministry of Manpower",
    href: "https://www.mom.gov.sg",
    description: "Employment practices, work pass rules, and core labor regulations in Singapore.",
  },
  {
    label: "Inland Revenue Authority",
    href: "https://www.iras.gov.sg",
    description: "Corporate tax, payroll tax reporting, and tax compliance information.",
  },
  {
    label: "Accounting & Corporate Regulatory Authority",
    href: "https://www.acra.gov.sg",
    description: "Business registration, filing requirements, and corporate governance matters.",
  },
  {
    label: "Immigration & Checkpoints Authority",
    href: "https://www.ica.gov.sg",
    description: "Immigration policies and entry requirements for Singapore.",
  },
  {
    label: "Singapore National Employers Federation",
    href: "https://www.snef.org.sg",
    description: "Employer-focused updates, advisory material, and industrial relations support.",
  },
  {
    label: "Tripartite Alliance for Fair & Progressive Employment",
    href: "https://www.tafep.sg",
    description: "Fair hiring practices, workplace guidelines, and anti-discrimination advisories.",
  },
  {
    label: "National Trades Union Congress",
    href: "https://www.ntuc.org.sg",
    description: "Workplace support ecosystem and labor movement resources.",
  },
];

const hccsLinks = [
  { label: "About HCCS", href: "/about" },
  { label: "HR News & Updates", href: "/hr-news" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
  { label: "Membership", href: "/membership" },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Resources</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practical external resources for Singapore employers and HR teams.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Government & Institutional Links</h2>
        <div className="space-y-3">
          {governmentLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
            >
              <div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
              <span className="text-emerald-700 text-sm font-semibold whitespace-nowrap">Visit ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">HCCS Internal Links</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hccsLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
            >
              <p className="font-medium text-gray-800 text-sm">{item.label}</p>
              <p className="text-xs text-emerald-700 mt-1">Open page →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Need Curated Support Instead Of Self-Serve Links?</h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mb-5">
          Book a consultation and HCCS will translate these external sources into a practical action plan for your
          business context.
        </p>
        <a
          href="/consultation"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
        >
          Book Consultation
        </a>
      </section>
    </div>
  );
}
