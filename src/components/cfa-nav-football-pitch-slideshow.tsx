"use client";

import { useCallback, useEffect, useState } from "react";
import type { NavSportsRecapClip, NavSportsRecapFeed } from "@/lib/nav-sports-recap-feed";
import { fetchNavSportsRecapFeed } from "@/lib/nav-sports-recap-client";
import { cleanFootballDisplayTitle, youtubeThumbnail } from "@/lib/sports-highlight-youtube";

const ROTATE_MS = 6000;
const POLL_MS = 10 * 60 * 1000;

const EMPTY_FEED: NavSportsRecapFeed = {
  fetchedAt: "",
  windowLabel: "",
  today: [],
  tomorrow: [],
  all: []
};

export function CfaNavFootballPitchSlideshow() {
  const [feed, setFeed] = useState<NavSportsRecapFeed | null>(null);
  const [index, setIndex] = useState(0);
  const load = useCallback(async () => {
    const next = await fetchNavSportsRecapFeed(
      "/api/games/nav-sports-recap?sport=football&mode=pitch-slideshow"
    );
    if (next) setFeed(next);
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const clips = (feed?.all ?? []).filter((clip) => Boolean(clip.youtubeId));
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
        <p>Loading pitch recaps…</p>
      </div>
    );
  }

  if (!activeClip) {
    return (
      <div className="cfa-football-pitch-slideshow cfa-football-pitch-slideshow--empty">
        <p>No football pitch highlights today</p>
      </div>
    );
  }

  const displayTitle = cleanFootballDisplayTitle(activeClip.title);

  return (
    <div className="cfa-football-pitch-slideshow" aria-label="Football - Recaps highlight slideshow">
      <div className="cfa-football-pitch-slideshow-reel" aria-hidden="true">
        {clips.map((clip, clipIndex) => (
          <PitchScene key={clip.id} clip={clip} active={clipIndex === index % clips.length} />
        ))}
        <div className="cfa-football-pitch-slideshow-veil" />
        <div className="cfa-football-pitch-slideshow-grain" />
      </div>

      <div className="cfa-football-pitch-slideshow-hud">
        <span className="cfa-football-pitch-slideshow-kicker">{feed.windowLabel}</span>
        <span className="cfa-football-pitch-slideshow-match">
          {displayTitle} · {activeClip.scoreline}
        </span>
        <span className="cfa-football-pitch-slideshow-meta">{activeClip.meta}</span>
        <div className="cfa-football-pitch-slideshow-dots">
          {clips.map((clip, clipIndex) => (
            <span
              key={clip.id}
              className={`cfa-football-pitch-slideshow-dot${
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

function PitchScene({ clip, active }: { clip: NavSportsRecapClip; active: boolean }) {
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