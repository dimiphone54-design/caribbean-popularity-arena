"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { FreedomDriveVehicleHandle } from "@/components/freedom-drive/freedom-drive-vehicle";

export function FreedomDriveChaseCamera({ vehicleRef }: { vehicleRef: React.RefObject<FreedomDriveVehicleHandle | null> }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const vehicle = vehicleRef.current?.getState();
    if (!vehicle) return;

    const followDistance = 9.5;
    const followHeight = 4.2;
    const forwardX = Math.sin(vehicle.rotationY);
    const forwardZ = Math.cos(vehicle.rotationY);

    desired.current.set(
      vehicle.x - forwardX * followDistance,
      followHeight,
      vehicle.z - forwardZ * followDistance
    );

    lookAt.current.set(vehicle.x + forwardX * 3, 1.1, vehicle.z + forwardZ * 3);

    const lerp = 1 - Math.pow(0.001, delta);
    camera.position.lerp(desired.current, lerp);
    camera.lookAt(lookAt.current);
  });

  return null;
}
