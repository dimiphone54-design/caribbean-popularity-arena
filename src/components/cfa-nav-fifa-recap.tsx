"use client";

import { useCallback, useEffect, useState } from "react";
import type { FifaRecapStyle } from "@/lib/football-fifa-nav-recap";
import {
  formatNavSportsKickoff,
  type NavSportsRecapClip,
  type NavSportsRecapFeed,
  type NavSportsRecapMode,
  type NavSportsRecapSportFilter
} from "@/lib/nav-sports-recap-feed";
import { youtubeEmbedSrc, youtubeThumbnail } from "@/lib/sports-highlight-youtube";

const ROTATE_MS = 5200;
const POLL_MS = 10 * 60 * 1000;

const EMPTY_RECAP_FEED: NavSportsRecapFeed = {
  fetchedAt: "",
  windowLabel: "",
  today: [],
  tomorrow: [],
  all: []
};

type CfaNavFifaRecapProps = {
  style: FifaRecapStyle;
  compact?: boolean;
  sportFilter?: NavSportsRecapSportFilter;
  recapMode?: NavSportsRecapMode;
  emptyLabel?: string;
};

export function CfaNavFifaRecap({
  style,
  compact = true,
  sportFilter = "all",
  recapMode = "default",
  emptyLabel = "No games played today or scheduled tomorrow"
}: CfaNavFifaRecapProps) {
  const [feed, setFeed] = useState<NavSportsRecapFeed | null>(null);
  const [todayIndex, setTodayIndex] = useState(0);
  const [tomorrowIndex, setTomorrowIndex] = useState(0);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (sportFilter && sportFilter !== "all") {
        params.set("sport", sportFilter);
      }
      if (recapMode === "highlights") {
        params.set("mode", "highlights");
      }
      const query = params.toString() ? `?${params.toString()}` : "";
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20000);
      const res = await fetch(`/api/games/nav-sports-recap${query}`, {
        cache: "no-store",
        signal: controller.signal
      });
      window.clearTimeout(timeout);
      if (!res.ok) {
        setFeed((current) => current ?? EMPTY_RECAP_FEED);
        return;
      }
      setFeed((await res.json()) as NavSportsRecapFeed);
    } catch {
      setFeed((current) => current ?? EMPTY_RECAP_FEED);
    }
  }, [sportFilter, recapMode]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const highlightsOnly = recapMode === "highlights";
  const todayClips = highlightsOnly
    ? (feed?.today ?? []).filter((clip) => Boolean(clip.youtubeId))
    : (feed?.today ?? []);
  const tomorrowClips = highlightsOnly ? [] : (feed?.tomorrow ?? []);
  const todayClip = todayClips[todayIndex] ?? todayClips[0];
  const tomorrowClip = tomorrowClips[tomorrowIndex] ?? tomorrowClips[0];
  const heroClip = todayClip ?? tomorrowClip;

  const advance = useCallback(() => {
    if (todayClips.length > 1) {
      setTodayIndex((value) => (value + 1) % todayClips.length);
    }
    if (!highlightsOnly && tomorrowClips.length > 1) {
      setTomorrowIndex((value) => (value + 1) % tomorrowClips.length);
    }
  }, [todayClips.length, tomorrowClips.length, highlightsOnly]);

  useEffect(() => {
    if (!heroClip) return;
    const timer = window.setInterval(advance, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [heroClip, advance]);

  if (!feed) {
    return (
      <div className={`cfa-nav-fifa-recap cfa-nav-fifa-recap--${style} cfa-nav-fifa-recap--empty`}>
        <p className="cfa-nav-fifa-recap-empty">Loading today&apos;s game recaps…</p>
      </div>
    );
  }

  if (!heroClip) {
    return (
      <div className={`cfa-nav-fifa-recap cfa-nav-fifa-recap--${style} cfa-nav-fifa-recap--empty`}>
        <p className="cfa-nav-fifa-recap-empty">{emptyLabel}</p>
      </div>
    );
  }

  const rootClass = `cfa-nav-fifa-recap cfa-nav-fifa-recap--${style}${compact ? " cfa-nav-fifa-recap--compact" : ""}`;

  switch (style) {
    case "arena-tv":
      return (
        <div className={rootClass} aria-label="Sports recap · arena TV">
          <ArenaTvRecap clip={heroClip} feed={feed} />
        </div>
      );
    case "cinematic":
      return (
        <div className={rootClass} aria-label="Sports recap · cinematic">
          <CinematicRecap clip={heroClip} feed={feed} />
        </div>
      );
    case "split-pip":
      return (
        <div className={rootClass} aria-label="Sports recap · split picture in picture">
          <SplitPipRecap todayClip={todayClip} tomorrowClip={tomorrowClip} feed={feed} />
        </div>
      );
    case "ticker":
      return (
        <div className={rootClass} aria-label="Sports recap · ticker">
          <TickerRecap clip={heroClip} feed={feed} />
        </div>
      );
    case "card-stack":
      return (
        <div className={rootClass} aria-label="Sports recap · card stack">
          <CardStackRecap
            todayClip={todayClip}
            tomorrowClip={tomorrowClip}
            todayIndex={todayIndex}
            tomorrowIndex={tomorrowIndex}
            feed={feed}
          />
        </div>
      );
    default:
      return null;
  }
}

function RecapMedia({ clip, className }: { clip: NavSportsRecapClip; className?: string }) {
  if (clip.youtubeId) {
    return (
      <iframe
        key={clip.id}
        className={className}
        src={youtubeEmbedSrc(clip.youtubeId)}
        title={`${clip.title} highlights`}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return <RecapCrestFallback clip={clip} className={className} />;
}

function RecapCrestFallback({ clip, className }: { clip: NavSportsRecapClip; className?: string }) {
  return (
    <div className={`cfa-nav-fifa-recap-crest-fallback${className ? ` ${className}` : ""}`}>
      {clip.homeLogo ? <img src={clip.homeLogo} alt="" className="cfa-nav-fifa-recap-crest" /> : null}
      {clip.awayLogo ? <img src={clip.awayLogo} alt="" className="cfa-nav-fifa-recap-crest" /> : null}
      <span className="cfa-nav-fifa-recap-crest-label">{clip.title}</span>
    </div>
  );
}

function ClipMeta({ clip, dense }: { clip: NavSportsRecapClip; dense?: boolean }) {
  return (
    <div className={`cfa-nav-fifa-recap-meta${dense ? " cfa-nav-fifa-recap-meta--dense" : ""}`}>
      <span className="cfa-nav-fifa-recap-badge">
        {clip.status === "recap" ? "RECAP" : "UPCOMING"}
      </span>
      <span className="cfa-nav-fifa-recap-match">
        {clip.title} · {clip.scoreline}
      </span>
      <span className="cfa-nav-fifa-recap-line">{clip.recapLine}</span>
      {!dense && clip.kickoff ? (
        <span className="cfa-nav-fifa-recap-time">{formatNavSportsKickoff(clip.kickoff)}</span>
      ) : null}
    </div>
  );
}

function ArenaTvRecap({ clip, feed }: { clip: NavSportsRecapClip; feed: NavSportsRecapFeed }) {
  return (
    <>
      <header className="cfa-nav-fifa-recap-tv-head">
        <span>Today&apos;s games</span>
        <span className="cfa-nav-fifa-recap-tv-rec">
          <span className="cfa-nav-fifa-recap-tv-rec-dot" aria-hidden="true" />
          {clip.status === "recap" ? "REC" : "NEXT"}
        </span>
      </header>
      <div className="cfa-nav-fifa-recap-tv-bezel">
        <div className="cfa-nav-fifa-recap-tv-viewport">
          <RecapMedia clip={clip} className="cfa-nav-fifa-recap-video" />
          <div className="cfa-nav-fifa-recap-tv-scan" aria-hidden="true" />
          <div className="cfa-nav-fifa-recap-tv-glare" aria-hidden="true" />
          <div className="cfa-nav-fifa-recap-tv-hud">
            <span>{clip.meta}</span>
            <span>
              {clip.title} · {clip.scoreline}
            </span>
          </div>
        </div>
      </div>
      <p className="cfa-nav-fifa-recap-window">{feed.windowLabel}</p>
    </>
  );
}

function CinematicRecap({ clip, feed }: { clip: NavSportsRecapClip; feed: NavSportsRecapFeed }) {
  return (
    <div className="cfa-nav-fifa-recap-cine-stage">
      <RecapMedia clip={clip} className="cfa-nav-fifa-recap-cine-video" />
      <div className="cfa-nav-fifa-recap-cine-letterbox cfa-nav-fifa-recap-cine-letterbox--top" aria-hidden="true" />
      <div className="cfa-nav-fifa-recap-cine-letterbox cfa-nav-fifa-recap-cine-letterbox--bottom" aria-hidden="true" />
      <div className="cfa-nav-fifa-recap-cine-grain" aria-hidden="true" />
      <div className="cfa-nav-fifa-recap-cine-lower">
        <span className="cfa-nav-fifa-recap-cine-kicker">{feed.windowLabel}</span>
        <span className="cfa-nav-fifa-recap-cine-score">
          {clip.title} · {clip.scoreline}
        </span>
        <span className="cfa-nav-fifa-recap-cine-line">{clip.meta}</span>
      </div>
    </div>
  );
}

function SplitPipRecap({
  todayClip,
  tomorrowClip,
  feed
}: {
  todayClip?: NavSportsRecapClip;
  tomorrowClip?: NavSportsRecapClip;
  feed: NavSportsRecapFeed;
}) {
  const focus = todayClip ?? tomorrowClip;
  if (!focus) return null;

  return (
    <div className="cfa-nav-fifa-recap-split">
      <div className="cfa-nav-fifa-recap-split-video">
        <RecapMedia clip={focus} className="cfa-nav-fifa-recap-split-media" />
        <span className="cfa-nav-fifa-recap-split-pip-label">{focus.meta}</span>
      </div>
      <div className="cfa-nav-fifa-recap-split-rail">
        <p className="cfa-nav-fifa-recap-split-rail-title">Today</p>
        {feed.today.length ? (
          feed.today.map((clip) => (
            <SplitRailRow key={clip.id} clip={clip} active={clip.id === todayClip?.id} />
          ))
        ) : (
          <p className="cfa-nav-fifa-recap-split-empty">No finals today</p>
        )}
        <p className="cfa-nav-fifa-recap-split-rail-title cfa-nav-fifa-recap-split-rail-title--tomorrow">
          Tomorrow
        </p>
        {feed.tomorrow.length ? (
          feed.tomorrow.map((clip) => (
            <SplitRailRow key={clip.id} clip={clip} active={clip.id === tomorrowClip?.id} upcoming />
          ))
        ) : (
          <p className="cfa-nav-fifa-recap-split-empty">Nothing scheduled</p>
        )}
      </div>
    </div>
  );
}

function SplitRailRow({
  clip,
  active,
  upcoming
}: {
  clip: NavSportsRecapClip;
  active?: boolean;
  upcoming?: boolean;
}) {
  return (
    <div
      className={`cfa-nav-fifa-recap-split-row${active ? " cfa-nav-fifa-recap-split-row--active" : ""}${
        upcoming ? " cfa-nav-fifa-recap-split-row--upcoming" : ""
      }`}
    >
      <span className="cfa-nav-fifa-recap-split-row-match">
        {clip.title} · {clip.scoreline}
      </span>
      <span className="cfa-nav-fifa-recap-split-row-meta">
        {clip.kickoff ? formatNavSportsKickoff(clip.kickoff) : clip.meta}
      </span>
    </div>
  );
}

function TickerRecap({ clip, feed }: { clip: NavSportsRecapClip; feed: NavSportsRecapFeed }) {
  const tickerItems = feed.all.map(
    (item) =>
      `${item.status === "recap" ? "▶ RECAP" : "◆ UPCOMING"} ${item.title} · ${item.scoreline} · ${item.meta}`
  );

  return (
    <div className="cfa-nav-fifa-recap-ticker-wrap">
      <div className="cfa-nav-fifa-recap-ticker-video">
        <RecapMedia clip={clip} className="cfa-nav-fifa-recap-ticker-media" />
        <ClipMeta clip={clip} dense />
      </div>
      <div className="cfa-nav-fifa-recap-ticker-band" aria-hidden="true">
        <div className="cfa-nav-fifa-recap-ticker-track">
          <span>{tickerItems.join("   ◆   ")}</span>
          <span>{tickerItems.join("   ◆   ")}</span>
        </div>
      </div>
    </div>
  );
}

function CardStackRecap({
  todayClip,
  tomorrowClip,
  todayIndex,
  tomorrowIndex,
  feed
}: {
  todayClip?: NavSportsRecapClip;
  tomorrowClip?: NavSportsRecapClip;
  todayIndex: number;
  tomorrowIndex: number;
  feed: NavSportsRecapFeed;
}) {
  const top = todayClip ?? tomorrowClip;
  if (!top) return null;

  const backClips = feed.all.filter((clip) => clip.id !== top.id).slice(0, 2);

  return (
    <div className="cfa-nav-fifa-recap-stack">
      {backClips.map((clip, index) => (
        <div
          key={clip.id}
          className="cfa-nav-fifa-recap-stack-card cfa-nav-fifa-recap-stack-card--back"
          style={{ transform: `translateY(${(index + 1) * 4}px) scale(${0.94 - index * 0.03})` }}
          aria-hidden="true"
        >
          <div
            className="cfa-nav-fifa-recap-stack-card-bg"
            style={{
              backgroundImage: clip.youtubeId
                ? `url(${youtubeThumbnail(clip.youtubeId)})`
                : undefined
            }}
          />
        </div>
      ))}
      <article className="cfa-nav-fifa-recap-stack-card cfa-nav-fifa-recap-stack-card--top">
        <RecapMedia clip={top} className="cfa-nav-fifa-recap-stack-video" />
        <div className="cfa-nav-fifa-recap-stack-scrim" aria-hidden="true" />
        <ClipMeta clip={top} />
        <div className="cfa-nav-fifa-recap-stack-dots" aria-hidden="true">
          {feed.today.map((_, index) => (
            <span
              key={`t-${index}`}
              className={`cfa-nav-fifa-recap-stack-dot${
                todayClip && index === todayIndex % feed.today.length ? " is-active" : ""
              }`}
            />
          ))}
          {feed.tomorrow.map((_, index) => (
            <span
              key={`m-${index}`}
              className={`cfa-nav-fifa-recap-stack-dot cfa-nav-fifa-recap-stack-dot--upcoming${
                !todayClip && index === tomorrowIndex % feed.tomorrow.length ? " is-active" : ""
              }`}
            />
          ))}
        </div>
      </article>
    </div>
  );
}