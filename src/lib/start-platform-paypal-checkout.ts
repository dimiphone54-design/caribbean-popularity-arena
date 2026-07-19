"use client";

import type { PlatformPayKind } from "@/lib/platform-paypal";
import { REAL_MONEY_FREEZE_MESSAGE, isRealMoneyEnabled } from "@/lib/real-money";

export type StartPlatformPaypalCheckoutInput = {
  kind: PlatformPayKind;
  amountUsd: string | number;
  itemLabel: string;
  countryId?: string;
  countryName?: string;
  city?: string;
  sku?: string;
  memberId?: string;
  description?: string;
  /** open approve URL in new tab (default true) */
  openApprove?: boolean;
};

export type StartPlatformPaypalCheckoutResult =
  | {
      ok: true;
      orderId: string;
      approveUrl: string;
      amountUsd: string;
      merchant: string;
      countryId: string;
      kind: string;
    }
  | { ok: false; error: string };

/**
 * Client helper · every country room uses this → one platform PayPal merchant
 */
export async function startPlatformPaypalCheckout(
  input: StartPlatformPaypalCheckoutInput
): Promise<StartPlatformPaypalCheckoutResult> {
  if (!isRealMoneyEnabled()) {
    return { ok: false, error: REAL_MONEY_FREEZE_MESSAGE };
  }

  try {
    const res = await fetch("/api/payments/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: input.kind,
        amountUsd: String(input.amountUsd),
        itemLabel: input.itemLabel,
        countryId: input.countryId,
        countryName: input.countryName,
        city: input.city,
        sku: input.sku,
        memberId: input.memberId,
        description: input.description
      })
    });

    const data = (await res.json()) as {
      ok?: boolean;
      error?: string;
      orderId?: string;
      approveUrl?: string;
      amountUsd?: string;
      merchant?: string;
      countryId?: string;
      kind?: string;
    };

    if (!res.ok || !data.ok || !data.orderId) {
      return { ok: false, error: data.error ?? "Could not start PayPal checkout" };
    }

    if (input.openApprove !== false && data.approveUrl) {
      window.open(data.approveUrl, "_blank", "noopener,noreferrer");
    }

    return {
      ok: true,
      orderId: data.orderId,
      approveUrl: data.approveUrl ?? "",
      amountUsd: data.amountUsd ?? String(input.amountUsd),
      merchant: data.merchant ?? "Caribbean Freedom Arena",
      countryId: data.countryId ?? input.countryId ?? "global",
      kind: data.kind ?? input.kind
    };
  } catch {
    return { ok: false, error: "Network error starting PayPal checkout" };
  }
}
