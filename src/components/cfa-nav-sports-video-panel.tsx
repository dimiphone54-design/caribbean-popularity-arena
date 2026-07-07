"use client";

import { useEffect, useMemo, useState } from "react";
import { CfaNavSportRecapSlideshow } from "@/components/cfa-nav-sport-recap-slideshow";
import {
  CfaNavLiveSportsStrip,
  useNavLiveSportsFeed
} from "@/components/cfa-nav-live-sports-strip";
import { NAV_SPORTS_RECAP_LANES, type NavSportsRecapLane } from "@/lib/nav-sports-recap-lanes";

type CfaNavSportsVideoPanelProps = {
  onOpenRecords?: () => void;
};

function RecapLane({ lane }: { lane: NavSportsRecapLane }) {
  return (
    <div
      className={`cfa-nav-sports-video-panel-fifa cfa-nav-sports-video-panel-fifa--recap-lane cfa-nav-sports-video-panel-fifa--${lane.sport}`}
    >
      <span className="cfa-nav-sports-video-panel-lane-label">{lane.label}</span>
      <CfaNavSportRecapSlideshow
        sport={lane.sport}
        label={lane.label}
        mode={lane.mode}
        theme={lane.theme}
      />
    </div>
  );
}

export function CfaNavSportsVideoPanel({ onOpenRecords }: CfaNavSportsVideoPanelProps) {
  const liveFeed = useNavLiveSportsFeed();
  const [captionIndex, setCaptionIndex] = useState(0);

  const captions = useMemo(() => {
    if (!liveFeed?.events.length) return ["SportDeck · finals feed & fixture slate"];
    return liveFeed.events.map((event) => {
      const prefix = event.bucket === "live" ? "🔴 " : event.bucket === "upcoming" ? "▶ " : "✓ ";
      return `${prefix}${event.title} · ${event.scoreline} · ${event.meta}`;
    });
  }, [liveFeed]);

  const activeCaption = captions[captionIndex % captions.length] ?? "Arena sports";

  useEffect(() => {
    if (!captions.length) return;
    const timer = window.setInterval(() => {
      setCaptionIndex((index) => (index + 1) % captions.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [captions]);

  return (
    <section className="cfa-nav-sports-video-panel" aria-label="Sports · live recaps and API-Sports panel">
      <button
        type="button"
        className="cfa-nav-sports-video-panel-hit cfa-nav-sports-video-panel-hit--api"
        onClick={onOpenRecords}
        aria-label="Sports · open arena sports records and match scores"
      >
        <span className="cfa-nav-sports-video-panel-hud">
          <span className="cfa-nav-sports-video-panel-live" aria-hidden="true">
            <span className="cfa-nav-sports-video-panel-live-dot" />
            LIVE
            {liveFeed && liveFeed.liveCount > 0 ? ` · ${liveFeed.liveCount}` : ""}
          </span>
          <span className="cfa-nav-sports-video-panel-title">SPORTS</span>
          <span className="cfa-nav-sports-video-panel-caption">{activeCaption}</span>
          <span className="cfa-nav-sports-video-panel-stats">
            {`${NAV_SPORTS_RECAP_LANES.length} sports · match scores hub`}
          </span>
          <span className="cfa-nav-sports-video-panel-cta">View records →</span>
        </span>

        <div
          className="cfa-nav-sports-video-panel-recaps-scroll"
          aria-label="All sports recaps"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {NAV_SPORTS_RECAP_LANES.map((lane) => (
            <RecapLane key={lane.sport} lane={lane} />
          ))}
        </div>

        <CfaNavLiveSportsStrip feed={liveFeed} />
      </button>
    </section>
  );
}