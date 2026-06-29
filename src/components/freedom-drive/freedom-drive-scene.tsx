"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Sky, Stars } from "@react-three/drei";
import { FreedomDriveChaseCamera } from "@/components/freedom-drive/freedom-drive-chase-camera";
import { FreedomDriveCity } from "@/components/freedom-drive/freedom-drive-city";
import { FreedomDriveVehicle, type FreedomDriveVehicleHandle } from "@/components/freedom-drive/freedom-drive-vehicle";
import type { FreedomDriveInput, FreedomDriveSessionStats } from "@/lib/freedom-drive/types";

type FreedomDriveSceneProps = {
  input: FreedomDriveInput;
  playerId: string;
  playerName: string;
  onStats: (stats: FreedomDriveSessionStats) => void;
  previewMode?: boolean;
  /** Ecuador stat panel · tiny live clip frame */
  statPreview?: boolean;
};

function SceneContent({
  input,
  playerId,
  playerName,
  onStats,
  previewMode = false,
  statPreview = false
}: FreedomDriveSceneProps) {
  const vehicleRef = useRef<FreedomDriveVehicleHandle>(null);
  const brightStat = statPreview;
  const bg = brightStat ? "#101828" : previewMode ? "#060a14" : "#030208";

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, brightStat ? 90 : previewMode ? 70 : 45, brightStat ? 320 : previewMode ? 280 : 220]} />
      <Sky
        distance={450000}
        sunPosition={brightStat ? [90, 28, 50] : [80, 18, 40]}
        inclination={brightStat ? 0.58 : 0.52}
        azimuth={0.22}
        mieCoefficient={0.008}
      />
      <Stars
        radius={statPreview ? 140 : 220}
        depth={statPreview ? 40 : 60}
        count={statPreview ? 900 : 2800}
        factor={statPreview ? 2.4 : 3.2}
        saturation={0}
        fade
        speed={0.35}
      />

      <ambientLight intensity={brightStat ? 0.62 : previewMode ? 0.46 : 0.28} />
      <directionalLight
        castShadow={!statPreview}
        position={[40, 60, 20]}
        intensity={brightStat ? 2.15 : previewMode ? 1.75 : 1.35}
        color={brightStat ? "#fffdf5" : "#fff8e6"}
        shadow-mapSize-width={statPreview ? 512 : 2048}
        shadow-mapSize-height={statPreview ? 512 : 2048}
        shadow-camera-far={180}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <directionalLight
        position={[-30, 24, -20]}
        intensity={brightStat ? 1.05 : previewMode ? 0.72 : 0.45}
        color="#00f5ff"
      />
      <hemisphereLight args={["#bae6fd", "#1e293b", brightStat ? 0.72 : previewMode ? 0.48 : 0.35]} />
      {brightStat ? <pointLight position={[0, 14, 8]} intensity={0.85} color="#fef9c3" distance={48} /> : null}

      <FreedomDriveCity />
      <FreedomDriveVehicle ref={vehicleRef} input={input} playerId={playerId} playerName={playerName} onStats={onStats} />
      <FreedomDriveChaseCamera vehicleRef={vehicleRef} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={brightStat ? 0.22 : previewMode ? 0.34 : 0.42}
        scale={statPreview ? 60 : 120}
        blur={statPreview ? 1.6 : 2.4}
        far={statPreview ? 18 : 30}
        color="#000000"
      />
    </>
  );
}

export function FreedomDriveScene({ previewMode = false, statPreview = false, ...props }: FreedomDriveSceneProps) {
  return (
    <Canvas
      shadows={!statPreview}
      dpr={statPreview ? [1, 1.25] : previewMode ? [1.25, 2] : [1, 1.5]}
      camera={{
        fov: statPreview ? 64 : previewMode ? 62 : 58,
        near: 0.1,
        far: statPreview ? 260 : 400,
        position: [0, 6, 12]
      }}
      gl={{ antialias: !statPreview, powerPreference: statPreview ? "low-power" : "high-performance" }}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} previewMode={previewMode} statPreview={statPreview} />
      </Suspense>
    </Canvas>
  );
}
