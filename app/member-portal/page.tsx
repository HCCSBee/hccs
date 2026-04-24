"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

const videoLibrary = [
  { title: "Understanding the Employment Act 2024 Amendments", duration: "18 min", tier: "Essential", locked: false },
  { title: "EP Application Strategy: Scoring & Documentation", duration: "24 min", tier: "Essential", locked: false },
  { title: "CPF Contribution Rates & Common Errors", duration: "15 min", tier: "Essential", locked: false },
  { title: "Fair Hiring Masterclass: FCF Compliance", duration: "32 min", tier: "Professional", locked: true },
  { title: "Retrenchment Best Practices in Singapore", duration: "20 min", tier: "Professional", locked: true },
  { title: "Building a Performance Management System", duration: "28 min", tier: "Strategic", locked: true },
];

export default function MemberPortalPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [chatbaseId, setChatbaseId] = useState<string | null>(null);
  const [userTierName, setUserTierName] = useState("Essential");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
        return;
      }

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
        <h1 className="text-3xl font-extrabold text-gray-900">Member Portal</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back{userEmail ? `, ${userEmail}` : ""}. Your AI HR tools and premium resources are ready.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Chatbot */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-emerald-700 text-white px-5 py-4 flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <div>
                <h2 className="font-semibold">AI HR Assistant</h2>
                <p className="text-emerald-200 text-xs">Singapore MOM · CPF · TAFEP · Employment Act</p>
              </div>
            </div>

            <div className="h-[600px]">
              {chatbaseId ? (
                <iframe
                  src={`https://www.chatbase.co/chatbot-iframe/${chatbaseId}`}
                  width="100%"
                  style={{ height: "100%" }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  AI assistant is not available for your current plan.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Quick Links */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Access</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/compliance-scan" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800">
                  <span>⚖️</span> Run Compliance Scan
                </Link>
              </li>
              <li>
                <Link href="/resources" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800">
                  <span>📁</span> Download Templates
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800">
                  <span>📅</span> Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/hr-news" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800">
                  <span>📰</span> Latest HR News
                </Link>
              </li>
            </ul>
          </div>

          {/* Membership Status */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-1">Your Plan</h3>
            <span className="text-xs font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full">{userTierName}</span>
            <p className="text-xs text-gray-500 mt-2">Renews: April 2027</p>
            <Link href="/membership" className="mt-3 block text-xs text-emerald-700 underline">
              Upgrade to Professional →
            </Link>
          </div>
        </div>
      </div>

      {/* Video Library */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Video Insights Library</h2>
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
      </section>
    </div>
  );
}
