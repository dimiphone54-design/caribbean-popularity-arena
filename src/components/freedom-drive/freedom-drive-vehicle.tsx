"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { UK_FREEDOM_CITY } from "@/lib/freedom-drive/city-layout";
import { MS_TO_MPH } from "@/lib/freedom-drive/constants";
import { computeArenaPoints, createVehicleState, getDrivingRank, stepVehiclePhysics } from "@/lib/freedom-drive/physics";
import { freedomDriveMultiplayer } from "@/lib/freedom-drive/multiplayer";
import type { FreedomDriveInput, FreedomDriveSessionStats, VehicleState } from "@/lib/freedom-drive/types";

export type FreedomDriveVehicleHandle = {
  getState: () => VehicleState;
};

type FreedomDriveVehicleProps = {
  input: FreedomDriveInput;
  playerId: string;
  playerName: string;
  onStats: (stats: FreedomDriveSessionStats) => void;
};

export const FreedomDriveVehicle = forwardRef<FreedomDriveVehicleHandle, FreedomDriveVehicleProps>(
  function FreedomDriveVehicle({ input, playerId, playerName, onStats }, ref) {
    const groupRef = useRef<THREE.Group>(null);
    const stateRef = useRef(createVehicleState());
    const topSpeedRef = useRef(0);
    const distanceRef = useRef(0);
    const collisionsRef = useRef(0);
    const lastPosRef = useRef({ x: 0, z: 0 });

    useImperativeHandle(ref, () => ({
      getState: () => stateRef.current
    }));

    useFrame((_, delta) => {
      const dt = Math.min(delta, 0.05);
      const prev = stateRef.current;
      const { state, driftActive, hit } = stepVehiclePhysics(prev, input, dt, UK_FREEDOM_CITY.colliders);
      stateRef.current = state;

      if (hit) collisionsRef.current += 1;

      const dx = state.x - lastPosRef.current.x;
      const dz = state.z - lastPosRef.current.z;
      distanceRef.current += Math.hypot(dx, dz);
      lastPosRef.current = { x: state.x, z: state.z };

      const speedMph = Math.abs(state.velocity) * MS_TO_MPH;
      topSpeedRef.current = Math.max(topSpeedRef.current, speedMph);

      onStats({
        speedMph,
        topSpeedMph: topSpeedRef.current,
        distanceM: distanceRef.current,
        arenaPoints: computeArenaPoints(distanceRef.current, topSpeedRef.current),
        drivingRank: getDrivingRank(distanceRef.current, topSpeedRef.current),
        driftActive,
        collisionCount: collisionsRef.current
      });

      freedomDriveMultiplayer.publishLocalState({
        sessionId: "uk-freedom-drive",
        playerId,
        username: playerName,
        x: state.x,
        z: state.z,
        rotationY: state.rotationY,
        speedMph,
        timestamp: Date.now()
      });

      if (groupRef.current) {
        groupRef.current.position.set(state.x, 0.42, state.z);
        groupRef.current.rotation.y = state.rotationY;
      }
    });

    return (
      <group ref={groupRef}>
        <mesh castShadow receiveShadow position={[0, 0.35, 0.35]}>
          <boxGeometry args={[1.85, 0.42, 3.85]} />
          <meshStandardMaterial color="#101828" metalness={0.85} roughness={0.18} />
        </mesh>
        <mesh castShadow position={[0, 0.62, -0.15]}>
          <boxGeometry args={[1.55, 0.38, 1.85]} />
          <meshStandardMaterial color="#0a0f1a" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[-0.95, 0.48, 1.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
          <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh castShadow position={[0.95, 0.48, 1.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
          <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh castShadow position={[-0.95, 0.48, -1.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
          <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh castShadow position={[0.95, 0.48, -1.05]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
          <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.45, 1.95]}>
          <boxGeometry args={[1.7, 0.12, 0.08]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.45, -1.95]}>
          <boxGeometry args={[1.4, 0.1, 0.08]} />
          <meshStandardMaterial color="#c8102e" emissive="#c8102e" emissiveIntensity={0.7} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 0.8, 1.6]} intensity={2} distance={4} color="#00f5ff" />
      </group>
    );
  }
);
