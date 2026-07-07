const FOOTBALL_COOLDOWN_MS = 60 * 60 * 1000;
let footballCooldownUntil = 0;

export function isFootballApiOnCooldown() {
  return Date.now() <= footballCooldownUntil;
}

export function markFootballApiCooldown() {
  footballCooldownUntil = Date.now() + FOOTBALL_COOLDOWN_MS;
}