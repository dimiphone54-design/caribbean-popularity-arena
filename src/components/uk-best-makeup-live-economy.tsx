"use client";

import { useMemo, useState } from "react";
import {
  MAKEUP_LIVE_GIFT_TIERS,
  MAKEUP_PREMIUM_BOOSTS,
  MAKEUP_VOTE_ACCESS_TIERS,
  formatMakeupGbp,
  sortMakeupQueueByVisibility,
  splitMakeupGiftGbp,
  ukBestMakeupLookEdition,
  type MakeupBoostId,
  type MakeupGiftLogItem,
  type MakeupVoteLogItem,
  type UkMakeupLiveQueueEntry
} from "@/lib/uk-best-makeup-look";
import { PLATFORM_COMMERCE_COPY } from "@/lib/platform-commerce";
import { startPlatformCheckout } from "@/lib/start-platform-checkout";

type UkBestMakeupLiveEconomyProps = {
  playLocked: boolean;
  queue: UkMakeupLiveQueueEntry[];
  onBoostQueue: (entryId: string, boostId: MakeupBoostId) => void;
  /** Current on-air host first name (Bella or next in auto queue) */
  liveHostName?: string;
};

function londonTimeLabel() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/London"
  });
}

/**
 * Command Center only · Platform Earnings (Fair UK Rates) · live
 * Unlock voting · send gifts (30/70 split) · buy premium boosts
 * Never mount on public UK room.
 */
export function UkBestMakeupLiveEconomy({
  playLocked,
  queue,
  onBoostQueue,
  liveHostName
}: UkBestMakeupLiveEconomyProps) {
  const e = ukBestMakeupLookEdition;
  const hostName = liveHostName ?? e.hostFirstName;
  const [voteUnlocked, setVoteUnlocked] = useState(false);
  const [voteWeight, setVoteWeight] = useState(1);
  const [voteSpendGbp, setVoteSpendGbp] = useState(0);
  const [votesForBella, setVotesForBella] = useState(0);
  const [voteLog, setVoteLog] = useState<MakeupVoteLogItem[]>([]);

  const [giftGrossGbp, setGiftGrossGbp] = useState(0);
  const [giftPlatformGbp, setGiftPlatformGbp] = useState(0);
  const [giftCreatorGbp, setGiftCreatorGbp] = useState(0);
  const [giftLog, setGiftLog] = useState<MakeupGiftLogItem[]>([]);
  const [lastGiftNote, setLastGiftNote] = useState<string | null>(null);

  const [boostNote, setBoostNote] = useState<string | null>(null);
  const [payBusy, setPayBusy] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const sortedQueue = useMemo(() => sortMakeupQueueByVisibility(queue), [queue]);

  async function unlockVote(tierId: string) {
    if (playLocked || payBusy) return;
    const tier = MAKEUP_VOTE_ACCESS_TIERS.find((t) => t.id === tierId);
    if (!tier) return;
    setPayBusy(true);
    setPayError(null);
    const result = await startPlatformCheckout({
      kind: "vote",
      amountUsd: tier.amountGbp,
      itemLabel: `${tier.label} · makeup live voting`,
      countryId: "uk",
      countryName: "United Kingdom",
      city: "London",
      flag: "🇬🇧",
      sku: tier.id
    });
    setPayBusy(false);
    if (!result.ok) {
      setPayError(result.error);
      return;
    }
    const weight = tier.amountGbp >= 5 ? 2 : 1;
    setVoteUnlocked(true);
    setVoteWeight(weight);
    setVoteSpendGbp((v) => v + tier.amountGbp);
    setVoteLog((prev) =>
      [
        {
          id: `v-${Date.now()}`,
          tierId: tier.id,
          amountGbp: tier.amountGbp,
          weight,
          tsLabel: londonTimeLabel()
        },
        ...prev
      ].slice(0, 8)
    );
  }

  function castVote() {
    if (playLocked || !voteUnlocked) return;
    setVotesForBella((v) => v + voteWeight);
  }

  async function sendGift(giftId: string) {
    if (playLocked || payBusy) return;
    const gift = MAKEUP_LIVE_GIFT_TIERS.find((g) => g.id === giftId);
    if (!gift) return;
    setPayBusy(true);
    setPayError(null);
    const result = await startPlatformCheckout({
      kind: "gift",
      amountUsd: gift.amountGbp,
      itemLabel: `${gift.label} gift · ${hostName}`,
      countryId: "uk",
      countryName: "United Kingdom",
      city: "London",
      flag: "🇬🇧",
      sku: gift.id
    });
    setPayBusy(false);
    if (!result.ok) {
      setPayError(result.error);
      return;
    }
    const split = splitMakeupGiftGbp(gift.amountGbp);
    setGiftGrossGbp((v) => v + split.grossGbp);
    setGiftPlatformGbp((v) => v + split.platformGbp);
    setGiftCreatorGbp((v) => v + split.creatorGbp);
    const payTag = result.mode === "vault" ? "Vault" : "PayPal";
    setLastGiftNote(
      `${payTag} · ${gift.emoji} ${gift.label} ${formatMakeupGbp(split.grossGbp)} · ${hostName} ${formatMakeupGbp(split.creatorGbp)} · platform ${formatMakeupGbp(split.platformGbp)}`
    );
    setGiftLog((prev) =>
      [
        {
          id: `g-${Date.now()}`,
          giftId: gift.id,
          emoji: gift.emoji,
          label: gift.label,
          amountGbp: split.grossGbp,
          platformGbp: split.platformGbp,
          creatorGbp: split.creatorGbp,
          tsLabel: londonTimeLabel()
        },
        ...prev
      ].slice(0, 10)
    );
  }

  async function payBoost(entryId: string, boostId: MakeupBoostId, entryName: string) {
    if (playLocked || payBusy) return;
    const boost = MAKEUP_PREMIUM_BOOSTS.find((b) => b.id === boostId);
    if (!boost) return;
    setPayBusy(true);
    setPayError(null);
    const result = await startPlatformCheckout({
      kind: "boost",
      amountUsd: boost.amountGbp,
      itemLabel: `${boost.label} · ${entryName}`,
      countryId: "uk",
      countryName: "United Kingdom",
      city: "London",
      flag: "🇬🇧",
      sku: boost.id
    });
    setPayBusy(false);
    if (!result.ok) {
      setPayError(result.error);
      return;
    }
    onBoostQueue(entryId, boost.id);
    const payTag = result.mode === "vault" ? "Vault" : "PayPal";
    setBoostNote(
      `${payTag} · ${boost.label} → ${entryName} · +${boost.visibilityPoints} vis · ${formatMakeupGbp(boost.amountGbp)}`
    );
  }

  return (
    <div
      className="rounded-xl border border-[#f5c842]/30 bg-[#120f06]/80 px-3 py-3 sm:px-3.5"
      aria-label="Platform earnings · live fair UK rates"
    >
      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f5c842]">
        COMMAND CENTER · {e.earningsHeading} · live
      </p>
      <p className="mt-1 text-[10px] leading-4 text-[#a89b78]">
        Owner ops · voting / gifts / boosts pile into the{" "}
        <strong className="text-[#fde68a]">platform vault</strong> (pending · no real charge). Same ledger as
        Japan · China · Ecuador dropship. Gift split 30/70 when money is collected later.
      </p>
      {payBusy ? (
        <p className="mt-2 text-[10px] font-semibold text-[#67e8f9]">Saving to platform vault…</p>
      ) : null}
      {payError ? (
        <p className="mt-2 text-[10px] font-semibold text-red-300" role="alert">
          {payError}
        </p>
      ) : null}

      {/* Session money board */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label={`Votes for ${hostName}`} value={String(votesForBella)} tone="text-[#fef9c3]" />
        <Stat label="Vote fees" value={formatMakeupGbp(voteSpendGbp)} tone="text-[#67e8f9]" />
        <Stat label={`${hostName} (70%)`} value={formatMakeupGbp(giftCreatorGbp)} tone="text-[#86efac]" />
        <Stat label="Platform (30%)" value={formatMakeupGbp(giftPlatformGbp)} tone="text-[#f5c842]" />
      </div>

      {/* 1 · Voting access */}
      <div className="mt-3 rounded-lg border border-[#67e8f9]/20 bg-black/30 p-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          1 · Voting access · £3 – £5
        </p>
        {!voteUnlocked ? (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {MAKEUP_VOTE_ACCESS_TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                disabled={playLocked || payBusy}
                onClick={() => void unlockVote(tier.id)}
                className="rounded-xl border border-[#67e8f9]/30 bg-[#041018]/70 px-3 py-2 text-left transition hover:border-[#67e8f9]/55 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <p className="text-[12px] font-black text-[#e0f2fe]">
                  {formatMakeupGbp(tier.amountGbp)} · {tier.label}
                </p>
                <p className="mt-0.5 text-[10px] text-[#94a3b8]">{tier.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-300">
              Voting unlocked · weight ×{voteWeight}
            </span>
            <button
              type="button"
              disabled={playLocked}
              onClick={castVote}
              className="rounded-full border border-[#ff2bd6]/40 bg-[#ff2bd6]/15 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#fce7f3] transition hover:bg-[#ff2bd6]/25 disabled:opacity-50"
            >
              Vote for {hostName} (+{voteWeight})
            </button>
          </div>
        )}
        {voteLog[0] ? (
          <p className="mt-2 text-[10px] text-[#8fa3bf]">
            Last unlock: {formatMakeupGbp(voteLog[0].amountGbp)} at {voteLog[0].tsLabel} (London)
          </p>
        ) : null}
      </div>

      {/* 2 · Gifts 30/70 */}
      <div className="mt-3 rounded-lg border border-[#ff2bd6]/22 bg-black/30 p-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#ff2bd6]">
          2 · Gifts & tips · platform 30% · {hostName} 70%
        </p>
        <div className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {MAKEUP_LIVE_GIFT_TIERS.map((gift) => {
            const split = splitMakeupGiftGbp(gift.amountGbp);
            return (
              <button
                key={gift.id}
                type="button"
                disabled={playLocked || payBusy}
                onClick={() => void sendGift(gift.id)}
                title={`PayPal · ${hostName} ${formatMakeupGbp(split.creatorGbp)} · platform ${formatMakeupGbp(split.platformGbp)}`}
                className="flex flex-col items-center gap-0.5 rounded-xl border border-[#ff2bd6]/20 bg-[#0a0010]/80 py-2 transition hover:border-[#ff2bd6]/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="text-lg" aria-hidden="true">
                  {gift.emoji}
                </span>
                <span className="text-[9px] font-black text-[#fef9c3]">{gift.label}</span>
                <span className="text-[9px] font-bold text-[#ff2bd6]">{formatMakeupGbp(gift.amountGbp)}</span>
                <span className="text-[8px] text-[#86efac]">→ {formatMakeupGbp(split.creatorGbp)}</span>
              </button>
            );
          })}
        </div>
        {lastGiftNote ? (
          <p className="mt-2 text-[10px] font-semibold text-[#d7c9a8]" role="status">
            {lastGiftNote}
          </p>
        ) : (
          <p className="mt-2 text-[10px] text-[#8fa3bf]">
            Tap a gift · split runs instantly · gross gifted {formatMakeupGbp(giftGrossGbp)}
          </p>
        )}
        {giftLog.length > 0 ? (
          <ul className="mt-2 max-h-20 space-y-0.5 overflow-y-auto" role="list">
            {giftLog.slice(0, 4).map((g) => (
              <li key={g.id} className="text-[9px] text-[#94a3b8]" role="listitem">
                {g.emoji} {g.label} {formatMakeupGbp(g.amountGbp)} · {hostName}{" "}
                {formatMakeupGbp(g.creatorGbp)} · platform {formatMakeupGbp(g.platformGbp)} · {g.tsLabel}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* 3 · Premium boosts */}
      <div className="mt-3 rounded-lg border border-[#b8ff3c]/22 bg-black/30 p-2.5">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#b8ff3c]">
          3 · Premium boosts · more visibility
        </p>
        {sortedQueue.length === 0 ? (
          <p className="mt-2 text-[10px] text-[#8fa3bf]">
            Apply to go live first — then buy a boost to rise in the auto queue.
          </p>
        ) : (
          <>
            <div className="mt-2 space-y-1.5">
              {sortedQueue.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/8 bg-[#04120a]/70 px-2.5 py-1.5"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#eef6ff]">
                      #{index + 1} {entry.fullName}
                      {entry.visibilityPoints > 0 ? (
                        <span className="ml-1.5 text-[9px] font-black text-[#b8ff3c]">
                          · {entry.visibilityPoints} vis
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[9px] text-[#8fa3c4]">
                      {entry.makeupStyle} · {entry.liveFrom}
                      {entry.boostsPurchased > 0
                        ? ` · ${entry.boostsPurchased} boost(s) · ${formatMakeupGbp(entry.boostSpendGbp)}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {MAKEUP_PREMIUM_BOOSTS.map((boost) => (
                      <button
                        key={boost.id}
                        type="button"
                        disabled={playLocked || payBusy}
                        onClick={() => void payBoost(entry.id, boost.id, entry.fullName)}
                        className="rounded-full border border-[#b8ff3c]/35 bg-[#b8ff3c]/10 px-2 py-1 text-[9px] font-black text-[#e8ffc8] transition hover:bg-[#b8ff3c]/20 disabled:opacity-50"
                        title={boost.description}
                      >
                        {boost.label} {formatMakeupGbp(boost.amountGbp)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {boostNote ? (
          <p className="mt-2 text-[10px] font-semibold text-[#d7f5b8]" role="status">
            {boostNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-black/35 px-2 py-1.5">
      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#8fa3bf]">{label}</p>
      <p className={`mt-0.5 text-[13px] font-black ${tone}`}>{value}</p>
    </div>
  );
}
