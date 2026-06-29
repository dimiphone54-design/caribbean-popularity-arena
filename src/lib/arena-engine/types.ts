/** CaribbeanFreedomArena · 12 front · 12 waiting · 12h rotation · 3h live sessions */

export type ArenaEngineMode = "legal_placeholder" | "production";

export type ArenaEngineProfile = {
  name: string;
  age: number;
  country: string;
  flag: string;
  category: string;
  quote: string;
  language: string;
  likes: number;
  comments: number;
  votes: number;
};

export type ArenaEngineFrontSlot = ArenaEngineProfile & {
  slotRank: number;
  /** Fixed nation template for freeze / intl suite · never swapped on rotation */
  templateIslandCode: string;
};

export type ArenaEngineWaitingSlot = ArenaEngineProfile & {
  queuePosition: number;
};

export type ArenaEngineLiveSession = {
  slotId: number;
  islandCode: string;
  displayName: string;
  signedInAt: string;
  expiresAt: string;
};

export type ArenaEngineRotationEvent = {
  rotatedAt: string;
  source: string;
  frontCount: number;
  waitingCount: number;
};

export type ArenaEngineState = {
  version: 1;
  mode: ArenaEngineMode;
  frontSlots: ArenaEngineFrontSlot[];
  waitingSlots: ArenaEngineWaitingSlot[];
  liveSessions: Record<string, ArenaEngineLiveSession>;
  lastRotationAt: string | null;
  nextRotationAt: string | null;
  rotationIntervalHours: number;
  liveSessionHours: number;
  openLiveIslandCodes: string[];
  lastRotationEvent: ArenaEngineRotationEvent | null;
  updatedAt: string;
};

export type ArenaEnginePublicState = {
  ok: true;
  engineEnabled: boolean;
  mode: ArenaEngineMode;
  frontSlots: ArenaEngineFrontSlot[];
  waitingSlots: ArenaEngineWaitingSlot[];
  liveSessions: ArenaEngineLiveSession[];
  lastRotationAt: string | null;
  nextRotationAt: string | null;
  shouldRotate: boolean;
  rotationIntervalHours: number;
  liveSessionHours: number;
  openLiveIslandCodes: string[];
  openLiveCount: number;
  frozenFrontCount: number;
  stats: {
    frontCount: number;
    waitingCount: number;
    liveNow: number;
  };
};
