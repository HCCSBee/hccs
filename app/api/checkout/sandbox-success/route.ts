import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  } = await authClient.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      { error: "Please register your account before checkout." },
      { status: 403 }
    );
  }

  const { error: updateError } = await admin
    .from("user")
    .update({ user_tier_id: 2 })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to upgrade membership tier." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, user_tier_id: 2 }, { status: 200 });
}
