"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ARENA_SLOT_OCCUPANCY_EVENT,
  readArenaSlotOccupancies,
  type ArenaSlotOccupancy
} from "@/lib/arena-slot-occupancy";
import { ARENA_ENGINE_STATE_EVENT } from "@/components/use-arena-engine";
import type { ArenaEngineLiveSession } from "@/lib/arena-engine/types";

function engineSessionToOccupancy(session: ArenaEngineLiveSession): ArenaSlotOccupancy {
  return {
    slotId: session.slotId,
    islandCode: session.islandCode,
    displayName: session.displayName,
    signedInAt: Date.parse(session.signedInAt)
  };
}

async function fetchEngineOccupancies(): Promise<Record<number, ArenaSlotOccupancy>> {
  try {
    const response = await fetch("/api/arena-engine/state", { cache: "no-store" });
    if (!response.ok) return {};
    const payload = (await response.json()) as {
      engineEnabled?: boolean;
      liveSessions?: ArenaEngineLiveSession[];
    };
    if (!payload.engineEnabled || !payload.liveSessions?.length) return {};
    const map: Record<number, ArenaSlotOccupancy> = {};
    for (const session of payload.liveSessions) {
      map[session.slotId] = engineSessionToOccupancy(session);
    }
    return map;
  } catch {
    return {};
  }
}

export function useArenaSlotOccupancies(slotTick: number) {
  const [occupancies, setOccupancies] = useState<Record<number, ArenaSlotOccupancy>>({});

  const refresh = useCallback(async () => {
    const local = readArenaSlotOccupancies();
    const engine = await fetchEngineOccupancies();
    setOccupancies({ ...local, ...engine });
  }, []);

  useEffect(() => {
    void refresh();

    const onRefresh = () => {
      void refresh();
    };

    window.addEventListener(ARENA_SLOT_OCCUPANCY_EVENT, onRefresh);
    window.addEventListener(ARENA_ENGINE_STATE_EVENT, onRefresh);
    return () => {
      window.removeEventListener(ARENA_SLOT_OCCUPANCY_EVENT, onRefresh);
      window.removeEventListener(ARENA_ENGINE_STATE_EVENT, onRefresh);
    };
  }, [slotTick, refresh]);

  return occupancies;
}
