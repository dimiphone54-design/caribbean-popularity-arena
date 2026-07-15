import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { plan?: string; amountUsd?: string };
    const amountUsd = body.amountUsd ?? "0";
    const plan = body.plan ?? "AI WORLD HUB checkout";

    const order = await createPayPalOrder({
      amountUsd,
      description: plan,
      customId: plan,
    });

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown PayPal create order error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
