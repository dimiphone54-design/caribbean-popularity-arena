"use client";

import Link from "next/link";
import { type MouseEvent } from "react";

export const AI_POWERHOUSE_ROOM_HREF = "/rooms/ai-powerhouse-room";

export const AI_POWERHOUSE_TAB_HASH = "ai-powerhouse";

export const AI_POWERHOUSE_TAB_HASH_BY_ISLAND_CODE: Record<string, string> = {
  UK: AI_POWERHOUSE_TAB_HASH,
  CN: AI_POWERHOUSE_TAB_HASH,
  JP: AI_POWERHOUSE_TAB_HASH,
  CO: AI_POWERHOUSE_TAB_HASH,
  EC: AI_POWERHOUSE_TAB_HASH,
  TT: AI_POWERHOUSE_TAB_HASH,
  ES: AI_POWERHOUSE_TAB_HASH
};

type ArenaSlotAiPowerhouseTabProps = {
  mode: "link";
  roomHref?: string;
  label?: string;
  onNavigate?: () => void;
};

export function ArenaSlotAiPowerhouseTab(props: ArenaSlotAiPowerhouseTabProps) {
  const href = props.roomHref ?? AI_POWERHOUSE_ROOM_HREF;

  return (
    <section className="w-full px-1" aria-label="AI Powerhouse · enter room">
      <Link
        href={href}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.stopPropagation();
          props.onNavigate?.();
        }}
        className="group block overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 via-[#030712]/90 to-blue-900/20 transition-all hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
      >
        <div className="grid sm:grid-cols-[240px_1fr]">
          <div
            className="h-40 w-full bg-cover bg-center sm:h-full"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80")' }}
            aria-hidden="true"
          />
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              <h3 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wider text-cyan-300 sm:text-3xl">
                AI POWERHOUSE
              </h3>
              <span className="ml-auto rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-200 transition group-hover:bg-cyan-400/20">
                Enter →
              </span>
            </div>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400/70">
              The World&apos;s AI &amp; Work Powerhouse · Global
            </p>
            <p className="mt-3 text-sm leading-6 text-white/60">
              One powerhouse, every nation. Post a job or offer your skills, sell what you built with AI, and prove your wins — talent from every country, all in one place. Tap to enter.
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}