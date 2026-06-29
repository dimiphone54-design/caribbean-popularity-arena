"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "@/components/uk-room-corner-scroll.css";

const SCROLL_STEP = 340;

type UkRoomCornerScrollProps = {
  hidden?: boolean;
};

export function UkRoomCornerScroll({ hidden = false }: UkRoomCornerScrollProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const repeatRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setVisible(max > 96);
    setProgress(max > 0 ? window.scrollY / max : 0);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollToRatio = useCallback((ratio: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, Math.min(1, ratio)) * max, behavior: draggingRef.current ? "auto" : "smooth" });
  }, []);

  const scrollByStep = useCallback((dir: -1 | 1) => {
    window.scrollBy({ top: dir * SCROLL_STEP, behavior: "smooth" });
  }, []);

  const startRepeat = useCallback(
    (dir: -1 | 1) => {
      scrollByStep(dir);
      if (repeatRef.current) window.clearInterval(repeatRef.current);
      repeatRef.current = window.setInterval(() => scrollByStep(dir), 120);
    },
    [scrollByStep]
  );

  const stopRepeat = useCallback(() => {
    if (repeatRef.current) {
      window.clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  }, []);

  const jumpFromClientY = useCallback(
    (clientY: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const usable = Math.max(rect.height, 1);
      scrollToRatio((clientY - rect.top) / usable);
    },
    [scrollToRatio]
  );

  useEffect(() => () => stopRepeat(), [stopRepeat]);

  if (hidden || !visible) return null;

  const thumbTop = `${Math.min(100, Math.max(0, progress * 100))}%`;

  return (
    <aside className="uk-room-corner-scroll" aria-label="UK room scroll">
      <div className="uk-room-corner-scroll-shell">
        <span className="uk-room-corner-scroll-badge" aria-hidden="true">
          🇬🇧
        </span>
        <button
          type="button"
          className="uk-room-corner-scroll-btn uk-room-corner-scroll-btn--up"
          aria-label="Scroll up"
          onClick={() => scrollByStep(-1)}
          onPointerDown={() => startRepeat(-1)}
          onPointerUp={stopRepeat}
          onPointerLeave={stopRepeat}
          onPointerCancel={stopRepeat}
        >
          ▲
        </button>

        <div
          ref={trackRef}
          className="uk-room-corner-scroll-track"
          role="scrollbar"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={(event) => {
            draggingRef.current = true;
            trackRef.current?.setPointerCapture(event.pointerId);
            jumpFromClientY(event.clientY);
          }}
          onPointerMove={(event) => {
            if (!draggingRef.current) return;
            jumpFromClientY(event.clientY);
          }}
          onPointerUp={(event) => {
            draggingRef.current = false;
            trackRef.current?.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            draggingRef.current = false;
          }}
        >
          <span className="uk-room-corner-scroll-track-glow" aria-hidden="true" />
          <span className="uk-room-corner-scroll-track-line" aria-hidden="true" />
          <button
            type="button"
            className="uk-room-corner-scroll-thumb"
            style={{ top: thumbTop }}
            aria-label="Drag to scroll UK room"
            onPointerDown={(event) => {
              event.stopPropagation();
              draggingRef.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!draggingRef.current) return;
              jumpFromClientY(event.clientY);
            }}
            onPointerUp={(event) => {
              draggingRef.current = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
          />
        </div>

        <button
          type="button"
          className="uk-room-corner-scroll-btn uk-room-corner-scroll-btn--down"
          aria-label="Scroll down"
          onClick={() => scrollByStep(1)}
          onPointerDown={() => startRepeat(1)}
          onPointerUp={stopRepeat}
          onPointerLeave={stopRepeat}
          onPointerCancel={stopRepeat}
        >
          ▼
        </button>
        <span className="uk-room-corner-scroll-label">SCROLL</span>
      </div>
    </aside>
  );
}
