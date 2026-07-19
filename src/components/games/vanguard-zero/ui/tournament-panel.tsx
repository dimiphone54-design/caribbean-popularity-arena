"use client";

import { useState } from "react";
import { TournamentLeaderboard } from "./tournament-leaderboard";
import { countryTeams } from "../country-teams";
import { currentSeason, tournamentMatches } from "../tournament/tournament-data";
import { generateBracket } from "../tournament/tournament-bracket";

type Tab = "leaderboard" | "matches" | "bracket" | "teams";

export function TournamentPanel({ countryId }: { countryId?: string }) {
  const [tab, setTab] = useState<Tab>("leaderboard");
  const bracket = generateBracket();
  const myTeam = countryId ? countryTeams.find((t) => t.countryId === countryId) : null;

  return (
    <div className="tournament-panel space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-white">
            {currentSeason.name}
          </h3>
          <p className="text-[10px] text-white/50">
            {currentSeason.startDate} — {currentSeason.endDate}
          </p>
        </div>
        {myTeam && (
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white">
            {myTeam.flag} {myTeam.name} · #{myTeam.ranking}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        {(["leaderboard", "matches", "bracket", "teams"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
              tab === t
                ? "bg-white/15 text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "leaderboard" && <TournamentLeaderboard />}
      {tab === "matches" && (
        <div className="space-y-2">
          {tournamentMatches.map((m) => {
            const home = countryTeams.find((t) => t.countryId === m.homeTeamId);
            const away = countryTeams.find((t) => t.countryId === m.awayTeamId);
            return (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                <span className="flex items-center gap-2 text-xs text-white">
                  {home?.flag} {home?.name}
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {m.homeScore} — {m.awayScore}
                </span>
                <span className="flex items-center gap-2 text-xs text-white">
                  {away?.name} {away?.flag}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {tab === "bracket" && (
        <div className="space-y-2">
          {bracket.map((b) => (
            <div key={b.id} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <p className="text-[10px] font-bold uppercase text-white/40">Round {b.round}</p>
              <div className="mt-1 flex items-center justify-between text-xs text-white">
                <span>{b.home?.flag} {b.home?.name ?? "TBD"}</span>
                <span className="font-mono font-bold">{b.homeScore} — {b.awayScore}</span>
                <span>{b.away?.name ?? "TBD"} {b.away?.flag}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "teams" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {countryTeams.map((team) => (
            <div key={team.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <p className="text-lg">{team.flag}</p>
              <p className="mt-1 text-xs font-bold text-white">{team.name}</p>
              <p className="text-[10px] text-white/40">#{team.ranking} · {team.players} players</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
