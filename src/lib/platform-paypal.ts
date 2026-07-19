/**
 * Platform merchant PayPal — ONE Caribbean Freedom Arena account
 * All country rooms (London UK · Japan · China · Ecuador …) settle here.
 * Creators/suppliers are paid out later via platform payout (not customer→seller direct).
 */

export const PLATFORM_PAYPAL_MERCHANT = {
  brandName: "Caribbean Freedom Arena",
  label: "Platform merchant checkout · Caribbean Freedom Arena PayPal",
  currency: "USD" as const,
  /** Customer pays platform · creator/supplier share via ops payout */
  settlementNote:
    "Customer pays the platform PayPal merchant. Creator/supplier share is paid out by the platform after reconciliation."
} as const;

export type PlatformPayLaneId = "uk" | "japan" | "china" | "ecuador" | "colombia" | "global";

export type PlatformPayKind =
  | "membership"
  | "dropship"
  | "gift"
  | "vote"
  | "boost"
  | "general";

export type PlatformPayLane = {
  id: PlatformPayLaneId;
  flag: string;
  city: string;
  countryName: string;
  /** Example SKUs that all hit the same PayPal merchant */
  examples: Array<{
    kind: PlatformPayKind;
    label: string;
    amountUsd: string;
    description: string;
  }>;
};

/**
 * Examples only — same PayPal merchant for every lane.
 * London = UK room · Japan · China · Ecuador
 */
export const PLATFORM_PAY_LANES: PlatformPayLane[] = [
  {
    id: "uk",
    flag: "🇬🇧",
    city: "London",
    countryName: "United Kingdom",
    examples: [
      {
        kind: "dropship",
        label: "Tech & Gadgets Pack",
        amountUsd: "29.00",
        description: "UK · London dropship · Tech & Gadgets Pack"
      },
      {
        kind: "gift",
        label: "Makeup live gift (Crown)",
        amountUsd: "10.00",
        description: "UK · London · Best Makeup Look gift · Crown"
      },
      {
        kind: "vote",
        label: "Live-hour voting access",
        amountUsd: "5.00",
        description: "UK · London · makeup live voting access £5 tier (USD)"
      },
      {
        kind: "boost",
        label: "Spotlight boost",
        amountUsd: "12.00",
        description: "UK · London · creator premium boost · Spotlight"
      }
    ]
  },
  {
    id: "japan",
    flag: "🇯🇵",
    city: "Tokyo",
    countryName: "Japan",
    examples: [
      {
        kind: "dropship",
        label: "Japan Tech & Gadgets Pack",
        amountUsd: "29.00",
        description: "Japan · Tokyo dropship · Tech & Gadgets Pack"
      },
      {
        kind: "gift",
        label: "Gacha / live gift",
        amountUsd: "5.00",
        description: "Japan · Tokyo · arena gift / support"
      },
      {
        kind: "membership",
        label: "Arena Plus",
        amountUsd: "9.99",
        description: "Japan room · Arena Plus membership"
      }
    ]
  },
  {
    id: "china",
    flag: "🇨🇳",
    city: "Shanghai",
    countryName: "China",
    examples: [
      {
        kind: "dropship",
        label: "China Tech & Gadgets Pack",
        amountUsd: "29.00",
        description: "China · Shanghai dropship · Tech & Gadgets Pack"
      },
      {
        kind: "gift",
        label: "Wushu stage gift",
        amountUsd: "10.00",
        description: "China · Shanghai · stage gift support"
      },
      {
        kind: "membership",
        label: "Fan Pass",
        amountUsd: "5.99",
        description: "China room · Fan Pass membership"
      }
    ]
  },
  {
    id: "ecuador",
    flag: "🇪🇨",
    city: "Quito",
    countryName: "Ecuador",
    examples: [
      {
        kind: "dropship",
        label: "Ecuador Tech & Gadgets Bundle",
        amountUsd: "29.00",
        description: "Ecuador · Quito dropship · Tech & Gadgets"
      },
      {
        kind: "gift",
        label: "Study Hub teacher gift",
        amountUsd: "5.00",
        description: "Ecuador · Quito · Study Hub teacher gift"
      },
      {
        kind: "dropship",
        label: "Auto Interior Care Kit",
        amountUsd: "35.00",
        description: "Ecuador · Guayaquil dropship · Auto care kit"
      }
    ]
  },
  {
    id: "colombia",
    flag: "🇨🇴",
    city: "Bogotá",
    countryName: "Colombia",
    examples: [
      {
        kind: "dropship",
        label: "Cartagena Arepa Starter Kit",
        amountUsd: "28.00",
        description: "Colombia · Cartagena dropship · Arepa kit"
      },
      {
        kind: "dropship",
        label: "Medellín Bandeja Paisa Box",
        amountUsd: "35.00",
        description: "Colombia · Medellín dropship · Bandeja box"
      },
      {
        kind: "dropship",
        label: "Huila Specialty Coffee Box",
        amountUsd: "32.00",
        description: "Colombia · Bogotá dropship · Coffee gift"
      }
    ]
  }
];

export function buildPlatformPayCustomId(input: {
  kind: PlatformPayKind;
  countryId?: string;
  sku?: string;
  ref?: string;
}) {
  const parts = [
    "cfa",
    input.kind,
    (input.countryId ?? "global").toLowerCase(),
    input.sku ?? "item",
    input.ref ?? String(Date.now())
  ];
  return parts.join(":").slice(0, 127);
}

export function formatPlatformPayDescription(input: {
  kind: PlatformPayKind;
  countryId?: string;
  countryName?: string;
  city?: string;
  itemLabel: string;
}) {
  const place =
    input.city && input.countryName
      ? `${input.countryName} · ${input.city}`
      : input.countryName ?? input.countryId ?? "Arena";
  return `${PLATFORM_PAYPAL_MERCHANT.brandName} · ${place} · ${input.kind} · ${input.itemLabel}`.slice(
    0,
    120
  );
}
