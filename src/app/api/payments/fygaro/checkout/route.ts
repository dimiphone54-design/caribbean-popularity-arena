import { NextResponse } from "next/server";
import { buildPaymentCheckout } from "@/lib/payments/checkout";

export async function POST(request: Request) {
  let product = "arena-gift";
  let amount = 6;
  let label = "Arena Gift";

  try {
    const body = (await request.json()) as {
      product?: string;
      amount?: number;
      label?: string;
    };

    if (body.product) product = body.product;
    if (typeof body.amount === "number" && body.amount > 0) amount = body.amount;
    if (body.label) label = body.label;
  } catch {
    /* defaults ok */
  }

  const checkout = buildPaymentCheckout({ product, amount, label });
  return NextResponse.json(checkout);
}
