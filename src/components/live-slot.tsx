"use client";

import { useEffect, useRef, useState } from "react";

export type LiveSlotProps = {
  isLive?: boolean;
  viewers?: number;
  link: string;
  title?: string;
  subtext?: string;
  thumbnailSrc?: string;
  /** Small looped clip in the 16:9 frame · girl/host doing the live */
  videoSrc?: string;
  nextLiveLabel?: string;
  onNotify?: () => void;
  className?: string;
  id?: string;
};

const DEFAULT_TITLE = "Arena Flash Live: Drop Exclusivo | Solo hoy";
const DEFAULT_SUBTEXT = "Backstage con los artistas + merch limitada";
const DEFAULT_NEXT_LIVE = "El próximo LIVE: Viernes 8PM";

function formatViewerCount(viewers: number) {
  return new Intl.NumberFormat("es-EC").format(viewers);
}

export function LiveSlot({
  isLive = true,
  viewers = 1247,
  link,
  title = DEFAULT_TITLE,
  subtext = DEFAULT_SUBTEXT,
  thumbnailSrc = "/ecuador-room-gaming-party.png",
  videoSrc,
  nextLiveLabel = DEFAULT_NEXT_LIVE,
  onNotify,
  className = "",
  id = "arena-live-slot"
}: LiveSlotProps) {
  const [notified, setNotified] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLive || !videoSrc) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      /* autoplay blocked until gesture */
    });
  }, [isLive, videoSrc]);

  const openLive = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleNotify = () => {
    setNotified(true);
    onNotify?.();
  };

  return (
    <section
      id={id}
      className={`live-slot-root mx-auto w-full max-w-xl rounded-2xl border border-[#fcd116]/35 bg-[#040a08]/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-5 ${className}`.trim()}
      aria-label={isLive ? title : nextLiveLabel}
    >
      {isLive ? (
        <div className="mb-3 flex animate-pulse items-center justify-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
          </span>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-red-400 sm:text-xs">
            LIVE AHORA
          </p>
        </div>
      ) : null}

      <header className="text-center">
        <h2 className="text-base font-black leading-snug text-[#fef9c3] sm:text-lg">{title}</h2>
        <p className="mt-1.5 text-sm leading-6 text-[#d4d4d8]">{subtext}</p>
        {isLive ? (
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#fef08a]">
            {formatViewerCount(viewers)} viendo ahora
          </p>
        ) : (
          <p className="mt-3 text-sm font-semibold text-[#fcd116]">{nextLiveLabel}</p>
        )}
      </header>

      {isLive ? (
        <>
          <button
            type="button"
            onClick={openLive}
            className="group relative mt-4 block w-full overflow-hidden rounded-xl border border-[#fcd116]/30 bg-[#0a1410] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fcd116]"
            aria-label={`Reproducir live · ${title}`}
          >
            <span className="relative block aspect-video w-full">
              {videoSrc ? (
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={videoSrc}
                  poster={thumbnailSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
              ) : (
                <img
                  src={thumbnailSrc}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-[#040a08]/80 via-[#040a08]/20 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#fcd116]/50 bg-[#040a08]/75 text-[#fef9c3] shadow-[0_0_24px_rgba(252,209,22,0.25)] backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#fcd116] sm:h-16 sm:w-16">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={openLive}
            className="mt-4 w-full rounded-xl border border-[#fcd116]/45 bg-gradient-to-r from-[#ce1126]/90 to-[#fcd116]/25 px-4 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-[#fef9c3] shadow-[0_0_22px_rgba(206,17,38,0.25)] transition hover:border-[#fcd116] hover:brightness-110 active:scale-[0.99]"
          >
            Unirse al LIVE
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={handleNotify}
          disabled={notified}
          className="mt-4 w-full rounded-xl border border-[#fcd116]/35 bg-[#0a1410]/80 px-4 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-[#fef08a] transition hover:border-[#fcd116]/55 disabled:cursor-default disabled:opacity-80"
        >
          {notified ? "✓ Te notificaremos" : "Notificarme"}
        </button>
      )}
    </section>
  );
}
