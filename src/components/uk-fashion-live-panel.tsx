"use client";

import { useState } from "react";
import { fashionMonthLooks, type FashionMonthLook } from "@/lib/fashion-month";

/* ─── Config ──────────────────────────────────────────── */

const UK_LOOKS = fashionMonthLooks.filter(
  (l) => l.flag === "🇬🇧" || l.city === "London"
);

/** Gift tiers fans send to vote on a look */
const VOTE_GIFT_TIERS = [
  { id: "heart",   emoji: "❤️",  label: "Heart",   amountGbp: 1,  effect: "Vote registered · name flashes" },
  { id: "fire",    emoji: "🔥",  label: "Fire",    amountGbp: 2,  effect: "Fire effect · crowd cheer" },
  { id: "crown",   emoji: "👑",  label: "Crown",   amountGbp: 5,  effect: "Crown drop · look highlighted" },
  { id: "diamond", emoji: "💎",  label: "Diamond", amountGbp: 10, effect: "Diamond storm · top of leaderboard" },
  { id: "rocket",  emoji: "🚀",  label: "Rocket",  amountGbp: 20, effect: "Rocket launch · arena spotlight" },
];

/** Per-look shop items — fallback used when no specific items defined */
const LOOK_SHOP_ITEMS: Record<number, { label: string; price: string; hint: string }[]> = {
  3: [
    { label: "Ivory blazer · tailored fit", price: "£49", hint: "Ships from London supplier" },
    { label: "White tee · crew neck",       price: "£12", hint: "Cotswolds mall lane" },
    { label: "Black slim trousers",         price: "£35", hint: "Street tailoring lane" },
  ],
};

const DEFAULT_SHOP_ITEMS = [
  { label: "Statement piece · UK edit", price: "£19", hint: "Ships this week" },
  { label: "Arena fit essential",       price: "£29", hint: "Cotswolds style lane" },
];

/* ─── Vote gift toast ─────────────────────────────────── */

function VoteGiftToast({
  emoji,
  label,
  lookName,
  onDone,
}: {
  emoji: string;
  label: string;
  lookName: string;
  onDone: () => void;
}) {
  return (
    <div
      className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-sm rounded-2xl border border-[#ff2bd6]/50 bg-[#0a0010]/95 p-4 text-center shadow-[0_0_40px_rgba(255,43,214,0.25)] backdrop-blur-md"
      role="alert"
    >
      <p className="text-3xl">{emoji}</p>
      <p className="mt-2 text-sm font-black text-[#fef9c3]">
        You gifted {label} to{" "}
        <span className="text-[#ff2bd6]">{lookName}</span>!
      </p>
      <p className="mt-1 text-xs text-[#c4d4ef]">Vote counted · thank you 💖</p>
      <button
        type="button"
        onClick={onDone}
        className="mt-3 rounded-lg border border-[#ff2bd6]/30 px-4 py-1.5 text-xs font-bold text-[#fef9c3] transition hover:border-[#ff2bd6]/60"
      >
        Close
      </button>
    </div>
  );
}

/* ─── Look card ───────────────────────────────────────── */

function LookCard({
  look,
  rank,
}: {
  look: FashionMonthLook & { votes: number };
  rank: number;
}) {
  const [showGifts, setShowGifts] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [toast, setToast] = useState<{ emoji: string; label: string } | null>(
    null
  );
  const shopItems = LOOK_SHOP_ITEMS[look.id] ?? DEFAULT_SHOP_ITEMS;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#ff2bd6]/25 bg-gradient-to-br from-[#0a0010]/90 to-[#1a0020]/80 p-4 shadow-[0_0_18px_rgba(255,43,214,0.06)] transition hover:border-[#ff2bd6]/50 hover:shadow-[0_0_28px_rgba(255,43,214,0.14)]">

      {/* Rank badge */}
      <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#ff2bd6]/40 bg-[#1a0020] text-[10px] font-black text-[#ff2bd6]">
        #{rank}
      </div>

      {/* Look info */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ff2bd6]/30 bg-[#1a0020] text-xl">
          {look.flag}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-[#fef9c3]">
            {look.name}
          </p>
          <p className="truncate text-[10px] font-bold text-[#ff2bd6]">
            {look.style} · {look.accent}
          </p>
          <p className="truncate text-[9px] text-[#64748b]">{look.city}</p>
        </div>
      </div>

      {/* Vote bar */}
      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
            Votes
          </span>
          <span className="text-[10px] font-black text-[#ff2bd6]">
            {look.votes.toLocaleString()}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a0020]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff2bd6] to-[#a855f7] transition-all duration-500"
            style={{ width: `${Math.min(100, (look.votes / 500) * 100)}%` }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setShowGifts((v) => !v)}
          className="flex-1 rounded-xl border border-[#ff2bd6]/30 bg-[#1a0020]/60 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#ff2bd6] transition hover:border-[#ff2bd6]/60"
        >
          {showGifts ? "Hide ↑" : "🎁 Vote & gift"}
        </button>
        <button
          type="button"
          onClick={() => setShowShop((v) => !v)}
          className="flex-1 rounded-xl border border-[#fbbf24]/25 bg-[#1a1000]/60 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#fbbf24] transition hover:border-[#fbbf24]/50"
        >
          {showShop ? "Hide ↑" : "🛍️ Shop fit"}
        </button>
      </div>

      {/* Gift tiers */}
      {showGifts && (
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {VOTE_GIFT_TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              title={tier.effect}
              onClick={() => setToast({ emoji: tier.emoji, label: tier.label })}
              className="flex flex-col items-center gap-0.5 rounded-xl border border-[#ff2bd6]/20 bg-[#0a0010]/70 py-2 transition hover:border-[#ff2bd6]/50 active:scale-95"
            >
              <span className="text-base">{tier.emoji}</span>
              <span className="text-[9px] font-black text-[#fef9c3]">
                {tier.label}
              </span>
              <span className="text-[9px] font-bold text-[#ff2bd6]">
                £{tier.amountGbp}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Shop the fit */}
      {showShop && (
        <div className="mt-2 space-y-1.5">
          {shopItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-[#fbbf24]/20 bg-[#1a1000]/60 px-3 py-2"
            >
              <div>
                <p className="text-[10px] font-bold text-[#fef9c3]">
                  {item.label}
                </p>
                <p className="text-[9px] text-[#64748b]">{item.hint}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px] font-black text-[#fbbf24]">
                  {item.price}
                </p>
                <button
                  type="button"
                  className="mt-0.5 rounded-lg border border-[#fbbf24]/30 px-2 py-0.5 text-[9px] font-black text-[#fbbf24] transition hover:border-[#fbbf24]/60"
                >
                  Buy →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && (
        <VoteGiftToast
          emoji={toast.emoji}
          label={toast.label}
          lookName={look.name}
          onDone={() => setToast(null)}
        />
      )}
    </article>
  );
}

/* ─── Main export ─────────────────────────────────────── */

/**
 * Standalone section on the UK room page.
 * Shows the look vote leaderboard + shop-the-fit.
 * The Go Live / Makeup Live Slots live inside the Fashion tab.
 */
export function UKFashionLivePanel() {
  const [looks] = useState(() =>
    UK_LOOKS.map((l, i) => ({
      ...l,
      votes: [312, 189, 97][i] ?? Math.floor(Math.random() * 80 + 20),
    }))
  );

  const sorted = [...looks].sort((a, b) => b.votes - a.votes);

  return (
    <section
      className="uk-fashion-live-panel dropship-market-panel a2030-holo-panel scroll-mt-24 rounded-[1.5rem] border border-[#d7b46a]/35 p-4 sm:p-5"
      aria-label="UK Fashion · vote the look"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#d7b46a] sm:text-xs">
            🇬🇧 UK Fashion Panel
          </p>
          <p className="mt-1 text-xs text-[#9fb4d4]">
            Vote the best look · shop the fit · fashion spotlight lane
          </p>
        </div>
        <span className="dropship-market-badge">FASHION LIVE</span>
      </div>

      <div className="mt-4 rounded-2xl border border-[#ff2bd6]/18 bg-gradient-to-br from-[#0a0010]/90 to-[#1a0020]/78 p-4 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#ff2bd6]">
          🇬🇧 UK Fashion · Live Vote · Gift to win
        </p>
        <h2 className="mt-1 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#fef9c3] sm:text-3xl">
          Vote the Best Look · Shop the Fit
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#94a3b8]">
          Gift your favourite look to vote. Top gifted look wins the spotlight.
          Buy the exact pieces straight from the room.
        </p>
        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff2bd6]/25 bg-[#1a0020]/60 px-3 py-1.5 text-[9px] font-bold text-[#94a3b8]">
            💄 Want to go live? Open the <span className="font-black text-[#ff2bd6]">Fashion tab</span> below ↓
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {sorted.map((look, i) => (
          <LookCard key={look.id} look={look} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}
