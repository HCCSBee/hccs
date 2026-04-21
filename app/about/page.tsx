import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About HCCS — Our Team & Story",
  description: "Meet Florence Ker and the HCCS senior advisory team. 25+ years of HR expertise in Singapore.",
};

const advisors = [
  {
    name: "Mr Loh Hoon Sun (骆云山)",
    role: "Senior Advisor — Corporate & Community Relations",
    bio: "Former President of Singapore Hainan Hwee Kuan. Chairman/CEO of various industry groups with decades of corporate leadership in Singapore.",
  },
  {
    name: "Mr Ong Beng Ann",
    role: "Senior Advisor — Workforce & Government Affairs",
    bio: "Director at Workforce Singapore with multiple board positions spanning workforce development and SME support.",
  },
  {
    name: "Mr Ung Gim Sei",
    role: "Senior Legal Advisor",
    bio: "Partner at Ng, Lee & Partners. Admitted to the Singapore Bar in 1981. Legal advisor to 18 professional associations. Senior Lawyer and Independent Director.",
  },
  {
    name: "Mr James Lee Ah Fong",
    role: "IP & Media Law Advisor",
    bio: "Admitted to legal practice in 2003 after a 27-year career in media. Barrister-at-Law (Middle Temple). Specialist in intellectual property and media law.",
  },
  {
    name: "Janice Foo",
    role: "Senior Strategic Advisor — Capital Markets & Wealth Structuring",
    bio: "First Class Honours in Economics (University of Queensland). Independent Director of Cortina Holdings, TEE International, TA Corporation. Former roles on SGX, SIMEX, and ACRA boards.",
  },
  {
    name: "Jennifer Yang",
    role: "Lead Consultant — Strategic HR & People Systems",
    bio: "End-to-end HR leadership spanning Talent Acquisition, Compensation & Benefits, Learning & Development, Policy, Org Dev, and HRBPs.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* About HCCS */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About HCCS</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Human Capital Consulting &amp; Services (Spore) Pte Ltd is a MOM-registered, licensed Employment Agency
          with over 25 years of experience helping businesses navigate Singapore's HR and immigration landscape.
          We combine deep regulatory expertise with a people-first philosophy to deliver compliant, sustainable
          workforce solutions.
        </p>
      </section>

      {/* Founder */}
      <section className="bg-emerald-50 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-40 h-40 rounded-full bg-emerald-200 flex-shrink-0 flex items-center justify-center text-5xl">
          👩‍💼
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Florence Ker (Ker Bee Bee)</h2>
          <p className="text-emerald-700 font-semibold mb-4">Founder &amp; Principal Consultant</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>🏆 Top 10 Most Promising HR Consultants in Singapore 2024</li>
            <li>🏅 Winner — 2017 MOM Tripartite Standards Award for HR Excellence</li>
            <li>📅 Over 20 years of regional HR leadership and strategic consulting</li>
            <li>🌐 Bilingual business proficiency — English and Mandarin (中文)</li>
            <li>🎓 BBA (University of South Australia)</li>
            <li>📜 Prosci® Change Management Certified</li>
            <li>📊 Crestcom Bullet Proof Manager · Republic Polytechnic Data Analytics</li>
          </ul>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-emerald-700 mb-3">Our Mission</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To empower businesses of every size to build compliant, high-performing teams in Singapore —
            through expert HR consulting, innovative AI tools, and trusted advisory relationships.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-emerald-700 mb-3">Our Vision</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            To be Singapore's most trusted HR consultancy — known for integrity, innovation, and
            an unwavering commitment to people-centric workforce solutions.
          </p>
        </div>
      </section>

      {/* Partners & Advisors */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Our Partners &amp; Senior Advisors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((a) => (
            <div key={a.name} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl mb-4">
                👤
              </div>
              <h3 className="font-semibold text-gray-900">{a.name}</h3>
              <p className="text-emerald-600 text-xs font-medium mt-0.5 mb-2">{a.role}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{a.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-emerald-700 text-white rounded-2xl py-12 px-6">
        <h2 className="text-2xl font-bold mb-4">Ready to work with our team?</h2>
        <p className="text-emerald-200 mb-6">
          Book a free 30-minute consultation with Florence Ker today.
        </p>
        <Link
          href="/consultation"
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Book Free Consultation
        </Link>
      </section>
    </div>
  );
}
