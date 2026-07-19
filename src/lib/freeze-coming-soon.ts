/**
 * Command Center · FREEZE COMING SOON catalog
 * One place listing everything frozen on the public site, by country.
 * Re-enable via .env.local flags (keys stay private in .env.local).
 */

import { getAllDropshipCountryConfigs } from "@/lib/dropship-country-config";
import { getDropshipHubCity, getDropshipCountryRoomHref } from "@/lib/dropship-lane-template";
import { getDropshipProductsForCountry } from "@/lib/dropshipping";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { PLATFORM_PAY_LANES } from "@/lib/platform-paypal";

export const FREEZE_COMING_SOON_TITLE = "FREEZE COMING SOON";

export const FREEZE_GLOBAL_FLAGS = [
  {
    key: "NEXT_PUBLIC_REAL_MONEY_ENABLED",
    value: "false",
    means: "Blocks all real PayPal charges, gifts, vote unlocks, boosts, membership pay"
  },
  {
    key: "PLATFORM_CHECKOUT_MODE",
    value: "off",
    means: "Checkout engine off (no vault pile-up from public, no PayPal capture path)"
  },
  {
    key: "NEXT_PUBLIC_SHOW_DROPSHIP_PANELS",
    value: "false",
    means: "Hides every public country dropship panel / tab / market enter button"
  },
  {
    key: "NEXT_PUBLIC_ENABLE_DROPSHIP_PURCHASES",
    value: "false",
    means: "Blocks product buy API even if panels were visible"
  },
  {
    key: "NEXT_PUBLIC_ENABLE_MEMBERSHIP_CHECKOUT",
    value: "false",
    means: "Membership PayPal buttons stay off"
  }
] as const;

/** Sitewide freezes that apply to every country */
export const FREEZE_SITEWIDE_ITEMS = [
  {
    id: "paypal-charges",
    label: "PayPal real charges",
    detail:
      "create-order / capture-order / platform vault POST rejected. Live keys remain stored privately in .env.local only."
  },
  {
    id: "gifts-tips",
    label: "Gifts & tips (paid)",
    detail:
      "Platform checkout gift path frozen. Fans cannot send paid gifts. Local demo toasts without charge may still appear in some test UIs."
  },
  {
    id: "vote-unlocks",
    label: "Paid voting unlocks",
    detail:
      "Paid vote-access tiers (e.g. UK makeup live £ tiers) blocked. Free / visual Vote buttons on Front 12 remain for UI testing."
  },
  {
    id: "boosts",
    label: "Premium boosts",
    detail: "Spotlight / premium boost purchases blocked via startPlatformCheckout."
  },
  {
    id: "dropship-public",
    label: "Public dropshipping panels",
    detail:
      "All country room dropship sections, International SUITE enter buttons, Front 12 dropship tabs, and /rooms/dropship-market product market hidden."
  },
  {
    id: "dropship-buy",
    label: "Dropship product purchases",
    detail: "Buy buttons and /api/dropshipping/orders/create return frozen."
  },
  {
    id: "membership",
    label: "Membership checkout",
    detail: "Arena Plus / Fan Pass / Creator Circle paid checkout UI frozen."
  },
  {
    id: "uk-study-hub-money",
    label: "UK Study Hub money (London campus)",
    detail:
      "Public 📚 UK Study Hub stays free. Student gifts £1–£50, payout forms, and gift totals removed from public UI — full gift tier catalog lives in this FREEZE COMING SOON panel."
  },
  {
    id: "uk-football-prediction-money",
    label: "UK Football Prediction money (LIVE PREDICTION LANE)",
    detail:
      "Public 🇬🇧 prediction arena stays free (predict · points · boards). Cash prizes USD, paid battles, creator gifts, and checkout prize pools removed from public hero — full money lanes catalog lives in this FREEZE COMING SOON panel."
  },
  {
    id: "uk-best-makeup-money",
    label: "UK Best Makeup Look money (Bella · Hyde Park)",
    detail:
      "Public 💄 Best Makeup Look stays free (watch · apply · auto queue). Vote unlock £3–£5, gifts £1–£50, 30/70 split, premium boosts, and checkout removed from public — full catalog in this FREEZE COMING SOON panel. Platform Earnings console stays Command Center only."
  },
  {
    id: "uk-park-games-money",
    label: "UK park games money (outdoor lane)",
    detail:
      "Public 🇬🇧 park games stay free 18+ play (Croquet · Boules · Rounders · Frisbee · Sack Race). Per-game monetization, tips/gifts earn block, vote unlocks, VIP, and platform revenue streams removed from public — full catalog in this FREEZE COMING SOON panel."
  },
  {
    id: "uk-food-money",
    label: "UK food money (park lunch · kits)",
    detail:
      "Public 🇬🇧 UK food stays free culture browse (scenes + lanes). Food dropship kit prices and checkout hidden — full SKU catalog in this FREEZE COMING SOON panel."
  },
  {
    id: "uk-tournament-money",
    label: "UK Tournament money (activity + makeup board)",
    detail:
      "Public 🇬🇧 Tournament stays free activity board + free ranks. Exact past gift £ and paid prize models catalogued in this FREEZE COMING SOON panel (not shown on public board)."
  },
  {
    id: "japan-room-money",
    label: "Japan room money (full campus)",
    detail:
      "Public 🇯🇵 Japan stays free: gacha free coins, sports trends, Kendo play, Study Hub free apply, anime/J-beauty browse without $ prices. Dropship already hidden. Gift ¥, sports paid earn, gacha creator gifts, merch checkout → FREEZE COMING SOON Japan section."
  },
  {
    id: "china-room-money",
    label: "China room money (Shanghai campus)",
    detail:
      "Public 🇨🇳 China stays free: Wushu live, fashion culture, games hub free play, food culture browse, Study Hub free learn/teach. Dropship tab hidden. Paid classes $20, revenue engine, seller commissions, food kit prices → FREEZE COMING SOON China section."
  }
] as const;

/** What still works on the public site while frozen */
export const FREEZE_STILL_LIVE = [
  "Browse homepage & lounges",
  "Join live rooms",
  "Chat / free UI testing",
  "Visual Vote on slots (no real charge)",
  "Profiles · culture · games panels (non-pay)",
  "UK Study Hub free campus (apply · teach · join — no gifts/pay)",
  "UK Football Prediction free play (predict · Arena Points · boards)",
  "UK Best Makeup Look free watch / apply / auto queue (18+)",
  "UK park games free 18+ play (Croquet · Boules · Rounders · Frisbee · Sack Race)",
  "UK food free culture browse (no kit checkout)",
  "UK Tournament free activity board · free ranks",
  "Japan free campus (gacha coins · sports · Kendo · Study Hub · culture browse)",
  "China free campus (Wushu · fashion · games · food culture · Study Hub free)",
  "Other Study Hub browse / free apply UIs",
  "Command Center owner tools (this panel)"
] as const;

export type FreezeCountryDetail = {
  countryId: string;
  flag: string;
  countryName: string;
  region: string;
  hubCity: string;
  roomHref: string;
  openRooms: string[];
  currencyCode: string;
  dropshipPanelHidden: boolean;
  purchasesFrozen: boolean;
  paymentsFrozen: boolean;
  frozenFeatures: string[];
  stillLive: string[];
  payExamples: Array<{ kind: string; label: string; amountUsd: string }>;
  featuredProducts: Array<{ name: string; price: string; shipsFrom: string }>;
  legalShort: string;
  notes: string[];
};

function payLaneFor(countryId: string) {
  return PLATFORM_PAY_LANES.find((l) => l.id === countryId);
}

function suiteCountry(countryId: string) {
  return internationalSuiteCountries.find((c) => c.id === countryId);
}

/** Extra country-specific freeze notes */
const COUNTRY_NOTES: Record<string, string[]> = {
  uk: [
    "Rooms: Cotswolds (uk-flag-cotswolds) · Football Lads",
    "Hidden: UK dropshipping panel (tech/auto lane), Front 12 dropship tab",
    "Frozen paid: makeup gifts · vote unlock · boosts · dropship buy",
    "UK Study Hub money removed from public (gifts £1–£50 · payout form) → see FREEZE panel Study Hub section",
    "UK LIVE PREDICTION LANE money removed (cash prizes · paid battles · gifts) → see FREEZE panel Prediction section",
    "UK Best Makeup Look money removed (vote unlock · gifts · 30/70 · boosts) → see FREEZE panel Makeup section",
    "UK park games money removed (tips · votes · VIP · per-game monetization) → see FREEZE panel Park games section",
    "UK food kit prices removed · Tournament gift £ catalog → FREEZE panel Food + Tournament sections",
    "Still live: park free play · food browse · free Tournament · football free predict · Study Hub · Makeup free queue",
    "Command Center keeps: Dropship · Gift ops · Vault · PayPal · Study Hub + Prediction + Makeup + Park + Food + Tournament catalogs"
  ],
  japan: [
    "Room: /rooms/japan-room",
    "Hidden: Japan dropshipping shell · creator dropship live slot · market enter",
    "Frozen: Study Hub gift ¥ · sports paid earn · gacha creator gifts · anime/J-beauty $ prices",
    "Still live: free gacha coins · sports trends · Kendo stage (tap play) · free Study Hub · culture panels",
    "Command Center FREEZE COMING SOON · full Japan money catalog"
  ],
  china: [
    "Room: /rooms/china-room",
    "Hidden: Dropshipping tab + rates panel + market panel",
    "Frozen: Study Hub paid classes/tickets · food seller commissions · kit prices · revenue engine",
    "Still live: Wushu Duilian live · fashion culture · free games hub · free food browse · free Study Hub",
    "Command Center FREEZE COMING SOON · full China money catalog"
  ],
  ecuador: [
    "Room: /rooms/ecuador-room",
    "Hidden: Envío directo / dropship section (PublicDropshipGate + SHOW_DROPSHIP_PANELS=false)",
    "Frozen paid: Study Hub premium seats · tutoring % · teacher fees · $5–10 access · dropship 15% + SKUs",
    "Still live: live slot · 🎮 Juegos (domino/ecuavoley) · Study Hub free campus · fashion culture · food browse",
    "Command Center FREEZE COMING SOON · full Ecuador Study Hub + Dropship money catalogs"
  ],
  colombia: [
    "Room: /rooms/colombia-room",
    "Hidden: Dropshipping room tab + market panel (SHOW_DROPSHIP_PANELS=false)",
    "Frozen paid: food kit USD prices ($28/$35/$32) · dropship checkout · Study Hub premium model",
    "Still live: romantic live stack · games · fashion culture · food free browse · Study Hub free campus",
    "Command Center FREEZE COMING SOON · full Colombia food + Study Hub + PayPal lane catalogs"
  ],
  lithuania: [
    "REMOVED from public main Front 12 + International SUITE nav",
    "Owner only: Command Center FREEZE COMING SOON · Lithuania catalog",
    "Dropship SKUs frozen: Vilnius Art Print · Baltic Culture Kit · Winter Beanie",
    "Public: not shown on homepage slots or suite scroll"
  ],
  trinidad: [
    "Caribbean lane · dropship public panels hidden",
    "Purchases frozen · WiPay/PayPal public charge paths off",
    "Still live: suite country card · free room browse if open"
  ],
  jamaica: [
    "Island lane · dropship public panels hidden",
    "Purchases frozen",
    "Still live: suite country card · free room browse if open"
  ],
  spain: [
    "EU Spain lane · EUR conversion · dropship public panels hidden",
    "Purchases frozen",
    "Still live: suite country card · free room browse if open"
  ],
  poland: [
    "REMOVED from public main Front 12 + International SUITE nav",
    "Owner only: Command Center FREEZE COMING SOON · Poland catalog",
    "Dropship SKUs frozen: Warsaw Fashion Scarf · Polish Craft Box · Warsaw City Tee",
    "Public: not shown on homepage slots or suite scroll"
  ],
  tunisia: [
    "Maghreb lane · dropship public panels hidden",
    "Purchases frozen",
    "Still live: suite country card · free room browse if open"
  ],
  guyana: [
    "Caribbean South America lane · dropship public panels hidden",
    "Purchases frozen",
    "Still live: suite country card · free room browse if open"
  ]
};

const DEFAULT_FROZEN_FEATURES = [
  "Public dropship panel / market",
  "Product purchases (Buy now)",
  "Paid gifts & tips (platform checkout)",
  "Paid vote unlocks",
  "Premium boosts",
  "Membership PayPal checkout"
];

const DEFAULT_STILL_LIVE = [
  "Country room browse (non-dropship sections)",
  "Live / free UI",
  "Games · culture panels where present",
  "Visual voting (no charge)"
];

export function buildFreezeCountryDetails(): FreezeCountryDetail[] {
  const configs = getAllDropshipCountryConfigs();

  return configs.map((cfg) => {
    const suite = suiteCountry(cfg.countryId);
    const lane = payLaneFor(cfg.countryId);
    const products = getDropshipProductsForCountry(cfg.countryId).slice(0, 6);
    const openRooms =
      suite?.rooms
        .filter((r) => r.status === "open")
        .map((r) => r.roomLabel || r.roomSlug) ?? [];

    const payExamples =
      lane?.examples.map((ex) => ({
        kind: ex.kind,
        label: ex.label,
        amountUsd: ex.amountUsd
      })) ??
      products.slice(0, 3).map((p) => ({
        kind: "dropship",
        label: p.name,
        amountUsd: p.price.toFixed(2)
      }));

    return {
      countryId: cfg.countryId,
      flag: cfg.flag,
      countryName: cfg.countryName,
      region: suite?.region ?? "International SUITE lane",
      hubCity: getDropshipHubCity(cfg.countryId),
      roomHref: getDropshipCountryRoomHref(cfg.countryId),
      openRooms,
      currencyCode: cfg.currencyCode,
      dropshipPanelHidden: true,
      purchasesFrozen: true,
      paymentsFrozen: true,
      frozenFeatures: [...DEFAULT_FROZEN_FEATURES],
      stillLive: [...DEFAULT_STILL_LIVE],
      payExamples,
      featuredProducts: products.map((p) => ({
        name: p.name,
        price: `$${p.price.toFixed(2)} ${p.currency || "USD"}`,
        shipsFrom: p.shipsFrom || cfg.countryName
      })),
      legalShort: cfg.legalShort,
      notes: COUNTRY_NOTES[cfg.countryId] ?? [
        `${cfg.flag} ${cfg.countryName} Direct Dropship lane frozen on public site`,
        `Hub: ${getDropshipHubCity(cfg.countryId)} · display currency ${cfg.currencyCode}`,
        "Owner detail remains in Command Center Direct Dropship lanes"
      ]
    };
  });
}

export function getFreezeReopenSteps(): string[] {
  return [
    "1. Keep PayPal Client ID + Secret in private .env.local (already stored).",
    "2. Set NEXT_PUBLIC_SHOW_DROPSHIP_PANELS=true to show country dropship panels again.",
    "3. Set NEXT_PUBLIC_REAL_MONEY_ENABLED=true and PLATFORM_CHECKOUT_MODE=paypal for real charges.",
    "4. Set NEXT_PUBLIC_ENABLE_DROPSHIP_PURCHASES=true to allow Buy now.",
    "5. Optionally NEXT_PUBLIC_ENABLE_MEMBERSHIP_CHECKOUT=true for memberships.",
    "6. Restart npm run dev:arena (or production process) so NEXT_PUBLIC_* flags reload."
  ];
}
