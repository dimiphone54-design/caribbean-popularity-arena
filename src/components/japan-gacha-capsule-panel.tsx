"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GACHA_COIN_CONFIG,
  GACHA_ITEMS,
  GACHA_RARITIES,
  type GachaItem,
  type GachaRarity,
  addToGachaCollection,
  claimDailyBonus,
  getGachaBalance,
  getGachaCollection,
  rollGacha,
  rollGachaBatch,
  setGachaBalance,
} from "@/lib/japan-gacha-data";

const RARITY_BORDER: Record<GachaRarity, string> = {
  common: "border-[#94a3b8]/30",
  uncommon: "border-[#34d399]/40",
  rare: "border-[#60a5fa]/50",
  "super-rare": "border-[#c084fc]/60",
  legendary: "border-[#fbbf24]/70",
};

const RARITY_BG: Record<GachaRarity, string> = {
  common: "bg-[#94a3b8]/10",
  uncommon: "bg-[#34d399]/10",
  rare: "bg-[#60a5fa]/10",
  "super-rare": "bg-[#c084fc]/10",
  legendary: "bg-[#fbbf24]/10",
};

export function JapanGachaCapsulePanel() {
  const [balance, setBalanceState] = useState(0);
  const [collection, setCollectionState] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState<GachaItem | null>(null);
  const [revealedBatch, setRevealedBatch] = useState<GachaItem[]>([]);
  const [showCollection, setShowCollection] = useState(false);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [showOdds, setShowOdds] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Machine ready · capsules loaded");

  useEffect(() => {
    setBalanceState(getGachaBalance());
    setCollectionState(getGachaCollection());
    const lastClaim = Number(localStorage.getItem("japan_gacha_last_daily") || "0");
    setDailyClaimed(Date.now() - lastClaim < 86_400_000);
  }, []);

  const completionPct = useMemo(() => {
    return Math.round((collection.length / GACHA_ITEMS.length) * 100);
  }, [collection]);

  const handleDaily = useCallback(() => {
    const { bonus, newBalance } = claimDailyBonus();
    if (bonus > 0) {
      setBalanceState(newBalance);
      setDailyClaimed(true);
      setStatusMessage(`Daily bonus claimed · +${bonus} coins added`);
    } else {
      setStatusMessage("Daily bonus already claimed · come back tomorrow");
    }
  }, []);

  const handlePull = useCallback(() => {
    if (balance < GACHA_COIN_CONFIG.pullCost || spinning) {
      if (!spinning) setStatusMessage("Not enough coins for a single pull");
      return;
    }
    const newBal = balance - GACHA_COIN_CONFIG.pullCost;
    setBalanceState(newBal);
    setGachaBalance(newBal);
    setSpinning(true);
    setStatusMessage("Single pull running · capsule chamber spinning");
    setRevealed(null);
    setRevealedBatch([]);
    setTimeout(() => {
      const item = rollGacha();
      const updated = addToGachaCollection(item.id);
      setCollectionState(updated);
      setRevealed(item);
      setStatusMessage(`${item.name} unlocked · ${GACHA_RARITIES[item.rarity].label}`);
      setSpinning(false);
    }, 1200);
  }, [balance, spinning]);

  const handleTenPull = useCallback(() => {
    if (balance < GACHA_COIN_CONFIG.tenPullCost || spinning) {
      if (!spinning) setStatusMessage("Not enough coins for an 11-pull burst");
      return;
    }
    const newBal = balance - GACHA_COIN_CONFIG.tenPullCost;
    setBalanceState(newBal);
    setGachaBalance(newBal);
    setSpinning(true);
    setStatusMessage("11-pull burst running · premium lane cycling");
    setRevealed(null);
    setRevealedBatch([]);
    setTimeout(() => {
      const items = rollGachaBatch(11);
      let coll = getGachaCollection();
      items.forEach((item) => { coll = addToGachaCollection(item.id); });
      const best = [...items].sort((a, b) => GACHA_RARITIES[b.rarity].dropRate - GACHA_RARITIES[a.rarity].dropRate)[0];
      setCollectionState(coll);
      setRevealedBatch(items);
      setStatusMessage(`11-pull complete · highlight unlock: ${best.name}`);
      setSpinning(false);
    }, 1800);
  }, [balance, spinning]);

  return (
    <div className="japan-gacha-panel space-y-2.5">
      {/* Header — compact */}
      <header className="text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ff4466]">
          🎰 ガチャ · blind box
        </p>
        <h2 className="mt-1 font-['Bebas_Neue',sans-serif] text-xl tracking-widest text-[#eef6ff] sm:text-2xl">
          JAPAN · gacha machine
        </h2>
      </header>

      {/* Coins + daily + collection — single row */}
      <div className="rounded-2xl border border-[#ff4466]/15 bg-[#12060d]/70 px-3 py-2 text-center shadow-[0_0_28px_rgba(255,68,102,0.08)]">
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#9fb4d4]">Machine status</p>
        <p className="mt-1 text-[11px] font-semibold text-[#eef6ff]">{statusMessage}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full border border-[#ff4466]/30 bg-[#1a0810]/70 px-3 py-1 text-[10px] font-bold text-[#fbbf24]">
          🪙 {balance}
        </span>
        <button
          onClick={handleDaily}
          disabled={dailyClaimed}
          className="rounded-full border border-[#34d399]/30 bg-[#1a0810]/70 px-3 py-1 text-[10px] font-bold text-[#34d399] transition hover:border-[#34d399]/60 disabled:opacity-40"
        >
          {dailyClaimed ? "claimed" : `+${GACHA_COIN_CONFIG.dailyBonus}/day`}
        </button>
        <button
          onClick={() => setShowCollection(!showCollection)}
          className="rounded-full border border-[#ff2bd6]/30 bg-[#1a0810]/70 px-3 py-1 text-[10px] font-bold text-[#ff2bd6] transition hover:border-[#ff2bd6]/60"
        >
          📦 {collection.length}/{GACHA_ITEMS.length} ({completionPct}%)
        </button>
      </div>

      {/* Capsule machine + reveal — horizontal layout */}
      <div className="rounded-[1.25rem] border border-[#ff4466]/15 bg-[linear-gradient(135deg,rgba(26,8,16,0.9),rgba(32,10,24,0.82))] p-3 shadow-[0_0_34px_rgba(255,68,102,0.08)]">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Capsule visual — smaller */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed border-[#ff4466]/30 transition-all duration-500 ${
              spinning ? "animate-spin border-[#fbbf24]/60" : ""
            }`}
            style={{
              background: spinning
                ? "radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(255,68,102,0.1) 50%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,68,102,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            {spinning ? (
              <div className="text-3xl animate-bounce sm:text-4xl">🎰</div>
            ) : revealed ? (
              <div
                className="text-3xl sm:text-4xl"
                style={{ filter: `drop-shadow(0 0 16px ${GACHA_RARITIES[revealed.rarity].glow})` }}
              >
                {revealed.emoji}
              </div>
            ) : (
              <div className="text-3xl opacity-40 sm:text-4xl">🎰</div>
            )}
          </div>
        </div>

        {/* Reveal card or pull buttons */}
        <div className="flex-1 min-w-0">
          {revealed && !spinning ? (
            <div
              className={`rounded-xl border ${RARITY_BORDER[revealed.rarity]} ${RARITY_BG[revealed.rarity]} p-2.5 text-center`}
              style={{ boxShadow: `0 0 20px ${GACHA_RARITIES[revealed.rarity].glow}` }}
            >
              <p className="text-2xl">{revealed.emoji}</p>
              <p className="mt-1 text-xs font-bold text-[#eef6ff]">{revealed.name}</p>
              <p
                className="text-[9px] font-black uppercase tracking-wider"
                style={{ color: GACHA_RARITIES[revealed.rarity].color }}
              >
                ✦ {GACHA_RARITIES[revealed.rarity].label}
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handlePull}
                disabled={balance < GACHA_COIN_CONFIG.pullCost || spinning}
                className="flex-1 rounded-xl border border-[#ff4466]/40 bg-[#1a0810]/80 px-3 py-2 text-xs font-bold text-[#ff4466] transition hover:border-[#ff4466]/80 active:scale-95 disabled:opacity-30"
              >
                🎰 ×1
                <span className="block text-[9px] font-normal text-[#9fb4d4]">🪙{GACHA_COIN_CONFIG.pullCost}</span>
              </button>
              <button
                onClick={handleTenPull}
                disabled={balance < GACHA_COIN_CONFIG.tenPullCost || spinning}
                className="flex-1 rounded-xl border border-[#fbbf24]/50 bg-[#1a0810]/80 px-3 py-2 text-xs font-bold text-[#fbbf24] transition hover:border-[#fbbf24]/80 active:scale-95 disabled:opacity-30"
              >
                🎰 ×11
                <span className="block text-[9px] font-normal text-[#9fb4d4]">🪙{GACHA_COIN_CONFIG.tenPullCost}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Batch reveal — compact grid */}
      {revealedBatch.length > 0 && !spinning && (
        <div className="grid grid-cols-6 gap-1 sm:grid-cols-11">
          {revealedBatch.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className={`flex flex-col items-center rounded-lg border ${RARITY_BORDER[item.rarity]} ${RARITY_BG[item.rarity]} p-1`}
            >
              <span className="text-sm">{item.emoji}</span>
              <span className="text-[7px] font-bold uppercase" style={{ color: GACHA_RARITIES[item.rarity].color }}>
                {GACHA_RARITIES[item.rarity].label.slice(0, 4)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Odds + collection toggles — single row */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setShowOdds(!showOdds)}
          className="text-[9px] font-bold uppercase tracking-wider text-[#9fb4d4] hover:text-[#eef6ff]"
        >
          {showOdds ? "▼ odds" : "▶ odds"}
        </button>
        <span className="text-[9px] text-[#475569]">·</span>
        <button
          onClick={() => setShowCollection(!showCollection)}
          className="text-[9px] font-bold uppercase tracking-wider text-[#ff2bd6] hover:text-[#eef6ff]"
        >
          {showCollection ? "▼ collection" : "▶ collection"}
        </button>
      </div>

      {showOdds && (
        <div className="grid grid-cols-5 gap-1">
          {(Object.entries(GACHA_RARITIES) as [GachaRarity, typeof GACHA_RARITIES[GachaRarity]][]).map(
            ([rarity, config]) => (
              <div
                key={rarity}
                className="flex flex-col items-center rounded-lg border border-white/5 bg-white/[0.03] p-1.5"
              >
                <span className="text-[9px] font-bold" style={{ color: config.color }}>
                  {config.label}
                </span>
                <span className="text-[8px] text-[#9fb4d4]">
                  {(config.dropRate * 100).toFixed(0)}%
                </span>
              </div>
            )
          )}
        </div>
      )}

      {showCollection && (
        <div className="grid grid-cols-5 gap-1 sm:grid-cols-10">
          {GACHA_ITEMS.map((item) => {
            const owned = collection.includes(item.id);
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center rounded-lg border p-1 transition ${
                  owned
                    ? `${RARITY_BORDER[item.rarity]} ${RARITY_BG[item.rarity]}`
                    : "border-white/5 bg-white/[0.02] opacity-30"
                }`}
              >
                <span className={`text-sm ${owned ? "" : "grayscale"}`}>{owned ? item.emoji : "?"}</span>
                <span
                  className="text-[7px] font-bold uppercase leading-tight"
                  style={{ color: owned ? GACHA_RARITIES[item.rarity].color : "#475569" }}
                >
                  {owned ? item.name.split(" ").slice(0, 2).join(" ") : "???"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
