export type WeaponType = "rifle" | "shotgun" | "sniper" | "pistol";

export type WeaponDef = {
  id: string;
  name: string;
  type: WeaponType;
  damage: number;
  fireRate: number;
  range: number;
  ammo: number;
  maxAmmo: number;
  spread: number;
  recoil: number;
  color: string;
};

export const weaponDefs: WeaponDef[] = [
  { id: "m4-carbine", name: "M4 Carbine", type: "rifle", damage: 22, fireRate: 0.1, range: 200, ammo: 30, maxAmmo: 30, spread: 0.02, recoil: 0.015, color: "#94a3b8" },
  { id: "spas-12", name: "SPAS-12", type: "shotgun", damage: 80, fireRate: 0.8, range: 30, ammo: 8, maxAmmo: 8, spread: 0.12, recoil: 0.06, color: "#f97316" },
  { id: "awp", name: "AWP", type: "sniper", damage: 120, fireRate: 1.5, range: 500, ammo: 5, maxAmmo: 5, spread: 0.002, recoil: 0.08, color: "#22c55e" },
  { id: "glock-17", name: "Glock-17", type: "pistol", damage: 18, fireRate: 0.15, range: 80, ammo: 17, maxAmmo: 17, spread: 0.04, recoil: 0.01, color: "#e2e8f0" }
];

export function getWeaponDef(id: string): WeaponDef | undefined {
  return weaponDefs.find((w) => w.id === id);
}
