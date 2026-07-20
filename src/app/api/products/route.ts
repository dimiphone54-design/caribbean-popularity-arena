import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function GET() {
  const client = getSupabaseClient();
  if (!client) return NextResponse.json([]);
  const { data, error } = await client
    .from("ai_products")
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
  const productName = (body.product_name ?? "").trim();
  if (!productName) return NextResponse.json({ ok: false, error: "product_name is required" }, { status: 400 });
  if (body.buy_url && !String(body.buy_url).startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "buy_url must start with https://" }, { status: 400 });
  }
  if (body.image_url && !String(body.image_url).startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "image_url must start with https://" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const { error } = await client.from("ai_products").insert({
    id,
    product_name: productName,
    maker: body.maker?.trim() || null,
    price: body.price?.trim() || null,
    country: body.country?.trim() || null,
    description: body.description?.trim() || null,
    image_url: body.image_url?.trim() || null,
    buy_url: body.buy_url?.trim() || null,
    is_public: true,
  });
  if (error) {
    console.error("ai_products insert error:", error);
    return NextResponse.json({ ok: false, error: "Failed to post product" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}