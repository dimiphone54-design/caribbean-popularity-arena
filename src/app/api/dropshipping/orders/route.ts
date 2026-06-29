import { NextResponse } from "next/server";
import type { DropshipBuyer } from "@/lib/dropshipping";
import { getDropshipProduct } from "@/lib/dropshipping";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { buildPaymentCheckout } from "@/lib/payments/checkout";
import {
  listDropshipOrdersForEmail,
  loadDropshipOrders,
  upsertDropshipOrderRecord
} from "@/lib/dropshipping-order-store";

function validateBuyer(buyer: Partial<DropshipBuyer>) {
  if (!buyer.fullName?.trim() || buyer.fullName.trim().length < 2) return "Full name required";
  if (!buyer.email?.includes("@")) return "Valid email required";
  if (!buyer.phone?.trim()) return "Phone required";
  if (!buyer.addressLine1?.trim()) return "Address required";
  if (!buyer.city?.trim()) return "City required";
  if (!buyer.postalCode?.trim()) return "Postal code required";
  if (!buyer.countryCode?.trim()) return "Country code required";
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";
  const countryId = searchParams.get("countryId")?.trim() ?? undefined;

  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });
  }

  const orders = await loadDropshipOrders();
  const matches = listDropshipOrdersForEmail(orders, email, countryId);
  return NextResponse.json({ ok: true, orders: matches });
}

export async function POST(request: Request) {
  let productId = "";
  let buyer: Partial<DropshipBuyer> = {};

  try {
    const body = (await request.json()) as { productId?: string; buyer?: Partial<DropshipBuyer> };
    productId = body.productId?.trim() ?? "";
    buyer = body.buyer ?? {};
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const product = getDropshipProduct(productId);
  if (!product) {
    return NextResponse.json({ ok: false, error: "Product not found" }, { status: 404 });
  }

  const buyerError = validateBuyer(buyer);
  if (buyerError) {
    return NextResponse.json({ ok: false, error: buyerError }, { status: 400 });
  }

  const countryName =
    internationalSuiteCountries.find((entry) => entry.id === product.countryId)?.name ?? product.countryId;

  const customReference = `dropship-order__${product.id}__${Date.now()}`;
  const checkout = buildPaymentCheckout({
    product: "dropship-order",
    amount: product.price,
    currency: product.currency,
    label: `${product.flag} ${product.category}`,
    customReference,
    metadata: {
      productId: product.id,
      countryId: product.countryId,
      buyerEmail: buyer.email?.trim().toLowerCase()
    }
  });

  const order = {
    id: checkout.orderId,
    productId: product.id,
    productName: product.name,
    countryId: product.countryId,
    countryName,
    flag: product.flag,
    amount: product.price,
    currency: product.currency,
    status: checkout.mode === "demo" ? ("ordered" as const) : ("pending_payment" as const),
    orderedAt: new Date().toISOString(),
    trackingNote:
      checkout.mode === "demo"
        ? "Demo order · supplier lane notified"
        : "Awaiting payment confirmation",
    customReference: checkout.customReference,
    buyerEmail: buyer.email?.trim().toLowerCase()
  };

  await upsertDropshipOrderRecord(order);

  return NextResponse.json({
    ...checkout,
    order,
    message:
      checkout.mode === "demo"
        ? `Demo order placed · ${product.category} · supplier ships direct`
        : checkout.message
  });
}
