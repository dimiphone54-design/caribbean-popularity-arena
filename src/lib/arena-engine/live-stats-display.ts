import type { ArenaEngineLiveSession, ArenaEnginePublicState } from "@/lib/arena-engine/types";

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

export function countLiveSessionsNow(
  sessions: ArenaEngineLiveSession[],
  nowMs = Date.now()
) {
  return sessions.filter((session) => Date.parse(session.expiresAt) > nowMs).length;
}

/** Client display · next 12h boundary even if server rotation is a beat behind */
export function resolveEffectiveNextRotationAt(
  engine: Pick<ArenaEnginePublicState, "nextRotationAt" | "lastRotationAt" | "rotationIntervalHours">,
  nowMs = Date.now()
) {
  const intervalMs = engine.rotationIntervalHours * 60 * 60 * 1000;

  if (engine.nextRotationAt) {
    const scheduledMs = Date.parse(engine.nextRotationAt);
    if (scheduledMs > nowMs) return engine.nextRotationAt;

    let candidate = scheduledMs;
    while (candidate <= nowMs) candidate += intervalMs;
    return new Date(candidate).toISOString();
  }

  const anchorMs = engine.lastRotationAt ? Date.parse(engine.lastRotationAt) : nowMs;
  let candidate = anchorMs + intervalMs;
  while (candidate <= nowMs) candidate += intervalMs;
  return new Date(candidate).toISOString();
}

export function getRotationRemainingMs(nextRotationAt: string | null, nowMs = Date.now()) {
  if (!nextRotationAt) return 0;
  return Math.max(0, Date.parse(nextRotationAt) - nowMs);
}

export function formatRotationCountdown(nextRotationAt: string | null, nowMs = Date.now()) {
  if (!nextRotationAt) return "—";

  const totalSeconds = Math.floor(getRotationRemainingMs(nextRotationAt, nowMs) / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

export function formatRotationCountdownForEngine(
  engine: Pick<ArenaEnginePublicState, "nextRotationAt" | "lastRotationAt" | "rotationIntervalHours">,
  nowMs = Date.now()
) {
  return formatRotationCountdown(resolveEffectiveNextRotationAt(engine, nowMs), nowMs);
}

export function getEngineScheduleStatus(
  engine: Pick<
    ArenaEnginePublicState,
    "nextRotationAt" | "lastRotationAt" | "rotationIntervalHours" | "shouldRotate"
  >,
  nowMs = Date.now()
) {
  if (engine.shouldRotate && getRotationRemainingMs(engine.nextRotationAt, nowMs) <= 0) {
    return "rotate due";
  }

  const effective = resolveEffectiveNextRotationAt(engine, nowMs);
  return nowMs >= Date.parse(effective) ? "rotate due" : "on schedule";
}
