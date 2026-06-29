import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import {
  getInternationalSuiteActiveCountryLabel,
  getInternationalSuiteActiveIslandCodes,
  isInternationalSuiteCountryActiveByIslandCode
} from "@/lib/international-suite";

/** Front 12 · girl sign-in open · mirrors International SUITE active countries only */
export const arenaSlotSignInOpenIslandCodes = getInternationalSuiteActiveIslandCodes();

export type ArenaSlotSignInOpenIslandCode = (typeof arenaSlotSignInOpenIslandCodes)[number];

export function isArenaSlotSignInOpen(islandCode: string) {
  if (isArenaMasterKeyActive()) return true;
  return isInternationalSuiteCountryActiveByIslandCode(islandCode);
}

export function isArenaSlotFrozen(islandCode: string) {
  return !isArenaSlotSignInOpen(islandCode);
}

export const arenaSlotSignInFrozenCopy = `Slot frozen · girl sign-in open · ${getInternationalSuiteActiveCountryLabel()} only`;

export const arenaSlotSignInFrozenShortCopy = `Frozen · ${getInternationalSuiteActiveCountryLabel({ short: true })} only`;

export const arenaSlotSignInOpenLabel = getInternationalSuiteActiveCountryLabel();

export type ArenaNationSlotRow = {
  position: number;
  name: string;
  country: string;
  flag: string;
  islandCode: string;
  meta: string;
};

export function getArenaActiveNationSlotCount() {
  return getInternationalSuiteActiveIslandCodes().length;
}

export function mapArenaCreatorsToActiveSlotRows(
  slots: Array<{
    rank: number;
    name: string;
    country: string;
    flag: string;
    islandCode: string;
    age: number;
    category: string;
  }>
): ArenaNationSlotRow[] {
  return slots
    .filter((slot) => isArenaSlotSignInOpen(slot.islandCode))
    .sort((a, b) => a.rank - b.rank)
    .map((slot, index) => ({
      position: index + 1,
      name: slot.name,
      country: slot.country,
      flag: slot.flag,
      islandCode: slot.islandCode,
      meta: `Age ${slot.age} · ${slot.category}`
    }));
}

export function mapEngineFrontSlotsToActiveRows(
  slots: Array<{
    slotRank: number;
    templateIslandCode: string;
    name: string;
    country: string;
    flag: string;
    age: number;
    category: string;
  }>
): ArenaNationSlotRow[] {
  return slots
    .filter((slot) => isArenaSlotSignInOpen(slot.templateIslandCode))
    .sort((a, b) => a.slotRank - b.slotRank)
    .map((slot, index) => ({
      position: index + 1,
      name: slot.name,
      country: slot.country,
      flag: slot.flag,
      islandCode: slot.templateIslandCode,
      meta: `Age ${slot.age} · ${slot.category}`
    }));
}

/** Legal bot Front panel · frozen Caribbean back-queue · exact five */
export const legalBotFrozenFrontQueueSlots: ArenaNationSlotRow[] = [
  {
    position: 1,
    name: "Valentina Cruz",
    country: "Puerto Rico",
    flag: "🇵🇷",
    islandCode: "PR",
    meta: "Age 24 · Dance"
  },
  {
    position: 2,
    name: "Camila Reyes",
    country: "Dominican Republic",
    flag: "🇩🇴",
    islandCode: "DO",
    meta: "Age 23 · Music"
  },
  {
    position: 3,
    name: "Anaya Pierre",
    country: "Haiti",
    flag: "🇭🇹",
    islandCode: "HT",
    meta: "Age 22 · Fashion"
  },
  {
    position: 4,
    name: "Jasmine Hodge",
    country: "British Virgin Islands",
    flag: "🇻🇬",
    islandCode: "VG",
    meta: "Age 24 · Sailing"
  },
  {
    position: 5,
    name: "Leah Francis",
    country: "U.S. Virgin Islands",
    flag: "🇻🇮",
    islandCode: "VI",
    meta: "Age 23 · Culture"
  }
];

export function getLegalBotFrozenFrontQueueCount() {
  return legalBotFrozenFrontQueueSlots.length;
}
