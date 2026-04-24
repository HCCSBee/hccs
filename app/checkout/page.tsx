"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const PLAN_DISPLAY: Record<string, { label: string; price: string; period: string }> = {
  essential: { label: "Essential", price: "S$5,988", period: "/ year" },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") ?? "essential";
  const planInfo = PLAN_DISPLAY[plan] ?? PLAN_DISPLAY["essential"];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    (async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });
        const data = await res.json();

        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        // Dynamically import Airwallex to avoid SSR issues
        const awx = await import("@airwallex/components-sdk");

        await awx.init({
          env:
            (process.env.NEXT_PUBLIC_AIRWALLEX_ENV as "demo" | "sandbox" | "prod") ??
            "sandbox",
        });

        const element = await awx.createElement("dropIn", {
          intent_id: data.intent_id,
          client_secret: data.client_secret,
          currency: data.currency,
        });

        element.on("success", () => {
          router.push("/consultation-success");
        });

        element.on("error", (err: unknown) => {
          console.error("Airwallex payment error:", err);
          setError("Payment failed. Please check your details and try again.");
        });

        element.mount("#airwallex-dropin");
        setLoading(false);
      } catch (err) {
        console.error("Checkout init error:", err);
        setError("Failed to initialize checkout. Please try again.");
        setLoading(false);
      }
    })();
  }, [plan, router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/membership"
          className="text-sm text-emerald-600 hover:text-emerald-800 mb-6 inline-block"
        >
          ← Back to plans
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-700 text-white px-6 py-5">
            <h1 className="text-xl font-bold mb-1">Complete Your Order</h1>
            <p className="text-emerald-200 text-sm">HCCS AIHR Platform</p>
          </div>

          {/* Order summary */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{planInfo.label} Plan</p>
                <p className="text-xs text-gray-500 mt-0.5">Annual subscription · auto-renews</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{planInfo.price}</p>
                <p className="text-xs text-gray-400">{planInfo.period}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-1">
              {[
                "AI HR Chatbot (enhanced)",
                "Full HR templates & SOPs library",
                "Unlimited Compliance Scans",
                "Video Insights Library",
                "25% off consultancy services",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-emerald-500">✓</span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment form */}
          <div className="px-6 py-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-sm text-gray-500">
                  Preparing secure checkout…
                </span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 mb-4">
                {error}
                <br />
                <Link
                  href="/contact"
                  className="underline text-red-600 hover:text-red-800 mt-1 inline-block"
                >
                  Contact us for assistance →
                </Link>
              </div>
            )}

            {/* Airwallex Drop-in Element mounts here */}
            <div id="airwallex-dropin" className={loading ? "hidden" : ""} />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Secured by Airwallex · SSL encrypted · Singapore entity
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
