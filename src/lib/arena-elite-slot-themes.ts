import type { ArenaCreatorSlot } from "@/lib/arena-experience";

export type ArenaEliteSlotTheme = {
  accent: string;
  accentSoft: string;
  glow: string;
  scene: string;
  tier: "Platinum" | "Gold" | "Elite";
};

const themesByIslandCode: Record<string, ArenaEliteSlotTheme> = {
  CO: {
    accent: "#fbbf24",
    accentSoft: "rgba(251, 191, 36, 0.18)",
    glow: "rgba(251, 191, 36, 0.32)",
    scene: "Bogotá · Reggaeton skyline",
    tier: "Platinum"
  },
  UK: {
    accent: "#ef4444",
    accentSoft: "rgba(239, 68, 68, 0.16)",
    glow: "rgba(239, 68, 68, 0.28)",
    scene: "London · Thames · live",
    tier: "Platinum"
  },
  LT: {
    accent: "#22c55e",
    accentSoft: "rgba(34, 197, 94, 0.16)",
    glow: "rgba(34, 197, 94, 0.28)",
    scene: "Vilnius · Old Town lights",
    tier: "Gold"
  },
  EC: {
    accent: "#facc15",
    accentSoft: "rgba(250, 204, 21, 0.16)",
    glow: "rgba(250, 204, 21, 0.28)",
    scene: "Quito · pasillo · Galápagos coast",
    tier: "Elite"
  },
  TT: {
    accent: "#ff5c2b",
    accentSoft: "rgba(255, 92, 43, 0.18)",
    glow: "rgba(255, 92, 43, 0.35)",
    scene: "Port of Spain · Soca skyline",
    tier: "Platinum"
  },
  JM: {
    accent: "#00c853",
    accentSoft: "rgba(0, 200, 83, 0.18)",
    glow: "rgba(0, 200, 83, 0.32)",
    scene: "Kingston · Dancehall nights",
    tier: "Platinum"
  },
  VE: {
    accent: "#fbbf24",
    accentSoft: "rgba(251, 191, 36, 0.16)",
    glow: "rgba(251, 191, 36, 0.28)",
    scene: "Caracas · Avila glow",
    tier: "Gold"
  },
  PL: {
    accent: "#dc2626",
    accentSoft: "rgba(220, 38, 38, 0.16)",
    glow: "rgba(220, 38, 38, 0.28)",
    scene: "Warsaw · Palace square",
    tier: "Elite"
  },
  TN: {
    accent: "#c084fc",
    accentSoft: "rgba(192, 132, 252, 0.16)",
    glow: "rgba(192, 132, 252, 0.28)",
    scene: "Tunis · Medina live",
    tier: "Elite"
  },
  GY: {
    accent: "#00c9a7",
    accentSoft: "rgba(0, 201, 167, 0.18)",
    glow: "rgba(0, 201, 167, 0.28)",
    scene: "Georgetown · Stabroek live",
    tier: "Elite"
  },
  CN: {
    accent: "#ef4444",
    accentSoft: "rgba(239, 68, 68, 0.16)",
    glow: "rgba(239, 68, 68, 0.28)",
    scene: "Shanghai · Bund night",
    tier: "Gold"
  },
  JP: {
    accent: "#f472b6",
    accentSoft: "rgba(244, 114, 182, 0.16)",
    glow: "rgba(244, 114, 182, 0.28)",
    scene: "JAPAN · Shibuya live",
    tier: "Gold"
  }
};

const fallbackTheme: ArenaEliteSlotTheme = {
  accent: "#d7b46a",
  accentSoft: "rgba(215, 180, 106, 0.18)",
  glow: "rgba(215, 180, 106, 0.28)",
  scene: "Global · Live creative",
  tier: "Elite"
};

export function getArenaEliteSlotTheme(slot: Pick<ArenaCreatorSlot, "islandCode">): ArenaEliteSlotTheme {
  return themesByIslandCode[slot.islandCode] ?? fallbackTheme;
}
