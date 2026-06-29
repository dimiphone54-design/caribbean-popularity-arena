import generatedPaths from "@/lib/cfa-header-slot-country-paths.generated.json";
import { arenaCreators } from "@/lib/arena-experience";
import { getCfaHeaderTrinidadStrobePaths } from "@/lib/cfa-header-trinidad-ai-strobe-paths";

export type CfaHeaderSlotCountryMap = {
  islandCode: string;
  country: string;
  flag: string;
  width: number;
  height: number;
  stripeA: string;
  stripeB: string;
  stripeC: string;
  mapImage?: string;
  silhouettePaths: string[];
  joinAnchor: { cx: number; cy: number };
  exactTrinidad?: boolean;
};

type GeneratedSlotMap = Omit<CfaHeaderSlotCountryMap, "islandCode" | "country" | "flag" | "exactTrinidad">;

const ttPaths = getCfaHeaderTrinidadStrobePaths();
const generated = generatedPaths as Record<string, GeneratedSlotMap>;

/** Trinidad stays exact flag-map · all others use Natural Earth silhouettes */
function resolveSlotMap(islandCode: string): GeneratedSlotMap & { exactTrinidad?: boolean } {
  if (islandCode === "TT") {
    return {
      width: ttPaths.width,
      height: ttPaths.height,
      stripeA: "#CE1126",
      stripeB: "#FFFFFF",
      stripeC: "#000000",
      mapImage: "/trinidad-tobago-flag-map.png",
      silhouettePaths: [ttPaths.trinidad, ttPaths.tobago],
      joinAnchor: { cx: 291, cy: 432 },
      exactTrinidad: true
    };
  }

  if (islandCode === "CO") {
    const map = generated.CO!;
    return {
      ...map,
      width: 749,
      height: 1000,
      mapImage: "/colombia-flag-map.png",
      joinAnchor: { cx: 374.5, cy: 500 }
    };
  }

  const map = generated[islandCode] ?? generated.CO!;
  return map;
}

export function buildCfaHeaderSlotCountryMaps(): CfaHeaderSlotCountryMap[] {
  return arenaCreators.slice(0, 12).map((slot) => {
    const map = resolveSlotMap(slot.islandCode);

    return {
      islandCode: slot.islandCode,
      country: slot.country,
      flag: slot.flag,
      width: map.width,
      height: map.height,
      stripeA: map.stripeA,
      stripeB: map.stripeB,
      stripeC: map.stripeC,
      mapImage: map.mapImage,
      silhouettePaths: map.silhouettePaths,
      joinAnchor: map.joinAnchor,
      exactTrinidad: map.exactTrinidad
    };
  });
}

export const CFA_HEADER_SLOT_COUNTRY_MAPS = buildCfaHeaderSlotCountryMaps();
