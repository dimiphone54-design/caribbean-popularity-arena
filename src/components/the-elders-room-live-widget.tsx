"use client";

import { TheEldersRoomLiveMovie } from "@/components/the-elders-room-live-movie";
import { eldersRoomMovieMeta } from "@/lib/elders-room-live-movie";
import { eldersRoomMeta } from "@/lib/the-elders-room";

/** Elders Room live showcase · community display only · no payment / gift checkout */
export function TheEldersRoomLiveWidget() {
  return (
    <div className="elders-room-live-widget">
      <div className="elders-room-live-widget-head">
        <span className="elders-room-live-badge">
          <span className="elders-room-live-badge-dot" aria-hidden="true" />
          Live
        </span>
        <p className="elders-room-live-widget-title">{eldersRoomMeta.name}</p>
        <p className="elders-room-live-widget-tier">
          Level {eldersRoomMeta.level} · community room
        </p>
      </div>

      <div className="elders-room-live-clip elders-room-live-clip-movie">
        <TheEldersRoomLiveMovie />
        <span className="elders-room-live-clip-tag">● LIVE · 10 in showcase</span>
        <span className="elders-room-live-clip-game">Showcase</span>
      </div>

      <p className="elders-room-live-headline">{eldersRoomMovieMeta.subtitle}</p>
      <p className="elders-room-live-detail">
        Creator showcase live stream · digital Elders Room · free community engagement
      </p>

      <p className="elders-room-live-match">
        <span aria-hidden="true">🇬🇧</span> 6 UK girls
        <span className="elders-room-live-match-arrow" aria-hidden="true">
          ×
        </span>
        <span aria-hidden="true">🇵🇱</span> 4 Poland · 18–29
      </p>

      <p className="elders-room-live-legal">
        Open community room — no purchase required. Browse and watch free.
      </p>
    </div>
  );
}
