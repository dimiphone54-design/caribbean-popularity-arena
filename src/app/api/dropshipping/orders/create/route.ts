import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";
import { createDropshipOrder, canAcceptDropshipPayments, updateDropshipOrderByToken } from "@/lib/dropship-order-registry";
import { getDropshipProductsForCountry, getDropshipOptionProductsForCountry } from "@/lib/dropshipping";

type CreateBody = {
  email?: string;
  countryId?: string;
  countryName?: string;
  flag?: string;
  productId?: string;
};

function getProduct(countryId: string, productId: string) {
  const all = [...getDropshipOptionProductsForCountry(countryId), ...getDropshipProductsForCountry(countryId)];
  return all.find((product) => product.id === productId) ?? null;
}

export async function POST(request: Request) {
  let body: CreateBody = {};
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const countryId = body.countryId?.trim().toLowerCase() ?? "";
  const countryName = body.countryName?.trim() ?? "";
  const flag = body.flag?.trim() ?? "";
  const productId = body.productId?.trim() ?? "";

  if (!email || !countryId || !countryName || !flag || !productId) {
    return NextResponse.json({ ok: false, error: "Missing order fields" }, { status: 400 });
  }

  const product = getProduct(countryId, productId);
  if (!product) {
    return NextResponse.json({ ok: false, error: "Product not found" }, { status: 404 });
  }

  const localOrder = createDropshipOrder({
    buyerEmail: email,
    countryId,
    countryName,
    flag,
    product
  });

  if (!canAcceptDropshipPayments()) {
    return NextResponse.json({
      ok: true,
      mode: "manual",
      order: localOrder,
      message: "Saved order lead. Add PayPal credentials to enable live checkout."
    });
  }

  try {
    const paypal = await createPayPalOrder({
      amountUsd: localOrder.amount,
      description: `${product.name} · ${countryName} dropship order · platform merchant checkout`,
      customId: `dropship:${localOrder.id}:${email}`
    });

    const updated = updateDropshipOrderByToken(localOrder.orderToken, {
      paypalOrderId: paypal.id
    });

    return NextResponse.json({
      ok: true,
      mode: "paypal",
      order: updated ?? localOrder,
      approveUrl: paypal.approveUrl,
      paypalOrderId: paypal.id
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout unavailable";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
