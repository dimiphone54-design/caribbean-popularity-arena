"use client";

import { useState } from "react";
import { LiveSlotMarketRateCard } from "@/components/live-slot-market-rate-card";
import { UkBestMakeupLiveEconomy } from "@/components/uk-best-makeup-live-economy";
import {
  MAKEUP_GIFT_TIERS,
  MAKEUP_TOURNAMENT_SEED,
  PLATFORM_MAKEUP_CUT_PERCENT,
  CREATOR_MAKEUP_PAYOUT_PERCENT
} from "@/lib/uk-makeup-live-slot";
import {
  PLATFORM_GIFT_CUT_PERCENT as UK_TEACHER_PLATFORM_CUT,
  TEACHER_GIFT_PAYOUT_PERCENT as UK_TEACHER_PAYOUT,
  UK_TEACHER_GIFT_TIERS
} from "@/lib/uk-study-hub-teacher-slot";
import {
  PLATFORM_GIFT_CUT_PERCENT as JP_TEACHER_PLATFORM_CUT,
  TEACHER_GIFT_PAYOUT_PERCENT as JP_TEACHER_PAYOUT,
  JAPAN_TEACHER_GIFT_TIERS
} from "@/lib/japan-study-hub-teacher-slot";
import { liveCountryRateConfigs } from "@/lib/live-slot-market-rates";
import {
  getBoostById,
  sortMakeupQueueByVisibility,
  type MakeupBoostId,
  type UkMakeupLiveQueueEntry
} from "@/lib/uk-best-makeup-look";
import {
  ukGamesCcParticipantOps,
  ukGamesCcPlatformStreams,
  ukGamesParticipantHosts
} from "@/lib/uk-games-monetization";

/** Demo queue so owner can exercise boosts without the public room */
function CommandCenterUkMakeupLiveEarnings() {
  const [queue, setQueue] = useState<UkMakeupLiveQueueEntry[]>([
    {
      id: "cc-demo-1",
      fullName: "Demo Creator A",
      makeupStyle: "Soft glam",
      liveFrom: "Hyde Park",
      joinedAtLabel: "12:00",
      visibilityPoints: 0,
      boostsPurchased: 0,
      boostSpendGbp: 0
    },
    {
      id: "cc-demo-2",
      fullName: "Demo Creator B",
      makeupStyle: "Bold editorial",
      liveFrom: "London beauty store",
      joinedAtLabel: "12:05",
      visibilityPoints: 0,
      boostsPurchased: 0,
      boostSpendGbp: 0
    }
  ]);

  function onBoostQueue(entryId: string, boostId: MakeupBoostId) {
    const boost = getBoostById(boostId);
    if (!boost) return;
    setQueue((prev) =>
      sortMakeupQueueByVisibility(
        prev.map((entry) =>
          entry.id === entryId
            ? {
                ...entry,
                visibilityPoints: entry.visibilityPoints + boost.visibilityPoints,
                boostsPurchased: entry.boostsPurchased + 1,
                boostSpendGbp: entry.boostSpendGbp + boost.amountGbp
              }
            : entry
        )
      )
    );
  }

  return (
    <section
      className="rounded-xl border border-[#f5c842]/35 bg-[#120f06]/90 p-3"
      aria-label="UK Best Makeup Look · platform earnings live ops"
    >
      <p className="mb-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
        UK Best Makeup Look · Platform Earnings (Fair UK Rates) · live
      </p>
      <p className="mb-3 text-[10px] leading-4 text-[#a89b78]">
        Not just copy — unlock voting, send gifts (30/70 split), buy premium boosts. Owner console only ·
        never on public Cotswolds room.
      </p>
      <UkBestMakeupLiveEconomy
        playLocked={false}
        queue={queue}
        onBoostQueue={onBoostQueue}
        liveHostName="Bella"
      />
    </section>
  );
}

/**
 * Owner-only · gift tiers · past champion earnings · market rate splits
 * Never render this on public country rooms.
 */
export function CommandCenterGiftOps() {
  const gamesOps = ukGamesCcParticipantOps;

  return (
    <div className="space-y-5 text-left" aria-label="Command Center gift and live earnings ops">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff2bd6]">
          COMMAND CENTER · Gift &amp; live earnings
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#8fa3bf]">
          Internal only · hide platform cuts, past £ boards, and market rate cards from fans
        </p>
      </div>

      <CommandCenterUkMakeupLiveEarnings />

      <section className="rounded-xl border border-[#b8ff3c]/30 bg-[#04120a]/85 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#b8ff3c]">
          UK Games · participant + platform money model (owner only)
        </p>
        <p className="mt-1 text-[10px] text-[#94a3b8]">
          Best Makeup Look + Croquet · Boules · Rounders · Frisbee · Sack Race · free participant entry
        </p>
        <p className="mt-2 text-[10px] font-semibold text-[#d8deef]">
          Hosts: {ukGamesParticipantHosts.map((h) => `${h.name} (${h.lane})`).join(" · ")}
        </p>

        <div className="mt-3 rounded-lg border border-white/10 bg-black/35 px-2.5 py-2">
          <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#f5c842]">
            1 · Participants earn (ops cuts)
          </p>
          <ul className="mt-1.5 space-y-1 text-[11px] leading-5 text-[#d8deef]" role="list">
            <li role="listitem">
              <strong className="text-[#f7efe0]">Entry</strong> — {gamesOps.entry}
            </li>
            <li role="listitem">
              <strong className="text-[#f7efe0]">Tips / gifts</strong> — platform{" "}
              {gamesOps.tipCutMinPercent}–{gamesOps.tipCutMaxPercent}% · {gamesOps.tipCreatorKeepNote}
            </li>
            <li role="listitem">
              <strong className="text-[#f7efe0]">Voting pool</strong> — viewers $
              {gamesOps.voteFeeMinUsd}–${gamesOps.voteFeeMaxUsd} / {gamesOps.voteWindowHours}h voting
              access · share pool with winners / top hosts
            </li>
            <li role="listitem">
              <strong className="text-[#f7efe0]">Brand deals</strong> — platform commission{" "}
              {gamesOps.brandCommissionMinPercent}–{gamesOps.brandCommissionMaxPercent}% when
              facilitated
            </li>
            <li role="listitem">
              <strong className="text-[#f7efe0]">Match portal</strong> — {gamesOps.matchNote}
            </li>
            <li role="listitem">
              <strong className="text-[#f7efe0]">Content</strong> — {gamesOps.contentNote}
            </li>
          </ul>
        </div>

        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-black/35">
          <p className="border-b border-white/10 px-2.5 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
            2 · Platform revenue (participants free)
          </p>
          <table className="w-full min-w-[28rem] border-collapse text-left text-[10px]">
            <thead>
              <tr className="border-b border-white/10 text-[#8fa3bf]">
                <th className="px-2.5 py-1.5 font-black uppercase tracking-[0.08em]">Revenue stream</th>
                <th className="px-2.5 py-1.5 font-black uppercase tracking-[0.08em]">How it works</th>
                <th className="px-2.5 py-1.5 font-black uppercase tracking-[0.08em]">Potential</th>
              </tr>
            </thead>
            <tbody>
              {ukGamesCcPlatformStreams.map((row) => (
                <tr key={row.id} className="border-b border-white/5 last:border-0">
                  <td className="px-2.5 py-1.5 font-semibold text-[#f7efe0]">{row.stream}</td>
                  <td className="px-2.5 py-1.5 text-[#d8deef]">{row.howItWorks}</td>
                  <td className="px-2.5 py-1.5 text-[#b8ff3c]">{row.potential}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10px] text-[#8fa3bf]">
          Public UK room shows free entry + earn story only — never tip cut %, vote fee $, or VIP
          price tables.
        </p>
      </section>

      <section className="rounded-xl border border-[#ff2bd6]/25 bg-[#120018]/70 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#ff2bd6]">
          UK Makeup · gift tiers (public can show emoji + price on live buttons)
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5" role="list">
          {MAKEUP_GIFT_TIERS.map((tier) => (
            <li
              key={tier.id}
              className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] text-[#eef6ff]"
              role="listitem"
            >
              {tier.emoji} {tier.label} · £{tier.amountGbp}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] text-[#94a3b8]">
          Platform cut {PLATFORM_MAKEUP_CUT_PERCENT}% · creator payout {CREATOR_MAKEUP_PAYOUT_PERCENT}% (Bella · Hyde Park fair UK rates)
        </p>
      </section>

      <section className="rounded-xl border border-[#fbbf24]/25 bg-[#120f06]/75 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#fbbf24]">
          UK Makeup · tournament seed · exact past earnings
        </p>
        <ul className="mt-2 space-y-1.5" role="list">
          {MAKEUP_TOURNAMENT_SEED.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 py-1.5 text-[11px] last:border-0"
              role="listitem"
            >
              <span className="font-semibold text-[#f7efe0]">
                #{entry.rank} {entry.fullName}
                {entry.isChampion ? " · CHAMP" : ""}
              </span>
              <span className="text-[#fbbf24]">
                £{entry.totalGiftsGbp} · {entry.sessionDate}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] text-[#8fa3bf]">
          Public board shows names + rank only — not past £ totals.
        </p>
      </section>

      <section className="rounded-xl border border-[#86efac]/25 bg-[#04120a]/80 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#86efac]">
          UK Study Hub · teacher gift tiers + payout split
        </p>
        <p className="mt-1 text-[10px] text-[#94a3b8]">
          Platform cut {UK_TEACHER_PLATFORM_CUT}% · teacher payout {UK_TEACHER_PAYOUT}%
        </p>
        <ul className="mt-2 space-y-1" role="list">
          {UK_TEACHER_GIFT_TIERS.map((tier) => (
            <li key={tier.id} className="text-[11px] text-[#d8deef]" role="listitem">
              {tier.emoji} {tier.label} · £{tier.amountGbp} · teacher £{tier.teacherReceivesGbp} · platform £
              {tier.platformCutGbp}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#ff4466]/25 bg-[#1a0810]/75 px-3 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#ff4466]">
          Japan Study Hub · teacher gift tiers + payout split
        </p>
        <p className="mt-1 text-[10px] text-[#fca5a5]">
          Platform cut {JP_TEACHER_PLATFORM_CUT}% · teacher payout {JP_TEACHER_PAYOUT}%
        </p>
        <ul className="mt-2 space-y-1" role="list">
          {JAPAN_TEACHER_GIFT_TIERS.map((tier) => (
            <li key={tier.id} className="text-[11px] text-[#d8deef]" role="listitem">
              {tier.emoji} {tier.label} · ¥{tier.amountYen.toLocaleString("en-US")} · teacher ¥
              {tier.teacherReceivesYen.toLocaleString("en-US")} · platform ¥
              {tier.platformCutYen.toLocaleString("en-US")}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#d7b46a]">
          Live slot market rates · all tracked countries (reference + 50/50 ops split)
        </p>
        <p className="text-[10px] text-[#8fa3bf]">
          Countries: {liveCountryRateConfigs.map((c) => c.countryName).join(" · ")}. Public rooms never show this
          card.
        </p>
        <div className="grid gap-3 lg:grid-cols-2">
          {liveCountryRateConfigs.map((config) => (
            <LiveSlotMarketRateCard
              key={config.countryId}
              countryId={config.countryId}
              title={`${config.countryName} · live slot rates (internal)`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
