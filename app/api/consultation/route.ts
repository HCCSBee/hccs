import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ConsultationPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  service?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConsultationPayload;

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Server is not configured for consultation submission." }, { status: 500 });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await admin.from("consultation").insert({
      company_name: body.company || null,
      industry: body.industry || null,
      size: null,
      service_of_interest: body.service || null,
      description: body.message || null,
      full_name: body.name || null,
      email: body.email || null,
      contact: body.phone || null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
