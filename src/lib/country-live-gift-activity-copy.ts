import { getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";
import { internationalSuiteCountries } from "@/lib/international-suite";

/** Gate headline tag · games · talk-show · activities */
export function getCountryGateHeadlineTag(countryId: string) {
  if (countryId === "japan") {
    return "ゲーム · トークショー · アクティビティ";
  }
  if (countryId === "ecuador") {
    return "juegos · talk-show · actividades";
  }
  return "games · talk-show · activities";
}

/** Per-country lane · viral games + talk-show hints for live-gift gate */
export function getCountryLiveGiftActivityTag(countryId: string) {
  if (countryId === "japan") {
    return "Monster Strike · mobile online games";
  }

  const country = internationalSuiteCountries.find((entry) => entry.id === countryId);
  const code = country?.islandCode ?? "";
  const games = getArenaSlotViralGames(code);

  if (countryId === "ecuador" && games.length) {
    const parts = games.slice(0, 2).map((game) => game.label);
    return parts.join(" · ");
  }

  if (!games.length) {
    return countryId === "ecuador" ? "juegos · talk-show · charla divertida" : "games · talk-show · funny banter";
  }

  const parts = games.slice(0, 2).map((game) => {
    const short = game.hint.split(" ·")[0]?.trim() ?? game.hint;
    return short.length > 36 ? `${short.slice(0, 34)}…` : short;
  });

  return parts.join(" · ");
}

/** Gate headline · Japan lane uses Monster Strike mobile online */
export function getCountryGateEnterLiveTitle(countryId: string, fallback: string) {
  if (countryId === "japan") {
    return "Join Monster Strike · mobile online games";
  }
  if (countryId === "ecuador") {
    return "ENTRA · JUEGOS Y ACTIVIDADES EN VIVO";
  }
  return fallback;
}

/** Room panel scroll hint under Apple Liquid Glass gate */
export function getCountryGateRoomScrollHint(countryId: string, fallback: string) {
  if (countryId === "japan") {
    return "Scroll for dropship · gift unlocks Monster Strike & talk-show below.";
  }
  if (countryId === "ecuador") {
    return "Baja al dropship · el regalo desbloquea juegos en vivo y talk-show abajo.";
  }
  return fallback;
}

/** Gift button suffix · Japan lane */
export function getCountryGateButtonSuffix(countryId: string, fallback: string) {
  if (countryId === "japan") {
    return "Monster Strike & talk-show";
  }
  if (countryId === "ecuador") {
    return "juegos y talk-show";
  }
  return fallback;
}

/** Footnote under gift panel */
export function getCountryGateFootnote(countryId: string, fallback: string) {
  if (countryId === "ecuador") {
    return "Abajo ves preview gratis. Juegos, talk-show y actividades se abren después del regalo (demo aquí · WiPay pronto).";
  }
  return fallback;
}

/** Price line under game panel */
export function getCountryGatePriceLine(countryId: string, fallback: string) {
  if (countryId === "ecuador") {
    return "Regalo worldwide · 3 horas · juegos · talk-show · una lane por país";
  }
  return fallback;
}
