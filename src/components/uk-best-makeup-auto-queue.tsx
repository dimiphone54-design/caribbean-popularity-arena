"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MAKEUP_AUTO_SESSION_MS,
  createBellaLiveHost,
  formatMakeupSessionCountdown,
  queueEntryToLiveHost,
  sortMakeupQueueByVisibility,
  ukBestMakeupLookEdition,
  type UkMakeupLiveHost,
  type UkMakeupLiveQueueEntry
} from "@/lib/uk-best-makeup-look";

export type UkBestMakeupAutoQueueApi = {
  liveHost: UkMakeupLiveHost | null;
  isLive: boolean;
  remainingMs: number;
  countdownLabel: string;
  queue: UkMakeupLiveQueueEntry[];
  sortedQueue: UkMakeupLiveQueueEntry[];
  joinQueue: (entry: UkMakeupLiveQueueEntry) => void;
  boostEntry: (entryId: string, points: number, spendGbp: number) => void;
  /** Force end current hour → next verified creator goes live immediately */
  endSessionNow: () => void;
  sessionKey: number;
  /** False until after mount · use for any client-only chrome */
  mounted: boolean;
};

/**
 * Working auto live queue (hydration-safe):
 * - SSR + first client paint: Bella live · fixed 60:00 label (no Date.now in render)
 * - After mount: real countdown ticks · handoff at 00:00
 */
export function useUkBestMakeupAutoQueue(): UkBestMakeupAutoQueueApi {
  const [liveHost, setLiveHost] = useState<UkMakeupLiveHost | null>(() => createBellaLiveHost());
  /** null until mount — never read Date during SSR / first paint */
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(MAKEUP_AUTO_SESSION_MS);
  const [queue, setQueue] = useState<UkMakeupLiveQueueEntry[]>([]);
  const [sessionKey, setSessionKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  const queueRef = useRef(queue);
  const liveHostRef = useRef(liveHost);
  queueRef.current = queue;
  liveHostRef.current = liveHost;

  const startHost = useCallback((host: UkMakeupLiveHost) => {
    setLiveHost(host);
    setStartedAt(Date.now());
    setRemainingMs(MAKEUP_AUTO_SESSION_MS);
    setSessionKey((k) => k + 1);
  }, []);

  const clearLive = useCallback(() => {
    setLiveHost(null);
    setStartedAt(null);
    setRemainingMs(0);
  }, []);

  const promoteNext = useCallback(() => {
    const sorted = sortMakeupQueueByVisibility(queueRef.current);
    if (sorted.length === 0) {
      clearLive();
      return;
    }
    const [next, ...rest] = sorted;
    setQueue(rest);
    queueRef.current = rest;
    startHost(queueEntryToLiveHost(next));
  }, [clearLive, startHost]);

  // Start session clock only after mount (matches SSR HTML)
  useEffect(() => {
    setMounted(true);
    setStartedAt(Date.now());
    setRemainingMs(MAKEUP_AUTO_SESSION_MS);
  }, []);

  useEffect(() => {
    if (!mounted || startedAt === null || !liveHost) return;

    let ended = false;
    const tick = () => {
      if (ended) return;
      const left = Math.max(0, MAKEUP_AUTO_SESSION_MS - (Date.now() - startedAt));
      setRemainingMs(left);
      if (left === 0) {
        ended = true;
        promoteNext();
      }
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => {
      ended = true;
      window.clearInterval(id);
    };
  }, [mounted, startedAt, liveHost, promoteNext, sessionKey]);

  const joinQueue = useCallback(
    (entry: UkMakeupLiveQueueEntry) => {
      if (!liveHostRef.current) {
        startHost(queueEntryToLiveHost(entry));
        return;
      }
      setQueue((prev) => {
        const next = sortMakeupQueueByVisibility([...prev, entry]);
        queueRef.current = next;
        return next;
      });
    },
    [startHost]
  );

  const boostEntry = useCallback((entryId: string, points: number, spendGbp: number) => {
    setQueue((prev) => {
      const next = sortMakeupQueueByVisibility(
        prev.map((entry) =>
          entry.id === entryId
            ? {
                ...entry,
                visibilityPoints: entry.visibilityPoints + points,
                boostsPurchased: entry.boostsPurchased + 1,
                boostSpendGbp: entry.boostSpendGbp + spendGbp
              }
            : entry
        )
      );
      queueRef.current = next;
      return next;
    });
  }, []);

  const endSessionNow = useCallback(() => {
    if (!liveHostRef.current) return;
    promoteNext();
  }, [promoteNext]);

  const sortedQueue = useMemo(() => sortMakeupQueueByVisibility(queue), [queue]);

  /**
   * Hydration-safe live flag:
   * Host present + remaining time > 0. Do NOT require startedAt (null on SSR).
   * Countdown text stays fixed at full hour until mount starts the clock.
   */
  const isLive = Boolean(liveHost && remainingMs > 0);
  const countdownLabel = formatMakeupSessionCountdown(
    mounted && startedAt !== null ? remainingMs : liveHost ? MAKEUP_AUTO_SESSION_MS : 0
  );

  return {
    liveHost,
    isLive,
    remainingMs: mounted && startedAt !== null ? remainingMs : liveHost ? MAKEUP_AUTO_SESSION_MS : 0,
    countdownLabel,
    queue,
    sortedQueue,
    joinQueue,
    boostEntry,
    endSessionNow,
    sessionKey,
    mounted
  };
}

type UkBestMakeupAutoQueuePanelProps = {
  api: UkBestMakeupAutoQueueApi;
  playLocked: boolean;
  onApply: () => void;
};

/** Live host + countdown + working queue */
export function UkBestMakeupAutoQueuePanel({
  api,
  playLocked,
  onApply
}: UkBestMakeupAutoQueuePanelProps) {
  const e = ukBestMakeupLookEdition;
  const { liveHost, isLive, countdownLabel, sortedQueue, endSessionNow } = api;

  return (
    <div
      className="rounded-xl border border-[#b8ff3c]/28 bg-[#04120a]/75 px-3 py-3"
      aria-label="Auto live queue system"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#b8ff3c]">
          {e.queueHeading}
        </p>
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-red-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            Live
          </span>
        ) : (
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#94a3b8]">
            Open
          </span>
        )}
      </div>

      {liveHost && isLive ? (
        <div className="mt-3 rounded-xl border border-[#ff2bd6]/30 bg-[#0a0010]/70 p-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#ff2bd6]">
                On air now
              </p>
              <p className="mt-0.5 text-sm font-black text-[#fef9c3]">
                {liveHost.fullName}
                {liveHost.isSeedHost ? " · Hyde Park Edition" : ""}
              </p>
              <p className="mt-0.5 text-[11px] text-[#c4b5d4]">
                {liveHost.makeupStyle} · {liveHost.liveFrom}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#94a3b8]">
                Time left
              </p>
              <p
                className="font-['Bebas_Neue',sans-serif] text-3xl tracking-widest text-[#b8ff3c]"
                suppressHydrationWarning
              >
                {countdownLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={playLocked}
            onClick={endSessionNow}
            className="mt-2 rounded-full border border-[#b8ff3c]/40 bg-[#b8ff3c]/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#e8ffc8] transition hover:bg-[#b8ff3c]/22 disabled:cursor-not-allowed disabled:opacity-50"
          >
            End session · next goes live
          </button>
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-[#b8ff3c]/25 bg-black/25 px-3 py-3 text-center">
          <p className="text-[12px] font-black text-[#fef9c3]">No one live</p>
          <button
            type="button"
            onClick={onApply}
            className="mt-2 inline-flex rounded-full border border-[#67e8f9]/40 bg-[#67e8f9]/12 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#e0f2fe]"
          >
            Apply to go live · makeup
          </button>
        </div>
      )}

      <div className="mt-3">
        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#94a3b8]">Up next</p>
        {sortedQueue.length > 0 ? (
          <ol className="mt-1.5 space-y-1" role="list">
            {sortedQueue.map((entry, index) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/8 bg-black/30 px-2.5 py-1.5 text-[10px]"
                role="listitem"
              >
                <span className="font-semibold text-[#eef6ff]">
                  #{index + 1} {entry.fullName} · {entry.makeupStyle}
                  {entry.visibilityPoints > 0 ? (
                    <span className="ml-1 text-[#b8ff3c]">· vis {entry.visibilityPoints}</span>
                  ) : null}
                </span>
                <span className="text-[#8fa3c4]">
                  {index === 0 && isLive ? "Next live" : entry.liveFrom}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <button
            type="button"
            onClick={onApply}
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/25 px-2.5 py-2 text-left text-[11px] font-semibold text-[#9fb4d4] transition hover:border-[#67e8f9]/30"
          >
            Apply · join queue
          </button>
        )}
      </div>
    </div>
  );
}
