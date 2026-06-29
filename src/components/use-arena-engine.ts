"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  countLiveSessionsNow,
  formatRotationCountdownForEngine,
  getEngineScheduleStatus,
  getRotationRemainingMs,
  resolveEffectiveNextRotationAt
} from "@/lib/arena-engine/live-stats-display";
import type { ArenaEnginePublicState } from "@/lib/arena-engine/types";

export const ARENA_ENGINE_STATE_EVENT = "cpa:arena-engine-state";

async function fetchArenaEngineState(): Promise<ArenaEnginePublicState | null> {
  try {
    const response = await fetch("/api/arena-engine/state", { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as ArenaEnginePublicState;
  } catch {
    return null;
  }
}

export function useArenaEngineState(pollMs = 30_000) {
  const [state, setState] = useState<ArenaEnginePublicState | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await fetchArenaEngineState();
    setState(next);
    setLoading(false);
    return next;
  }, []);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => {
      void refresh();
    }, pollMs);

    const onEngineEvent = () => {
      void refresh();
    };
    window.addEventListener(ARENA_ENGINE_STATE_EVENT, onEngineEvent);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener(ARENA_ENGINE_STATE_EVENT, onEngineEvent);
    };
  }, [pollMs, refresh]);

  return { state, loading, refresh };
}

/** Legal bot + arena panels · 1s tick · live session count + rotation countdown */
export function useArenaEngineLiveStats(pollMs = 1_000) {
  const { state: engine, loading, refresh } = useArenaEngineState(pollMs);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!engine) return;

    const effective = resolveEffectiveNextRotationAt(engine, Date.now());
    const remainingMs = getRotationRemainingMs(effective, Date.now());
    if (remainingMs <= 0) {
      void refresh();
      return;
    }

    const timeout = window.setTimeout(() => {
      void refresh();
    }, remainingMs + 200);

    return () => window.clearTimeout(timeout);
  }, [engine, engine?.nextRotationAt, engine?.lastRotationAt, refresh]);

  return useMemo(() => {
    const liveNow = engine ? countLiveSessionsNow(engine.liveSessions, nowMs) : 0;
    const rotationCountdown = engine ? formatRotationCountdownForEngine(engine, nowMs) : "—";
    const tickKey = Math.floor(nowMs / 1000);

    return {
      engine,
      loading,
      liveNow,
      openLive: engine?.openLiveCount ?? 3,
      frozenCount: engine?.frozenFrontCount ?? 9,
      rotationCountdown,
      engineStatus: engine ? getEngineScheduleStatus(engine, nowMs) : "syncing",
      tickKey
    };
  }, [engine, loading, nowMs]);
}

export function notifyArenaEngineStateChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ARENA_ENGINE_STATE_EVENT));
}

export async function claimArenaEngineLiveSession(input: {
  slotId: number;
  islandCode: string;
  displayName: string;
}) {
  const response = await fetch("/api/arena-engine/live/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  const payload = (await response.json()) as { ok: boolean; error?: string };
  if (!response.ok || !payload.ok) {
    return { ok: false as const, error: payload.error ?? "Could not claim live slot." };
  }

  notifyArenaEngineStateChanged();
  return { ok: true as const };
}
