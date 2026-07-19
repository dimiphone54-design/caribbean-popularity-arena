export type MatchMode = "mission" | "country_match" | "championship";

export type MissionDef = {
  id: string;
  name: string;
  description: string;
  countryId: string;
  countryFlag: string;
  theme: string;
  waves: number;
  enemiesPerWave: number;
  difficulty: "normal" | "hard" | "nightmare";
  xpReward: number;
  unlockLevel: number;
};

export const ghostTideMission: MissionDef = {
  id: "ghost-tide",
  name: "Ghost Tide",
  description: "Defend the coastline against waves of phantom operatives.",
  countryId: "trinidad",
  countryFlag: "🇹🇹",
  theme: "coastal-night",
  waves: 10,
  enemiesPerWave: 5,
  difficulty: "normal",
  xpReward: 500,
  unlockLevel: 1
};
