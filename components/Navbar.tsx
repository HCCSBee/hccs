"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/media", label: "Media" },
  { href: "/hr-news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/membership", label: "Membership" },
  { href: "/compliance-scan", label: "Compliance Scan" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(!!s);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/hccs_logo.png" alt="HCCS" width={120} height={40} className="h-10 w-auto object-contain" priority />
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
          <Link href="/" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">EN/中文</Link>
          {session ? (
            <Link href="/member-portal" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">HR Access</Link>
          ) : null}
          {session === null ? null : session ? (
            <>
              <button onClick={handleSignOut} className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">Sign In</Link>
          )}
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
            <li><Link href="/" onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">EN/中文</Link></li>
            {session ? (
              <li><Link href="/member-portal" onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">HR Access</Link></li>
            ) : null}
            {session ? (
              <>
                <li><button onClick={handleSignOut} className="block py-1 text-left w-full hover:text-emerald-600">Sign Out</button></li>
              </>
            ) : (
              <li><Link href="/login" onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">Sign In</Link></li>
            )}
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
