"use client";

import { useState } from "react";
import type { MatchMode } from "./missions/ghost-tide";
import { getCountryTeam } from "./country-teams";
import { getCountryMission } from "./missions/country-missions";
import { TournamentPanel } from "./ui/tournament-panel";
import { VanguardZeroGame } from "./vanguard-zero-game";

type VanguardZeroPanelProps = {
  countryId?: string;
  onPlayMatch?: (countryId: string, matchMode: MatchMode) => void;
};

export function VanguardZeroPanel({ countryId, onPlayMatch }: VanguardZeroPanelProps) {
  const [showTournament, setShowTournament] = useState(false);
  const [activeGame, setActiveGame] = useState<{ countryId: string; matchMode: MatchMode } | null>(null);

  const team = countryId ? getCountryTeam(countryId) : null;
  const mission = countryId ? getCountryMission(countryId) : null;

  if (activeGame) {
    return (
      <VanguardZeroGame
        countryId={activeGame.countryId}
        matchMode={activeGame.matchMode}
        onExit={() => setActiveGame(null)}
      />
    );
  }

  return (
    <div className="vanguard-zero-panel space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-white">
            VANGUARD ZERO
          </h3>
          <p className="text-[10px] text-white/50">Global Tournament FPS</p>
        </div>
        <button
          type="button"
          onClick={() => setShowTournament((v) => !v)}
          className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase text-white transition hover:bg-white/20"
        >
          {showTournament ? "Close" : "Trophy"}
        </button>
      </div>

      {team && (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <span className="text-2xl">{team.flag}</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white">{team.name}</p>
            <p className="text-[10px] text-white/50">
              #{team.ranking} · {team.wins}W-{team.losses}L · {team.points} pts
            </p>
          </div>
          <span className="text-[10px] font-bold text-white/40">{team.players} players</span>
        </div>
      )}

      {mission && (
        <button
          type="button"
          onClick={() => {
            onPlayMatch?.(countryId!, "mission");
            setActiveGame({ countryId: countryId!, matchMode: "mission" });
          }}
          className="w-full rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-left transition hover:bg-green-500/20"
        >
          <p className="text-[10px] font-bold uppercase text-green-400">Mission</p>
          <p className="mt-0.5 text-xs font-bold text-white">{mission.countryFlag} {mission.name}</p>
          <p className="text-[10px] text-white/50">{mission.description}</p>
        </button>
      )}

      <button
        type="button"
        onClick={() => setActiveGame({ countryId: countryId ?? "trinidad", matchMode: "country_match" })}
        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"
      >
        <p className="text-[10px] font-bold uppercase text-white/60">Quick Match</p>
        <p className="text-xs font-bold text-white">Country vs Country</p>
      </button>

      {showTournament && <TournamentPanel countryId={countryId} />}
    </div>
  );
}
