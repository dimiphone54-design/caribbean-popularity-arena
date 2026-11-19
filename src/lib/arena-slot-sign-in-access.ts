import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { isArenaFront12VisibleSlot } from "@/lib/arena-front12-slot-order";
import {
  getInternationalSuiteActiveCountryLabel,
  getInternationalSuiteActiveIslandCodes,
  isInternationalSuiteCountryActiveByIslandCode
} from "@/lib/international-suite";

/** UI may additionally allow owner preview through the browser-only master key. */
export function isArenaSlotSignInOpenForUi(islandCode: string, masterKeyActive = false) {
  if (masterKeyActive) return true;
  return isArenaSlotSignInOpen(islandCode);
}

export function isArenaSlotFrozenForUi(islandCode: string, masterKeyActive = false) {
  return !isArenaSlotSignInOpenForUi(islandCode, masterKeyActive);
}

/** Public sign-in lanes: visible Front 12 slots plus active International SUITE countries. */
export const arenaSlotSignInOpenIslandCodes = getInternationalSuiteActiveIslandCodes();

export type ArenaSlotSignInOpenIslandCode = (typeof arenaSlotSignInOpenIslandCodes)[number];

/** Server authorization is deterministic and does not trust browser sessionStorage. */
export function isArenaSlotSignInOpen(islandCode: string) {
  return (
    isArenaFront12VisibleSlot(islandCode) ||
    isInternationalSuiteCountryActiveByIslandCode(islandCode)
  );
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
    meta: "Age 24 · Sailing"
  },
  {
    position: 5,
    name: "Leah Francis",
    country: "U.S. Virgin Islands",
    flag: "🇻🇮",
    meta: "Age 23 · Culture"
  }
];

export function getLegalBotFrozenFrontQueueCount() {
  return legalBotFrozenFrontQueueSlots.length;
}
