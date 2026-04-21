import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR News — Singapore HR & Employment Updates | HCCS",
  description:
    "Latest Singapore HR, MOM, CPF, TAFEP, and employment regulatory news curated for businesses.",
};

const industries = [
  "All Industries",
  "Technology",
  "Finance & Banking",
  "Manufacturing",
  "F&B & Hospitality",
  "Healthcare",
  "Construction",
  "Retail",
  "Professional Services",
];

const newsItems = [
  {
    date: "Apr 2026",
    tag: "MOM",
    title: "Flexible Work Arrangement Guidelines Now in Effect",
    desc: "The Tripartite Guidelines on Flexible Work Arrangements became legally enforceable. Employers must fairly consider all FWA requests in writing.",
    source: "Straits Times",
  },
  {
    date: "Mar 2026",
    tag: "Legislation",
    title: "Workplace Fairness Legislation — Key Changes for Employers",
    desc: "Singapore's Workplace Fairness Act strengthens protections against workplace discrimination. Employers must update policies by the effective date.",
    source: "Business Times",
  },
  {
    date: "Mar 2026",
    tag: "CPF",
    title: "Higher Monthly Salary Ceilings and Other CPF Changes in 2026",
    desc: "CPF monthly salary ceiling increases to S$8,000. Employers must update payroll systems to reflect new contribution rates.",
    source: "MOM",
  },
  {
    date: "Feb 2026",
    tag: "MOM",
    title: "New MOM Guidelines on Retirement and Re-employment",
    desc: "Updated guidelines clarify employer obligations under the Retirement and Re-employment Act, including re-employment offers and retraining support.",
    source: "MOM",
  },
  {
    date: "Feb 2026",
    tag: "Salary",
    title: "Salary Outlook 2026: Projected Increments Across Industries",
    desc: "MOM and industry surveys project average salary increments of 4–6% across most sectors, with Technology and Healthcare leading at 7–9%.",
    source: "Business Times",
  },
  {
    date: "Jan 2026",
    tag: "Tech Pass",
    title: "Tech Pass Eligibility Criteria Updated for 2026",
    desc: "MOM has revised Tech Pass eligibility criteria to include product managers and AI specialists. Application windows open quarterly.",
    source: "MOM",
  },
  {
    date: "Jan 2026",
    tag: "TAFEP",
    title: "Fair Hiring Framework — Audit Season Begins",
    desc: "TAFEP announces targeted compliance audits for companies with more than 25 employees. Fair consideration for locals must be documented.",
    source: "TAFEP",
  },
  {
    date: "Dec 2025",
    tag: "Retrenchment",
    title: "MOM Retrenchment Notification — Threshold Lowered",
    desc: "Companies retrenching 5 or more employees must notify MOM within 5 working days. Updated forms and filing procedures are now live.",
    source: "Today Online",
  },
];

const tagColors: Record<string, string> = {
  MOM: "bg-blue-100 text-blue-800",
  CPF: "bg-green-100 text-green-800",
  TAFEP: "bg-purple-100 text-purple-800",
  Legislation: "bg-orange-100 text-orange-800",
  Salary: "bg-yellow-100 text-yellow-800",
  "Tech Pass": "bg-emerald-100 text-emerald-800",
  Retrenchment: "bg-red-100 text-red-800",
};

export default function HRNewsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">HR News</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay current with Singapore MOM, CPF, TAFEP, IRAS, and ACRA regulatory updates — curated for business owners and HR professionals.
        </p>
      </section>

      {/* Industry Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {industries.map((ind) => (
            <button
              key={ind}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                ind === "All Industries"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-700"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </section>

      {/* Regulatory Alerts */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <h2 className="font-semibold text-amber-900 text-sm mb-2">📢 Industry Regulatory Alerts</h2>
        <p className="text-sm text-amber-800">
          Get real-time alerts for MOM, CPF, IRAS, TAFEP, ACRA, and ICA regulatory changes relevant to your industry.
          Select your industry above to filter relevant news.
        </p>
      </section>

      {/* News List */}
      <section className="space-y-6">
        {newsItems.map((item) => (
          <article
            key={item.title}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  tagColors[item.tag] || "bg-gray-100 text-gray-700"
                }`}
              >
                {item.tag}
              </span>
              <span className="text-xs text-gray-400">{item.date}</span>
              <span className="text-xs text-gray-400 ml-auto">Source: {item.source}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </article>
        ))}
      </section>

      <div className="text-center mt-10">
        <p className="text-sm text-gray-500">
          Subscribe to our newsletter for weekly HR regulatory updates delivered to your inbox.
        </p>
        <a
          href="mailto:enquiry@hccs.sg?subject=Newsletter Subscription"
          className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
        >
          Subscribe to Newsletter
        </a>
      </div>
    </div>
  );
}
