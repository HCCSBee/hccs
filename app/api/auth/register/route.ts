import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type RegisterPayload = { email?: string; password?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterPayload;

    if (!body?.email || !body?.password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Create the auth user with email auto-confirmed (no confirmation email)
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // Insert into public.user with default user_tier_id = 1
    const { error: profileError } = await admin.from("user").insert({
      id: userId,
      user_tier_id: 1,
    });

    if (profileError) {
      // Auth user was created but profile insert failed — attempt cleanup
      await admin.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: "Account created but profile setup failed. Please try again." },
        { status: 500 }
      );
    }

    // Sign in immediately and return session tokens
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!anonKey) {
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const client = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (signInError || !signInData.session) {
      // Registered OK but auto-login failed — let client handle sign-in
      return NextResponse.json({ ok: true, session: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        ok: true,
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
