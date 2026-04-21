import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Singapore Employment Laws | HCCS",
  description:
    "Key Singapore employment legislation explained — Employment Act, EFMA, WICA, Workplace Fairness Act, CPF Act, TAFEP, and Fair Hiring Framework.",
};

const laws = [
  {
    icon: "📋",
    name: "Employment Act",
    short: "EA",
    desc: "Core legislation covering employment contracts, working hours, overtime, leave entitlements, and termination for employees in Singapore.",
    keyPoints: [
      "Covers all employees except public servants, domestic workers, and seafarers",
      "Mandates itemised payslips for all covered employees",
      "Sets minimum annual leave, sick leave, maternity/paternity entitlements",
      "Governs rest days, overtime rates, and salary payment timelines",
      "Requires written employment contracts from Day 1",
    ],
    link: "https://www.mom.gov.sg/employment-practices/employment-act",
  },
  {
    icon: "🌏",
    name: "Employment of Foreign Manpower Act",
    short: "EFMA",
    desc: "Regulates the employment of foreign workers and professionals in Singapore, governing work passes, employer obligations, and penalties.",
    keyPoints: [
      "Governs Employment Pass, S Pass, Work Permit, Tech Pass, and EntrePass",
      "Mandates Fair Consideration Framework (FCF) job advertising requirements",
      "Sets employer obligations for work pass holders' medical insurance",
      "Penalties for illegal employment include fines and blacklisting",
      "Employers must maintain valid work passes for all foreign employees",
    ],
    link: "https://www.mom.gov.sg/passes-and-permits",
  },
  {
    icon: "🏥",
    name: "Work Injury Compensation Act",
    short: "WICA",
    desc: "Protects employees injured at work or who contract occupational diseases. Provides compensation without requiring proof of employer negligence.",
    keyPoints: [
      "Covers all employees except domestic workers and the self-employed",
      "Mandatory Work Injury Compensation Insurance for manual and lower-paid workers",
      "Employers must report work accidents to MOM within 10 days",
      "Compensation for medical expenses, temporary incapacity, and permanent disability",
      "Death compensation payable to dependants",
    ],
    link: "https://www.mom.gov.sg/workplace-safety-and-health/work-injury-compensation",
  },
  {
    icon: "⚖️",
    name: "Workplace Fairness Act",
    short: "WFA",
    desc: "Strengthens protections against workplace discrimination. Employers must not discriminate based on protected characteristics including age, race, religion, gender, and disability.",
    keyPoints: [
      "Prohibits discrimination in hiring, retrenchment, and employment terms",
      "Protected characteristics: age, race, religion, gender, nationality, disability, marital status",
      "Requires employers to have formal grievance handling processes",
      "Employees can file complaints with MOM or TAFEP",
      "Retaliation against complainants is prohibited",
    ],
    link: "https://www.mom.gov.sg/employment-practices/workplace-fairness-legislation",
  },
  {
    icon: "💰",
    name: "Central Provident Fund Act",
    short: "CPF Act",
    desc: "Mandates social security contributions for Singapore Citizens and Permanent Residents. Governs contribution rates, account types, and employer obligations.",
    keyPoints: [
      "Applies to all SC and PR employees regardless of salary",
      "2026 ordinary wage ceiling: S$8,000/month",
      "Employer contribution rates vary by employee age bracket",
      "CPF must be paid by 14th of the following month",
      "Late contributions attract penalties and interest",
    ],
    link: "https://www.cpf.gov.sg/employer",
  },
  {
    icon: "🤝",
    name: "TAFEP Guidelines",
    short: "TAFEP",
    desc: "The Tripartite Alliance for Fair and Progressive Employment Practices sets guidelines for fair hiring, workplace harassment, and inclusive workplace practices.",
    keyPoints: [
      "Fair Consideration Framework (FCF) — job ads must be on MyCareersFuture for ≥28 days",
      "Job criteria must be based on genuine requirements, not nationality or demographics",
      "Employers must keep records of hiring decisions for 2 years",
      "Sexual harassment policies must be in place for all employers",
      "TAFEP audits target companies with high foreign employee ratios",
    ],
    link: "https://www.tafep.sg",
  },
  {
    icon: "📊",
    name: "Fair Hiring Framework",
    short: "FHF",
    desc: "A set of principles and practices to ensure merit-based, fair, and progressive hiring across Singapore's workforce.",
    keyPoints: [
      "Job requirements must reflect genuine operational needs",
      "Assessments based on skills, experience, and job fit — not personal attributes",
      "Structured interviews with consistent evaluation criteria",
      "Diverse interview panels encouraged",
      "Proper documentation of hiring decisions required",
    ],
    link: "https://www.mom.gov.sg/employment-practices/fair-hiring-practices",
  },
];

export default function EmploymentLawsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Singapore Employment Laws</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Key legislation and guidelines governing employment in Singapore — explained for employers and HR professionals.
        </p>
      </section>

      <section className="space-y-8">
        {laws.map((law) => (
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
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Points for Employers</h3>
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
                  Official MOM / Government Resource →
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <h2 className="font-bold text-amber-900 mb-2">Need help ensuring your business is compliant?</h2>
        <p className="text-sm text-amber-800 mb-4">
          Our free HR Compliance Risk Scan checks your business against Singapore's key employment regulations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/compliance-scan"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
          >
            Take Free Compliance Scan
          </Link>
          <Link
            href="/consultation"
            className="border border-emerald-600 text-emerald-700 px-6 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-semibold"
          >
            Book Expert Review
          </Link>
        </div>
      </div>
    </div>
  );
}
