import { NextResponse } from "next/server";
import { listDropshipOrdersByEmail } from "@/lib/dropship-order-registry";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim() ?? "";
  const countryId = searchParams.get("countryId")?.trim() ?? "";

  if (!email) {
    return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });
  }

  const orders = listDropshipOrdersByEmail(email, countryId || undefined);
  return NextResponse.json({ ok: true, orders });
}
