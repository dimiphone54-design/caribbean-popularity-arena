/** Flag colour bands · horizontal fill inside island silhouette · no text */
export type CfaHeaderFlagFillStop = {
  offset: string;
  color: string;
};

export type CfaHeaderFlagFillSpec = {
  stops: CfaHeaderFlagFillStop[];
  /** Horizontal bands top→bottom (default) or diagonal for saltire flags */
  direction?: "horizontal" | "diagonal";
};

export const CFA_HEADER_SLOT_FLAG_FILLS: Record<string, CfaHeaderFlagFillSpec> = {
  CO: {
    stops: [
      { offset: "0%", color: "#FCD116" },
      { offset: "50%", color: "#FCD116" },
      { offset: "50%", color: "#003893" },
      { offset: "75%", color: "#003893" },
      { offset: "75%", color: "#CE1126" },
      { offset: "100%", color: "#CE1126" }
    ]
  },
  UK: {
    stops: [
      { offset: "0%", color: "#012169" },
      { offset: "100%", color: "#012169" }
    ]
  },
  LT: {
    stops: [
      { offset: "0%", color: "#FDB913" },
      { offset: "33.3%", color: "#FDB913" },
      { offset: "33.3%", color: "#006A44" },
      { offset: "66.6%", color: "#006A44" },
      { offset: "66.6%", color: "#C1272D" },
      { offset: "100%", color: "#C1272D" }
    ]
  },
  EC: {
    stops: [
      { offset: "0%", color: "#FFD100" },
      { offset: "50%", color: "#FFD100" },
      { offset: "50%", color: "#0033A0" },
      { offset: "75%", color: "#0033A0" },
      { offset: "75%", color: "#EF3340" },
      { offset: "100%", color: "#EF3340" }
    ]
  },
  TT: {
    stops: [
      { offset: "0%", color: "#CE1126" },
      { offset: "100%", color: "#CE1126" }
    ]
  },
  JM: {
    direction: "diagonal",
    stops: [
      { offset: "0%", color: "#009B3A" },
      { offset: "50%", color: "#FED100" },
      { offset: "100%", color: "#000000" }
    ]
  },
  VE: {
    stops: [
      { offset: "0%", color: "#FFCC00" },
      { offset: "33.3%", color: "#FFCC00" },
      { offset: "33.3%", color: "#00247D" },
      { offset: "66.6%", color: "#00247D" },
      { offset: "66.6%", color: "#CF142B" },
      { offset: "100%", color: "#CF142B" }
    ]
  },
  PL: {
    stops: [
      { offset: "0%", color: "#FFFFFF" },
      { offset: "50%", color: "#FFFFFF" },
      { offset: "50%", color: "#DC143C" },
      { offset: "100%", color: "#DC143C" }
    ]
  },
  TN: {
    stops: [
      { offset: "0%", color: "#E70013" },
      { offset: "100%", color: "#E70013" }
    ]
  },
  GY: {
    stops: [
      { offset: "0%", color: "#009E49" },
      { offset: "55%", color: "#009E49" },
      { offset: "55%", color: "#FCD116" },
      { offset: "72%", color: "#FCD116" },
      { offset: "72%", color: "#FFFFFF" },
      { offset: "78%", color: "#FFFFFF" },
      { offset: "78%", color: "#CE1126" },
      { offset: "100%", color: "#CE1126" }
    ]
  },
  CN: {
    stops: [
      { offset: "0%", color: "#DE2910" },
      { offset: "100%", color: "#DE2910" }
    ]
  },
  JP: {
    stops: [
      { offset: "0%", color: "#FFFFFF" },
      { offset: "100%", color: "#FFFFFF" }
    ]
  }
};

export function getCfaHeaderSlotFlagFill(islandCode: string): CfaHeaderFlagFillSpec {
  return CFA_HEADER_SLOT_FLAG_FILLS[islandCode] ?? CFA_HEADER_SLOT_FLAG_FILLS.CO!;
}
