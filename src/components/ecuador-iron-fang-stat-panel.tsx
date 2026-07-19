"use client";

import { useEffect, useRef } from "react";
import type {
  EcuadorIronFangStatPanel,
  EcuadorRoomGameSelection,
  EcuadorRoomPlayableGame
} from "@/lib/ecuador-country";

type EcuadorIronFangStatPanelCardProps = {
  panel: EcuadorIronFangStatPanel;
  onPlayGame?: (gameId: EcuadorRoomPlayableGame) => void;
  onLaunchFootball?: () => void;
};

/** Ecuador room · professional live activity cards */
export function EcuadorIronFangStatPanelCard({
  panel,
  onPlayGame,
  onLaunchFootball
}: EcuadorIronFangStatPanelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const interactive = Boolean(panel.gameId || panel.footballLane);
  const statusLabel = panel.statusLabel ?? (panel.videoSrc ? "En vivo" : "Listo");
  const cta = panel.cta ?? (interactive ? "Entrar" : undefined);

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

  // Use div + role (not <button>) so video/media markup never triggers invalid nesting
  // or browser DOM rewrites that show up as hydration text mismatches.
  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      className={`ecuador-iron-fang-stat-panel ecuador-stat-panel-card ecuador-stat-panel-card--pro a2030-holo-panel rounded-[1.25rem] border border-[#fcd116]/28 bg-[#040a08]/75 p-0 text-left${
        interactive ? " ecuador-stat-panel--playable" : ""
      }`}
    >
      <div className="ecuador-stat-panel-card-head flex items-start justify-between gap-2 px-4 pb-0 pt-4">
        <div className="min-w-0">
          <p className="ecuador-iron-fang-kicker text-[9px] font-black uppercase tracking-[0.16em] text-[#fcd116]/90">
            {panel.kicker}
          </p>
          <p className="ecuador-iron-fang-stat-title mt-1 text-base font-black tracking-tight text-[#fef9c3] sm:text-lg">
            {panel.title}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] ${
            statusLabel === "En vivo" || statusLabel === "Live"
              ? "border-[#00c9a7]/40 bg-[#00c9a7]/12 text-[#67e8f9]"
              : "border-white/15 bg-white/5 text-[#c5cfe8]"
          }`}
        >
          {statusLabel === "En vivo" || statusLabel === "Live" ? "● En vivo" : statusLabel}
        </span>
      </div>

      <div className="ecuador-stat-panel-card-media px-4 pt-3">
        {panel.videoSrc ? (
          <div className="ecuador-stat-panel-game-video-wrap overflow-hidden rounded-xl border border-white/10">
            <video
              ref={videoRef}
              className="ecuador-stat-panel-game-video"
              src={panel.videoSrc}
              poster={panel.posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${panel.title} preview`}
            />
          </div>
        ) : panel.posterSrc ? (
          <div className="ecuador-stat-panel-game-video-wrap overflow-hidden rounded-xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={panel.posterSrc}
              alt=""
              className="ecuador-stat-panel-game-video h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>

      <div className="ecuador-stat-panel-card-foot space-y-3 px-4 pb-4 pt-3">
        <p className="ecuador-iron-fang-stat-detail ecuador-stat-panel-card-detail text-[12px] leading-5 text-[#c5cfe8]">
          {panel.detail}
        </p>
        {interactive && cta ? (
          <span className="ecuador-stat-panel-play-cta inline-flex items-center gap-1.5 rounded-full border border-[#fcd116]/35 bg-[#fcd116]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#fcd116]">
            {cta}
            <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export type { EcuadorRoomGameSelection };
