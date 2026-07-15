"use client";

import { getLiveCountryRateConfig } from "@/lib/live-slot-market-rates";

type LiveSlotMarketRateCardProps = {
  countryId: string;
  title?: string;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" || currency === "COP" ? 0 : 2
  }).format(value);
}

export function LiveSlotMarketRateCard({ countryId, title = "Live slot rates · market reference" }: LiveSlotMarketRateCardProps) {
  const config = getLiveCountryRateConfig(countryId);
  if (!config) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d7b46a]">{title}</p>
      <p className="mt-2 text-xs leading-5 text-[#9aa8c6]">
        {config.countryName} · {config.slotLabel} · listed at 5% below public reference pricing.
        Customer payment goes to platform checkout, then the listed amount is split 50/50 between platform and creator payout.
      </p>
      <p className="mt-2 text-[11px] leading-5 text-[#8fa3c4]">{config.sourceSummary}</p>
      <ul className="mt-3 space-y-2" role="list">
        {config.tiers.map((tier) => (
          <li key={tier.id} className="rounded-xl border border-white/10 bg-[#09111f]/80 px-3 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-white">{tier.label}</p>
              <p className="text-xs font-bold text-[#d7b46a]">Listed {formatMoney(tier.customerPrice, tier.currency)}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#9aa8c6]">
              <span>Reference {formatMoney(tier.referencePrice, tier.currency)}</span>
              <span>•</span>
              <span>Platform 50% · {formatMoney(tier.platformAmount, tier.currency)}</span>
              <span>•</span>
              <span>Creator 50% · {formatMoney(tier.creatorAmount, tier.currency)}</span>
            </div>
            <p className="mt-2 text-[10px] leading-4 text-[#8fa3c4]">{tier.note}</p>
            <a href={tier.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">
              Source · {tier.sourceLabel}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
