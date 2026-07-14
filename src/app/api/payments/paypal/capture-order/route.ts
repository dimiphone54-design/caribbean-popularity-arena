import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { markArenaMemberPaid } from "@/lib/arena-member-registry";

type CaptureOrderBody = {
  orderId?: string;
};

export async function POST(request: Request) {
  let body: CaptureOrderBody = {};
  try {
    body = (await request.json()) as CaptureOrderBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!body.orderId) {
    return NextResponse.json({ ok: false, error: "orderId required" }, { status: 400 });
  }

  try {
    const result = await capturePayPalOrder(body.orderId);

    if (result.status !== "COMPLETED") {
      return NextResponse.json({
        ok: false,
        error: `Order not completed: ${result.status}`,
      }, { status: 400 });
    }

    const customId = result.payerId;

    return NextResponse.json({
      ok: true,
      orderId: result.id,
      status: result.status,
      payerId: result.payerId,
      amount: result.amount,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PayPal capture error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
