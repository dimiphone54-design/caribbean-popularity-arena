import type { BuildingCollider, FreedomDriveCityBuilding, FreedomDriveStreetLight, FreedomDriveTree } from "@/lib/freedom-drive/types";

const GRID = 5;
const BLOCK = 38;
const ROAD = 10;
const ORIGIN = ((GRID - 1) * (BLOCK + ROAD)) / 2;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const accents: FreedomDriveCityBuilding["accent"][] = ["cyan", "gold", "magenta", "slate"];

export function generateUkFreedomCity() {
  const rand = seeded(2030);
  const buildings: FreedomDriveCityBuilding[] = [];
  const colliders: BuildingCollider[] = [];
  const streetLights: FreedomDriveStreetLight[] = [];
  const trees: FreedomDriveTree[] = [];

  for (let gx = 0; gx < GRID; gx++) {
    for (let gz = 0; gz < GRID; gz++) {
      const cx = gx * (BLOCK + ROAD) - ORIGIN + BLOCK / 2;
      const cz = gz * (BLOCK + ROAD) - ORIGIN + BLOCK / 2;
      const plots = rand() > 0.82 ? 1 : rand() > 0.45 ? 2 : 3;

      for (let p = 0; p < plots; p++) {
        const w = BLOCK * (0.28 + rand() * 0.22);
        const d = BLOCK * (0.28 + rand() * 0.22);
        const ox = (p - (plots - 1) / 2) * (w * 0.55);
        const oz = (rand() - 0.5) * (BLOCK * 0.25);
        const x = cx + ox;
        const z = cz + oz;
        const height = 18 + rand() * 55 + (gx === 2 && gz === 2 ? 40 : 0);
        const id = `b-${gx}-${gz}-${p}`;
        const landmark =
          gx === 2 && gz === 2 && p === 0 ? "shard" : gx === 1 && gz === 3 && p === 0 ? "gherkin" : "block";

        buildings.push({
          id,
          x,
          z,
          width: w,
          depth: d,
          height,
          accent: accents[Math.floor(rand() * accents.length)]!,
          landmark
        });

        colliders.push({
          id,
          minX: x - w / 2 - 0.6,
          maxX: x + w / 2 + 0.6,
          minZ: z - d / 2 - 0.6,
          maxZ: z + d / 2 + 0.6
        });

        trees.push({
          x: x + (rand() > 0.5 ? 1 : -1) * (w / 2 + 2.2),
          z: z + (rand() - 0.5) * d * 0.6,
          scale: 0.75 + rand() * 0.55
        });
      }
    }
  }

  const span = GRID * (BLOCK + ROAD) - ROAD;
  for (let i = -span; i <= span; i += BLOCK + ROAD) {
    streetLights.push({ x: i, z: -span - 4 });
    streetLights.push({ x: i, z: span + 4 });
    streetLights.push({ x: -span - 4, z: i });
    streetLights.push({ x: span + 4, z: i });
  }

  return { buildings, colliders, streetLights, trees, roadHalf: span + ROAD, blockSize: BLOCK, roadWidth: ROAD };
}

export const UK_FREEDOM_CITY = generateUkFreedomCity();
