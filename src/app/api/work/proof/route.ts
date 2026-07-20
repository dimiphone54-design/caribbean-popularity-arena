import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function GET() {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json([]);
  const { data, error } = await client
    .from("work_proof")
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
  if (body.proof_url && !String(body.proof_url).startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "proof_url must start with https://" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const { error } = await client.from("work_proof").insert({
    id,
    display_name: displayName,
    job_title: body.job_title?.trim() || null,
    outcome: body.outcome?.trim() || null,
    location: body.location?.trim() || null,
    proof_url: body.proof_url?.trim() || null,
    is_public: true,
  });
  if (error) {
    console.error("work_proof insert error:", error);
    return NextResponse.json({ ok: false, error: "Failed to post proof" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}