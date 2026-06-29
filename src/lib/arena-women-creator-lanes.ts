export type WomenCreatorLane = "dropshipping" | "live-culture" | "live-specialty";

export const WOMEN_CREATOR_LANE_LABELS: Record<
  WomenCreatorLane,
  { title: string; hint: string; example: string }
> = {
  dropshipping: {
    title: "Dropshipping",
    hint: "Sell products from your country lane in the Intl SUITE market.",
    example: "Colombia dropship · fashion + phone cases"
  },
  "live-culture": {
    title: "Live · country culture",
    hint: "Go live showing food, music, streets, and real culture from your nation.",
    example: "Ecuador live · Andes food + festival night"
  },
  "live-specialty": {
    title: "Live · specialty show",
    hint: "Your own live lane — makeup, fitness, comedy, style, or talent.",
    example: "UK girl · live makeup tutorial on cam"
  }
};
