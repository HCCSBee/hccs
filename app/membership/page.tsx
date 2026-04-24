import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership Plans — AIHR Platform | HCCS",
  description:
    "Join the HCCS AIHR platform. Free, Essential, Professional, and Strategic plans for Singapore HR compliance, AI chatbot access, and premium templates.",
};

const plans = [
  {
    name: "Free",
    price: "S$0",
    period: "forever",
    highlight: false,
    target: "Individuals exploring HR basics",
    features: [
      "AI HR Chatbot (basic queries)",
      "3 downloadable HR templates",
      "1 Compliance Scan (one-time)",
      "Access to HR news feed",
      "Community forum access",
    ],
    cta: "Get Started Free",
    href: "/member-portal",
  },
  {
    name: "Essential",
    price: "S$5,988",
    period: "/ year (Year 1 promo)",
    highlight: false,
    target: "SMEs needing compliance support",
    features: [
      "AI HR Chatbot (enhanced)",
      "Full HR templates & SOPs library",
      "Unlimited Compliance Scans",
      "Video Insights Library",
      "25% off consultancy services",
      "Priority consultation booking",
      "Government training grant access",
    ],
    cta: "Get Essential",
    href: "/checkout?plan=essential",
  },
  {
    name: "Professional",
    price: "S$11,988",
    period: "annual billing",
    highlight: true,
    target: "Growing businesses",
    features: [
      "Everything in Essential",
      "Advanced AI HR Chatbot",
      "Multi-user team access (up to 5)",
      "30% off consultancy services",
      "Monthly HR regulatory briefings",
      "Dedicated onboarding session",
      "Priority support",
    ],
    cta: "Contact for Pricing",
    href: "/contact",
  },
  {
    name: "Strategic",
    price: "S$17,988",
    period: "annual billing",
    highlight: false,
    target: "Enterprise HR teams",
    features: [
      "Everything in Professional",
      "Unlimited team users",
      "Custom AI HR Chatbot training",
      "Dedicated HCCS Account Manager",
      "Quarterly HR strategy reviews",
      "Exclusive webinars & workshops",
      "Custom compliance reporting",
    ],
    cta: "Contact for Pricing",
    href: "/contact",
  },
];

const faqs = [
  {
    q: "Can I try before I subscribe?",
    a: "Yes — our Free plan gives you access to basic AI HR chatbot queries, 3 templates, and a one-time compliance scan with no credit card required.",
  },
  {
    q: "Is there a monthly billing option?",
    a: "Currently all paid plans are billed annually. This helps us offer the best value and deliver consistent service to our members.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade at any time. Unused value from your current plan will be prorated toward your new plan.",
  },
  {
    q: "Why is the Essential plan cheaper in Year 1?",
    a: "We are currently running a 3-month launch promotional discount for early members. The promo price locks in for your first year.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. All payments are processed securely via Airwallex. HCCS never stores your card details.",
  },
];

export default function MembershipPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <section className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AIHR Membership Plans</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access AI-powered HR tools, premium templates, compliance scans, and exclusive consultancy discounts —
          designed for Singapore businesses.
        </p>
      </section>

      {/* Plans */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 flex flex-col ${
              plan.highlight
                ? "border-emerald-500 bg-emerald-50 shadow-lg ring-2 ring-emerald-500"
                : "border-gray-200 bg-white shadow-sm"
            }`}
          >
            {plan.highlight && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1 self-start mb-3">
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
            <p className="text-xs text-gray-500 mt-1 mb-3">{plan.target}</p>
            <div className="mb-4">
              <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
              <span className="text-sm text-gray-500 ml-1">{plan.period}</span>
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
                plan.highlight
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
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
