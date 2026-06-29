/** Apple Liquid Glass gate · per-country panel labels */

import { getCountryLiveGiftAmountLegalNote } from "@/lib/country-live-gift-amount";

export type CountryLiveGiftGateLabels = {
  freedomTitle: string;
  roomKicker: string;
  roomLoaded: (flag: string, countryName: string) => string;
  previewBadge: string;
  laneKicker: string;
  laneCopy: string;
  gameKicker: string;
  giftKicker: string;
  gameBadge?: string;
  sendGift: string;
  shellClass?: string;
};

const englishGateLabels: CountryLiveGiftGateLabels = {
  freedomTitle: "FREEDOM GATEWAY",
  roomKicker: "Apple Liquid Glass · Room",
  roomLoaded: (flag, countryName) => `${flag} ${countryName} room loaded`,
  previewBadge: "Preview lanes open",
  laneKicker: "Apple Liquid Glass · Live lane",
  laneCopy: "Mobile online games · talk-show · one lane per country.",
  gameKicker: "Apple Liquid Glass · Game",
  giftKicker: "Apple Liquid Glass · Gift",
  sendGift: "Send Gift"
};

/** Ecuador · Spanish badass Liquid Glass gate */
const ecuadorGateLabels: CountryLiveGiftGateLabels = {
  freedomTitle: "PORTAL LIBERTAD",
  roomKicker: "Liquid Glass · Sala",
  roomLoaded: (flag) => `${flag} Sala Ecuador activa`,
  previewBadge: "Carriles preview abiertos",
  laneKicker: "Liquid Glass · Carril en vivo",
  laneCopy: "Juegos móviles online · talk-show · una lane por país.",
  gameKicker: "Liquid Glass · Juego",
  giftKicker: "Liquid Glass · Regalo",
  gameBadge: "⚡ Ecuavoley · Free Fire",
  sendGift: "Enviar Regalo",
  shellClass: "c-live-gift-glass--ecuador-badass"
};

const japanGateLabels: CountryLiveGiftGateLabels = {
  ...englishGateLabels,
  shellClass: "c-live-gift-glass--japan-focus"
};

export function getCountryLiveGiftGateLabels(countryId: string): CountryLiveGiftGateLabels {
  if (countryId === "ecuador") return ecuadorGateLabels;
  if (countryId === "japan") return japanGateLabels;
  return englishGateLabels;
}

export type CountryLiveGiftLegalFooter = {
  linkLabel: string;
  disclosureNote: string;
};

/** One-click gift panel · legal link + micro-disclosure (locale-aware) */
export function getCountryLiveGiftLegalFooter(countryId: string): CountryLiveGiftLegalFooter {
  const amountNote = getCountryLiveGiftAmountLegalNote(countryId);

  if (countryId === "ecuador") {
    return {
      linkLabel: "Términos del regalo · divulgación de ingresos →",
      disclosureNote: amountNote
        ? `Regalo digital voluntario. No constituye compra de bienes ni garantiza comunicación con personas específicas. ${amountNote}`
        : "Regalo digital voluntario. No constituye compra de bienes ni garantiza comunicación con personas específicas."
    };
  }

  return {
    linkLabel: "Gift terms · revenue disclosure →",
    disclosureNote: amountNote
      ? `Voluntary digital gift. Not a purchase of goods or access to any specific individual. ${amountNote}`
      : "Voluntary digital gift. Not a purchase of goods or access to any specific individual."
  };
}

export type CountryLiveGiftButtonCopy = {
  primary: string;
  detail: string | null;
  submitting: string;
};

export function getCountryLiveGiftPanelButtonLabel(opts: {
  amountLabel: string;
  sessionHours: number;
  activitySuffix: string;
}) {
  const { amountLabel, sessionHours, activitySuffix } = opts;
  return `Gift · ${amountLabel} · Watch live · ${activitySuffix} · ${sessionHours}h`;
}

/** @deprecated use getCountryLiveGiftPanelButtonLabel */
export const getColombiaRomanticGiftButtonLabel = getCountryLiveGiftPanelButtonLabel;

/** Structured CTA lines · intl = single row per arena policy */
export function getCountryLiveGiftButtonCopy(
  countryId: string,
  opts: {
    amountLabel: string;
    sessionHours: number;
    activitySuffix: string;
    sendGiftLabel: string;
    openingLabel: string;
    compact?: boolean;
  }
): CountryLiveGiftButtonCopy {
  const { amountLabel, sessionHours, activitySuffix, sendGiftLabel, openingLabel, compact } = opts;

  if (countryId === "ecuador") {
    if (compact) {
      return {
        primary: `${sendGiftLabel} · ${amountLabel} · ver en vivo`,
        detail: null,
        submitting: "Abriendo regalo…"
      };
    }

    return {
      primary: `${sendGiftLabel} · ${amountLabel}`,
      detail: `Acceso en vivo · ${activitySuffix} · ${sessionHours} h`,
      submitting: "Abriendo regalo…"
    };
  }

  if (compact) {
    return {
      primary: `${sendGiftLabel} · ${amountLabel} · watch live`,
      detail: null,
      submitting: openingLabel
    };
  }

  return {
    primary: `${sendGiftLabel} · ${amountLabel}`,
    detail: `Watch live · ${activitySuffix} · ${sessionHours}h`,
    submitting: openingLabel
  };
}
