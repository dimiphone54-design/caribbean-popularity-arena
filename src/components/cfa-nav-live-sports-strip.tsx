"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { NavLiveSportsFeed, NavUpcomingSportLine } from "@/lib/api-sports-nav-feed";
import { NAV_SPORTS_RECAP_LANES } from "@/lib/nav-sports-recap-lanes";
import { API_SPORTS_NAV_SPORT_META } from "@/lib/api-sports-sport-meta";

const POLL_MS = 5 * 60 * 1000;

export function useNavLiveSportsFeed() {
  const [feed, setFeed] = useState<NavLiveSportsFeed | null>(null);

  const load = useCallback(async (forceRefresh = false) => {
    try {
      const url = forceRefresh ? "/api/games/nav-live-sports?refresh=1" : "/api/games/nav-live-sports";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;
      const next = (await res.json()) as NavLiveSportsFeed;
      setFeed(next);
      if (!next.events.length && !forceRefresh) {
        void load(true);
      }
    } catch {
      /* keep last feed */
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  return feed;
}

function defaultUpcomingLines(): NavUpcomingSportLine[] {
  return NAV_SPORTS_RECAP_LANES.map((lane) => {
    const meta = API_SPORTS_NAV_SPORT_META[lane.sport];
    return {
      sport: lane.sport,
      label: meta.label,
      emoji: meta.emoji,
      sentence: "Loading upcoming fixture…"
    };
  });
}

function UpcomingSportLine({ line }: { line: NavUpcomingSportLine }) {
  return (
    <p className="cfa-nav-upcoming-line" role="listitem" title={`${line.label} · ${line.sentence}`}>
      <span className="cfa-nav-upcoming-line-prefix" aria-hidden="true">
        ▶ {line.emoji} {line.label}
      </span>
      <span className="cfa-nav-upcoming-line-copy"> · {line.sentence}</span>
    </p>
  );
}

type CfaNavLiveSportsStripProps = {
  feed: NavLiveSportsFeed | null;
};

export function CfaNavLiveSportsStrip({ feed }: CfaNavLiveSportsStripProps) {
  const lines = feed?.upcomingBySport?.length ? feed.upcomingBySport : defaultUpcomingLines();
  const filledCount = lines.filter((line) => Boolean(line.kickoff)).length;

  return (
    <div className="cfa-nav-live-sports-strip" aria-label="Upcoming fixtures by sport">
      <p className="cfa-nav-live-sports-section-label">Upcoming · {feed ? filledCount : "…"}</p>
      {feed?.notice ? <p className="cfa-nav-upcoming-notice">{feed.notice}</p> : null}
      <div className="cfa-nav-upcoming-lines-viewport" aria-label="Upcoming fixtures ticker">
        <div
          className="cfa-nav-upcoming-lines-track"
          role="list"
          style={{ "--cfa-upcoming-line-count": lines.length } as CSSProperties}
        >
          {lines.map((line) => (
            <UpcomingSportLine key={line.sport} line={line} />
          ))}
          {lines.map((line) => (
            <UpcomingSportLine key={`${line.sport}-loop`} line={line} />
          ))}
        </div>
      </div>
    </div>
  );
}