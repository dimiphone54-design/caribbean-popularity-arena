"use client";

import { UK_FREEDOM_CITY } from "@/lib/freedom-drive/city-layout";
import type { FreedomDriveCityBuilding } from "@/lib/freedom-drive/types";

const accentColors: Record<FreedomDriveCityBuilding["accent"], string> = {
  cyan: "#00f5ff",
  gold: "#f7e7aa",
  magenta: "#ff2bd6",
  slate: "#6b7280"
};

function BuildingMesh({ building }: { building: FreedomDriveCityBuilding }) {
  const neon = accentColors[building.accent];
  const isShard = building.landmark === "shard";
  const isGherkin = building.landmark === "gherkin";

  return (
    <group position={[building.x, building.height / 2, building.z]}>
      {isShard ? (
        <mesh castShadow receiveShadow>
          <coneGeometry args={[building.width * 0.55, building.height, 4]} />
          <meshStandardMaterial color="#1a2238" metalness={0.65} roughness={0.25} emissive="#003893" emissiveIntensity={0.15} />
        </mesh>
      ) : isGherkin ? (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[building.width * 0.35, building.width * 0.48, building.height, 12]} />
          <meshStandardMaterial color="#243048" metalness={0.55} roughness={0.3} emissive="#012169" emissiveIntensity={0.12} />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[building.width, building.height, building.depth]} />
          <meshStandardMaterial color="#141c2e" metalness={0.45} roughness={0.35} />
        </mesh>
      )}
      <mesh position={[0, building.height * 0.15, building.depth / 2 + 0.06]}>
        <planeGeometry args={[building.width * 0.82, building.height * 0.55]} />
        <meshStandardMaterial
          color={neon}
          emissive={neon}
          emissiveIntensity={0.55}
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function FreedomDriveCity() {
  const { buildings, streetLights, trees, roadHalf, roadWidth } = UK_FREEDOM_CITY;
  const groundSize = roadHalf * 2 + 80;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial color="#05070f" metalness={0.2} roughness={0.85} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[roadWidth * 2.2, groundSize]} />
        <meshStandardMaterial color="#0a0e18" metalness={0.75} roughness={0.22} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[groundSize, roadWidth * 2.2]} />
        <meshStandardMaterial color="#0a0e18" metalness={0.75} roughness={0.22} />
      </mesh>

      {Array.from({ length: Math.floor(groundSize / 12) }).map((_, i) => {
        const offset = -groundSize / 2 + i * 12 + 6;
        return (
          <group key={`lane-${i}`}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, offset]}>
              <planeGeometry args={[1.8, 0.18]} />
              <meshStandardMaterial color="#f7e7aa" emissive="#f7e7aa" emissiveIntensity={0.35} toneMapped={false} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offset, 0.05, 0]}>
              <planeGeometry args={[0.18, 1.8]} />
              <meshStandardMaterial color="#f7e7aa" emissive="#f7e7aa" emissiveIntensity={0.35} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      {buildings.map((building) => (
        <BuildingMesh key={building.id} building={building} />
      ))}

      {streetLights.map((light, index) => (
        <group key={`light-${index}`} position={[light.x, 0, light.z]}>
          <mesh position={[0, 2.4, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 4.8, 8]} />
            <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.35} />
          </mesh>
          <mesh position={[0, 4.9, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#b8ff3c" emissive="#b8ff3c" emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
          <pointLight position={[0, 4.8, 0]} intensity={12} distance={16} color="#b8ff3c" />
        </group>
      ))}

      {trees.map((tree, index) => (
        <group key={`tree-${index}`} position={[tree.x, 0, tree.z]} scale={tree.scale}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.24, 2.4, 6]} />
            <meshStandardMaterial color="#3d2914" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.1, 0]} castShadow>
            <coneGeometry args={[1.1, 2.4, 8]} />
            <meshStandardMaterial color="#14532d" roughness={0.75} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
