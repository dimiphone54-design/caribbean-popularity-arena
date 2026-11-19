import { NextResponse } from "next/server";

import { createPolarCheckoutSession, isPolarConfigured } from "@/lib/polar";
import {
  createDropshipOrder,
  setDropshipCheckoutReferences,
} from "@/lib/dropship-order-registry";
import {
  getDropshipProductsForCountry,
  getDropshipOptionProductsForCountry,
} from "@/lib/dropshipping";
import {
  createVaultEntry,
  getPlatformCheckoutMode,
  getVaultSummary,
} from "@/lib/platform-vault";
import {
  DROPSHIP_PURCHASE_FREEZE_MESSAGE,
  isDropshipPurchaseEnabled,
} from "@/lib/real-money";

export const dynamic = "force-dynamic";

type CreateBody = {
  email?: string;
  countryId?: string;
  countryName?: string;
  flag?: string;
  productId?: string;
};

function getProduct(countryId: string, productId: string) {
  const all = [
    ...getDropshipOptionProductsForCountry(countryId),
    ...getDropshipProductsForCountry(countryId),
  ];

  return all.find((product) => product.id === productId) ?? null;
}

function toCustomerOrder(order: Awaited<ReturnType<typeof createDropshipOrder>>) {
  return {
    id: order.id,
    orderToken: order.orderToken,
    productName: order.productName,
    productCategory: order.productCategory,
    amount: order.amount,
    currency: order.currency,
    countryName: order.countryName,
    flag: order.flag,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt
  };
}

export async function POST(request: Request) {
  if (!isDropshipPurchaseEnabled()) {
    return NextResponse.json(
      { ok: false, error: DROPSHIP_PURCHASE_FREEZE_MESSAGE, frozen: true },
      { status: 503 }
    );
  }

  let body: CreateBody = {};

  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const countryId = body.countryId?.trim().toLowerCase() ?? "";
  const countryName = body.countryName?.trim() ?? "";
  const flag = body.flag?.trim() ?? "";
  const productId = body.productId?.trim() ?? "";

  if (!email || !countryId || !countryName || !flag || !productId) {
    return NextResponse.json(
      { ok: false, error: "Missing order fields." },
      { status: 400 }
    );
  }

  const product = getProduct(countryId, productId);

  if (!product) {
    return NextResponse.json(
      { ok: false, error: "Product not found." },
      { status: 404 }
    );
  }

  const localOrder = await createDropshipOrder({
    buyerEmail: email,
    countryId,
    countryName,
    flag,
    product,
  });

  const vaultEntry = await createVaultEntry({
    kind: "dropship",
    countryId,
    countryName,
    flag,
    itemLabel: product.name,
    sku: product.id,
    amountUsd: localOrder.amount,
    platformUsd: Number(localOrder.platformAmount),
    counterpartUsd: Number(localOrder.supplierAmount),
    counterpartLabel: "supplier",
    buyerEmail: email,
    refId: localOrder.id,
    note: `Dropship vault · ${countryName} · pending collection`,
  });

  const mode = getPlatformCheckoutMode();
  const summary = await getVaultSummary();

  if (mode !== "polar") {
    return NextResponse.json({
      ok: true,
      mode: "vault",
      order: toCustomerOrder(localOrder),
      vaultId: vaultEntry.id,
      summary,
      message: `Saved as pending · ${flag} ${countryName} · no payment collected.`,
    });
  }

  if (!isPolarConfigured()) {
    return NextResponse.json({
      ok: true,
      mode: "vault",
      order: toCustomerOrder(localOrder),
      vaultId: vaultEntry.id,
      summary,
      message: "Order saved as pending. Polar is not configured; no payment collected.",
    });
  }

  const skuKey = product.id
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

  const polarProductId =
    process.env[`POLAR_PRODUCT_ID_DROPSHIP_${skuKey}`]?.trim() ||
    process.env.POLAR_PRODUCT_ID_DROPSHIP?.trim();

  if (!polarProductId) {
    return NextResponse.json({
      ok: true,
      mode: "vault",
      order: toCustomerOrder(localOrder),
      vaultId: vaultEntry.id,
      summary,
      message: `Order saved as pending. No Polar product is configured for ${product.id}; no payment collected.`,
    });
  }

  try {
    const origin = new URL(request.url).origin;
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || origin;

    if (getPlatformCheckoutMode() !== "polar") {
      return NextResponse.json({
        ok: true,
        mode: "vault",
        order: toCustomerOrder(localOrder),
        vaultId: vaultEntry.id,
        summary,
        message: "Order saved as pending. Polar is not the active payment mode; no payment collected.",
      });
    }

    await setDropshipCheckoutReferences(localOrder.id, {
      vaultId: vaultEntry.id,
      polarProductId,
    });

    const checkout = await createPolarCheckoutSession({
      productId: polarProductId,
      externalOrderId: localOrder.id,
      successUrl: `${siteUrl}/dashboard?polar_checkout_id={CHECKOUT_ID}`,
      customerEmail: email,
      metadata: {
        platform: "caribbean-freedom-arena",
        kind: "dropship",
        sku: product.id,
        local_order_id: localOrder.id,
        vault_id: vaultEntry.id,
        country_id: countryId,
        country_name: countryName,
      },
    });

    return NextResponse.json({
      ok: true,
      mode: "polar",
      provider: "polar",
      order: toCustomerOrder(localOrder),
      vaultId: vaultEntry.id,
      checkoutId: checkout.id,
      checkoutUrl: checkout.url,
      summary,
    });
  } catch (error) {
    console.error(
      "[Polar dropship checkout]",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json({
      ok: true,
      mode: "vault",
      order: toCustomerOrder(localOrder),
      vaultId: vaultEntry.id,
      summary,
      message: "Order saved as pending. Polar checkout could not be started; no payment collected.",
    });
  }
}
