/**
 * Copa Dominó Ecuatoriano · monthly board + hall of fame.
 * v1: localStorage (frictionless, no login). Structure is month-keyed for future Firebase.
 */

export type DominoPlayerProfile = {
  id: string;
  name: string;
  flag: string;
  createdAt: string;
};

export type DominoLeaderboardEntry = {
  playerId: string;
  playerName: string;
  flag: string;
  points: number;
  wins: number;
  monthKey: string;
  updatedAt: string;
};

export type DominoChampion = {
  monthKey: string;
  playerId: string;
  playerName: string;
  flag: string;
  points: number;
  crownedAt: string;
};

type TournamentBlob = {
  version: 1;
  profile: DominoPlayerProfile | null;
  /** monthKey → entries */
  months: Record<string, DominoLeaderboardEntry[]>;
  hallOfFame: DominoChampion[];
  /** last month key we processed for crowning */
  lastProcessedMonth: string | null;
};

const STORAGE_KEY = "cfa_copa_domino_ec_v1";

function emptyBlob(): TournamentBlob {
  return {
    version: 1,
    profile: null,
    months: {},
    hallOfFame: [],
    lastProcessedMonth: null
  };
}

function readBlob(): TournamentBlob {
  if (typeof window === "undefined") return emptyBlob();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyBlob();
    const parsed = JSON.parse(raw) as TournamentBlob;
    if (!parsed || parsed.version !== 1) return emptyBlob();
    return {
      ...emptyBlob(),
      ...parsed,
      months: parsed.months ?? {},
      hallOfFame: parsed.hallOfFame ?? []
    };
  } catch {
    return emptyBlob();
  }
}

function writeBlob(blob: TournamentBlob) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blob));
  } catch {
    /* quota / private mode */
  }
}

/** Month key in America/Guayaquil (Ecuador) */
export function getDominoMonthKey(date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Guayaquil",
      year: "numeric",
      month: "2-digit"
    }).formatToParts(date);
    const y = parts.find((p) => p.type === "year")?.value ?? "2026";
    const m = parts.find((p) => p.type === "month")?.value ?? "01";
    return `${y}-${m}`;
  } catch {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }
}

export function formatDominoMonthLabel(monthKey: string): string {
  const [y, m] = monthKey.split("-");
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];
  const idx = Math.max(0, Math.min(11, Number(m) - 1));
  return `${monthNames[idx]} ${y}`;
}

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `domino_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function sortEntries(entries: DominoLeaderboardEntry[]): DominoLeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.playerName.localeCompare(b.playerName, "es");
  });
}

/**
 * Crown previous month if we rolled into a new month and previous board had players.
 */
function processMonthRollover(blob: TournamentBlob, currentMonth: string): TournamentBlob {
  const next = { ...blob, months: { ...blob.months }, hallOfFame: [...blob.hallOfFame] };

  const monthKeys = Object.keys(next.months).sort();
  for (const key of monthKeys) {
    if (key >= currentMonth) continue;
    const already = next.hallOfFame.some((c) => c.monthKey === key);
    if (already) continue;
    const board = sortEntries(next.months[key] ?? []);
    if (board.length === 0 || board[0].points <= 0) continue;
    const top = board[0];
    next.hallOfFame.unshift({
      monthKey: key,
      playerId: top.playerId,
      playerName: top.playerName,
      flag: top.flag,
      points: top.points,
      crownedAt: new Date().toISOString()
    });
  }

  next.hallOfFame = next.hallOfFame
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey))
    .slice(0, 24);
  next.lastProcessedMonth = currentMonth;
  return next;
}

export function getDominoProfile(): DominoPlayerProfile | null {
  return readBlob().profile;
}

export function saveDominoProfile(name: string, flag = "🇪🇨"): DominoPlayerProfile {
  const blob = readBlob();
  const trimmed = name.trim().slice(0, 24) || "Jugador";
  const profile: DominoPlayerProfile = blob.profile
    ? { ...blob.profile, name: trimmed, flag }
    : {
        id: newId(),
        name: trimmed,
        flag,
        createdAt: new Date().toISOString()
      };
  writeBlob({ ...blob, profile });
  return profile;
}

export type MonthlyBoardView = {
  monthKey: string;
  monthLabel: string;
  entries: DominoLeaderboardEntry[];
  userRank: number | null;
  userEntry: DominoLeaderboardEntry | null;
  pointsToNext: number | null;
  championThisMonthPreview: DominoLeaderboardEntry | null;
};

export function getMonthlyBoard(topN = 10): MonthlyBoardView {
  const monthKey = getDominoMonthKey();
  const blob = processMonthRollover(readBlob(), monthKey);
  writeBlob(blob);

  const entries = sortEntries(blob.months[monthKey] ?? []);
  const profile = blob.profile;
  const userEntry = profile
    ? entries.find((e) => e.playerId === profile.id) ?? null
    : null;
  const userRank = userEntry
    ? entries.findIndex((e) => e.playerId === profile!.id) + 1
    : null;

  let pointsToNext: number | null = null;
  if (userRank && userRank > 1 && userEntry) {
    const above = entries[userRank - 2];
    pointsToNext = Math.max(0, above.points - userEntry.points + 1);
  } else if (userRank === 1) {
    pointsToNext = 0;
  }

  return {
    monthKey,
    monthLabel: formatDominoMonthLabel(monthKey),
    entries: entries.slice(0, topN),
    userRank,
    userEntry,
    pointsToNext,
    championThisMonthPreview: entries[0] ?? null
  };
}

export function getHallOfFame(limit = 12): DominoChampion[] {
  const monthKey = getDominoMonthKey();
  const blob = processMonthRollover(readBlob(), monthKey);
  writeBlob(blob);
  return blob.hallOfFame.slice(0, limit);
}

/**
 * Award points after a win vs AI. Creates profile if name provided and missing.
 * Returns points added and updated board snapshot.
 */
export function awardDominoPoints(
  points: number,
  opts?: { win?: boolean }
): { profile: DominoPlayerProfile | null; board: MonthlyBoardView; applied: boolean } {
  const monthKey = getDominoMonthKey();
  const blob = processMonthRollover(readBlob(), monthKey);

  if (!blob.profile || points <= 0) {
    writeBlob(blob);
    return { profile: blob.profile, board: getMonthlyBoard(), applied: false };
  }

  const list = [...(blob.months[monthKey] ?? [])];
  const idx = list.findIndex((e) => e.playerId === blob.profile!.id);
  const now = new Date().toISOString();

  if (idx >= 0) {
    list[idx] = {
      ...list[idx],
      playerName: blob.profile.name,
      flag: blob.profile.flag,
      points: list[idx].points + points,
      wins: list[idx].wins + (opts?.win ? 1 : 0),
      updatedAt: now
    };
  } else {
    list.push({
      playerId: blob.profile.id,
      playerName: blob.profile.name,
      flag: blob.profile.flag,
      points,
      wins: opts?.win ? 1 : 0,
      monthKey,
      updatedAt: now
    });
  }

  const next: TournamentBlob = {
    ...blob,
    months: { ...blob.months, [monthKey]: list }
  };
  writeBlob(next);

  return { profile: next.profile, board: getMonthlyBoard(), applied: true };
}
