"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArenaLoungeGlitchLabel } from "@/components/arena-lounge-glitch-label";
import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";
import { InternationalSuiteNav } from "@/components/international-suite-nav";
import { arenaLoungeRooms, type ArenaLoungeRoom } from "@/lib/arena-lounge-rooms";
import { getInternationalSuiteNavHint } from "@/lib/international-suite";

type ArenaLoungeScrollPanelProps = {
  variant?: "nav" | "hero";
};

type LoungeRoomLinkProps = {
  room: ArenaLoungeRoom;
  navEffects: boolean;
};

function LoungeRoomLink({ room, navEffects }: LoungeRoomLinkProps) {
  const [hover, setHover] = useState(false);
  const frosted = room.frostFrozen === true;

  return (
    <Link
      href={room.href}
      className={`a2030-lounge-panel-link a2030-micro inline-flex shrink-0 px-4 ${
        frosted
          ? "a2030-lounge-frost-link"
          : `a2030-lounge-gold-link${navEffects ? " a2030-lounge-gold-link--nav" : ""}`
      } ${
        navEffects
          ? "a2030-lounge-trace-item flex-row items-center justify-center gap-0 py-0 text-[11px] font-bold uppercase tracking-[0.1em]"
          : "min-w-[10.5rem] flex-col items-start gap-1 py-3 text-left"
      }`}
      onMouseEnter={() => navEffects && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => navEffects && setHover(true)}
      onBlur={() => setHover(false)}
    >
      {frosted ? <ArenaSlotIceFrostOverlay variant="full" hideStamp /> : null}
      {navEffects ? (
        <ArenaLoungeGlitchLabel
          text={room.label}
          active={hover && !frosted}
          className={frosted ? "a2030-lounge-glitch-label a2030-lounge-frost-label" : "a2030-lounge-glitch-label a2030-lounge-gold-label"}
        />
      ) : (
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.1em]${frosted ? " a2030-lounge-frost-label" : " a2030-lounge-gold-label"}`}
        >
          {room.label}
        </span>
      )}
      {!navEffects ? (
        <span
          className={`text-[10px] font-semibold leading-5${frosted ? " a2030-lounge-frost-label text-[#8fa3c4]" : " a2030-lounge-gold-hint"}`}
        >
          {room.hint}
        </span>
      ) : null}
    </Link>
  );
}

export function ArenaLoungeScrollPanel({ variant = "nav" }: ArenaLoungeScrollPanelProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hero = variant === "hero";
  const navEffects = !hero;

  const scrollTrack = (direction: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: direction === "right" ? 220 : -220,
      behavior: "smooth"
    });
  };

  return (
    <div
      className={`a2030-lounge-jackpot-pulse${hero ? " a2030-lounge-jackpot-pulse--hero" : " a2030-lounge-jackpot-pulse--nav"}`}
    >
      <span className="a2030-lounge-jackpot-pulse-ring" aria-hidden="true" />
      <div
        className={`${
          hero
            ? "a2030-holo-panel a2030-lounge-scroll-shell-hero mt-3 max-w-full rounded-xl p-3 sm:p-4"
            : "a2030-lounge-scroll-shell a2030-lounge-scroll-shell-nav hidden md:block max-w-[min(46rem,calc(100vw-22rem))]"
        }`}
      >
        {hero ? (
          <p className="a2030-micro a2030-lounge-jackpot-pulse-kicker text-[10px] font-bold uppercase text-[#00f5ff]">
            Lounges // slide sideways · pick a room
          </p>
        ) : null}

        <div className={`a2030-lounge-scroll-wrap${hero ? " mt-3" : ""}`}>
        <button
          type="button"
          onClick={() => scrollTrack("left")}
          className="a2030-lounge-scroll-arrow a2030-lounge-scroll-arrow-left"
          aria-label="Scroll rooms left"
        >
          ◀
        </button>

        <div ref={trackRef} className="a2030-lounge-scroll-track">
          <div
            className={`a2030-lounge-panel a2030-lounge-panel-scroll inline-flex min-w-max${
              navEffects ? " a2030-lounge-panel-nav" : ""
            }`}
          >
            {arenaLoungeRooms.slice(0, 3).map((room) => (
              <LoungeRoomLink key={room.id} room={room} navEffects={navEffects} />
            ))}
            <InternationalSuiteNav
              panelLink={hero}
              traceItem={navEffects}
              heroHint={hero ? getInternationalSuiteNavHint() : undefined}
            />
            {arenaLoungeRooms.slice(3).map((room) => (
              <LoungeRoomLink key={room.id} room={room} navEffects={navEffects} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTrack("right")}
          className="a2030-lounge-scroll-arrow a2030-lounge-scroll-arrow-right"
          aria-label="Scroll rooms right"
        >
          ▶
        </button>
      </div>

      {hero ? (
        <p className="a2030-lounge-jackpot-pulse-foot mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a82a8]">
          Swipe or use ◀ ▶ · slide from one room to the next
        </p>
      ) : null}
      </div>
    </div>
  );
}
