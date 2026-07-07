"use client";

import { useCallback, useEffect, useState } from "react";
import type { NavSportsRecapClip, NavSportsRecapFeed, NavSportsRecapMode } from "@/lib/nav-sports-recap-feed";
import { fetchNavSportsRecapFeed } from "@/lib/nav-sports-recap-client";
import type { ApiSportsNavSportId } from "@/lib/api-sports-sport-meta";
import {
  cleanBasketballDisplayTitle,
  cleanF1DisplayTitle,
  cleanFootballDisplayTitle,
  cleanGenericSportDisplayTitle,
  youtubeThumbnail
} from "@/lib/sports-highlight-youtube";

const ROTATE_MS = 6000;
const POLL_MS = 10 * 60 * 1000;

const EMPTY_FEED: NavSportsRecapFeed = {
  fetchedAt: "",
  windowLabel: "",
  today: [],
  tomorrow: [],
  all: []
};

type CfaNavSportRecapSlideshowProps = {
  sport: ApiSportsNavSportId;
  label: string;
  mode?: NavSportsRecapMode;
  theme?: "f1";
  emptyLabel?: string;
};

function cleanClipTitle(sport: ApiSportsNavSportId, title: string) {
  if (sport === "football") return cleanFootballDisplayTitle(title);
  if (sport === "basketball" || sport === "nba") return cleanBasketballDisplayTitle(title);
  if (sport === "formula-1") return cleanF1DisplayTitle(title);
  return cleanGenericSportDisplayTitle(title);
}

export function CfaNavSportRecapSlideshow({
  sport,
  label,
  mode = "highlights",
  theme,
  emptyLabel = "No recent games"
}: CfaNavSportRecapSlideshowProps) {
  const [feed, setFeed] = useState<NavSportsRecapFeed | null>(null);
  const [index, setIndex] = useState(0);

  const load = useCallback(async () => {
    const params = new URLSearchParams({ sport, mode });
    const next = await fetchNavSportsRecapFeed(`/api/games/nav-sports-recap?${params.toString()}`);
    if (next) setFeed(next);
  }, [sport, mode]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const clips = (feed?.all ?? []).filter(
    (clip) => Boolean(clip.youtubeId) && clip.sport === sport
  );
  const activeClip = clips[index % clips.length];

  useEffect(() => {
    if (clips.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % clips.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [clips.length]);

  useEffect(() => {
    if (index >= clips.length) setIndex(0);
  }, [clips.length, index]);

  if (!feed) {
    return (
      <div className="cfa-football-pitch-slideshow cfa-football-pitch-slideshow--empty">
        <p>Loading {label.toLowerCase()}…</p>
      </div>
    );
  }

  if (!activeClip) {
    return (
      <div className="cfa-football-pitch-slideshow cfa-football-pitch-slideshow--empty">
        <p>{emptyLabel}</p>
      </div>
    );
  }

  const displayTitle = cleanClipTitle(sport, activeClip.title);
  const rootClass = `cfa-football-pitch-slideshow${theme === "f1" ? " cfa-f1-recap-slideshow" : ""}`;
  const hudClass = `cfa-football-pitch-slideshow-hud${theme === "f1" ? " cfa-f1-recap-slideshow-hud" : ""}`;

  return (
    <div className={rootClass} aria-label={`${label} highlight slideshow`}>
      <div className="cfa-football-pitch-slideshow-reel" aria-hidden="true">
        {clips.map((clip, clipIndex) => (
          <RecapScene key={clip.id} clip={clip} active={clipIndex === index % clips.length} />
        ))}
        <div
          className={`cfa-football-pitch-slideshow-veil${theme === "f1" ? " cfa-f1-recap-slideshow-veil" : ""}`}
        />
        <div className="cfa-football-pitch-slideshow-grain" />
      </div>

      <div className={hudClass}>
        <span className="cfa-football-pitch-slideshow-kicker">{feed.windowLabel}</span>
        <span className="cfa-football-pitch-slideshow-match">
          {displayTitle} · {activeClip.scoreline}
        </span>
        <span className="cfa-football-pitch-slideshow-meta">{activeClip.meta}</span>
        <div className="cfa-football-pitch-slideshow-dots">
          {clips.map((clip, clipIndex) => (
            <span
              key={clip.id}
              className={`cfa-football-pitch-slideshow-dot${theme === "f1" ? " cfa-f1-recap-slideshow-dot" : ""}${
                clipIndex === index % clips.length ? " is-active" : ""
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RecapScene({ clip, active }: { clip: NavSportsRecapClip; active: boolean }) {
  const poster = clip.youtubeId ? youtubeThumbnail(clip.youtubeId) : undefined;

  return (
    <div className={`cfa-football-pitch-slideshow-scene${active ? " is-active" : ""}`}>
      {poster ? (
        <div
          className="cfa-football-pitch-slideshow-poster"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : null}
    </div>
  );
}