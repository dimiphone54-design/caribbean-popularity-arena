"use client";

import { createContext, useContext, useMemo, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { FreedomDriveTheme } from "@/lib/freedom-drive/constants";
import type { FreedomDriveInput, FreedomDriveSessionStats } from "@/lib/freedom-drive/types";

export type FreedomDriveRuntime = {
  input: FreedomDriveInput;
  setInput: React.Dispatch<React.SetStateAction<FreedomDriveInput>>;
  stats: FreedomDriveSessionStats;
  setStats: (stats: FreedomDriveSessionStats) => void;
  playerName: string;
  theme: FreedomDriveTheme;
};

const defaultInput: FreedomDriveInput = { accelerate: false, brake: false, steer: 0 };

const defaultStats: FreedomDriveSessionStats = {
  speedMph: 0,
  topSpeedMph: 0,
  distanceM: 0,
  arenaPoints: 0,
  drivingRank: "Rookie Driver",
  driftActive: false,
  collisionCount: 0
};

const FreedomDriveContext = createContext<FreedomDriveRuntime | null>(null);

export function FreedomDriveProvider({
  playerName,
  theme,
  input,
  setInput,
  stats,
  setStats,
  children
}: {
  playerName: string;
  theme: FreedomDriveTheme;
  input: FreedomDriveInput;
  setInput: Dispatch<SetStateAction<FreedomDriveInput>>;
  stats: FreedomDriveSessionStats;
  setStats: (stats: FreedomDriveSessionStats) => void;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      input,
      setInput,
      stats,
      setStats,
      playerName,
      theme
    }),
    [input, setInput, stats, setStats, playerName, theme]
  );

  return <FreedomDriveContext.Provider value={value}>{children}</FreedomDriveContext.Provider>;
}

export function useFreedomDrive() {
  const ctx = useContext(FreedomDriveContext);
  if (!ctx) throw new Error("useFreedomDrive must be used within FreedomDriveProvider");
  return ctx;
}

export { defaultInput, defaultStats };
