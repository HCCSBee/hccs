"use client";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<boolean | null>(null); // null = loading
  const { lang, t, toggle } = useLang();

  const navLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/media", label: t.nav.media },
    { href: "/hr-news", label: t.nav.news },
    { href: "/resources", label: t.nav.resources },
    { href: "/contact", label: t.nav.contact },
    { href: "/membership", label: t.nav.membership },
    { href: "/compliance-scan", label: t.nav.complianceScan },
  ];

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
          <button
            onClick={toggle}
            className="text-sm text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            aria-label="Toggle language"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          {session ? (
            <Link href="/member-portal" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">{t.nav.hrAccess}</Link>
          ) : null}
          {session === null ? null : session ? (
            <>
              <button onClick={handleSignOut} className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">
                {t.nav.signOut}
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors">{t.nav.signIn}</Link>
          )}
          <Link
            href="/consultation"
            className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded hover:bg-emerald-700 transition-colors"
          >
            {t.nav.book}
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
              <button onClick={() => { toggle(); setOpen(false); }} className="block py-1 hover:text-emerald-600 text-left w-full">
                {lang === "en" ? "中文" : "EN"}
              </button>
            </li>
            {session ? (
              <li><Link href="/member-portal" onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">{t.nav.hrAccess}</Link></li>
            ) : null}
            {session ? (
              <>
                <li><button onClick={handleSignOut} className="block py-1 text-left w-full hover:text-emerald-600">{t.nav.signOut}</button></li>
              </>
            ) : (
              <li><Link href="/login" onClick={() => setOpen(false)} className="block py-1 hover:text-emerald-600">{t.nav.signIn}</Link></li>
            )}
            <li>
              <Link
                href="/consultation"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              >
                {t.nav.book}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
