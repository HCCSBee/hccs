"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/employer", label: "Employer Services" },
  { href: "/membership", label: "Membership" },
  { href: "/hr-news", label: "HR News" },
  { href: "/employment-laws", label: "Employment Laws" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <span className="text-2xl font-extrabold tracking-tight">HCCS</span>
          <span className="hidden sm:block text-xs font-normal text-gray-500 leading-tight">
            Human Capital Consulting<br />&amp; Services
          </span>
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

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/compliance-scan"
            className="text-sm border border-emerald-600 text-emerald-700 px-3 py-1.5 rounded hover:bg-emerald-50 transition-colors"
          >
            Free Scan
          </Link>
          <Link
            href="/consultation"
            className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded hover:bg-emerald-700 transition-colors"
          >
            Book Free Consultation
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
            <li>
              <Link
                href="/consultation"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                Book Free Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
