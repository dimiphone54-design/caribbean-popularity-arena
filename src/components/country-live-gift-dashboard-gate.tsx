"use client";

import type { ReactNode } from "react";

type CountryLiveGiftDashboardGateProps = {
  countryId: string;
  countryName: string;
  flag: string;
  activityTag: string;
  enterTitle: string;
  roomScrollHint: string;
  priceLine: string;
  footnote: string;
  actions: ReactNode;
};

/**
 * Legacy gift-dashboard shell kept as a simple free-room header.
 * Payment / gift unlock UI removed.
 */
export function CountryLiveGiftDashboardGate({
  countryName,
  flag,
  enterTitle,
  roomScrollHint,
  actions
}: CountryLiveGiftDashboardGateProps) {
  return (
    <section className="c-live-gift-glass country-live-free-room-banner rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
        {flag} {countryName} · free community room
      </p>
      <h2 className="mt-2 text-lg font-black text-[#eef6ff] sm:text-xl">{enterTitle}</h2>
      <p className="mt-1 text-xs leading-5 text-[#9aa8c6]">{roomScrollHint}</p>
      <p className="mt-2 text-xs leading-5 text-[#b8c9e1]">
        Open access — no purchase required on this site.
      </p>
      {actions ? <div className="mt-4">{actions}</div> : null}
    </section>
  );
}
