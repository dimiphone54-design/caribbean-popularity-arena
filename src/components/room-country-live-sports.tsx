"use client";

import { useCallback, useEffect, useState } from "react";
import type { RoomLiveSportsFeed } from "@/lib/api-sports-room-feed";

const POLL_MS = 5 * 60 * 1000;

export function useRoomLiveSportsFeed(roomSlug: string) {
  const [feed, setFeed] = useState<RoomLiveSportsFeed | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/games/room-live-sports/${roomSlug}`, { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as RoomLiveSportsFeed;
      if (json.events) setFeed(json);
    } catch {
      /* keep last feed */
    }
  }, [roomSlug]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  return feed;
}

type RoomCountryLiveSportsTickerProps = {
  feed: RoomLiveSportsFeed | null;
};

export function RoomCountryLiveSportsTicker({ feed }: RoomCountryLiveSportsTickerProps) {
  if (!feed?.events.length) return null;

  const liveCount = feed.events.filter((event) => event.status === "live").length;

  return (
    <div className="room-live-sports-ticker mt-4" aria-label={`${feed.countryName} live sports feed`}>
      <div className="room-live-sports-ticker-head">
        <span className="room-live-sports-ticker-badge">API-Sports</span>
        <p className="room-live-sports-ticker-title">
          {feed.flag} {feed.panelTitle}
        </p>
        <p className="room-live-sports-ticker-meta">
          {liveCount > 0 ? `${liveCount} en vivo · ` : ""}
          {feed.events.length} partidos · caché {Math.round(feed.cacheSeconds / 60)} min · {feed.requestsUsed}{" "}
          req/poll
        </p>
      </div>
      <div className="room-live-sports-ticker-track" role="list">
        {feed.events.map((event) => (
          <article
            key={event.id}
            role="listitem"
            className={`room-live-sports-ticker-card${
              event.status === "live" ? " room-live-sports-ticker-card--live" : ""
            }`}
          >
            <span className="room-live-sports-ticker-sport">{event.sport === "football" ? "⚽" : "🏐"}</span>
            <div className="min-w-0 flex-1">
              <p className="room-live-sports-ticker-match">{event.title}</p>
              <p className="room-live-sports-ticker-line">
                {event.status === "live" ? `🔴 ${event.scoreline}` : event.scoreline} · {event.meta}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}