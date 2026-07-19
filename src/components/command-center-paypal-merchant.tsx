"use client";

import { useEffect, useState } from "react";
import { PLATFORM_COMMERCE_COPY } from "@/lib/platform-commerce";
import { PLATFORM_PAY_LANES, PLATFORM_PAYPAL_MERCHANT } from "@/lib/platform-paypal";
import { REAL_MONEY_FREEZE_MESSAGE, isRealMoneyEnabled } from "@/lib/real-money";
import { startPlatformPaypalCheckout } from "@/lib/start-platform-paypal-checkout";

type PayStatus = {
  configured?: boolean;
  mode?: string;
  merchant?: string;
  clientIdPrefix?: string;
  secretStored?: boolean;
  frozen?: boolean;
  realMoneyEnabled?: boolean;
  dropshipPurchaseEnabled?: boolean;
  checkoutMode?: string;
  message?: string | null;
};

/**
 * Command Center (owner only) · private PayPal merchant status
 * Keys stay in .env.local — never shown in full. Public site charges stay frozen
 * until NEXT_PUBLIC_REAL_MONEY_ENABLED=true.
 */
export function CommandCenterPaypalMerchant() {
  const [status, setStatus] = useState<PayStatus | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const realMoneyOn = isRealMoneyEnabled();

  useEffect(() => {
    void fetch("/api/payments/paypal/status")
      .then((r) => r.json())
      .then((data) => setStatus(data as PayStatus))
      .catch(() => setStatus({ configured: false, frozen: true }));
  }, []);

  const frozen = status?.frozen ?? !realMoneyOn;

  async function testPay(
    laneId: string,
    amountUsd: string,
    label: string,
    kind: "dropship" | "gift" | "vote" | "boost" | "membership"
  ) {
    if (frozen) {
      setNote(REAL_MONEY_FREEZE_MESSAGE);
      return;
    }
    const lane = PLATFORM_PAY_LANES.find((l) => l.id === laneId);
    if (!lane) return;
    setBusy(`${laneId}-${label}`);
    setNote(null);
    const result = await startPlatformPaypalCheckout({
      kind,
      amountUsd,
      itemLabel: label,
      countryId: lane.id,
      countryName: lane.countryName,
      city: lane.city,
      sku: `cc-test-${laneId}`
    });
    setBusy(null);
    if (!result.ok) {
      setNote(result.error);
      return;
    }
    setNote(`PayPal opened · ${lane.flag} ${lane.city} · $${result.amountUsd} · ${result.merchant}`);
  }

  return (
    <div className="space-y-3 text-left" aria-label="Platform PayPal merchant · private">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0070ba]">
          COMMAND CENTER · PayPal merchant (private)
        </p>
        <p className="mt-1 text-[11px] text-[#8fa3bf]">{PLATFORM_COMMERCE_COPY.platformMerchantLabel}</p>
        <p className="mt-1 text-[10px] leading-4 text-[#9fb4d4]">{PLATFORM_COMMERCE_COPY.countryExamples}</p>
        <p className="mt-1 text-[10px] leading-4 text-[#c4b5fd]">
          Keys live only in private <code className="text-[#e9d5ff]">.env.local</code> (not in git). Public
          rooms cannot charge while freeze is on — this panel keeps the setup visible for you.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-[10px]">
        <span
          className={`rounded-full border px-2.5 py-1 font-black uppercase tracking-[0.08em] ${
            frozen
              ? "border-amber-400/50 bg-amber-500/15 text-amber-200"
              : "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
          }`}
        >
          {frozen ? "Public money FROZEN" : "Public money ON"}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 font-black uppercase tracking-[0.08em] ${
            status?.configured
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
              : "border-red-400/40 bg-red-500/10 text-red-300"
          }`}
        >
          {status?.configured ? "Keys stored" : "Keys missing"}
        </span>
        <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-bold text-[#c5d4ec]">
          PayPal API: {status?.mode ?? "…"}
        </span>
        <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-bold text-[#c5d4ec]">
          Checkout: {status?.checkoutMode ?? (frozen ? "off" : "…")}
        </span>
        <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-bold text-[#c5d4ec]">
          {PLATFORM_PAYPAL_MERCHANT.currency}
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-[10px] leading-4 text-[#c5d4ec]">
        <p>
          <span className="font-black text-[#f7efe0]">Client ID (masked):</span>{" "}
          {status?.clientIdPrefix || "—"}
        </p>
        <p className="mt-1">
          <span className="font-black text-[#f7efe0]">Secret:</span>{" "}
          {status?.secretStored ? "stored privately in .env.local" : "not set"}
        </p>
        <p className="mt-1">
          <span className="font-black text-[#f7efe0]">Merchant:</span>{" "}
          {status?.merchant ?? PLATFORM_PAYPAL_MERCHANT.brandName}
        </p>
        {frozen ? (
          <p className="mt-2 text-amber-100/90">{status?.message ?? REAL_MONEY_FREEZE_MESSAGE}</p>
        ) : null}
        <p className="mt-2 text-[#8fa3bf]">
          To re-enable public charges later: set{" "}
          <code className="text-[#e2e8f0]">NEXT_PUBLIC_REAL_MONEY_ENABLED=true</code>,{" "}
          <code className="text-[#e2e8f0]">PLATFORM_CHECKOUT_MODE=paypal</code>, restart server. Dropship also
          needs <code className="text-[#e2e8f0]">NEXT_PUBLIC_ENABLE_DROPSHIP_PURCHASES=true</code>.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#0070ba]/25 bg-[#041018]/80">
        <table className="w-full min-w-[32rem] border-collapse text-left text-[10px]">
          <thead>
            <tr className="border-b border-white/10 text-[#8fa3bf]">
              <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">Lane</th>
              <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">Example</th>
              <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">USD</th>
              <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">Owner test</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORM_PAY_LANES.flatMap((lane) =>
              lane.examples.map((ex) => (
                <tr key={`${lane.id}-${ex.label}`} className="border-b border-white/5 last:border-0">
                  <td className="px-2.5 py-1.5 font-semibold text-[#f7efe0]">
                    {lane.flag} {lane.city}
                  </td>
                  <td className="px-2.5 py-1.5 text-[#d8deef]">
                    {ex.kind} · {ex.label}
                  </td>
                  <td className="px-2.5 py-1.5 text-[#67e8f9]">${ex.amountUsd}</td>
                  <td className="px-2.5 py-1.5">
                    <button
                      type="button"
                      disabled={Boolean(busy) || frozen}
                      onClick={() => void testPay(lane.id, ex.amountUsd, ex.label, ex.kind)}
                      title={frozen ? REAL_MONEY_FREEZE_MESSAGE : "Owner test charge"}
                      className="rounded-full border border-[#0070ba]/40 bg-[#0070ba]/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-[#bfe3ff] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {frozen ? "Frozen" : busy === `${lane.id}-${ex.label}` ? "…" : "Test pay"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {note ? <p className="text-[10px] font-semibold text-[#86efac]">{note}</p> : null}
      <p className="text-[10px] leading-4 text-[#8fa3bf]">{PLATFORM_COMMERCE_COPY.payoutNotice}</p>
    </div>
  );
}
