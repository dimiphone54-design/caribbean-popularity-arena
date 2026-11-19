"use client";

import { REAL_MONEY_FREEZE_MESSAGE } from "@/lib/real-money";

export function CommandCenterPolarPayments() {
  return (
    <section className="space-y-2 rounded-xl border border-white/10 bg-black/30 p-3 text-left"
      aria-label="Polar payment configuration">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#9fb4d4]">
        COMMAND CENTER · PLATFORM CHECKOUT
      </p>
      <p className="text-sm font-bold text-[#f7efe0]">Polar is the exclusive platform checkout provider.</p>
      <p className="text-xs leading-5 text-[#9fb4d4]">
        Polar checkout is not yet enabled. No customer charges can be started while the real-money freeze is active.
      </p>
      <p className="text-xs leading-5 text-amber-200">{REAL_MONEY_FREEZE_MESSAGE}</p>
    </section>
  );
}
