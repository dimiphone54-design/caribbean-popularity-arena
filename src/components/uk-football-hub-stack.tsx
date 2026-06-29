"use client";

import { useState } from "react";
import { FootballPredictionArena } from "@/components/football-prediction/football-prediction-arena";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { UkFootballLeagueStrip } from "@/components/uk-football-league-strip";
import type { FootballCompetitionId } from "@/lib/football-prediction-arena";
import { FOOTBALL_COMPETITIONS } from "@/lib/football-prediction-arena";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";
import "@/components/uk-football-hub-stack.css";

function leagueLabel(id: FootballCompetitionId | "all") {
  if (id === "all") return "All competitions";
  return FOOTBALL_COMPETITIONS.find((league) => league.id === id)?.label ?? id;
}

type UkFootballHubStackProps = {
  countryId?: string;
  countryName?: string;
  flag?: string;
};

export function UkFootballHubStack({
  countryId = "uk",
  countryName = "United Kingdom",
  flag = "🇬🇧"
}: UkFootballHubStackProps) {
  const [selectedLeague, setSelectedLeague] = useState<FootballCompetitionId | "all">("all");

  return (
    <div className="uk-football-hub-stack country-room-section">
      <section className={`uk-football-predict-wrap ${UK_ROOM_PANEL}`} aria-label="Football prediction arena">
        <FootballPredictionArena
          countryId={countryId}
          countryName={countryName}
          flag={flag}
          initialCompetitionFilter={selectedLeague}
          embedLeagueLabel={leagueLabel(selectedLeague)}
          embeddedInUkHub
          leagueStrip={
            <UkFootballLeagueStrip selected={selectedLeague} onSelect={setSelectedLeague} />
          }
        />
      </section>

      <section
        id="uk-women-dropship-shop"
        className={`uk-football-dropship-wrap ${UK_ROOM_PANEL}`}
        aria-label="UK dropship market · UK women only"
      >
        <header className="uk-football-hub-stack-head uk-football-dropship-head">
          <p className="uk-football-hub-kicker">{flag} Dropship market</p>
          <h2 className="uk-football-hub-title">{countryName} shop</h2>
          <p className="uk-football-hub-sub">UK lane · arena checkout · aligned under football</p>
        </header>
        <DropshipMarketPanel
          countryId={countryId}
          countryName={countryName}
          flag={flag}
          layout="room"
          hideRoomIntro
          embeddedInUkStack
        />
      </section>
    </div>
  );
}
