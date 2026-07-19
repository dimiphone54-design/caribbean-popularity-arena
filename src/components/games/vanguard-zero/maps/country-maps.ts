import type { MapData } from "./map-assets";

export const countryMaps: MapData[] = [
  {
    id: "coastal-night",
    name: "Ghost Tide — Port of Spain Coast",
    countryId: "trinidad",
    theme: {
      id: "coastal-night",
      name: "Coastal Night",
      skyColor: "#0d1117",
      fogColor: "#0d1117",
      fogNear: 12,
      fogFar: 85,
      groundColor: "#1a2332",
      ambientColor: "#3b82f6",
      ambientIntensity: 0.5,
      structureColor: "#1e3a5f",
      accentColor: "#22d3ee"
    },
    width: 60,
    depth: 60,
    spawnPoint: { x: 0, y: 1.6, z: 25 },
    coverPoints: [
      { x: -10, z: 5, w: 4, h: 2 },
      { x: 10, z: 5, w: 4, h: 2 },
      { x: -5, z: -10, w: 6, h: 2 },
      { x: 8, z: -15, w: 4, h: 3 }
    ],
    enemySpawnPoints: [
      { x: -15, z: -25 },
      { x: 0, z: -28 },
      { x: 15, z: -25 },
      { x: -10, z: -30 },
      { x: 10, z: -30 }
    ]
  },
  {
    id: "urban-neon",
    name: "Emerald Storm — Bogotá Streets",
    countryId: "colombia",
    theme: {
      id: "urban-neon",
      name: "Urban Neon",
      skyColor: "#1a0a2e",
      fogColor: "#1a0a2e",
      fogNear: 10,
      fogFar: 75,
      groundColor: "#0f0f1a",
      ambientColor: "#a855f7",
      ambientIntensity: 0.7,
      structureColor: "#2d1b69",
      accentColor: "#22c55e"
    },
    width: 65,
    depth: 65,
    spawnPoint: { x: 0, y: 1.6, z: 28 },
    coverPoints: [
      { x: -12, z: 8, w: 5, h: 2.5 },
      { x: 12, z: 8, w: 5, h: 2.5 },
      { x: 0, z: -5, w: 8, h: 2 },
      { x: -8, z: -18, w: 4, h: 3 },
      { x: 10, z: -18, w: 4, h: 3 }
    ],
    enemySpawnPoints: [
      { x: -18, z: -28 },
      { x: -6, z: -32 },
      { x: 6, z: -32 },
      { x: 18, z: -28 },
      { x: 0, z: -35 }
    ]
  },
  {
    id: "cyber-harbor",
    name: "Neon Harbor — Tokyo Waterfront",
    countryId: "japan",
    theme: {
      id: "cyber-harbor",
      name: "Cyber Harbor",
      skyColor: "#0a0520",
      fogColor: "#0a0520",
      fogNear: 8,
      fogFar: 70,
      groundColor: "#0d0d1f",
      ambientColor: "#ec4899",
      ambientIntensity: 0.65,
      structureColor: "#1a1040",
      accentColor: "#f472b6"
    },
    width: 65,
    depth: 65,
    spawnPoint: { x: 0, y: 1.6, z: 28 },
    coverPoints: [
      { x: -14, z: 6, w: 5, h: 2.5 },
      { x: 14, z: 6, w: 5, h: 2.5 },
      { x: 0, z: -8, w: 7, h: 2 },
      { x: -10, z: -20, w: 4, h: 3 },
      { x: 10, z: -20, w: 4, h: 3 }
    ],
    enemySpawnPoints: [
      { x: -20, z: -30 },
      { x: -7, z: -34 },
      { x: 7, z: -34 },
      { x: 20, z: -30 },
      { x: 0, z: -36 }
    ]
  },
  {
    id: "mountain-fortress",
    name: "Andes Shield — Quito Fortress",
    countryId: "ecuador",
    theme: {
      id: "mountain-fortress",
      name: "Mountain Fortress",
      skyColor: "#0f1a0a",
      fogColor: "#0f1a0a",
      fogNear: 14,
      fogFar: 90,
      groundColor: "#1a2a1a",
      ambientColor: "#eab308",
      ambientIntensity: 0.55,
      structureColor: "#3d5a1a",
      accentColor: "#fbbf24"
    },
    width: 70,
    depth: 70,
    spawnPoint: { x: 0, y: 1.6, z: 30 },
    coverPoints: [
      { x: -15, z: 8, w: 6, h: 3 },
      { x: 15, z: 8, w: 6, h: 3 },
      { x: 0, z: -6, w: 8, h: 2.5 },
      { x: -12, z: -22, w: 5, h: 3 },
      { x: 12, z: -22, w: 5, h: 3 }
    ],
    enemySpawnPoints: [
      { x: -20, z: -32 },
      { x: -8, z: -36 },
      { x: 8, z: -36 },
      { x: 20, z: -32 },
      { x: 0, z: -38 }
    ]
  },
  {
    id: "underground-tech",
    name: "Dragon Circuit — Shanghai Grid",
    countryId: "china",
    theme: {
      id: "underground-tech",
      name: "Underground Tech",
      skyColor: "#0a0a0f",
      fogColor: "#0a0a0f",
      fogNear: 10,
      fogFar: 65,
      groundColor: "#0f0f1a",
      ambientColor: "#ef4444",
      ambientIntensity: 0.6,
      structureColor: "#1a1a2e",
      accentColor: "#f87171"
    },
    width: 70,
    depth: 70,
    spawnPoint: { x: 0, y: 1.6, z: 30 },
    coverPoints: [
      { x: -14, z: 6, w: 5, h: 2.5 },
      { x: 14, z: 6, w: 5, h: 2.5 },
      { x: 0, z: -10, w: 9, h: 2.5 },
      { x: -12, z: -24, w: 5, h: 3 },
      { x: 12, z: -24, w: 5, h: 3 }
    ],
    enemySpawnPoints: [
      { x: -20, z: -34 },
      { x: -8, z: -38 },
      { x: 8, z: -38 },
      { x: 20, z: -34 },
      { x: 0, z: -40 }
    ]
  },
  {
    id: "underground-vault",
    name: "Iron Crown — London Vault",
    countryId: "united_kingdom",
    theme: {
      id: "underground-vault",
      name: "Underground Vault",
      skyColor: "#0d0d14",
      fogColor: "#0d0d14",
      fogNear: 12,
      fogFar: 75,
      groundColor: "#141420",
      ambientColor: "#6366f1",
      ambientIntensity: 0.5,
      structureColor: "#1e1e3a",
      accentColor: "#818cf8"
    },
    width: 75,
    depth: 75,
    spawnPoint: { x: 0, y: 1.6, z: 32 },
    coverPoints: [
      { x: -16, z: 8, w: 6, h: 3 },
      { x: 16, z: 8, w: 6, h: 3 },
      { x: 0, z: -8, w: 10, h: 2.5 },
      { x: -14, z: -26, w: 5, h: 3.5 },
      { x: 14, z: -26, w: 5, h: 3.5 }
    ],
    enemySpawnPoints: [
      { x: -22, z: -36 },
      { x: -9, z: -40 },
      { x: 9, z: -40 },
      { x: 22, z: -36 },
      { x: 0, z: -42 }
    ]
  }
];

export function getCountryMap(countryId: string): MapData | undefined {
  return countryMaps.find((m) => m.countryId === countryId);
}
