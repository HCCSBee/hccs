"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/employer", label: "Services" },
  { href: "/news-archive", label: "Media" },
  { href: "/hr-news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/membership", label: "Membership" },
  { href: "/compliance-scan", label: "Compliance Scan" },
];

const utilityLinks = [
  { href: "/", label: "EN/中文" },
  { href: "/owner-access-panel", label: "HR Access" },
  { href: "/member-portal", label: "Sign In" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <span className="text-2xl font-extrabold tracking-tight">HCCS</span>
          
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-emerald-600 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {utilityLinks.map((l) => (
            <Link key={l.href + l.label} href={l.href} className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">
              {l.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded hover:bg-emerald-700 transition-colors"
          >
            Book
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-emerald-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3 text-sm text-gray-700">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">
                  {l.label}
                </Link>
              </li>
            ))}
            {utilityLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/consultation"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Book
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
