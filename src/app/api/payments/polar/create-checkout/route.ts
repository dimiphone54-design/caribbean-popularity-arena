import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { createPolarCheckoutSession, isPolarConfigured } from "@/lib/polar";
import { isRealMoneyEnabled, REAL_MONEY_FREEZE_MESSAGE } from "@/lib/real-money";
import { getPlatformCheckoutMode } from "@/lib/platform-vault";

export const dynamic = "force-dynamic";

const ALLOWED_KINDS = new Set([
  "membership",
  "dropship",
  "gift",
  "vote",
  "boost",
  "general",
]);

type CheckoutBody = {
  kind?: string;
  sku?: string;
  plan?: string;
  memberId?: string;
  buyerEmail?: string;
  itemLabel?: string;
  countryId?: string;
  countryName?: string;
  vaultId?: string;
  refId?: string;
};

function getProductId(kind: string, sku: string, plan: string): string {
  const suffix = (value: string) =>
    value.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "");

  const keys = [
    `POLAR_PRODUCT_ID_${suffix(kind)}_${suffix(sku)}`,
    `POLAR_PRODUCT_ID_${suffix(kind)}_${suffix(plan)}`,
    `POLAR_PRODUCT_ID_${suffix(kind)}`,
  ];

  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }

  return "";
}

export async function POST(request: Request) {
  if (!isRealMoneyEnabled()) {
    return NextResponse.json(
      { ok: false, error: REAL_MONEY_FREEZE_MESSAGE, frozen: true },
      { status: 503 }
    );
  }

  if (getPlatformCheckoutMode() !== "polar") {
    return NextResponse.json(
      { ok: false, error: "Polar checkout is not the active platform payment mode." },
      { status: 503 }
    );
  }

  if (!isPolarConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Polar checkout is not configured." },
      { status: 503 }
    );
  }

  let body: CheckoutBody;

  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const kind = body.kind?.trim().toLowerCase() ?? "";
  const sku = body.sku?.trim() ?? "";
  const plan = body.plan?.trim() ?? "";
  const memberId = body.memberId?.trim() ?? "";
  const buyerEmail = body.buyerEmail?.trim().toLowerCase() ?? "";

  if (!ALLOWED_KINDS.has(kind)) {
    return NextResponse.json(
      { ok: false, error: "Invalid purchase type." },
      { status: 400 }
    );
  }

  if (!sku && !plan) {
    return NextResponse.json(
      { ok: false, error: "A product SKU or plan is required." },
      { status: 400 }
    );
  }

  const productId = getProductId(kind, sku, plan);

  if (!productId) {
    return NextResponse.json(
      {
        ok: false,
        error: `No Polar product is configured for ${kind}${sku ? ` / ${sku}` : ""}.`,
      },
      { status: 503 }
    );
  }

  const origin = new URL(request.url).origin;
  const configuredOrigin =
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || origin;

  try {
    const checkout = await createPolarCheckoutSession({
      productId,
      externalOrderId: body.refId?.trim() || randomUUID(),
      successUrl: `${configuredOrigin}/dashboard?polar_checkout_id={CHECKOUT_ID}`,
      customerEmail: buyerEmail || undefined,
      externalCustomerId: memberId || undefined,
      metadata: {
        platform: "caribbean-freedom-arena",
        kind,
        sku,
        plan,
        member_id: memberId,
        country_id: body.countryId?.trim() ?? "",
        country_name: body.countryName?.trim() ?? "",
        item_label: body.itemLabel?.trim() ?? "",
        vault_id: body.vaultId?.trim() ?? "",
        reference_id: body.refId?.trim() ?? "",
      },
    });

    return NextResponse.json({
      ok: true,
      provider: "polar",
      checkoutId: checkout.id,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    console.error(
      "[Polar checkout] Could not create checkout:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { ok: false, error: "Polar could not create the checkout session." },
      { status: 502 }
    );
  }
}
