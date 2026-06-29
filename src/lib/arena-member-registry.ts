import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ArenaMemberRecord = {
  id: string;
  displayName: string;
  email: string;
  country: string;
  islandCode: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  bankCountry: string;
  voiceLanguage?: string;
  accessPaid: boolean;
  amountUsd: number;
  paymentReference?: string;
  customReference?: string;
  createdAt: string;
  updatedAt: string;
};

export type ArenaMemberDraft = {
  displayName: string;
  email: string;
  country: string;
  islandCode: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  bankCountry: string;
  voiceLanguage?: string;
  customReference?: string;
};

const DATA_FILE = path.join(process.cwd(), ".data", "arena-members.json");

const globalStore = globalThis as typeof globalThis & {
  __arenaMembers?: ArenaMemberRecord[];
};

async function readFromDisk(): Promise<ArenaMemberRecord[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as ArenaMemberRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeToDisk(members: ArenaMemberRecord[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(members.slice(0, 5000), null, 2), "utf8");
}

export async function loadArenaMembers(): Promise<ArenaMemberRecord[]> {
  if (globalStore.__arenaMembers) return globalStore.__arenaMembers;
  const members = await readFromDisk();
  globalStore.__arenaMembers = members;
  return members;
}

export async function saveArenaMembers(members: ArenaMemberRecord[]) {
  globalStore.__arenaMembers = members.slice(0, 5000);
  await writeToDisk(globalStore.__arenaMembers);
}

function newMemberId() {
  return `member-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function upsertArenaMember(draft: ArenaMemberDraft, memberId?: string) {
  const members = await loadArenaMembers();
  const now = new Date().toISOString();
  const existingIndex = memberId ? members.findIndex((entry) => entry.id === memberId) : -1;
  const existing = existingIndex >= 0 ? members[existingIndex]! : null;

  const record: ArenaMemberRecord = {
    id: existing?.id ?? memberId ?? newMemberId(),
    displayName: draft.displayName.trim(),
    email: draft.email.trim().toLowerCase(),
    country: draft.country.trim(),
    islandCode: draft.islandCode.trim(),
    bankName: draft.bankName.trim(),
    accountHolderName: draft.accountHolderName.trim(),
    accountNumber: draft.accountNumber.trim(),
    bankCountry: draft.bankCountry.trim(),
    voiceLanguage: draft.voiceLanguage,
    accessPaid: existing?.accessPaid ?? false,
    amountUsd: existing?.amountUsd ?? 6,
    paymentReference: existing?.paymentReference,
    customReference: draft.customReference ?? existing?.customReference,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now
  };

  if (existingIndex >= 0) {
    members[existingIndex] = record;
  } else {
    members.unshift(record);
  }

  await saveArenaMembers(members);
  return record;
}

export async function findArenaMemberById(id: string) {
  const members = await loadArenaMembers();
  return members.find((entry) => entry.id === id) ?? null;
}

export async function findArenaMemberByCustomReference(customReference: string) {
  const members = await loadArenaMembers();
  return members.find((entry) => entry.customReference === customReference) ?? null;
}

export async function markArenaMemberPaid(input: {
  memberId?: string;
  customReference?: string;
  paymentReference?: string;
  amountUsd?: number;
}) {
  const members = await loadArenaMembers();
  const member = members.find((entry) => {
    if (input.memberId && entry.id === input.memberId) return true;
    if (input.customReference && entry.customReference === input.customReference) return true;
    if (input.customReference && entry.customReference?.includes(input.customReference)) return true;
    return false;
  });

  if (!member) return null;

  member.accessPaid = true;
  member.updatedAt = new Date().toISOString();
  if (input.paymentReference) member.paymentReference = input.paymentReference;
  if (input.customReference) member.customReference = input.customReference;
  if (input.amountUsd) member.amountUsd = input.amountUsd;

  await saveArenaMembers(members);
  return member;
}
