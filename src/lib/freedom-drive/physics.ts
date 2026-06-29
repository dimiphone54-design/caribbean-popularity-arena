import { DRIVE_PHYSICS } from "@/lib/freedom-drive/constants";
import type { BuildingCollider, FreedomDriveInput, VehicleState } from "@/lib/freedom-drive/types";

const CAR_HALF_W = 1.05;
const CAR_HALF_D = 2.15;

export function createVehicleState(): VehicleState {
  return { x: 0, z: 0, rotationY: 0, velocity: 0, lateralVelocity: 0 };
}

export function stepVehiclePhysics(
  state: VehicleState,
  input: FreedomDriveInput,
  dt: number,
  colliders: BuildingCollider[]
): { state: VehicleState; driftActive: boolean; hit: boolean } {
  const next = { ...state };
  let hit = false;

  if (input.accelerate) {
    next.velocity += DRIVE_PHYSICS.acceleration * dt;
  } else if (input.brake) {
    next.velocity -= DRIVE_PHYSICS.brakeForce * dt;
  } else {
    const sign = Math.sign(next.velocity) || 1;
    const mag = Math.max(0, Math.abs(next.velocity) - DRIVE_PHYSICS.friction * dt);
    next.velocity = mag * sign;
  }

  next.velocity = Math.max(-DRIVE_PHYSICS.reverseMax, Math.min(DRIVE_PHYSICS.maxSpeed, next.velocity));

  const speed = Math.abs(next.velocity);
  const driftActive = speed > DRIVE_PHYSICS.driftSpeedThreshold && Math.abs(input.steer) > 0.25;
  const grip = driftActive ? DRIVE_PHYSICS.driftGrip : DRIVE_PHYSICS.lateralGrip;

  next.rotationY += input.steer * DRIVE_PHYSICS.steerSpeed * dt * (0.35 + speed / DRIVE_PHYSICS.maxSpeed);

  const forwardX = Math.sin(next.rotationY);
  const forwardZ = Math.cos(next.rotationY);
  const rightX = Math.cos(next.rotationY);
  const rightZ = -Math.sin(next.rotationY);

  next.lateralVelocity += input.steer * speed * 0.12 * dt;
  next.lateralVelocity = Math.max(-8, Math.min(8, next.lateralVelocity));
  next.lateralVelocity *= Math.max(0, 1 - grip * dt);

  next.x += forwardX * next.velocity * dt + rightX * next.lateralVelocity * dt;
  next.z += forwardZ * next.velocity * dt + rightZ * next.lateralVelocity * dt;

  for (const box of colliders) {
    if (
      next.x + CAR_HALF_W > box.minX &&
      next.x - CAR_HALF_W < box.maxX &&
      next.z + CAR_HALF_D > box.minZ &&
      next.z - CAR_HALF_D < box.maxZ
    ) {
      hit = true;
      const pushX = next.x < (box.minX + box.maxX) / 2 ? box.minX - CAR_HALF_W - 0.05 : box.maxX + CAR_HALF_W + 0.05;
      const pushZ = next.z < (box.minZ + box.maxZ) / 2 ? box.minZ - CAR_HALF_D - 0.05 : box.maxZ + CAR_HALF_D + 0.05;
      if (Math.abs(next.x - (box.minX + box.maxX) / 2) < Math.abs(next.z - (box.minZ + box.maxZ) / 2)) {
        next.x = pushX;
      } else {
        next.z = pushZ;
      }
      next.velocity *= DRIVE_PHYSICS.collisionDamping;
      next.lateralVelocity *= 0.4;
    }
  }

  return { state: next, driftActive, hit };
}

export function computeArenaPoints(distanceM: number, topSpeedMph: number) {
  return Math.floor(distanceM * 0.45 + topSpeedMph * 1.8);
}

export function getDrivingRank(distanceM: number, topSpeedMph: number) {
  if (distanceM >= 4200 || topSpeedMph >= 115) return "Arena Legend";
  if (distanceM >= 2400 || topSpeedMph >= 95) return "Freedom Ace";
  if (distanceM >= 1200 || topSpeedMph >= 72) return "Street King";
  if (distanceM >= 400 || topSpeedMph >= 45) return "City Cruiser";
  return "Rookie Driver";
}
