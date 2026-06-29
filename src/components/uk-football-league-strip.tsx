"use client";

import {
  FOOTBALL_COMPETITIONS,
  type FootballCompetitionId
} from "@/lib/football-prediction-arena";

const LEAGUE_EMOJI: Record<FootballCompetitionId, string> = {
  "premier-league": "🏴",
  "champions-league": "⭐",
  "europa-league": "🟠",
  "fa-cup": "🏆",
  international: "🌍",
  "world-cup": "🌐",
  euro: "🇪🇺"
};

type UkFootballLeagueStripProps = {
  selected: FootballCompetitionId | "all";
  onSelect: (id: FootballCompetitionId | "all") => void;
};

export function UkFootballLeagueStrip({ selected, onSelect }: UkFootballLeagueStripProps) {
  return (
    <div className="uk-football-league-strip" role="tablist" aria-label="Filter by league">
      <button
        type="button"
        role="tab"
        aria-selected={selected === "all"}
        className={`uk-football-league-pill${selected === "all" ? " uk-football-league-pill--active" : ""}`}
        onClick={() => onSelect("all")}
      >
        <span aria-hidden="true">⚽</span> All
      </button>
      {FOOTBALL_COMPETITIONS.map((league) => (
        <button
          key={league.id}
          type="button"
          role="tab"
          aria-selected={selected === league.id}
          className={`uk-football-league-pill${selected === league.id ? " uk-football-league-pill--active" : ""}`}
          onClick={() => onSelect(league.id)}
        >
          <span aria-hidden="true">{LEAGUE_EMOJI[league.id]}</span> {league.label}
        </button>
      ))}
    </div>
  );
}
