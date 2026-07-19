"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { UkGamesAgeGateBanner, useUkGamesPlayAllowed } from "@/components/uk-games-age-gate";
import { ukParkGamesLane, type UkParkGameLane } from "@/lib/uk-park-games-lane";

function ParkGameCard({
  game,
  playLocked,
  onPlay
}: {
  game: UkParkGameLane;
  playLocked: boolean;
  onPlay: (game: UkParkGameLane) => void;
}) {
  return (
    <article
      className="rounded-xl border border-[#b8ff3c]/18 bg-[linear-gradient(160deg,rgba(8,18,10,0.88),rgba(4,10,14,0.92))] p-3 sm:p-3.5"
      aria-label={`${game.rank}. ${game.title}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              {game.emoji}
            </span>
            <p className="text-[13px] font-black text-[#fef9c3] sm:text-sm">
              {game.rank}. {game.title}
            </p>
          </div>
          <p className="mt-1 inline-flex rounded-full border border-[#b8ff3c]/30 bg-[#b8ff3c]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-[#b8ff3c]">
            {game.badge}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-bold text-[#eef6ff]">
            {game.flag} {game.host}
          </p>
          <p className="text-[10px] text-[#8fa3c4]">{game.area}</p>
        </div>
      </div>

      <div className="mt-2.5 space-y-2">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
            Why it trends
          </p>
          <p className="mt-0.5 text-[11px] leading-5 text-[#c5d4ec]">{game.whyTrends}</p>
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#86efac]">
            Free play
          </p>
          <p className="mt-0.5 text-[11px] leading-5 text-[#c4d4ef]">{game.freePlay}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onPlay(game)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#b8ff3c]/40 bg-[#b8ff3c]/12 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#e8ffc8] transition hover:border-[#b8ff3c]/70 hover:bg-[#b8ff3c]/22 disabled:cursor-not-allowed disabled:opacity-55"
        aria-disabled={playLocked}
      >
        {playLocked ? `18+ to play · ${game.host}` : `Play free · ${game.host}`}
      </button>
    </article>
  );
}

/**
 * UK room · 5 park games under Best Makeup Look
 * Free public play · money catalog in Command Center FREEZE COMING SOON
 */
export function UkParkGamesLanePanel() {
  const [sim, setSim] = useState<{ name: string; host: string } | null>(null);
  const { allowed, ready } = useUkGamesPlayAllowed();
  const playLocked = !ready || !allowed;

  return (
    <section
      id="uk-park-games-lane"
      className="country-room-section w-full scroll-mt-28"
      aria-label="UK Park Games · free outdoor lane"
    >
      <div className="a2030-holo-panel scroll-mt-24 rounded-[1.25rem] border border-[#b8ff3c]/22 bg-[linear-gradient(155deg,rgba(6,16,10,0.92),rgba(4,8,14,0.94))] p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
              🇬🇧 UK park games
            </p>
            <p className="mt-1 text-[11px] leading-5 text-[#9fb4d4]">
              Under Best Makeup Look · classy lawn to fete chaos · free play · 18+ live
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f5c842]/35 bg-[#f5c842]/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#fde68a]">
            18+ free play
          </span>
        </div>

        <UkGamesAgeGateBanner />

        <div className="mt-3 space-y-2.5" role="list">
          {ukParkGamesLane.map((game) => (
            <div key={game.id} role="listitem">
              <ParkGameCard
                game={game}
                playLocked={playLocked}
                onPlay={(entry) => {
                  if (playLocked) return;
                  setSim({
                    name: entry.simName,
                    host: `${entry.host} · ${entry.area}`
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {sim && allowed ? (
        <CotswoldsGameSimulator
          gameName={sim.name}
          host={sim.host}
          onClose={() => setSim(null)}
        />
      ) : null}
    </section>
  );
}
