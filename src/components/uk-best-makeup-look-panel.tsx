"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import {
  UkBestMakeupAutoQueuePanel,
  useUkBestMakeupAutoQueue
} from "@/components/uk-best-makeup-auto-queue";
import { UkBestMakeupGoLiveForm } from "@/components/uk-best-makeup-go-live-form";
import { UkGamesAgeGateBanner, useUkGamesPlayAllowed } from "@/components/uk-games-age-gate";
import { ukBestMakeupLookEdition } from "@/lib/uk-best-makeup-look";

/**
 * UK room · Best Makeup Look · Bella · Hyde Park Edition
 * Public free: live host + auto queue + watch/apply · money catalog in Command Center FREEZE COMING SOON
 */
export function UkBestMakeupLookPanel() {
  const e = ukBestMakeupLookEdition;
  const [watchOpen, setWatchOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const queueApi = useUkBestMakeupAutoQueue();
  const { allowed, ready } = useUkGamesPlayAllowed();
  const playLocked = !ready || !allowed;

  const liveHost = queueApi.liveHost;
  const hostFirst = liveHost?.firstName ?? e.hostFirstName;
  const hostArea = liveHost?.liveFrom ?? e.area;

  return (
    <section
      id="uk-best-makeup-look"
      className="country-room-section w-full scroll-mt-28"
      aria-label="UK Best Makeup Look · Bella Hyde Park Edition"
    >
      <div className="a2030-holo-panel relative overflow-hidden rounded-[1.25rem] border border-[#ff2bd6]/30 bg-[linear-gradient(155deg,rgba(26,0,20,0.92),rgba(8,4,18,0.94))] p-3 shadow-[0_0_36px_rgba(255,43,214,0.12)] sm:p-4">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,43,214,0.16),transparent_48%),radial-gradient(circle_at_88%_100%,rgba(215,180,106,0.1),transparent_42%)]"
          aria-hidden="true"
        />

        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff2bd6] sm:text-xs">
              {e.kicker}
            </p>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-[#ff2bd6]/35 bg-[#ff2bd6]/12 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#fce7f3]"
              suppressHydrationWarning
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff2bd6]" aria-hidden="true" />
              {queueApi.isLive ? `Live · ${queueApi.countdownLabel}` : "Queue open"}
            </span>
          </div>

          <div className="rounded-xl border border-[#ff2bd6]/20 bg-[#0a0010]/55 p-3">
            <div className="flex items-start gap-3">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ff2bd6]/40 bg-[#1a0020] text-2xl"
                aria-hidden="true"
              >
                💄
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-black text-[#fef9c3] sm:text-lg">
                  {liveHost
                    ? `${liveHost.firstName} · ${liveHost.isSeedHost ? "Hyde Park Edition" : liveHost.liveFrom}`
                    : e.title}
                </h2>
                <p className="mt-0.5 text-[11px] font-semibold text-[#ff2bd6]" suppressHydrationWarning>
                  {queueApi.isLive
                    ? `💄 Live · ${queueApi.countdownLabel} left · 18+`
                    : "💄 Slot open · next applicant goes live now · 18+"}
                </p>
                <p className="mt-1.5 text-[11px] leading-5 text-[#c4b5d4]">
                  {liveHost
                    ? `${liveHost.fullName} · ${liveHost.makeupStyle} · ${liveHost.liveFrom}`
                    : e.lead}
                </p>
              </div>
            </div>
          </div>

          <UkGamesAgeGateBanner compact />

          {/* Working auto live queue · free · money (vote/gifts/boosts) → Command Center freeze */}
          <UkBestMakeupAutoQueuePanel
            api={queueApi}
            playLocked={playLocked}
            onApply={() => setApplyOpen(true)}
          />

          <div className="rounded-xl border border-[#ff2bd6]/18 bg-[#1a0020]/50 px-3 py-2.5">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#f9a8d4]">
              {e.premiumHeading}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5" role="list">
              {e.premium.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-[#ff2bd6]/25 bg-[#ff2bd6]/8 px-2.5 py-1 text-[10px] font-semibold text-[#fce7f3]"
                  role="listitem"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (playLocked || !queueApi.isLive) return;
                setWatchOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#ff2bd6]/45 bg-[#ff2bd6]/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#fef9c3] transition hover:border-[#ff2bd6]/70 hover:bg-[#ff2bd6]/25 disabled:cursor-not-allowed disabled:opacity-55"
              aria-disabled={playLocked || !queueApi.isLive}
            >
              <span aria-hidden="true">✨</span>
              {playLocked
                ? `18+ to watch · ${hostFirst}`
                : queueApi.isLive
                  ? `Watch live · ${hostFirst}`
                  : "Waiting for next live"}
            </button>
            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#67e8f9]/40 bg-[#67e8f9]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#e0f2fe] transition hover:border-[#67e8f9]/65 hover:bg-[#67e8f9]/18"
            >
              Apply to go live · makeup
            </button>
            {queueApi.isLive ? (
              <span className="rounded-full border border-[#b8ff3c]/30 bg-[#b8ff3c]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#d9f99d]">
                {queueApi.countdownLabel} left
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <UkBestMakeupGoLiveForm
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        onJoined={(entry) => queueApi.joinQueue(entry)}
      />

      {watchOpen && allowed && queueApi.isLive && liveHost ? (
        <CotswoldsGameSimulator
          gameName="Best Makeup Look"
          host={`${liveHost.firstName} · ${hostArea}`}
          onClose={() => setWatchOpen(false)}
        />
      ) : null}
    </section>
  );
}
