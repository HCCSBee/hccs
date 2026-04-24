import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const PLANS: Record<
  string,
  { name: string; amount: number; currency: string; description: string }
> = {
  essential: {
    name: "HCCS Essential Plan",
    amount: 5988,
    currency: "SGD",
    description: "HCCS AIHR Essential Plan – Annual Subscription",
  },
};

function toAirwallexDescriptor(): string {
  return "Essential";
}

async function getAirwallexToken(): Promise<string> {
  const env = process.env.AIRWALLEX_ENV ?? "sandbox";
  const baseUrl = env === "prod" ? "https://api.airwallex.com" : "https://api-demo.airwallex.com";
  const apiVersion = process.env.AIRWALLEX_API_VERSION ?? "2026-02-27";

  const res = await fetch(`${baseUrl}/api/v1/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": process.env.AIRWALLEX_CLIENT_ID ?? "",
      "x-api-key": process.env.AIRWALLEX_API_KEY ?? "",
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
    const body = await req.json();
    const plan = typeof body?.plan === "string" ? body.plan : "";
    const planConfig = PLANS[plan];

    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const env = process.env.AIRWALLEX_ENV ?? "sandbox";
    const baseUrl = env === "prod" ? "https://api.airwallex.com" : "https://api-demo.airwallex.com";
    const apiVersion = process.env.AIRWALLEX_API_VERSION ?? "2026-02-27";

    const token = await getAirwallexToken();

    const intentRes = await fetch(
      `${baseUrl}/api/v1/pa/payment_intents/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-version": apiVersion,
        },
        body: JSON.stringify({
          request_id: randomUUID(),
          merchant_order_id: randomUUID(),
          amount: planConfig.amount,
          currency: planConfig.currency,
          descriptor: toAirwallexDescriptor(),
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
      amount: planConfig.amount,
      currency: planConfig.currency,
      plan_name: planConfig.name,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
