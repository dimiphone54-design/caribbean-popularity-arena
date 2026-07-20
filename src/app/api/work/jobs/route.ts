import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function GET(request: Request) {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json([]);
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  let query = client
    .from("work_jobs")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(50);
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) return NextResponse.json([]);
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json({ ok: false, error: "storage not configured" }, { status: 500 });
  const body = await request.json();
  const jobTitle = (body.job_title ?? "").trim();
  if (!jobTitle) return NextResponse.json({ ok: false, error: "job_title is required" }, { status: 400 });
  if (body.contact_url && !String(body.contact_url).startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "contact_url must start with https://" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const { error } = await client.from("work_jobs").insert({
    id,
    job_title: jobTitle,
    company: body.company?.trim() || null,
    work_mode: body.work_mode?.trim() || null,
    description: body.description?.trim() || null,
    contact_url: body.contact_url?.trim() || null,
    country: body.country?.trim() || null,
    category: body.category?.trim() || null,
    is_public: true,
  });
  if (error) {
    console.error("work_jobs insert error:", error);
    return NextResponse.json({ ok: false, error: "Failed to post job" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}