import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

type BillingCycle = "monthly" | "annual";
type PlanConfig = {
  id: number;
  plan: string;
  name: string;
  amount: number;
  currency: string;
  description: string;
  cycle: BillingCycle;
  descriptor: string;
};

const PLAN_ROWS_BY_ID: Record<number, PlanConfig> = {
  1: {
    id: 1,
    plan: "essential",
    name: "HCCS Essential Plan",
    amount: 499,
    currency: "SGD",
    description: "HCCS AIHR Essential Plan - Monthly Subscription",
    cycle: "monthly",
    descriptor: "Essential Monthly",
  },
  2: {
    id: 2,
    plan: "essential",
    name: "HCCS Essential Plan",
    amount: 5988,
    currency: "SGD",
    description: "HCCS AIHR Essential Plan - Annual Subscription",
    cycle: "annual",
    descriptor: "Essential Annual",
  },
  3: {
    id: 3,
    plan: "professional",
    name: "HCCS Professional Plan",
    amount: 999,
    currency: "SGD",
    description: "HCCS AIHR Professional Plan - Monthly Subscription",
    cycle: "monthly",
    descriptor: "Professional Monthly",
  },
  4: {
    id: 4,
    plan: "professional",
    name: "HCCS Professional Plan",
    amount: 11988,
    currency: "SGD",
    description: "HCCS AIHR Professional Plan - Annual Subscription",
    cycle: "annual",
    descriptor: "Professional Annual",
  },
  5: {
    id: 5,
    plan: "strategic",
    name: "HCCS Strategic Plan",
    amount: 1499,
    currency: "SGD",
    description: "HCCS AIHR Strategic Plan - Monthly Subscription",
    cycle: "monthly",
    descriptor: "Strategic Monthly",
  },
  6: {
    id: 6,
    plan: "strategic",
    name: "HCCS Strategic Plan",
    amount: 17988,
    currency: "SGD",
    description: "HCCS AIHR Strategic Plan - Annual Subscription",
    cycle: "annual",
    descriptor: "Strategic Annual",
  },
  7: {
    id: 7,
    plan: "essential-bundle",
    name: "HCCS Essential Bundle",
    amount: 997,
    currency: "SGD",
    description: "HCCS AIHR Essential Bundle - 3-Month Intro Offer",
    cycle: "monthly",
    descriptor: "Essential Bundle",
  },
};

const DEFAULT_PLAN_ID_BY_KEY: Record<string, Record<BillingCycle, number>> = {
  essential: { monthly: 1, annual: 2 },
  professional: { monthly: 3, annual: 4 },
  strategic: { monthly: 5, annual: 6 },
  "essential-bundle": { monthly: 7, annual: 7 },
};

function toShopperCountryCode(input: unknown): string {
  const value = typeof input === "string" ? input.trim().toUpperCase() : "";
  return /^[A-Z]{2}$/.test(value) ? value : "SG";
}

async function getAirwallexToken(): Promise<string> {
  const env = process.env.AIRWALLEX_ENV ?? "sandbox";
  const baseUrl = env === "prod" ? "https://api.airwallex.com" : "https://api-demo.airwallex.com";
  const apiVersion = process.env.AIRWALLEX_API_VERSION ?? "2026-02-27";

  const res = await fetch(`${baseUrl}/api/v1/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": "C8r45B4aTxGXR3FB4vGZ1Q",
      "x-api-key": "e299002b88a3254b27c7cb651ededb144c6680ac449dabd03f08c710da1b5ad92f233a31aaee7e0ba8759c7b4844148a",
      "x-api-version": apiVersion,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airwallex auth failed: ${err}`);
  }

  const data = await res.json();
  return data.token as string;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const authToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!authToken) {
      return NextResponse.json({ error: "Please sign in to continue checkout." }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser(authToken);

    if (userError || !user) {
      return NextResponse.json({ error: "Please sign in to continue checkout." }, { status: 401 });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: appUser, error: appUserError } = await admin
      .from("user")
      .select("id")
      .eq("id", user.id)
      .single();

    if (appUserError || !appUser) {
      return NextResponse.json(
        { error: "Please register your account before checking out." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const plan = typeof body?.plan === "string" ? body.plan : "";
    const billingCycle: BillingCycle = body?.billing_cycle === "monthly" ? "monthly" : "annual";
    const requestedPlanId = Number(body?.planId ?? body?.plan_id ?? "");
    const countryCode = toShopperCountryCode(body?.country_code);

    const fallbackPlanId = DEFAULT_PLAN_ID_BY_KEY[plan]?.[billingCycle];
    const selectedPlanId =
      Number.isFinite(requestedPlanId) && PLAN_ROWS_BY_ID[requestedPlanId]
        ? requestedPlanId
        : fallbackPlanId;
    const planConfig = selectedPlanId ? PLAN_ROWS_BY_ID[selectedPlanId] : undefined;

    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const env = process.env.AIRWALLEX_ENV ?? "sandbox";
    const baseUrl = env === "prod" ? "https://api.airwallex.com" : "https://api-demo.airwallex.com";
    const apiVersion = process.env.AIRWALLEX_API_VERSION ?? "2026-02-27";

    const airwallexToken = await getAirwallexToken();

    const intentRes = await fetch(
      `${baseUrl}/api/v1/pa/payment_intents/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${airwallexToken}`,
          "x-api-version": apiVersion,
        },
        body: JSON.stringify({
          request_id: randomUUID(),
          merchant_order_id: randomUUID(),
          amount: planConfig.amount,
          currency: planConfig.currency,
          descriptor: planConfig.descriptor,
          payment_method_types: ["card", "paynow", "alipay"],
          order: {
            products: [
              {
                name: planConfig.name,
                quantity: 1,
                unit_price: planConfig.amount,
                desc: planConfig.description,
              },
            ],
          },
        }),
      }
    );

    if (!intentRes.ok) {
      const err = await intentRes.text();
      console.error("Airwallex intent error:", err);
      return NextResponse.json(
        { error: "Failed to create payment intent" },
        { status: 500 }
      );
    }

    const intent = await intentRes.json();

    return NextResponse.json({
      intent_id: intent.id as string,
      client_secret: intent.client_secret as string,
      plan_id: planConfig.id,
      amount: planConfig.amount,
      currency: planConfig.currency,
      plan_name: planConfig.name,
      billing_cycle: planConfig.cycle,
      country_code: countryCode,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
