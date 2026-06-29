import { NextResponse } from "next/server";
import { findDropshipOrderByReference, updateDropshipOrderStatus } from "@/lib/dropshipping-order-store";

export async function POST(request: Request) {
  let customReference = "";
  let paymentReference = "";

  try {
    const body = (await request.json()) as { customReference?: string; paymentReference?: string };
    customReference = body.customReference?.trim() ?? "";
    paymentReference = body.paymentReference?.trim() ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!customReference) {
    return NextResponse.json({ ok: false, error: "Order reference required" }, { status: 400 });
  }

  const existing = await findDropshipOrderByReference(customReference);
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
  }

  const order = await updateDropshipOrderStatus(
    customReference,
    "ordered",
    paymentReference
      ? `Payment confirmed · ref ${paymentReference} · supplier packing`
      : "Payment confirmed · supplier notified"
  );

  return NextResponse.json({ ok: true, order });
}
