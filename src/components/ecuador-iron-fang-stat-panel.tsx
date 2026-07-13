"use client";

import { useEffect, useRef } from "react";
import type { EcuadorIronFangStatPanel, EcuadorRoomGameSelection, EcuadorRoomPlayableGame } from "@/lib/ecuador-country";

type EcuadorIronFangStatPanelCardProps = {
  panel: EcuadorIronFangStatPanel;
  onPlayGame?: (gameId: EcuadorRoomPlayableGame) => void;
  onLaunchFootball?: () => void;
};

/** Ecuador · trending game stat card · small live game video preview */
export function EcuadorIronFangStatPanelCard({
  panel,
  onPlayGame,
  onLaunchFootball
}: EcuadorIronFangStatPanelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const interactive = Boolean(panel.gameId || panel.footballLane);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !panel.videoSrc) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      /* autoplay blocked until gesture */
    });
  }, [panel.videoSrc]);

  function handleClick() {
    if (panel.footballLane) {
      onLaunchFootball?.();
      return;
    }
    if (panel.gameId) {
      onPlayGame?.(panel.gameId);
    }
  }

  const CardTag = interactive ? "button" : "div";

  return (
    <CardTag
      type={interactive ? "button" : undefined}
      onClick={interactive ? handleClick : undefined}
      className={`ecuador-iron-fang-stat-panel ecuador-stat-panel-card a2030-holo-panel rounded-2xl border p-4 text-center${
        interactive ? " ecuador-stat-panel--playable" : ""
      }`}
    >
      <div className="ecuador-stat-panel-card-head">
        <p className="ecuador-iron-fang-kicker a2030-micro text-[10px] font-bold uppercase">{panel.kicker}</p>
        <p className="ecuador-iron-fang-stat-title mt-1 text-sm font-black text-white sm:text-base">{panel.title}</p>
      </div>

      <div className="ecuador-stat-panel-card-media">
        {panel.videoSrc ? (
          <div className="ecuador-stat-panel-game-video-wrap">
            <span className="ecuador-stat-panel-game-video-live" aria-hidden="true">
              ● EN VIVO
            </span>
            <video
              ref={videoRef}
              className="ecuador-stat-panel-game-video"
              src={panel.videoSrc}
              poster={panel.posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={`${panel.title} · juego en vivo`}
            />
          </div>
        ) : null}
      </div>

      <div className="ecuador-stat-panel-card-foot">
        <p className="ecuador-iron-fang-stat-detail ecuador-stat-panel-card-detail text-[11px] leading-5 text-[#d4d4d8]">
          {panel.detail}
        </p>
        {interactive ? (
          <p className="ecuador-stat-panel-play-cta mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#fcd116]">
            ▶ 1 tap · jugar en vivo
          </p>
        ) : null}
      </div>
    </CardTag>
  );
}

export type { EcuadorRoomGameSelection };
