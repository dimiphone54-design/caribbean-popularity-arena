"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIFA_HIGHLIGHTS_WINDOW_LABEL,
  getFifaHighlightClips,
  type FifaHighlightClip
} from "@/lib/football-fifa-highlights";

const CLIP_MS = 4800;

export function UkFootballFifaHighlightsMiniScreen() {
  const clips = getFifaHighlightClips();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const clip = clips[index] ?? clips[0];

  const nextClip = useCallback(() => {
    setIndex((value) => (value + 1) % clips.length);
  }, [clips.length]);

  useEffect(() => {
    if (!playing || clips.length <= 1) return;
    const timer = window.setInterval(nextClip, CLIP_MS);
    return () => window.clearInterval(timer);
  }, [playing, clips.length, nextClip]);

  if (!clip) return null;

  return (
    <aside className="uk-football-fifa-mini-screen" aria-label="FIFA highlights mini screen">
      <header className="uk-football-fifa-mini-screen-head">
        <span className="uk-football-fifa-mini-screen-kicker">Arena replay</span>
        <span className="uk-football-fifa-mini-screen-live">
          <span className="uk-football-fifa-mini-screen-live-dot" aria-hidden="true" />
          REC
        </span>
      </header>

      <div className="uk-football-fifa-mini-screen-bezel">
        <div className="uk-football-fifa-mini-screen-viewport">
          {clips.map((item, itemIndex) => (
            <HighlightFrame
              key={item.id}
              clip={item}
              active={itemIndex === index}
            />
          ))}
          <div className="uk-football-fifa-mini-screen-scan" aria-hidden="true" />
          <div className="uk-football-fifa-mini-screen-glare" aria-hidden="true" />
          <div className="uk-football-fifa-mini-screen-hud">
            <span className="uk-football-fifa-mini-screen-badge">{clip.mode}</span>
            <span className="uk-football-fifa-mini-screen-score">
              {clip.homeTeam} {clip.homeScore}–{clip.awayScore} {clip.awayTeam}
            </span>
          </div>
        </div>
      </div>

      <div className="uk-football-fifa-mini-screen-meta">
        <p className="uk-football-fifa-mini-screen-caption">{clip.highlightLine}</p>
        <p className="uk-football-fifa-mini-screen-date">{clip.playedLabel}</p>
      </div>

      <footer className="uk-football-fifa-mini-screen-foot">
        <p className="uk-football-fifa-mini-screen-window">{FIFA_HIGHLIGHTS_WINDOW_LABEL}</p>
        <div className="uk-football-fifa-mini-screen-controls">
          <button
            type="button"
            className="uk-football-fifa-mini-screen-btn"
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" className="uk-football-fifa-mini-screen-btn" onClick={nextClip}>
            Next
          </button>
        </div>
        <div className="uk-football-fifa-mini-screen-dots" role="tablist" aria-label="Highlight clips">
          {clips.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`${item.homeTeam} vs ${item.awayTeam}`}
              className={`uk-football-fifa-mini-screen-dot${itemIndex === index ? " uk-football-fifa-mini-screen-dot--active" : ""}`}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      </footer>
    </aside>
  );
}

function HighlightFrame({ clip, active }: { clip: FifaHighlightClip; active: boolean }) {
  const useStrip = Boolean(clip.flagStripUrl);

  return (
    <div
      className={`uk-football-fifa-mini-screen-frame${active ? " uk-football-fifa-mini-screen-frame--active" : ""}`}
      aria-hidden={!active}
    >
      <div
        className={`uk-football-fifa-mini-screen-media${useStrip ? " uk-football-fifa-mini-screen-media--strip" : ""}`}
        style={{ backgroundImage: `url(${clip.posterUrl})` }}
      />
      <div className="uk-football-fifa-mini-screen-frame-scrim" aria-hidden="true" />
      <p className="uk-football-fifa-mini-screen-league">{clip.league}</p>
    </div>
  );
}
