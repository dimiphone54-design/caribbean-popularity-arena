"use client";

import { useCallback, useEffect, useState } from "react";
import { getDropshipFxRates, refreshDropshipFxRates } from "@/lib/dropship-fx";

type FxStatus = "SYNC" | "LIVE" | "CACHE" | "LOCAL";

const STATUS_COPY: Record<
  FxStatus,
  { label: string; tone: string; border: string; bg: string; note: string }
> = {
  SYNC: {
    label: "SYNC FX",
    tone: "text-[#8fa3bf]",
    border: "border-white/20",
    bg: "bg-white/5",
    note: "Fetching dropship exchange rates…"
  },
  LIVE: {
    label: "LIVE FX",
    tone: "text-[#00c9a7]",
    border: "border-[#00c9a7]/40",
    bg: "bg-[#00c9a7]/10",
    note: "Fresh rates from open.er-api.com · session cache updated."
  },
  CACHE: {
    label: "CACHE FX",
    tone: "text-[#f5c842]",
    border: "border-[#f5c842]/40",
    bg: "bg-[#f5c842]/10",
    note: "Using browser-cached rates (valid up to ~6 hours). Normal for previews."
  },
  LOCAL: {
    label: "LOCAL FX",
    tone: "text-[#ff7a59]",
    border: "border-[#ff7a59]/40",
    bg: "bg-[#ff7a59]/10",
    note: "API/cache unavailable · fallback local rates · display only."
  }
};

/** Owner-only FX source badge for dropship currency lanes. */
export function CommandCenterFxStatus() {
  const [fxStatus, setFxStatus] = useState<FxStatus>("SYNC");
  const [sample, setSample] = useState<{ cny?: number; gbp?: number }>({});
  const [busy, setBusy] = useState(false);

  const syncFx = useCallback(async () => {
    setBusy(true);
    try {
      const result = await refreshDropshipFxRates();
      if (result.source === "live") setFxStatus("LIVE");
      else if (result.source === "cache") setFxStatus("CACHE");
      else setFxStatus("LOCAL");

      const rates = result.rates ?? getDropshipFxRates();
      setSample({
        cny: rates?.CNY,
        gbp: rates?.GBP
      });
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void syncFx();
    const timer = window.setInterval(() => {
      void syncFx();
    }, 15 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [syncFx]);

  const meta = STATUS_COPY[fxStatus];

  return (
    <div className="space-y-3" aria-label="Dropship FX status">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${meta.border} ${meta.bg} ${meta.tone}`}
        >
          {meta.label}
        </span>
        <button
          type="button"
          onClick={() => void syncFx()}
          disabled={busy}
          className="rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9] transition hover:bg-[#00f5ff]/20 disabled:opacity-50"
        >
          {busy ? "Syncing…" : "Refresh FX"}
        </button>
      </div>

      <p className="text-[11px] leading-5 text-[#d8deef]">{meta.note}</p>

      <ul className="grid grid-cols-2 gap-1.5" role="list">
        <li className="rounded-md border border-white/10 bg-black/25 px-2 py-1.5">
          <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[#8fa3bf]">USD → CNY</p>
          <p className="mt-0.5 text-[12px] font-bold text-[#f7efe0]">
            {sample.cny != null ? sample.cny.toFixed(4) : "—"}
          </p>
        </li>
        <li className="rounded-md border border-white/10 bg-black/25 px-2 py-1.5">
          <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[#8fa3bf]">USD → GBP</p>
          <p className="mt-0.5 text-[12px] font-bold text-[#f7efe0]">
            {sample.gbp != null ? sample.gbp.toFixed(4) : "—"}
          </p>
        </li>
      </ul>

      <p className="text-[9px] leading-4 text-[#8fa3bf]">
        Operator only · powers China / Ecuador dropship display rates · not a public fan feature.
      </p>
    </div>
  );
}
