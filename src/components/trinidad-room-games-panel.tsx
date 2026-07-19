"use client";

import { useState } from "react";
import { VanguardZeroPanel } from "@/components/games/vanguard-zero";
import type { MatchMode } from "@/components/games/vanguard-zero";
import { RoomSportsStack } from "@/components/room-sports-stack";

const TRINIDAD_ROOM_SLUG = "trinidad-room";

export function TrinidadRoomGamesPanel() {
  const [activeGame, setActiveGame] = useState<{ countryId: string; matchMode: MatchMode } | null>(null);

  return (
    <div className="trinidad-room-games-panel space-y-3">
      <section className="rounded-2xl border border-[#00f5ff]/20 bg-gradient-to-br from-[#0a0a1a]/90 to-[#050510]/90 p-5 backdrop-blur-md">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">🎮</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#00f5ff]/60">
              Games · Trinidad &amp; Tobago
            </p>
            <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-[#00f5ff]">
              VANGUARD ZERO · CFA Arena
            </h3>
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-black/30 p-4">
          <VanguardZeroPanel
            countryId="trinidad"
            onPlayMatch={(countryId, matchMode) => setActiveGame({ countryId, matchMode })}
          />
        </div>

        <div className="my-5 border-t border-white/10" />

        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">🃏</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#fbbf24]/60">
              Cards · Trinidad &amp; Tobago
            </p>
            <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-[#fbbf24]">
              All Fours
            </h3>
          </div>
        </div>
        <div className="rounded-xl border border-[#fbbf24]/10 bg-black/30 p-4">
          <p className="text-xs leading-6 text-white/50">
            The undisputed national card game, introduced by the British but deeply embedded in local culture.
            Played in pairs or teams of four, it relies on points scored through specific card tricks and trumping.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/5 px-3 py-1 text-[10px] font-semibold text-[#fbbf24]/70">
              🂡 4 Players
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/5 px-3 py-1 text-[10px] font-semibold text-[#fbbf24]/70">
              ♠ Tricks &amp; Trump
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/5 px-3 py-1 text-[10px] font-semibold text-[#fbbf24]/70">
              🏆 Points System
            </span>
          </div>
        </div>

        <div className="my-5 border-t border-white/10" />

        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">🎲</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#a78bfa]/60">
              Board &amp; Party Games · Trinidad &amp; Tobago
            </p>
            <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-[#a78bfa]">
              Yard Games
            </h3>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[#a78bfa]/10 bg-black/30 p-3">
            <p className="text-xs font-black text-white">🎲 Ludo</p>
            <p className="mt-1 text-[10px] text-white/40">Known as &ldquo;Frustration&rdquo; locally. Roll dice, race 4 tokens home. Family gatherings essential.</p>
          </div>
          <div className="rounded-xl border border-[#a78bfa]/10 bg-black/30 p-3">
            <p className="text-xs font-black text-white">🪙 Warri</p>
            <p className="mt-1 text-[10px] text-white/40">Ancient African mancala. Seed counters, capture rows, outsmart your opponent.</p>
          </div>
          <div className="rounded-xl border border-[#a78bfa]/10 bg-black/30 p-3">
            <p className="text-xs font-black text-white">♟️ Dame</p>
            <p className="mt-1 text-[10px] text-white/40">Trinidad checkers. Jump, capture, king your piece. Yard champions made here.</p>
          </div>
          <div className="rounded-xl border border-[#a78bfa]/10 bg-black/30 p-3">
            <p className="text-xs font-black text-white">🀄 Domino</p>
            <p className="mt-1 text-[10px] text-white/40">Slam tiles, count doubles, talk trash. The loudest game in every yard.</p>
          </div>
          <div className="rounded-xl border border-[#a78bfa]/10 bg-black/30 p-3">
            <p className="text-xs font-black text-white">💰 Monopoly</p>
            <p className="mt-1 text-[10px] text-white/40">Buy streets, collect rent, bankrupt your friends. Trinidad edition with local properties.</p>
          </div>
          <div className="rounded-xl border border-[#a78bfa]/10 bg-black/30 p-3">
            <p className="text-xs font-black text-white">🔢 Whe Whe</p>
            <p className="mt-1 text-[10px] text-white/40">Chinese-inspired numbers game. 36 marks, dreams, signs, intuition. National Play Whe born from this.</p>
          </div>
        </div>
      </section>

      <RoomSportsStack roomSlug={TRINIDAD_ROOM_SLUG} />
    </div>
  );
}
