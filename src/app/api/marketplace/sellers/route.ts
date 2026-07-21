import { NextResponse } from "next/server";
import { listPublicSellers, createSeller } from "@/lib/marketplace/store";

export async function GET() {
  try {
    const sellers = await listPublicSellers();
    return NextResponse.json(sellers);
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load sellers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: {
    display_name?: string;
    country?: string;
    payment_url?: string;
    product_title?: string;
    product_description?: string;
    price_label?: string;
  } = {};

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const displayName = body.display_name?.trim() ?? "";
  if (!displayName) {
    return NextResponse.json({ ok: false, error: "display_name is required" }, { status: 400 });
  }

  if (body.payment_url && !body.payment_url.startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "payment_url must start with https://" }, { status: 400 });
  }

  try {
    await createSeller({
      display_name: displayName,
      country: body.country?.trim() || undefined,
      payment_url: body.payment_url?.trim() || undefined,
      product_title: body.product_title?.trim() || undefined,
      product_description: body.product_description?.trim() || undefined,
      price_label: body.price_label?.trim() || undefined,
    });
    return NextResponse.json({ ok: true, status: "live" });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create seller" }, { status: 500 });
  }
}