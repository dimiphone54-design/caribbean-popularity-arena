"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  popularityArenaPreviewScenes,
  popularityPreviewSceneMs
} from "@/lib/popularity-arena-preview-reel";

export function CfaNavPopularityPreviewReel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flashOn, setFlashOn] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const advanceTimerRef = useRef<number | undefined>(undefined);

  const advanceScene = useCallback(() => {
    setActiveIndex((index) => {
      const next = (index + 1) % popularityArenaPreviewScenes.length;
      if (popularityArenaPreviewScenes[next]?.flash) {
        setFlashOn(true);
        window.setTimeout(() => setFlashOn(false), 220);
      }
      return next;
    });
  }, []);

  const scheduleFallbackAdvance = useCallback(() => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current);
    }
    advanceTimerRef.current = window.setTimeout(advanceScene, popularityPreviewSceneMs + 80);
  }, [advanceScene]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
        scheduleFallbackAdvance();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, scheduleFallbackAdvance]);

  return (
    <span className="cfa-nav-popularity-preview-reel" aria-hidden="true">
      {popularityArenaPreviewScenes.map((scene, index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={scene.id}
            className={`cfa-nav-popularity-preview-scene${isActive ? " is-active" : ""}`}
          >
            <video
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              className="cfa-nav-popularity-preview-media"
              src={scene.src}
              poster={scene.poster}
              muted
              playsInline
              preload={isActive ? "auto" : "metadata"}
              onEnded={isActive ? advanceScene : undefined}
            />
          </span>
        );
      })}
      <span className="cfa-nav-popularity-preview-veil" />
      <span className="cfa-nav-popularity-preview-scan" />
      <span className={`cfa-nav-popularity-preview-flash${flashOn ? " is-on" : ""}`} />
    </span>
  );
}