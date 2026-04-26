"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client"; // only used for setSession after sign-in
import { useLang } from "@/lib/i18n";

export default function LoginPage() {
  const { t } = useLang();
  const l = t.login;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    setMode(urlMode === "register" ? "register" : "signin");
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setNotice("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNotice("");

    if (mode === "register") {
      if (form.password.length < 6) {
        setLoading(false);
        setError(l.errors.passwordLength);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setLoading(false);
        setError(l.errors.passwordMismatch);
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = (await res.json()) as { ok?: boolean; access_token?: string; refresh_token?: string; error?: string };
      setLoading(false);

      if (!res.ok) {
        setError(data.error || l.errors.registrationFailed);
        return;
      }

      if (data.access_token && data.refresh_token) {
        await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        router.push("/member-portal");
        return;
      }

      // Fallback: auto-login not available, prompt manual sign-in
      setNotice(l.notices.registrationSuccess);
      setMode("signin");
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    const data = (await res.json()) as { access_token?: string; refresh_token?: string; error?: string };
    setLoading(false);

    if (!res.ok) {
      setError(data.error || l.errors.loginFailed);
      return;
    }

    // Hydrate the Supabase client session so auth state is available throughout the app
    await supabase.auth.setSession({
      access_token: data.access_token!,
      refresh_token: data.refresh_token!,
    });

    router.push("/member-portal");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/images/hccs_logo.png"
              alt="HCCS"
              width={120}
              height={40}
              className="h-10 w-auto object-contain mx-auto mb-4"
              priority
            />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {mode === "signin" ? l.signInTitle : l.registerTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "signin"
              ? t.memberPortal.welcomeDesc
              : l.registerTitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError("");
                setNotice("");
              }}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "signin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {l.tabSignIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
                setNotice("");
              }}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                mode === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {l.tabRegister}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{l.emailLabel}</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={l.emailPlaceholder}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{l.passwordLabel}</label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder={l.passwordPlaceholder}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{l.confirmPasswordLabel}</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder={l.confirmPasswordPlaceholder}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            {notice && (
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (mode === "signin" ? l.signingIn : l.registering) : mode === "signin" ? l.signInButton : l.registerButton}
            </button>
          </form>

          {mode === "signin" ? (
            <p className="text-xs text-slate-400 text-center mt-6">
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-emerald-600 hover:underline"
              >
                {l.tabRegister}
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400 text-center mt-6">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-emerald-600 hover:underline"
              >
                {l.tabSignIn}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
