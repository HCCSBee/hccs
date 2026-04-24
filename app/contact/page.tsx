"use client";

import { useState } from "react";

const industries = [
  "Retail","F&B","Construction","Manufacturing","Trading","Services","Recruitment",
  "Technology","Finance","Healthcare","Education","Logistics","Energy","Real Estate",
  "Hospitality","Automotive","Aerospace","Agriculture","Pharma & Biotech","Consumer Goods",
  "IT & Software","Telecommunications","Media & Entertainment","Consulting","Legal",
  "Accounting","Insurance","Banking","Investment","Import & Export","Wholesale","Mining",
  "Oil & Gas","Utilities","Transportation","Marine & Shipping","Aviation","Tourism",
  "Beauty & Wellness","Fashion","Publishing","Advertising","Public Relations","Non-Profit",
  "Government","Other",
];

const servicesOfInterest = [
  "EP/PR Application & Renewals","Permanent Residency","EntrePass & Startup",
  "HR Compliance & Advisory","Job Redesign & Quota Planning","Fractional HR Business Partner",
  "Workforce Planning & Org Design","AI HR","Learning & Development",
  "Performance & Culture","Membership Enquiry","Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    industry: "", service: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Info */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We'd love to hear from you. Reach out and let's start a conversation. We typically reply within 1–2 business days.
        </p>

        <div className="space-y-5">
          <div className="flex gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Email</p>
              <a href="mailto:enquiry@hccs.sg" className="text-emerald-600 hover:underline text-sm">
                enquiry@hccs.sg
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Phone</p>
              <a href="tel:+6594362866" className="text-emerald-600 hover:underline text-sm">
                +65 9436-2866
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
              <a
                href="https://wa.me/6565943628"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline text-sm"
              >
                +65 6594-3628
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Address</p>
              <p className="text-sm text-gray-600">
                10 Anson Road #33-15<br />
                International Plaza<br />
                Singapore 079903
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">🌐 Bilingual Support Available</p>
          <p className="text-sm text-gray-600">
            We offer consultations in English and Mandarin (中文). Please indicate your preferred language in your message.
          </p>
        </div>
      </div>

      {/* Form */}
      <div>
        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-sm text-gray-600">
              Thank you for reaching out. We'll get back to you within 1–2 business days.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-5"
          >
            <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Acme Pte Ltd"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="+65 9123 4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="">Select an industry...</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service of Interest</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="">Select a service...</option>
                {servicesOfInterest.map((svc) => (
                  <option key={svc} value={svc}>{svc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
                <path d="m21.854 2.147-10.94 10.939"/>
              </svg>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
