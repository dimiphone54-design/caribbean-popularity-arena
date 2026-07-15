import { getDropshipRevenueSplit } from "@/lib/dropship-pricing";

export type LiveRateTier = {
  id: string;
  label: string;
  referencePrice: number;
  customerPrice: number;
  currency: string;
  platformAmount: number;
  creatorAmount: number;
  sourceLabel: string;
  sourceUrl: string;
  note: string;
};

export type LiveCountryRateConfig = {
  countryId: string;
  countryName: string;
  slotLabel: string;
  currency: string;
  sourceSummary: string;
  tiers: LiveRateTier[];
};

function createTier(
  id: string,
  label: string,
  referencePrice: number,
  currency: string,
  sourceLabel: string,
  sourceUrl: string,
  note: string
): LiveRateTier {
  const customerPrice = Math.round(referencePrice * 0.95 * 100) / 100;
  const split = getDropshipRevenueSplit(customerPrice);
  return {
    id,
    label,
    referencePrice,
    customerPrice,
    currency,
    platformAmount: split.platformUsd,
    creatorAmount: split.supplierUsd,
    sourceLabel,
    sourceUrl,
    note
  };
}

export const liveCountryRateConfigs: LiveCountryRateConfig[] = [
  {
    countryId: "uk",
    countryName: "United Kingdom",
    slotLabel: "UK live slots",
    currency: "GBP",
    sourceSummary: "Reference gift values modeled from public TikTok LIVE UK gift/coin pricing guides.",
    tiers: [
      createTier("uk-small", "Small support", 0.05, "GBP", "Handshake Media UK / TikTok gift guides", "https://www.handshakemedia.co/tiktok-gifts-coins-explained", "Based on low-cost UK TikTok gifts like Finger Heart / small reactions."),
      createTier("uk-mid", "Hype gift", 10, "GBP", "Handshake Media UK / TikTok gift guides", "https://www.handshakemedia.co/tiktok-gifts-coins-explained", "Based on 1,000-coin UK class gifts such as Galaxy / Disco Ball."),
      createTier("uk-premium", "Premium flex", 300, "GBP", "Handshake Media UK / TikTok gift guides", "https://www.handshakemedia.co/tiktok-gifts-coins-explained", "Based on UK Lion-class premium gifts around £300 viewer spend.")
    ]
  },
  {
    countryId: "colombia",
    countryName: "Colombia",
    slotLabel: "Colombia live slots",
    currency: "COP",
    sourceSummary: "Reference gift values modeled from Colombia TikTok coin reporting and regional live-earning trackers.",
    tiers: [
      createTier("co-small", "Small support", 225, "COP", "El Espectador / TikTok coin reference", "https://www.elespectador.com/tecnologia/gadgets-y-apps/que-son-los-regalos-en-tiktok-y-como-funcionan/", "Uses public estimate of ~45 COP per TikTok coin; modeled around 5-coin micro gift."),
      createTier("co-mid", "Hype gift", 45000, "COP", "El Espectador / TikTok coin reference", "https://www.elespectador.com/tecnologia/gadgets-y-apps/que-son-los-regalos-en-tiktok-y-como-funcionan/", "Modeled around 1,000-coin class gift in Colombia."),
      createTier("co-premium", "Premium flex", 450000, "COP", "El Espectador / TikTok coin reference", "https://www.elespectador.com/tecnologia/gadgets-y-apps/que-son-los-regalos-en-tiktok-y-como-funcionan/", "Modeled around 10,000-coin whale gift class in Colombia.")
    ]
  },
  {
    countryId: "ecuador",
    countryName: "Ecuador",
    slotLabel: "Ecuador live slots",
    currency: "USD",
    sourceSummary: "Reference gift values modeled from public TikTok global gift pricing and Ecuador live-earning trackers.",
    tiers: [
      createTier("ec-small", "Small support", 0.07, "USD", "TikTok gift pricing guides / Ecuador tracking", "https://tiktokcalculator.net/guides/tiktok-gifts/", "Modeled from low-cost TikTok gifts near the $0.07 class."),
      createTier("ec-mid", "Hype gift", 13.3, "USD", "TikTok gift pricing guides / Ecuador tracking", "https://www.printkk.com/gb/blog/articles/tiktok-gift-values", "Modeled from 1,000-coin class gifts near $13.30 viewer spend."),
      createTier("ec-premium", "Premium flex", 398.95, "USD", "TikTok gift pricing guides / Ecuador tracking", "https://www.printkk.com/gb/blog/articles/tiktok-gift-values", "Modeled from Lion-class premium gift values in global TikTok pricing.")
    ]
  },
  {
    countryId: "china",
    countryName: "China",
    slotLabel: "China live slots",
    currency: "CNY",
    sourceSummary: "Reference gift values modeled from public Douyin live gift tables and RMB recharge rules.",
    tiers: [
      createTier("cn-small", "Small support", 9.9, "CNY", "Douyin public gift tables", "https://uuzi.net/douyin-gift-price-chart-cost-from-level-0-to-75/", "Based on common 99-doubi gift class around RMB 9.9."),
      createTier("cn-mid", "Hype gift", 300, "CNY", "Douyin public gift tables", "https://uuzi.net/douyin-gift-price-chart-cost-from-level-0-to-75/", "Based on private-plane class gift around RMB 300."),
      createTier("cn-premium", "Premium flex", 3000, "CNY", "Douyin public gift tables", "https://uuzi.net/2025-douyin-live-gift-price-revenue/", "Based on Carnival-class gift around RMB 3,000 viewer spend.")
    ]
  },
  {
    countryId: "japan",
    countryName: "Japan",
    slotLabel: "Japan live slots",
    currency: "JPY",
    sourceSummary: "Reference gift values modeled from public Japan TikTok LIVE comparisons versus Pococha and 17LIVE plus global TikTok gift economics.",
    tiers: [
      createTier("jp-small", "Small support", 15, "JPY", "Japan TikTok LIVE comparison guides", "https://nini-create.com/2025/01/31/tiktok-live%e3%81%ae%e6%8a%95%e3%81%92%e9%8a%ad%e3%82%b7%e3%82%b9%e3%83%86%e3%83%a0%e5%ae%8c%e5%85%a8%e8%a7%a3%e8%aa%ac%ef%bc%81pococha%e3%83%bb17live%e3%81%a8%e4%bd%95%e3%81%8c%e9%81%95%e3%81%86/", "Modeled from entry-level small TikTok LIVE gift behavior in Japan."),
      createTier("jp-mid", "Hype gift", 1500, "JPY", "Japan TikTok LIVE comparison guides", "https://nini-create.com/2025/01/31/tiktok-live%e3%81%ae%e6%8a%95%e9%8a%ad%e3%82%b7%e3%82%b9%e3%83%86%e3%83%a0%e5%ae%8c%e5%85%a8%e8%a7%a3%e8%aa%ac%ef%bc%81pococha%e3%83%bb17live%e3%81%a8%e4%bd%95%e3%81%8c%e9%81%95%e3%81%86/", "Modeled from mid-tier hype gifts around the 1,000-coin class."),
      createTier("jp-premium", "Premium flex", 45000, "JPY", "Japan TikTok LIVE comparison guides", "https://nini-create.com/2025/01/31/tiktok-live%e3%81%ae%e6%8a%95%e9%8a%ad%e3%82%b7%e3%82%b9%e3%83%86%e3%83%a0%e5%ae%8c%e5%85%a8%e8%a7%a3%e8%aa%ac%ef%bc%81pococha%e3%83%bb17live%e3%81%a8%e4%bd%95%e3%81%8c%e9%81%95%e3%81%86/", "Modeled from premium TikTok LIVE gift economics translated into a Japan local market reference.")
    ]
  }
];

export function getLiveCountryRateConfig(countryId: string) {
  return liveCountryRateConfigs.find((entry) => entry.countryId === countryId) ?? null;
}
