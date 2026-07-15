import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { markDropshipOrderPaid } from "@/lib/dropship-order-registry";

type CaptureBody = {
  paypalOrderId?: string;
};

export async function POST(request: Request) {
  let body: CaptureBody = {};
  try {
    body = (await request.json()) as CaptureBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!body.paypalOrderId) {
    return NextResponse.json({ ok: false, error: "paypalOrderId required" }, { status: 400 });
  }

  try {
    const result = await capturePayPalOrder(body.paypalOrderId);
    if (result.status !== "COMPLETED") {
      return NextResponse.json({ ok: false, error: `Order not completed: ${result.status}` }, { status: 400 });
    }

    const order = markDropshipOrderPaid(body.paypalOrderId, result.id);
    return NextResponse.json({ ok: true, order, capture: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PayPal capture error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
