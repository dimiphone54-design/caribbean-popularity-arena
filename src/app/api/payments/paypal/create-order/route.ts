import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

type CreateOrderBody = {
  plan?: string;
  amountUsd?: string;
  memberId?: string;
};

const PLAN_PRICES: Record<string, string> = {
  "arena-plus": "9.99",
  "fan-pass": "5.99",
  "creator-circle": "14.99",
  "mens-entry": "6.00",
};

const PLAN_DESCRIPTIONS: Record<string, string> = {
  "arena-plus": "Arena Plus — Premium arena membership",
  "fan-pass": "Fan Pass — Monthly arena supporter",
  "creator-circle": "Creator Circle — Creator membership",
  "mens-entry": "Men's Entry — Arena access pass",
};

export async function POST(request: Request) {
  let body: CreateOrderBody = {};
  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const plan = body.plan ?? "mens-entry";
  const amountUsd = body.amountUsd ?? PLAN_PRICES[plan] ?? "6.00";
  const description = PLAN_DESCRIPTIONS[plan] ?? `Caribbean Freedom Arena — ${plan}`;

  try {
    const order = await createPayPalOrder({
      amountUsd,
      description,
      customId: body.memberId ? `${plan}:${body.memberId}` : plan,
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      approveUrl: order.approveUrl,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PayPal error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
