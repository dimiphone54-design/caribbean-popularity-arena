import { arenaCreators, type ArenaCreatorSlot } from "@/lib/arena-experience";
import { getDropshipOptionProductsForCountry } from "@/lib/dropshipping";

/** Japan room · Front 12 slot #12 · women creators · dropship showcase lane */
export const japanDropshipCreatorSlotMeta = {
  slotId: 12,
  islandCode: "JP" as const,
  roomSlug: "japan-room",
  defaultCreatorName: "Yuki Tanaka",
  defaultCreatorHandle: "@yuki.tokyo",
  defaultCreatorPhoto: "/japan-dropship-creator-live-slot.png",
  livePreviewImage: "/japan-dropship-creator-live-slot.png",
  viewers: 892
};

export function getJapanFront12CreatorSlot(): ArenaCreatorSlot {
  return arenaCreators.find((slot) => slot.id === japanDropshipCreatorSlotMeta.slotId) ?? arenaCreators[11]!;
}

export function getJapanDropshipCreatorShowcaseProducts() {
  return getDropshipOptionProductsForCountry("japan").slice(0, 3);
}

/** Inline signup · rules women must read before entering SLOT 12 */
export const japanDropshipCreatorSlotRules = [
  "Women creators only · 18+ · one woman locks SLOT 12 at a time",
  "Dropshipping lane · show Japan market products live · fans shop in dropship panel below",
  "3-hour live session · supplier ships direct · revenue split in gift terms · /legal",
  "No harassment · no minors · arena moderation · Community Guidelines apply",
  "Voluntary creator signup · saved to arena database · production verification when API keys connect"
] as const;

export const japanDropshipCreatorSignupDefaults = {
  lane: "dropshipping" as const,
  planPlaceholder:
    "I will show Japan lane products live — matcha kit, street fashion, lifestyle box — and link fans to checkout below."
};
