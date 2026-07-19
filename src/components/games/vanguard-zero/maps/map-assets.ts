export type MapTheme = {
  id: string;
  name: string;
  skyColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  groundColor: string;
  ambientColor: string;
  ambientIntensity: number;
  structureColor: string;
  accentColor: string;
};

export type MapData = {
  id: string;
  name: string;
  countryId: string;
  theme: MapTheme;
  width: number;
  depth: number;
  spawnPoint: { x: number; y: number; z: number };
  coverPoints: { x: number; z: number; w: number; h: number }[];
  enemySpawnPoints: { x: number; z: number }[];
};

export const defaultMapTheme: MapTheme = {
  id: "default",
  name: "Arena Default",
  skyColor: "#0a0a1a",
  fogColor: "#0a0a1a",
  fogNear: 10,
  fogFar: 80,
  groundColor: "#1a1a2e",
  ambientColor: "#4a5568",
  ambientIntensity: 0.6,
  structureColor: "#2d3748",
  accentColor: "#4fd1c5"
};
