import { NextResponse } from "next/server";
import { getDropshipOrderByToken } from "@/lib/dropship-order-registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("orderToken")?.trim() ?? "";

  if (!UUID_V4.test(token)) {
    return NextResponse.json(
      { ok: false, error: "A valid order access token is required." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const order = await getDropshipOrderByToken(token);

    if (!order) {
      return NextResponse.json(
        { ok: false, error: "Order not found." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Explicit public allowlist: never return the token, buyer email,
    // revenue splits, vault IDs, or Polar references.
    const publicOrder = {
      id: order.id,
      productName: order.productName,
      productCategory: order.productCategory,
      amount: order.amount,
      currency: order.currency,
      countryName: order.countryName,
      flag: order.flag,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };

    return NextResponse.json(
      { ok: true, order: publicOrder },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not retrieve order." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
