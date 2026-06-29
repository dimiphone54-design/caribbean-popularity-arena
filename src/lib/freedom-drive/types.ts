/** Freedom Drive Simulator · shared types · multiplayer-ready */

export type FreedomDriveLeaderboardEntry = {
  id: string;
  username: string;
  country: string;
  distance_driven: number;
  top_speed: number;
  arena_points: number;
  created_at: string;
};

export type FreedomDriveSessionStats = {
  speedMph: number;
  topSpeedMph: number;
  distanceM: number;
  arenaPoints: number;
  drivingRank: string;
  driftActive: boolean;
  collisionCount: number;
};

export type FreedomDriveInput = {
  accelerate: boolean;
  brake: boolean;
  steer: number;
};

export type VehicleState = {
  x: number;
  z: number;
  rotationY: number;
  velocity: number;
  lateralVelocity: number;
};

export type BuildingCollider = {
  id: string;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

/** Future multiplayer · vehicle sync packet */
export type FreedomDriveNetworkState = {
  sessionId: string;
  playerId: string;
  username: string;
  x: number;
  z: number;
  rotationY: number;
  speedMph: number;
  timestamp: number;
};

export type FreedomDriveCityBuilding = {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  accent: "cyan" | "gold" | "magenta" | "slate";
  landmark?: "shard" | "gherkin" | "block";
};

export type FreedomDriveStreetLight = { x: number; z: number };
export type FreedomDriveTree = { x: number; z: number; scale: number };
