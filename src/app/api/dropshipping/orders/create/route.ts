import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";
import {
  createDropshipOrder,
  updateDropshipOrderByToken
} from "@/lib/dropship-order-registry";
import { getDropshipProductsForCountry, getDropshipOptionProductsForCountry } from "@/lib/dropshipping";
import { createVaultEntry, getPlatformCheckoutMode, getVaultSummary } from "@/lib/platform-vault";
import {
  DROPSHIP_PURCHASE_FREEZE_MESSAGE,
  isDropshipPurchaseEnabled
} from "@/lib/real-money";

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

  // Always pile into platform vault (orders + owed amounts)
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
    note: `Dropship vault · ${countryName} · pending collection`
  });

  const mode = getPlatformCheckoutMode();
  const summary = await getVaultSummary();

  if (mode === "vault") {
    return NextResponse.json({
      ok: true,
      mode: "vault",
      order: localOrder,
      vaultId: vaultEntry.id,
      summary,
      message: `Saved to platform vault · ${flag} ${countryName} · $${localOrder.amount} pending · no real charge yet. Pay when PayPal is live.`
    });
  }

  try {
    const paypal = await createPayPalOrder({
      amountUsd: localOrder.amount,
      description: `Caribbean Freedom Arena · ${countryName} dropship · ${product.name} · platform merchant`,
      customId: `cfa:dropship:${countryId}:${localOrder.id}`.slice(0, 127)
    });

    const updated = updateDropshipOrderByToken(localOrder.orderToken, {
      paypalOrderId: paypal.id
    });

    return NextResponse.json({
      ok: true,
      mode: "paypal",
      order: updated ?? localOrder,
      vaultId: vaultEntry.id,
      approveUrl: paypal.approveUrl,
      paypalOrderId: paypal.id,
      summary
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout unavailable";
    // Vault already has the order — business keeps piling up
    return NextResponse.json({
      ok: true,
      mode: "vault",
      order: localOrder,
      vaultId: vaultEntry.id,
      summary,
      message: `Vault saved · PayPal error (${message}). No real charge yet.`
    });
  }
}
