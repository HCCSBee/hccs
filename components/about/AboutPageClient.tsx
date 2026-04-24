"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ProfileData = {
  id: string;
  title: string;
  role: string;
  intro: string;
  image: string;
  stats?: Array<{ label: string; value: string }>;
  sections: Array<{ heading: string; items: string[] }>;
};

const visionMissionBelief = [
  {
    icon: "award",
    title: "Our Vision",
    description:
      "To be a trusted partner and steady backbone for business owners and global talent - delivering people-first, compliant, and forward-looking HR solutions.",
  },
  {
    icon: "users",
    title: "Our Mission",
    description:
      "We support entrepreneurs, SMEs, multinational companies, and foreign professionals through every stage of their journey - from business setup and immigration to HR management, statutory compliance, and AI-enabled HR solutions.",
  },
  {
    icon: "heart",
    title: "Our Belief",
    description:
      '"We are not just here to process documents or manage compliance. We exist to carry the weight behind the scenes - so our clients can move forward 安心、踏实、从心出发。"',
  },
];

const values = [
  {
    number: "01",
    title: "People-First Mindset",
    description:
      "We believe effective HR begins with understanding people. We practise emotional intelligence, active listening, and empathetic communication to support our clients through both opportunities and challenges - especially in moments of pressure, change, and uncertainty.",
    tags: ["Emotional Intelligence (EQ)", "Active Listening", "Empathy and Understanding", "Clear Communication"],
  },
  {
    number: "02",
    title: "Compliance Excellence",
    description:
      "Compliance is the foundation of sustainable business. We apply strong attention to detail, analytical thinking, and deep knowledge of HR regulations and employment laws to ensure our clients operate confidently, ethically, and in full alignment with statutory requirements.",
    tags: ["Attention to Detail", "Analytical Thinking", "Knowledge of HR Regulations", "Strong Organisational Skills"],
  },
  {
    number: "03",
    title: "Innovative Problem-Solving",
    description:
      "We look beyond standard solutions to address real business challenges. Through critical thinking, creativity, and adaptive decision-making, we help clients find practical, efficient, and future-ready approaches - including the use of AIHR - to reduce complexity and improve outcomes.",
    tags: ["Critical Thinking", "Creativity and Innovation", "Problem Analysis", "Sound Decision-Making", "Adaptability"],
  },
  {
    number: "04",
    title: "Collaborative Partnerships",
    description:
      "We work alongside our clients as trusted partners, not just service providers. By building strong relationships and practising open communication, negotiation, and teamwork, we co-create solutions and resolve issues constructively - even in complex or sensitive situations.",
    tags: ["Relationship Building", "Communication and Negotiation", "Teamwork and Influencing", "Conflict Resolution"],
  },
  {
    number: "05",
    title: "Continuous Learning",
    description:
      "We believe growth begins with learning. We remain self-driven and reflective, continuously updating our knowledge, skills, and perspectives to stay relevant in an evolving regulatory, business, and technology landscape.",
    tags: ["Self-Motivation and Initiative", "Willingness to Learn", "Analytical Reflection", "Time Management"],
  },
  {
    number: "06",
    title: "Client-Centric Service",
    description:
      "Everything we do starts with our clients' needs. We listen carefully, respond promptly, and focus on practical solutions - delivering not just services, but reassurance, reliability, and measurable results.",
    tags: ["Customer Service Orientation", "Understanding Client Needs", "Clear Communication", "Responsive Problem-Solving"],
  },
];

const profileData: Record<string, ProfileData> = {
  florence: {
    id: "florence",
    title: "About Florence Ker",
    role: "Strategic HR Executive & Trusted People Advisor",
    intro:
      "Florence Ker is a strategic, results-oriented HR executive and trusted people advisor with over 25 years of leadership experience across listed companies, multinational corporations, and SMEs, spanning energy, oil and gas, manufacturing, engineering, and F&B industries.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/e9b85d72f_5c08fc8b-849f-48fe-976e-1b3070d2d87a.png",
    stats: [
      { label: "Years Experience", value: "25+" },
      { label: "SMEs Supported", value: "500+" },
      { label: "Grants Secured", value: "$5M+" },
      { label: "MOM Award", value: "2017" },
    ],
    sections: [
      {
        heading: "Core Competencies",
        items: [
          "End-to-end HR leadership across talent acquisition, C&B, L&D, policy, organisation development, and HRBP functions.",
          "Change management, digital transformation, and HR due diligence for M&A and restructuring.",
          "Regional ASEAN workforce leadership and cross-cultural people management.",
          "Board-level HR initiatives, IPO readiness, and remuneration committee support.",
        ],
      },
      {
        heading: "Professional Qualifications",
        items: [
          "MSc in Organisational Development & HRM (Baruch College, City University of New York).",
          "Bachelor of Business Administration (University of South Australia).",
          "ACTA Trainer; Prosci Certified Change Management Professional; IHRP-CP.",
          "Certifications in HR agility, data analytics, internal auditing, and transformation leadership.",
        ],
      },
      {
        heading: "Key Achievements",
        items: [
          "Secured over $5M in government training grants for companies.",
          "Winner of the MOM Tripartite Standards Award for HR Excellence (2017).",
          "Supported IPO readiness and strategic remuneration committee advisory work.",
          "Led regional and global expansion projects with major cost savings outcomes.",
        ],
      },
    ],
  },
  jennifer: {
    id: "jennifer",
    title: "Ms Jennifer Yang",
    role: "Lead Consultant | Strategic HR & People Systems",
    intro:
      "Jennifer Yang is a business-minded HR leader with over 20 years of experience in bridging commercial strategy and people systems.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/33f86d437_ChatGPTImageMar29202611_35_20PM.png",
    sections: [
      {
        heading: "Professional Background",
        items: [
          "Over 20 years of experience in regional HR leadership and strategic consulting.",
          "Expert in scalable people systems for SMEs and multinational corporations.",
          "Strong track record in organisational transformation and cultural integration.",
          "Specialist in workforce planning and performance management frameworks.",
        ],
      },
      {
        heading: "Areas of Expertise",
        items: [
          "Strategic HR Leadership",
          "People Systems & Infrastructure",
          "Organisational Scaling & Development",
          "Cross-cultural Collaboration & Management",
          "Workforce Transformation",
        ],
      },
    ],
  },
  loh: {
    id: "loh",
    title: "Mr Loh Hoon Sun (骆云山)",
    role: "Senior Strategic Advisor | Capital Markets & Wealth Structuring",
    intro:
      "Loh Hoon Sun is a highly regarded senior advisor in capital markets and wealth structuring with over five decades of cross-border experience across Singapore, Australia, and Malaysia.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/6d7919aa9_ChatGPTImageMar29202611_36_09PM.png",
    sections: [
      {
        heading: "Professional Background",
        items: [
          "Senior Advisor and former Managing Director at Phillip Securities.",
          "Former EVP and Head of Treasury & Investment Banking at OUB.",
          "Served on boards including SGX, SIMEX, and ACRA.",
          "First Class Honours in Economics from The University of Queensland.",
        ],
      },
      {
        heading: "Areas of Expertise",
        items: [
          "Banking & Securities",
          "Asset Management & Wealth Structuring",
          "Real Estate & Resource-based Industries",
          "Governance & Capital Preservation",
        ],
      },
      {
        heading: "Education & Credentials",
        items: ["FCPA Australia", "CA Malaysia", "FCA Singapore", "FSID"],
      },
    ],
  },
  ung: {
    id: "ung",
    title: "Mr Ung Gim Sei",
    role: "Intellectual Property & Media Law Advisor",
    intro:
      "Mr Ung Gim Sei focuses on intellectual property matters, including trademark applications and internet/media law, with 27 years of media industry leadership before legal practice.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/78b8364a5_ChatGPTImageMar29202611_37_48PM.png",
    sections: [
      {
        heading: "Professional Background",
        items: [
          "Admitted to legal practice in 2003 after a 27-year media career.",
          "Former Managing Director of Nanyang Siang Pau and Group General Manager at SPH.",
          "General Manager of Shen Sin Daily with a special China circulation license.",
          "Legal advisor to multiple associations and organisations.",
        ],
      },
      {
        heading: "Areas of Expertise",
        items: [
          "Intellectual Property & Trademarks",
          "Internet & Media Law",
          "Cyber Defamation",
          "Chinese & Comparative Laws",
        ],
      },
      {
        heading: "Education & Honours",
        items: [
          "LL.M. (Distinction) in Chinese and Comparative Laws, City University of Hong Kong.",
          "Graduate Diploma in Singapore Law, NUS.",
          "PBM award recipient for cultural promotion.",
        ],
      },
    ],
  },
  james: {
    id: "james",
    title: "Mr James Lee Ah Fong",
    role: "Senior Lawyer & Independent Director",
    intro:
      "Mr James Lee is a senior lawyer with decades of active legal practice in Singapore across criminal, civil, and family law matters.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/f8e857df6_7f7de04b-eaa8-4ce6-8492-286a5ee3e53a.png",
    sections: [
      {
        heading: "Professional Background",
        items: [
          "Partner at Ng, Lee & Partners and admitted to the Singapore Bar in 1981.",
          "Former Assistant Superintendent of Police with FBI National Academy training.",
          "Former President of Singapore Hainan Hwee Kuan.",
          "Independent Director for listed companies including Cortina Holdings, TEE International, and TA Corporation.",
        ],
      },
      {
        heading: "Areas of Expertise",
        items: [
          "Criminal & Civil Litigation",
          "Family Law",
          "General Solicitor Work",
          "Corporate Governance & Directorship",
        ],
      },
      {
        heading: "Credentials",
        items: ["Barrister-at-Law (Middle Temple)"],
      },
    ],
  },
};

const advisors = [
  {
    id: "jennifer",
    name: "Jennifer Yang",
    role: "Lead Consultant | Strategic HR & People Systems",
    bio: "Business-minded HR leader with 20+ years bridging commercial strategy and people systems.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/33f86d437_ChatGPTImageMar29202611_35_20PM.png",
  },
  {
    id: "loh",
    name: "Loh Hoon Sun",
    role: "Senior Strategic Advisor | Capital Markets & Wealth Structuring",
    bio: "Over five decades of cross-border experience, former Managing Director of Phillip Securities.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/6d7919aa9_ChatGPTImageMar29202611_36_09PM.png",
  },
  {
    id: "ung",
    name: "Ung Gim Sei",
    role: "Intellectual Property & Media Law Advisor",
    bio: "Focuses on intellectual property matters including trademark applications and internet/media law.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/78b8364a5_ChatGPTImageMar29202611_37_48PM.png",
  },
  {
    id: "james",
    name: "James Lee Ah Fong",
    role: "Senior Lawyer & Independent Director",
    bio: "Admitted to Singapore Bar in 1981 with 35 years of active legal practice in Singapore.",
    image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/f8e857df6_7f7de04b-eaa8-4ce6-8492-286a5ee3e53a.png",
  },
];

export default function AboutPageClient() {
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const activeProfile = activeProfileId ? profileData[activeProfileId] : null;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProfileId(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Strategically building your Singapore workforce with expertise and integrity.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {visionMissionBelief.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-emerald-100 rounded-2xl p-8 hover:shadow-lg hover:border-emerald-300 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  {item.icon === "award" && (
                    <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 12 2 2 4-4m7.773-4.355A10 10 0 1 1 2.227 10.645" />
                    </svg>
                  )}
                  {item.icon === "users" && (
                    <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 1 1 0 8.048M9 11H3v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8h-6m0-1v1m0 0a4 4 0 1 1 8 0m-4-4v4" />
                    </svg>
                  )}
                  {item.icon === "heart" && (
                    <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://media.base44.com/images/public/69c3928519db1fee4acc175a/e9b85d72f_5c08fc8b-849f-48fe-976e-1b3070d2d87a.png"
                  alt="Florence Ker, Founder & Principal Consultant"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex gap-6 mt-6">
                <div className="bg-white border border-emerald-200 rounded-lg px-5 py-3 text-center shadow-sm">
                  <div className="font-bold text-2xl text-emerald-700">25+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white border border-emerald-200 rounded-lg px-5 py-3 text-center shadow-sm">
                  <div className="font-bold text-2xl text-emerald-700">500+</div>
                  <div className="text-xs text-gray-600">SMEs Supported</div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
                Founder &amp; Principal Consultant
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Florence Ker (Ker Bee Bee)</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                IHRP-CP certified, ACTA-certified trainer with over 25 years of experience. Florence has secured over
                $5M in government training grants and is a regular speaker on Employment Act and HR compliance. She
                serves on company boards and is deeply committed to people-first HR leadership.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "Strategic Workforce Planning",
                  "Employee Engagement & Wellness",
                  "HR Tech & AI Integration",
                  "ESG, DEI & Purpose-Driven Culture",
                  "Compliance & Risk Management",
                  "Fractional / Outsourced HR Leadership",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-700 rounded-full"></div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-emerald-700 pl-4 italic text-gray-600 mb-6">
                "We provide the reliable backbone so you can move forward with confidence."
              </blockquote>
              <button
                type="button"
                onClick={() => setActiveProfileId("florence")}
                className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Values</h2>
            <div className="w-12 h-1 bg-emerald-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.number}
                className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-md hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs font-bold text-emerald-700 tracking-widest mb-1">{value.number}</p>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{value.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {value.tags.map((tag) => (
                    <span key={tag} className="text-xs border border-gray-200 rounded-md px-2.5 py-1 text-gray-700 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-emerald-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Partners &amp; Senior Advisors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-emerald-400 transition-all">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-600 mb-4">
                  <Image
                    src={advisor.image}
                    alt={advisor.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{advisor.name}</h3>
                <p className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mt-1 mb-3">{advisor.role}</p>
                <p className="text-gray-600 text-xs leading-relaxed italic">{advisor.bio}</p>
                <button
                  type="button"
                  onClick={() => setActiveProfileId(advisor.id)}
                  className="mt-4 text-xs font-semibold text-emerald-900 hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  VIEW PROFILE -&gt;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-50 to-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Work With Us?</h2>
          <p className="text-gray-600 mb-8 text-lg">Book a free 30-minute consultation to discuss your HR and workforce needs.</p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Consultation
          </Link>
        </div>
      </section>

      {activeProfile ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setActiveProfileId(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close profile dialog"
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-emerald-950 px-5 sm:px-8 pt-6 pb-5 relative shrink-0">
              <button
                type="button"
                onClick={() => setActiveProfileId(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Close"
              >
                x
              </button>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-amber-300/40 shrink-0">
                  <Image src={activeProfile.image} alt={activeProfile.title} width={64} height={64} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{activeProfile.title}</h3>
                  <p className="text-amber-300 text-sm font-semibold mb-2">{activeProfile.role}</p>
                  <p className="text-white/75 text-sm leading-relaxed">{activeProfile.intro}</p>
                </div>
              </div>

              {activeProfile.stats?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-white/15">
                  {activeProfile.stats.map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-amber-300 font-bold text-lg">{item.value}</p>
                      <p className="text-white/60 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="overflow-y-auto p-5 sm:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">{activeProfile.sections[0]?.heading}</h4>
                  <ul className="space-y-2">
                    {(activeProfile.sections[0]?.items ?? []).map((item) => (
                      <li key={item} className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-700 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  {activeProfile.sections.slice(1).map((section) => (
                    <div key={section.heading}>
                      <h4 className="font-bold text-slate-900 mb-3">{section.heading}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                            <span className="text-emerald-700 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
