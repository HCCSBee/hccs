"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

const industries = [
  "Retail","F&B","Construction","Manufacturing","Trading","Services","Recruitment",
  "Technology","Finance","Healthcare","Education","Logistics","Energy","Real Estate",
  "Hospitality","Automotive","Aerospace","Agriculture","Pharma & Biotech","Consumer Goods",
  "IT & Software","Telecommunications","Media & Entertainment","Consulting","Legal",
  "Accounting","Insurance","Banking","Investment","Import & Export","Wholesale","Mining",
  "Oil & Gas","Utilities","Transportation","Marine & Shipping","Aviation","Tourism",
  "Beauty & Wellness","Fashion","Publishing","Advertising","Public Relations","Non-Profit",
  "Government",
  "Other",
];

const servicesOfInterest = [
  "EP/PR Application & Renewals","Permanent Residency","EntrePass & Startup",
  "HR Compliance & Advisory","Job Redesign & Quota Planning","Fractional HR Business Partner",
  "Workforce Planning & Org Design","AI HR","Learning & Development",
  "Performance & Culture","Membership Enquiry","Other",
];

export default function ConsultationPage() {
  const { t } = useLang();
  const c = t.consultation;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || c.errorFallback);
      return;
    }

    router.push("/consultation-success");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{c.title}</h1>
        <p className="text-gray-600">{c.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{c.fullName}</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={c.namePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{c.companyName}</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={c.companyPlaceholder}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{c.email}</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={c.emailPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{c.phone}</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={c.phonePlaceholder}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{c.industry}</label>
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">{c.industryDefault}</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{c.service}</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">{c.serviceDefault}</option>
            {servicesOfInterest.map((svc) => (
              <option key={svc} value={svc}>{svc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{c.message}</label>
          <textarea
            name="message"
            required
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            placeholder={c.messagePlaceholder}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {loading ? c.submitting : c.submit}
        </button>

        <p className="text-xs text-gray-400 text-center">
          {t.footer.bilingualNote}
        </p>
      </form>
    </div>
  );
}

