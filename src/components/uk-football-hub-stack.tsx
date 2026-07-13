"use client";

import { useState } from "react";
import { FootballPredictionArena } from "@/components/football-prediction/football-prediction-arena";
import { ArenaSlotDropshipTab } from "@/components/arena-slot-dropship-tab";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { UkFootballLeagueStrip } from "@/components/uk-football-league-strip";
import type { FootballCompetitionId } from "@/lib/football-prediction-arena";
import { FOOTBALL_COMPETITIONS } from "@/lib/football-prediction-arena";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";
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
  const tabLabels = getArenaSlotTabLabels("UK");
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

      <div className={`uk-football-dropship-wrap ${UK_ROOM_PANEL}`}>
        <ArenaSlotDropshipTab mode="room" countryName={countryName} label={tabLabels.dropshipping}>
          <DropshipMarketPanel
            countryId={countryId}
            countryName={countryName}
            flag={flag}
            layout="room"
            hideRoomIntro
            embeddedInUkStack
          />
        </ArenaSlotDropshipTab>
      </div>
    </div>
  );
}
