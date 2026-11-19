"use client";

import type { PlatformPayKind } from "@/lib/platform-payments";
import { REAL_MONEY_FREEZE_MESSAGE, isRealMoneyEnabled } from "@/lib/real-money";

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
      mode: "polar";
      checkoutId: string;
      checkoutUrl: string;
      amountUsd: string;
      countryId: string;
      vaultId: string;
      message: string;
    }
  | { ok: false; error: string };

export async function startPlatformCheckout(
  input: StartPlatformCheckoutInput
): Promise<StartPlatformCheckoutResult> {
  if (!isRealMoneyEnabled()) {
    return { ok: false, error: REAL_MONEY_FREEZE_MESSAGE };
  }

  let vaultData: {
    ok?: boolean;
    entry?: { id: string; amountUsd: number; countryId: string };
    message?: string;
    error?: string;
    summary?: { checkoutMode?: "vault" | "polar" | "off" };
  };

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
        note: input.description,
      }),
    });

    vaultData = (await vaultRes.json()) as typeof vaultData;
    if (!vaultRes.ok || !vaultData.ok || !vaultData.entry) {
      return {
        ok: false,
        error: vaultData.error ?? "Could not save the pending platform record.",
      };
    }
  } catch {
    return { ok: false, error: "Network error saving the platform record." };
  }

  const vaultId = vaultData.entry.id;
  const amountUsd = Number(vaultData.entry.amountUsd).toFixed(2);
  const countryId = vaultData.entry.countryId;
  const checkoutMode = vaultData.summary?.checkoutMode ?? "vault";

  if (checkoutMode !== "polar") {
    return {
      ok: true,
      mode: "vault",
      vaultId,
      amountUsd,
      countryId,
      message:
        vaultData.message ??
        "Saved as pending. No payment has been collected and no purchase benefits have been activated.",
    };
  }

  try {
    const checkoutRes = await fetch("/api/payments/polar/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: input.kind,
        sku: input.sku,
        memberId: input.memberId,
        buyerEmail: input.buyerEmail,
        itemLabel: input.itemLabel,
        countryId: input.countryId,
        countryName: input.countryName,
        vaultId,
      }),
    });

    const checkoutData = (await checkoutRes.json()) as {
      ok?: boolean;
      error?: string;
      checkoutId?: string;
      checkoutUrl?: string;
    };

    if (
      !checkoutRes.ok ||
      !checkoutData.ok ||
      !checkoutData.checkoutId ||
      !checkoutData.checkoutUrl
    ) {
      return {
        ok: true,
        mode: "vault",
        vaultId,
        amountUsd,
        countryId,
        message: `Saved as pending. Polar checkout was not started: ${checkoutData.error ?? "unknown error"}. No benefits activated.`,
      };
    }

    window.location.assign(checkoutData.checkoutUrl);
    return {
      ok: true,
      mode: "polar",
      checkoutId: checkoutData.checkoutId,
      checkoutUrl: checkoutData.checkoutUrl,
      amountUsd,
      countryId,
      vaultId,
      message: "Checkout opened. Benefits remain pending until Polar confirms payment.",
    };
  } catch {
    return {
      ok: true,
      mode: "vault",
      vaultId,
      amountUsd,
      countryId,
      message: "Saved as pending. Polar checkout could not be reached. No benefits activated.",
    };
  }
}
