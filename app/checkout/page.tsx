"use client";

export const dynamic = "force-dynamic";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type BillingCycle = "monthly" | "annual";

const PLAN_ROWS_BY_ID: Record<number, { plan: string; label: string; price: number; cycle: BillingCycle }> = {
  1: { plan: "essential", label: "Essential", price: 499, cycle: "monthly" },
  2: { plan: "essential", label: "Essential", price: 5988, cycle: "annual" },
  3: { plan: "professional", label: "Professional", price: 999, cycle: "monthly" },
  4: { plan: "professional", label: "Professional", price: 11988, cycle: "annual" },
  5: { plan: "strategic", label: "Strategic", price: 1499, cycle: "monthly" },
  6: { plan: "strategic", label: "Strategic", price: 17988, cycle: "annual" },
  7: { plan: "essential-bundle", label: "Essential Bundle", price: 997, cycle: "monthly" },
};

const DEFAULT_PLAN_ID_BY_KEY: Record<string, Record<BillingCycle, number>> = {
  essential: { monthly: 1, annual: 2 },
  professional: { monthly: 3, annual: 4 },
  strategic: { monthly: 5, annual: 6 },
  "essential-bundle": { monthly: 7, annual: 7 },
};

function toAirwallexClientEnv(env?: string): "demo" | "prod" {
  return env === "prod" ? "prod" : "demo";
}

function CheckoutContent() {
  const dropinRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") ?? "essential";
  const billing = searchParams.get("billing") === "monthly" ? "monthly" : "annual";
  const planIdParam = Number(searchParams.get("planId") || "");
  const fallbackPlanId = DEFAULT_PLAN_ID_BY_KEY[plan]?.[billing] ?? DEFAULT_PLAN_ID_BY_KEY.essential.annual;
  const planId = Number.isFinite(planIdParam) && PLAN_ROWS_BY_ID[planIdParam] ? planIdParam : fallbackPlanId;
  const planInfo = PLAN_ROWS_BY_ID[planId] ?? PLAN_ROWS_BY_ID[2];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        const currentCheckoutPath = `/checkout?${searchParams.toString()}`;

        if (!session) {
          router.replace(`/login?mode=signin&next=${encodeURIComponent(currentCheckoutPath)}`);
          return;
        }

        setAuthChecked(true);

        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ plan, planId, billing_cycle: planInfo.cycle }),
        });
        const data = await res.json();

        if (res.status === 401) {
          router.replace(`/login?mode=signin&next=${encodeURIComponent(currentCheckoutPath)}`);
          return;
        }

        if (res.status === 403) {
          router.replace("/login?mode=register");
          return;
        }

        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        // Dynamically import Airwallex to avoid SSR issues
        const awx = await import("@airwallex/components-sdk");
        await awx.init({
          env: toAirwallexClientEnv(process.env.NEXT_PUBLIC_AIRWALLEX_ENV),
        });
        
        const element = await awx.createElement("dropIn", {
          intent_id: data.intent_id,
          client_secret: data.client_secret,
          currency: data.currency,
          country_code: data.country_code ?? "SG",
          
        });
        
        console.log(element);
        element.on("success", async () => {
          try {
            const upgradeRes = await fetch("/api/checkout/sandbox-success", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            });

            const upgradeData = await upgradeRes.json();
            if (!upgradeRes.ok) {
              setError(upgradeData?.error || "Payment succeeded, but membership upgrade failed.");
              return;
            }

            router.push("/member-portal");
          } catch (upgradeError) {
            console.error("Tier upgrade error:", upgradeError);
            setError("Payment succeeded, but membership upgrade failed.");
          }
        });
        
        element.on("error", (err: unknown) => {
          console.error("Airwallex payment error:", err);
          setError("Payment failed. Please check your details and try again.");
        });
        
        // IMPORTANT: wait for DOM ref
        if (dropinRef.current) {
          element.mount(dropinRef.current);
        } else {
          throw new Error("Drop-in container not ready");
        }


      } catch (err) {
        console.error("Checkout init error:", err);
        setError("Failed to initialize checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [billing, plan, planId, planInfo.cycle, router, searchParams]);

  
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
                <p className="text-xs text-gray-500 mt-0.5">
                  {planInfo.cycle === "annual" ? "Annual" : "Monthly"} subscription · auto-renews
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">S${planInfo.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{planInfo.cycle === "annual" ? "/ year" : "/ month"}</p>
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
            {/* {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-sm text-gray-500">
                  Preparing secure checkout…
                </span>
              </div>
            )} */}

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

            {loading && !error && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-sm text-gray-500">
                  {!authChecked ? "Checking your account..." : "Preparing secure checkout..."}
                </span>
              </div>
            )}

            {/* Airwallex DropIn element mounts here */}
            {/* <div id="airwallex-dropin" className={loading ? "hidden" : ""} /> */}
            <div ref={dropinRef} className={loading ? "hidden" : "min-h-[400px]"} />
            
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
