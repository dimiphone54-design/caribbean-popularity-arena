"use client";

import { countryTeams } from "../country-teams";

export function TournamentLeaderboard() {
  const sorted = [...countryTeams].sort((a, b) => b.points - a.points);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/50">
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2 text-center">W</th>
            <th className="px-3 py-2 text-center">L</th>
            <th className="px-3 py-2 text-right">PTS</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((team, i) => (
            <tr
              key={team.id}
              className="border-b border-white/5 transition hover:bg-white/5"
            >
              <td className="px-3 py-2 font-bold text-white/70">{i + 1}</td>
              <td className="px-3 py-2">
                <span className="flex items-center gap-2">
                  <span>{team.flag}</span>
                  <span className="font-semibold text-white">{team.name}</span>
                </span>
              </td>
              <td className="px-3 py-2 text-center font-mono text-green-400">{team.wins}</td>
              <td className="px-3 py-2 text-center font-mono text-red-400">{team.losses}</td>
              <td className="px-3 py-2 text-right font-mono font-bold text-white">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
