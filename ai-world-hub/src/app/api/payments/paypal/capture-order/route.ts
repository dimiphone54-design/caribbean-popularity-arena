import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { orderId?: string };

    if (!body.orderId) {
      return NextResponse.json({ ok: false, error: "Missing orderId" }, { status: 400 });
    }

    const result = await capturePayPalOrder(body.orderId);

    return NextResponse.json({
      ok: true,
      orderId: result.id,
      payerId: result.payerId,
      amount: result.amount,
      status: result.status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown PayPal capture error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
