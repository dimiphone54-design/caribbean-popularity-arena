import type { ArenaCreatorSlot } from "@/lib/arena-experience";

export type ArenaCountrySlotMeta = {
  islandCode: string;
  capital: string;
  timeZone: string;
  tzAbbrev: string;
  languageLabel: string;
  photoUrl: string;
  photoLocal: string;
};

/** Front 12 · one real woman portrait per country · local assets */
const countryPhoto = (path: string) => ({ photoUrl: path, photoLocal: path });

/** Front 12 · Colombia · UK/London · Lithuania · Ecuador · Trinidad · Jamaica · Venezuela · Poland · Tunisia · Guyana · China · Japan */
export const arenaCountrySlotMetaByCode: Record<string, ArenaCountrySlotMeta> = {
  CO: {
    islandCode: "CO",
    capital: "Bogotá",
    timeZone: "America/Bogota",
    tzAbbrev: "COT",
    languageLabel: "",
    ...countryPhoto("/colombia-nightlife-real.png")
  },
  UK: {
    islandCode: "UK",
    capital: "London",
    timeZone: "Europe/London",
    tzAbbrev: "GMT",
    languageLabel: "English · London",
    ...countryPhoto("/arena-real-people/uk.jpg")
  },
  LT: {
    islandCode: "LT",
    capital: "Vilnius",
    timeZone: "Europe/Vilnius",
    tzAbbrev: "EET",
    languageLabel: "Lithuanian",
    ...countryPhoto("/arena-real-people/lt.jpg")
  },
  EC: {
    islandCode: "EC",
    capital: "Quito",
    timeZone: "America/Guayaquil",
    tzAbbrev: "ECT",
    languageLabel: "Ecuadorian Spanish",
    ...countryPhoto("/arena-real-people/ec.jpg")
  },
  TT: {
    islandCode: "TT",
    capital: "Port of Spain",
    timeZone: "America/Port_of_Spain",
    tzAbbrev: "AST",
    languageLabel: "Trini Creole",
    ...countryPhoto("/arena-real-people/tt.jpg")
  },
  JM: {
    islandCode: "JM",
    capital: "Kingston",
    timeZone: "America/Jamaica",
    tzAbbrev: "EST",
    languageLabel: "Jamaican Patois",
    ...countryPhoto("/arena-real-people/jm.jpg")
  },
  VE: {
    islandCode: "VE",
    capital: "Caracas",
    timeZone: "America/Caracas",
    tzAbbrev: "VET",
    languageLabel: "Venezuelan Spanish",
    ...countryPhoto("/arena-real-people/ve.jpg")
  },
  PL: {
    islandCode: "PL",
    capital: "Warsaw",
    timeZone: "Europe/Warsaw",
    tzAbbrev: "CET",
    languageLabel: "Polish",
    ...countryPhoto("/arena-real-people/pl.jpg")
  },
  TN: {
    islandCode: "TN",
    capital: "Tunis",
    timeZone: "Africa/Tunis",
    tzAbbrev: "CET",
    languageLabel: "Arabic · French",
    ...countryPhoto("/arena-real-people/tn.jpg")
  },
  GY: {
    islandCode: "GY",
    capital: "Georgetown",
    timeZone: "America/Guyana",
    tzAbbrev: "GYT",
    languageLabel: "",
    ...countryPhoto("/arena-real-people/gy.jpg")
  },
  CN: {
    islandCode: "CN",
    capital: "Shanghai",
    timeZone: "Asia/Shanghai",
    tzAbbrev: "CST",
    languageLabel: "Mandarin Chinese",
    ...countryPhoto("/arena-real-people/cn.jpg")
  },
  JP: {
    islandCode: "JP",
    capital: "JAPAN",
    timeZone: "Asia/Tokyo",
    tzAbbrev: "JST",
    languageLabel: "Japanese",
    ...countryPhoto("/arena-real-people/jp.jpg")
  }
};

const fallbackMeta = arenaCountrySlotMetaByCode.CO!;

export function getArenaCountrySlotMeta(slot: Pick<ArenaCreatorSlot, "islandCode">) {
  return arenaCountrySlotMetaByCode[slot.islandCode] ?? fallbackMeta;
}

const countryIdToIslandCode: Record<string, string> = {
  colombia: "CO",
  uk: "UK",
  lithuania: "LT",
  ecuador: "EC",
  trinidad: "TT",
  jamaica: "JM",
  venezuela: "VE",
  poland: "PL",
  tunisia: "TN",
  guyana: "GY",
  china: "CN",
  japan: "JP"
};

export function getArenaCountryMetaByCountryId(countryId: string) {
  const code = countryIdToIslandCode[countryId];
  if (!code) return fallbackMeta;
  return arenaCountrySlotMetaByCode[code] ?? fallbackMeta;
}
