import type { MissionDef } from "./ghost-tide";

export const countryMissions: MissionDef[] = [
  {
    id: "ghost-tide",
    name: "Ghost Tide",
    description: "Defend Port of Spain's coastline against waves of phantom operatives.",
    countryId: "trinidad",
    countryFlag: "🇹🇹",
    theme: "coastal-night",
    waves: 10,
    enemiesPerWave: 5,
    difficulty: "normal",
    xpReward: 500,
    unlockLevel: 1
  },
  {
    id: "emerald-storm",
    name: "Emerald Storm",
    description: "Push through Bogotá's neon streets in a high-intensity urban assault.",
    countryId: "colombia",
    countryFlag: "🇨🇴",
    theme: "urban-neon",
    waves: 12,
    enemiesPerWave: 6,
    difficulty: "hard",
    xpReward: 750,
    unlockLevel: 3
  },
  {
    id: "neon-harbor",
    name: "Neon Harbor",
    description: "Storm Tokyo Bay's waterfront district under holographic billboards.",
    countryId: "japan",
    countryFlag: "🇯🇵",
    theme: "cyber-harbor",
    waves: 12,
    enemiesPerWave: 6,
    difficulty: "hard",
    xpReward: 750,
    unlockLevel: 3
  },
  {
    id: "andes-shield",
    name: "Andes Shield",
    description: "Hold the high-altitude fortress overlooking Quito.",
    countryId: "ecuador",
    countryFlag: "🇪🇨",
    theme: "mountain-fortress",
    waves: 14,
    enemiesPerWave: 7,
    difficulty: "nightmare",
    xpReward: 1000,
    unlockLevel: 5
  },
  {
    id: "dragon-circuit",
    name: "Dragon Circuit",
    description: "Infiltrate Shanghai's underground tech grid.",
    countryId: "china",
    countryFlag: "🇨🇳",
    theme: "underground-tech",
    waves: 14,
    enemiesPerWave: 7,
    difficulty: "nightmare",
    xpReward: 1000,
    unlockLevel: 5
  },
  {
    id: "iron-crown",
    name: "Iron Crown",
    description: "Breach London's fortified underground vault system.",
    countryId: "united_kingdom",
    countryFlag: "🇬🇧",
    theme: "underground-vault",
    waves: 16,
    enemiesPerWave: 8,
    difficulty: "nightmare",
    xpReward: 1500,
    unlockLevel: 8
  }
];

export function getCountryMission(countryId: string): MissionDef | undefined {
  return countryMissions.find((m) => m.countryId === countryId);
}
