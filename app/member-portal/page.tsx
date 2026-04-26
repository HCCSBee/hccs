"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/lib/i18n";

const videoLibrary = [
  { title: "Understanding the Employment Act 2024 Amendments", duration: "18 min", tier: "Essential", locked: false },
  { title: "EP Application Strategy: Scoring & Documentation", duration: "24 min", tier: "Essential", locked: false },
  { title: "CPF Contribution Rates & Common Errors", duration: "15 min", tier: "Essential", locked: false },
  { title: "Fair Hiring Masterclass: FCF Compliance", duration: "32 min", tier: "Professional", locked: true },
  { title: "Retrenchment Best Practices in Singapore", duration: "20 min", tier: "Professional", locked: true },
  { title: "Building a Performance Management System", duration: "28 min", tier: "Strategic", locked: true },
];

const DEMO_ALERT_USER_ID = "31f17772-a37b-4d8b-8385-3bf7478fb489";

export default function MemberPortalPage() {
  const { t } = useLang();
  const mp = t.memberPortal;
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [chatbaseId, setChatbaseId] = useState<string | null>(null);
  const [userTierName, setUserTierName] = useState("Essential");
  const showDemoAiAlert = userId === DEMO_ALERT_USER_ID;

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setUserEmail(session.user.email ?? null);

      const res = await fetch("/api/member/chatbase", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.ok) {
        const data = (await res.json()) as {
          user_tier_id?: number;
          tier_name?: string;
          chatbase_id?: string | null;
        };

        setUserTierName(data.tier_name || "Essential");
        setChatbaseId(data.chatbase_id || null);
      }

      setAuthChecked(true);
    });
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{mp.title}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {mp.welcomeDesc}{userEmail ? `, ${userEmail}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Chatbot */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-emerald-700 text-white px-5 py-4 flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <div>
                <h2 className="font-semibold">{mp.aiTitle}</h2>
                <p className="text-emerald-200 text-xs">{mp.aiDesc}</p>
              </div>
            </div>

            <div className="h-[600px]">
              {chatbaseId ? (
                <iframe
                  allow="microphone"
                  src={`https://www.chatbase.co/chatbot-iframe/${chatbaseId}`}
                  width="100%"
                  style={{ height: "100%" }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  {mp.noAssistant}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick Links */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">{mp.quickAccessTitle}</h3>
            <ul className="space-y-2 text-sm">
              {mp.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-1">{mp.tierLabel}</h3>
            <span className="text-xs font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">{userTierName}</span>
            <p className="text-xs text-gray-500 mt-2">Renews: April 2027</p>
            <Link href="/membership" className="mt-3 block text-xs text-emerald-700 underline">
              Upgrade to Professional →
            </Link>
          </div>

          {showDemoAiAlert && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="bg-red-600 text-white rounded-lg px-3 py-2 mb-3">
                <h3 className="font-semibold">AI Alert</h3>
                <p className="text-xs uppercase tracking-wide text-red-100">Information</p>
              </div>
              <p className="text-sm font-medium text-gray-900">Accounting and Corporate Regulatory Authority</p>
              <p className="text-sm text-gray-700 mt-1">
                Companies and Limited Liability Partnerships (Miscellaneous Amendments) Act 2024 | Accounting and Corporate Regulatory Authority
              </p>
              <a
                href="https://www.acra.gov.sg/regulations/legislation/amendment-acts/cllpma-act"
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs text-emerald-700 underline break-all"
              >
                https://www.acra.gov.sg/regulations/legislation/amendment-acts/cllpma-act
              </a>
              <p className="text-sm text-gray-700 mt-3">
                Our AI alert indicates your company might be impacted by recent government policy changes. You should book a consultation for a compliance review.
              </p>
              <Link
                href="/consultation"
                className="mt-3 inline-block text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg"
              >
                Book Consultation
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Video Library */}
      {/* <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5">{mp.videoTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoLibrary.map((v) => (
            <div
              key={v.title}
              className={`bg-white border rounded-xl p-4 shadow-sm relative ${
                v.locked ? "opacity-70" : "hover:shadow-md transition-shadow cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  v.tier === "Essential" ? "bg-emerald-100 text-emerald-700" :
                  v.tier === "Professional" ? "bg-blue-100 text-blue-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {v.tier}
                </span>
                {v.locked && <span className="text-gray-400 text-lg">🔒</span>}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{v.title}</h3>
              <p className="text-xs text-gray-400">{v.duration}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
