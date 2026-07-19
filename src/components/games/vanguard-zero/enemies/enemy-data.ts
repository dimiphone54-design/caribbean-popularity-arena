export type EnemyType = "grunt" | "rush" | "tank" | "sniper" | "boss";

export type EnemyDef = {
  id: string;
  name: string;
  type: EnemyType;
  health: number;
  speed: number;
  damage: number;
  xp: number;
  color: string;
  scale: number;
};

export const enemyDefs: EnemyDef[] = [
  { id: "drone", name: "Drone", type: "grunt", health: 40, speed: 4, damage: 8, xp: 15, color: "#ef4444", scale: 0.8 },
  { id: "rush", name: "Rusher", type: "rush", health: 30, speed: 8, damage: 12, xp: 20, color: "#f97316", scale: 0.7 },
  { id: "tank", name: "Heavy", type: "tank", health: 120, speed: 2, damage: 20, xp: 40, color: "#7c3aed", scale: 1.2 },
  { id: "marksman", name: "Marksman", type: "sniper", health: 35, speed: 3, damage: 25, xp: 30, color: "#06b6d4", scale: 0.9 },
  { id: "boss-elites", name: "Elite Commander", type: "boss", health: 500, speed: 3.5, damage: 30, xp: 200, color: "#dc2626", scale: 1.6 }
];

export function getEnemyDef(id: string): EnemyDef | undefined {
  return enemyDefs.find((e) => e.id === id);
}
