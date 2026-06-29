const girlEntryKey = "cpa_girl_entry_started_at";

export function markGirlEntryStart() {
  if (typeof window === "undefined") return;
  if (window.sessionStorage.getItem(girlEntryKey)) return;
  window.sessionStorage.setItem(girlEntryKey, String(Date.now()));
}

export function readGirlEntryStartedAt(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(girlEntryKey);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

export function formatGirlSessionElapsed(startedAt: number, nowMs: number) {
  const totalSeconds = Math.max(0, Math.floor((nowMs - startedAt) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

export function formatGirlSessionElapsedLabel(startedAt: number, nowMs: number) {
  const totalSeconds = Math.max(0, Math.floor((nowMs - startedAt) / 1000));
  if (totalSeconds < 60) return "just entered";
  if (totalSeconds < 3600) return `${Math.floor(totalSeconds / 60)}m in session`;
  return `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m live`;
}
