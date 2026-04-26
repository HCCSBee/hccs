import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function POST(req) {

    const body = (await req.json());

    // if (!body?.name || !body?.email || !body?.message) {
    //   return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    // }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Server is not configured for consultation submission." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
    });

    const {error } = await supabase
      .from("compliance_scan")
      .insert({
        company_name: body.company_name ?? null,
        contact_name: body.contact_name ?? null,
        business_email: body.business_email ?? null,
        contact_number: body.contact_number ?? null,
        industry: body.industry ?? null,
        employess: body.employess ?? null,
        has_foreign_workers: body.has_foreign_workers??  0,
        results: body.results,
      })


    if (error) {
        console.log(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  
}
