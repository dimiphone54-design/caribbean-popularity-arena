"use client";

import type { PlatformPayKind } from "@/lib/platform-paypal";
import { REAL_MONEY_FREEZE_MESSAGE, isRealMoneyEnabled } from "@/lib/real-money";
import { startPlatformPaypalCheckout } from "@/lib/start-platform-paypal-checkout";

export type StartPlatformCheckoutInput = {
  kind: PlatformPayKind;
  amountUsd: string | number;
  itemLabel: string;
  countryId?: string;
  countryName?: string;
  city?: string;
  flag?: string;
  sku?: string;
  buyerEmail?: string;
  memberId?: string;
  description?: string;
  platformUsd?: number;
  counterpartUsd?: number;
  counterpartLabel?: "creator" | "supplier" | "none";
};

export type StartPlatformCheckoutResult =
  | {
      ok: true;
      mode: "vault";
      vaultId: string;
      amountUsd: string;
      message: string;
      countryId: string;
    }
  | {
      ok: true;
      mode: "paypal";
      orderId: string;
      approveUrl: string;
      amountUsd: string;
      merchant: string;
      countryId: string;
      vaultId?: string;
    }
  | { ok: false; error: string };

/**
 * Always records a platform vault entry (orders pile up).
 * If server checkout mode is paypal and credentials work, also opens PayPal.
 * Default server mode is vault until you set PLATFORM_CHECKOUT_MODE=paypal.
 * Hard freeze when NEXT_PUBLIC_REAL_MONEY_ENABLED is not "true".
 */
export async function startPlatformCheckout(
  input: StartPlatformCheckoutInput
): Promise<StartPlatformCheckoutResult> {
  if (!isRealMoneyEnabled()) {
    return { ok: false, error: REAL_MONEY_FREEZE_MESSAGE };
  }

  let vaultId: string | undefined;
  let checkoutMode: "vault" | "paypal" = "vault";

  try {
    const vaultRes = await fetch("/api/platform-vault", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: input.kind,
        amountUsd: input.amountUsd,
        itemLabel: input.itemLabel,
        countryId: input.countryId ?? "global",
        countryName: input.countryName ?? "Arena",
        city: input.city,
        flag: input.flag,
        sku: input.sku,
        buyerEmail: input.buyerEmail,
        platformUsd: input.platformUsd,
        counterpartUsd: input.counterpartUsd,
        counterpartLabel: input.counterpartLabel,
        note: input.description
      })
    });

    const vaultData = (await vaultRes.json()) as {
      ok?: boolean;
      entry?: { id: string; amountUsd: number; countryId: string };
      message?: string;
      error?: string;
      summary?: { checkoutMode?: "vault" | "paypal" };
    };

    if (!vaultRes.ok || !vaultData.ok || !vaultData.entry) {
      return { ok: false, error: vaultData.error ?? "Could not save to platform vault" };
    }

    vaultId = vaultData.entry.id;
    checkoutMode = vaultData.summary?.checkoutMode ?? "vault";

    if (checkoutMode === "vault") {
      return {
        ok: true,
        mode: "vault",
        vaultId,
        amountUsd: Number(vaultData.entry.amountUsd).toFixed(2),
        message:
          vaultData.message ??
          "Saved to platform vault · pending collection · no real charge yet.",
        countryId: vaultData.entry.countryId
      };
    }
  } catch {
    return { ok: false, error: "Network error saving platform vault" };
  }

  // Optional real charge path (only when PLATFORM_CHECKOUT_MODE=paypal)
  const paypal = await startPlatformPaypalCheckout({
    kind: input.kind,
    amountUsd: input.amountUsd,
    itemLabel: input.itemLabel,
    countryId: input.countryId,
    countryName: input.countryName,
    city: input.city,
    sku: input.sku,
    memberId: input.memberId,
    description: input.description
  });

  if (!paypal.ok) {
    // Vault already saved — business still piles up
    return {
      ok: true,
      mode: "vault",
      vaultId: vaultId ?? "unknown",
      amountUsd: Number(input.amountUsd).toFixed(2),
      message: `Vault saved · PayPal unavailable (${paypal.error}). No real charge yet.`,
      countryId: input.countryId ?? "global"
    };
  }

  return {
    ok: true,
    mode: "paypal",
    orderId: paypal.orderId,
    approveUrl: paypal.approveUrl,
    amountUsd: paypal.amountUsd,
    merchant: paypal.merchant,
    countryId: paypal.countryId,
    vaultId
  };
}
