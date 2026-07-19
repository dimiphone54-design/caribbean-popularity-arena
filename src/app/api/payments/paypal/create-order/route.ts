import { NextResponse } from "next/server";
import { createPayPalOrder, isPayPalConfigured } from "@/lib/paypal";
import {
  PLATFORM_PAYPAL_MERCHANT,
  buildPlatformPayCustomId,
  formatPlatformPayDescription,
  type PlatformPayKind
} from "@/lib/platform-paypal";
import { REAL_MONEY_FREEZE_MESSAGE, isRealMoneyEnabled } from "@/lib/real-money";

type CreateOrderBody = {
  /** membership plan key or free-form */
  plan?: string;
  amountUsd?: string;
  memberId?: string;
  /** gift | vote | boost | dropship | membership | general */
  kind?: PlatformPayKind;
  countryId?: string;
  countryName?: string;
  city?: string;
  itemLabel?: string;
  sku?: string;
  description?: string;
};

const PLAN_PRICES: Record<string, string> = {
  "arena-plus": "9.99",
  "fan-pass": "5.99",
  "creator-circle": "14.99",
  "mens-entry": "6.00"
};

const PLAN_DESCRIPTIONS: Record<string, string> = {
  "arena-plus": "Arena Plus — Premium arena membership",
  "fan-pass": "Fan Pass — Monthly arena supporter",
  "creator-circle": "Creator Circle — Creator membership",
  "mens-entry": "Men's Entry — Arena access pass"
};

export async function POST(request: Request) {
  if (!isRealMoneyEnabled()) {
    return NextResponse.json(
      { ok: false, error: REAL_MONEY_FREEZE_MESSAGE, frozen: true },
      { status: 503 }
    );
  }

  if (!isPayPalConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "PayPal not configured. Add PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET to .env.local"
      },
      { status: 503 }
    );
  }

  let body: CreateOrderBody = {};
  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const kind: PlatformPayKind = body.kind ?? (body.plan ? "membership" : "general");
  const plan = body.plan ?? "mens-entry";
  const amountUsd = body.amountUsd ?? PLAN_PRICES[plan] ?? "6.00";
  const itemLabel = body.itemLabel ?? PLAN_DESCRIPTIONS[plan] ?? plan;

  const description =
    body.description ??
    formatPlatformPayDescription({
      kind,
      countryId: body.countryId,
      countryName: body.countryName,
      city: body.city,
      itemLabel
    });

  const customId = buildPlatformPayCustomId({
    kind,
    countryId: body.countryId,
    sku: body.sku ?? plan,
    ref: body.memberId
  });

  try {
    const order = await createPayPalOrder({
      amountUsd,
      description,
      customId
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      approveUrl: order.approveUrl,
      merchant: PLATFORM_PAYPAL_MERCHANT.brandName,
      currency: PLATFORM_PAYPAL_MERCHANT.currency,
      kind,
      countryId: body.countryId ?? "global",
      amountUsd: Number(amountUsd).toFixed(2)
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PayPal error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
