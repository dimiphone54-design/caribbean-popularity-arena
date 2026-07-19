/**
 * Platform Vault — pending ledger (no real charge until PayPal is live)
 * Piles up orders + owed amounts for London · Japan · China · Ecuador · all lanes
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { isPayPalConfigured } from "@/lib/paypal";
import type { PlatformPayKind } from "@/lib/platform-paypal";
import { isRealMoneyEnabled } from "@/lib/real-money";

export type VaultEntryStatus = "pending_collection" | "collected" | "cancelled" | "converted_to_paypal";

export type PlatformVaultEntry = {
  id: string;
  kind: PlatformPayKind;
  countryId: string;
  countryName: string;
  city: string;
  flag: string;
  itemLabel: string;
  sku: string;
  amountUsd: number;
  currency: "USD";
  /** Platform cut of this entry (service fee / commission share) */
  platformUsd: number;
  /** Creator or supplier share owed later */
  counterpartUsd: number;
  counterpartLabel: "creator" | "supplier" | "none";
  buyerEmail: string;
  status: VaultEntryStatus;
  note: string;
  createdAt: string;
  updatedAt: string;
  /** Optional link to dropship order id */
  refId?: string;
};

export type PlatformVaultSummary = {
  entryCount: number;
  pendingCount: number;
  totalPendingUsd: number;
  platformPendingUsd: number;
  counterpartPendingUsd: number;
  byCountry: Array<{
    countryId: string;
    countryName: string;
    flag: string;
    city: string;
    count: number;
    totalUsd: number;
    platformUsd: number;
    counterpartUsd: number;
  }>;
  byKind: Array<{ kind: string; count: number; totalUsd: number }>;
  checkoutMode: "vault" | "paypal" | "off";
  paypalConfigured: boolean;
  realMoneyEnabled: boolean;
};

const DATA_FILE = path.join(process.cwd(), ".data", "platform-vault.json");

type VaultFile = { entries: PlatformVaultEntry[] };

async function readFileStore(): Promise<VaultFile> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as VaultFile;
    if (!parsed?.entries || !Array.isArray(parsed.entries)) return { entries: [] };
    return parsed;
  } catch {
    return { entries: [] };
  }
}

async function writeFileStore(file: VaultFile) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify({ entries: file.entries.slice(0, 8000) }, null, 2), "utf8");
}

/**
 * off    = real-money freeze (no charges, no purchase ledger writes from checkout)
 * vault  = pile orders (no real charge)
 * paypal = only when real money enabled + PLATFORM_CHECKOUT_MODE=paypal + credentials
 */
export function getPlatformCheckoutMode(): "vault" | "paypal" | "off" {
  if (!isRealMoneyEnabled()) return "off";
  const forced = (process.env.PLATFORM_CHECKOUT_MODE ?? "vault").toLowerCase().trim();
  if (forced === "off" || forced === "frozen" || forced === "disabled") return "off";
  if (forced === "paypal" && isPayPalConfigured()) return "paypal";
  return "vault";
}

export function isVaultMode(): boolean {
  return getPlatformCheckoutMode() === "vault";
}

export function isCheckoutOff(): boolean {
  return getPlatformCheckoutMode() === "off";
}

export type CreateVaultEntryInput = {
  kind: PlatformPayKind;
  countryId: string;
  countryName: string;
  city?: string;
  flag?: string;
  itemLabel: string;
  sku?: string;
  amountUsd: number | string;
  platformUsd?: number;
  counterpartUsd?: number;
  counterpartLabel?: "creator" | "supplier" | "none";
  buyerEmail?: string;
  note?: string;
  refId?: string;
};

const CITY_DEFAULT: Record<string, { city: string; flag: string }> = {
  uk: { city: "London", flag: "🇬🇧" },
  japan: { city: "Tokyo", flag: "🇯🇵" },
  china: { city: "Shanghai", flag: "🇨🇳" },
  ecuador: { city: "Quito", flag: "🇪🇨" },
  global: { city: "Arena", flag: "🌐" }
};

/** Default gift split 70% creator · 30% platform */
export function defaultGiftSplit(amount: number) {
  const platformUsd = Math.round(amount * 0.3 * 100) / 100;
  const counterpartUsd = Math.round((amount - platformUsd) * 100) / 100;
  return { platformUsd, counterpartUsd, counterpartLabel: "creator" as const };
}

export async function createVaultEntry(input: CreateVaultEntryInput): Promise<PlatformVaultEntry> {
  const amount = Math.max(0, Number(input.amountUsd) || 0);
  const countryId = (input.countryId || "global").toLowerCase();
  const place = CITY_DEFAULT[countryId] ?? CITY_DEFAULT.global;

  let platformUsd = input.platformUsd;
  let counterpartUsd = input.counterpartUsd;
  let counterpartLabel = input.counterpartLabel ?? "none";

  if (platformUsd === undefined || counterpartUsd === undefined) {
    if (input.kind === "gift") {
      const split = defaultGiftSplit(amount);
      platformUsd = split.platformUsd;
      counterpartUsd = split.counterpartUsd;
      counterpartLabel = "creator";
    } else if (input.kind === "dropship") {
      // 15% platform / 85% supplier default for vault ledger
      platformUsd = Math.round(amount * 0.15 * 100) / 100;
      counterpartUsd = Math.round((amount - platformUsd) * 100) / 100;
      counterpartLabel = "supplier";
    } else {
      // vote, boost, membership → platform revenue until paid for real
      platformUsd = amount;
      counterpartUsd = 0;
      counterpartLabel = "none";
    }
  }

  const now = new Date().toISOString();
  const entry: PlatformVaultEntry = {
    id: `vault_${randomUUID()}`,
    kind: input.kind,
    countryId,
    countryName: input.countryName || countryId,
    city: input.city || place.city,
    flag: input.flag || place.flag,
    itemLabel: input.itemLabel,
    sku: input.sku || input.kind,
    amountUsd: Math.round(amount * 100) / 100,
    currency: "USD",
    platformUsd: Math.round((platformUsd ?? 0) * 100) / 100,
    counterpartUsd: Math.round((counterpartUsd ?? 0) * 100) / 100,
    counterpartLabel,
    buyerEmail: (input.buyerEmail ?? "").trim().toLowerCase(),
    status: "pending_collection",
    note:
      input.note ||
      "Pending collection · no real charge yet · platform vault until PayPal live",
    createdAt: now,
    updatedAt: now,
    refId: input.refId
  };

  const file = await readFileStore();
  file.entries.unshift(entry);
  await writeFileStore(file);
  return entry;
}

export async function listVaultEntries(limit = 100): Promise<PlatformVaultEntry[]> {
  const file = await readFileStore();
  return file.entries.slice(0, limit);
}

export async function getVaultSummary(): Promise<PlatformVaultSummary> {
  const file = await readFileStore();
  const pending = file.entries.filter((e) => e.status === "pending_collection");

  const byCountryMap = new Map<
    string,
    {
      countryId: string;
      countryName: string;
      flag: string;
      city: string;
      count: number;
      totalUsd: number;
      platformUsd: number;
      counterpartUsd: number;
    }
  >();

  const byKindMap = new Map<string, { kind: string; count: number; totalUsd: number }>();

  for (const e of pending) {
    const c = byCountryMap.get(e.countryId) ?? {
      countryId: e.countryId,
      countryName: e.countryName,
      flag: e.flag,
      city: e.city,
      count: 0,
      totalUsd: 0,
      platformUsd: 0,
      counterpartUsd: 0
    };
    c.count += 1;
    c.totalUsd += e.amountUsd;
    c.platformUsd += e.platformUsd;
    c.counterpartUsd += e.counterpartUsd;
    byCountryMap.set(e.countryId, c);

    const k = byKindMap.get(e.kind) ?? { kind: e.kind, count: 0, totalUsd: 0 };
    k.count += 1;
    k.totalUsd += e.amountUsd;
    byKindMap.set(e.kind, k);
  }

  const round2 = (n: number) => Math.round(n * 100) / 100;

  return {
    entryCount: file.entries.length,
    pendingCount: pending.length,
    totalPendingUsd: round2(pending.reduce((s, e) => s + e.amountUsd, 0)),
    platformPendingUsd: round2(pending.reduce((s, e) => s + e.platformUsd, 0)),
    counterpartPendingUsd: round2(pending.reduce((s, e) => s + e.counterpartUsd, 0)),
    byCountry: Array.from(byCountryMap.values())
      .map((c) => ({
        ...c,
        totalUsd: round2(c.totalUsd),
        platformUsd: round2(c.platformUsd),
        counterpartUsd: round2(c.counterpartUsd)
      }))
      .sort((a, b) => b.totalUsd - a.totalUsd),
    byKind: Array.from(byKindMap.values())
      .map((k) => ({ ...k, totalUsd: round2(k.totalUsd) }))
      .sort((a, b) => b.totalUsd - a.totalUsd),
    checkoutMode: getPlatformCheckoutMode(),
    paypalConfigured: isPayPalConfigured(),
    realMoneyEnabled: isRealMoneyEnabled()
  };
}
