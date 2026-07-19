"use client";

import { useMemo, useState } from "react";
import { getColombiaFootballFixtures } from "@/lib/football-prediction-fixtures";
import type { FootballMatch, FootballPredictedWinner } from "@/lib/football-prediction-arena";

const CLUB_TAG: Record<string, string> = {
  Millonarios: "MFC",
  "Independiente Santa Fe": "SFE",
  "Atlético Nacional": "NAL",
  "Independiente Medellín": "DIM",
  "América de Cali": "AME",
  "Deportivo Cali": "CAL",
  "Junior de Barranquilla": "JUN",
  "Deportes Tolima": "TOL",
  "Atlético Bucaramanga": "BUC",
  "Once Caldas": "ONC"
};

function clubTag(name: string) {
  return CLUB_TAG[name] ?? name.slice(0, 3).toUpperCase();
}

function shortName(name: string) {
  return name
    .replace("Independiente Santa Fe", "Santa Fe")
    .replace("Independiente Medellín", "DIM")
    .replace("Atlético Nacional", "Nacional")
    .replace("América de Cali", "América")
    .replace("Deportivo Cali", "Dep. Cali")
    .replace("Junior de Barranquilla", "Junior")
    .replace("Deportes Tolima", "Tolima")
    .replace("Atlético Bucaramanga", "Bucaramanga");
}

function colombiaClubFixtures(): FootballMatch[] {
  return getColombiaFootballFixtures().filter(
    (m) => m.homeTeam !== "Colombia" && m.awayTeam !== "Ecuador" && m.homeFlag === "🇨🇴" && m.awayFlag === "🇨🇴"
  );
}

/** Ultra-compact Colombia fútbol board · 2 club clássicos */
export function RoomColombiaFootballPanel() {
  const fixtures = useMemo(() => colombiaClubFixtures(), []);
  const [picks, setPicks] = useState<Record<string, FootballPredictedWinner>>({});
  const upcoming = fixtures.filter((m) => m.status === "scheduled").slice(0, 2);

  return (
    <section
      id="colombia-room-football"
      className="room-colombia-football w-full overflow-hidden rounded-lg border border-[#fcd116]/35 bg-[#050a06]"
      aria-label="Colombia fútbol"
    >
      <div className="flex items-center justify-between gap-2 border-b border-[#fcd116]/20 px-2.5 py-1.5">
        <h2 className="font-['Bebas_Neue',sans-serif] text-lg uppercase tracking-[0.08em] text-[#fff8e7] sm:text-xl">
          🇨🇴 Fútbol Colombia
        </h2>
        <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[#fcd116]">BetPlay · pick gratis</span>
      </div>

      <div className="divide-y divide-white/5">
        {upcoming.map((match) => {
          const pick = picks[match.id];
          return (
            <div key={match.id} className="flex items-center gap-1.5 px-2 py-1.5 sm:gap-2 sm:px-2.5">
              <span className="w-7 shrink-0 text-center text-[8px] font-black text-[#fcd116]">
                {clubTag(match.homeTeam)}
              </span>
              <p className="min-w-0 flex-1 truncate text-[10px] font-bold text-[#e4e4e7] sm:text-[11px]">
                {shortName(match.homeTeam)}{" "}
                <span className="text-[#fcd116]">vs</span> {shortName(match.awayTeam)}
              </p>
              <div className="flex shrink-0 gap-0.5">
                {(["home", "draw", "away"] as const).map((key, i) => {
                  const code = key === "home" ? "1" : key === "draw" ? "X" : "2";
                  const active = pick === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setPicks((prev) => ({ ...prev, [match.id]: key }))
                      }
                      className={`h-6 w-6 rounded border text-[9px] font-black ${
                        active
                          ? "border-[#fcd116] bg-[#fcd116]/25 text-[#fef9c3]"
                          : "border-white/15 bg-black/40 text-[#a1a1aa] hover:border-[#fcd116]/40"
                      }`}
                      aria-label={`Pick ${code}`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
