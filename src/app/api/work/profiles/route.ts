import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function GET() {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json([]);
  const { data, error } = await client
    .from("work_profiles")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) return NextResponse.json([]);
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json({ ok: false, error: "storage not configured" }, { status: 500 });
  const body = await request.json();
  const displayName = (body.display_name ?? "").trim();
  if (!displayName) return NextResponse.json({ ok: false, error: "display_name is required" }, { status: 400 });
  if (body.contact_url && !String(body.contact_url).startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "contact_url must start with https://" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const { error } = await client.from("work_profiles").insert({
    id,
    display_name: displayName,
    skill: body.skill?.trim() || null,
    location: body.location?.trim() || null,
    description: body.description?.trim() || null,
    contact_url: body.contact_url?.trim() || null,
    availability: body.availability?.trim() || null,
    is_public: true,
  });
  if (error) {
    console.error("work_profiles insert error:", error);
    return NextResponse.json({ ok: false, error: "Failed to post profile" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}