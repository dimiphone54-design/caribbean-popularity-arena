/**
 * UK games · Best Makeup Look + park games (Bella, Tessa, Polly, Gwen, Margot, Imogen…)
 *
 * Public park panel: free play only (money catalog → FREEZE COMING SOON).
 * Command Center: full platform revenue model + tip / vote / brand cuts.
 */

/** Public participant hosts (display only) */
export const ukGamesParticipantHosts = [
  { name: "Bella", lane: "Best Makeup Look", area: "Hyde Park" },
  { name: "Tessa", lane: "Rounders", area: "London" },
  { name: "Polly", lane: "Frisbee", area: "London" },
  { name: "Gwen", lane: "Sack Race + twist", area: "London" },
  { name: "Margot", lane: "Croquet", area: "Holland Park" },
  { name: "Imogen", lane: "Boules / Pétanque", area: "Holland Park" }
] as const;

/**
 * Money earn lanes · Command Center FREEZE COMING SOON only
 * (was public “How participants earn” — removed from public park panel)
 */
export const ukGamesPublicParticipantEarn = [
  {
    id: "tips",
    emoji: "🎁",
    title: "Tipping & virtual gifts",
    body: "Biggest earner. Viewers send paid emoji particles, roses, gold coins while watching or voting — Sack Race live, Frisbee trick shots, Makeup Look reveal."
  },
  {
    id: "voting",
    emoji: "🗳️",
    title: "Revenue share from voting",
    body: "Entry stays free for participants. Viewers can unlock full voting power or exclusive content — a share of that pool goes to winners and top participants each cycle."
  },
  {
    id: "brands",
    emoji: "✨",
    title: "Brand deals & sponsorships",
    body: "Top performers get noticed by beauty brands (Makeup Look), sportswear, and local UK businesses. Arena can facilitate intros and campaigns."
  },
  {
    id: "match",
    emoji: "💚",
    title: "Match portal earnings",
    body: "When matches lead to real park meetups or dates, premium matchmaking and success paths can unlock extra creator upside."
  },
  {
    id: "content",
    emoji: "📣",
    title: "Content & following",
    body: "Winners feature in the weekly carousel and socials — grow personal brand for Instagram sponsorships and soft creator income elsewhere."
  }
] as const;

/**
 * Command Center only · platform take ranges + free-for-participants model
 */
export const ukGamesCcParticipantOps = {
  entry: "Free for participants (Tessa, Polly, Gwen, Bella, Margot, Imogen…)",
  tipCutMinPercent: 30,
  tipCutMaxPercent: 40,
  tipCreatorKeepNote: "Creator keeps the rest of each tip/gift",
  voteFeeMinUsd: 3,
  voteFeeMaxUsd: 6,
  voteWindowHours: 12,
  brandCommissionMinPercent: 15,
  brandCommissionMaxPercent: 25,
  matchNote: "Small success fee or premium matchmaking when dates / park meetups convert",
  contentNote: "Featured winners · carousel · socials (no platform cut on off-platform brand deals unless facilitated)"
} as const;

export type UkGamesPlatformStream = {
  id: string;
  stream: string;
  howItWorks: string;
  potential: string;
};

/** Command Center · main platform revenue (participants free) */
export const ukGamesCcPlatformStreams: UkGamesPlatformStream[] = [
  {
    id: "voting-fees",
    stream: "Viewer voting fees",
    howItWorks: "Charge voters $3–$6 for 12-hour voting access · free for participants",
    potential: "High"
  },
  {
    id: "tip-commission",
    stream: "Tipping commission",
    howItWorks: "Take 30–40% of all gifts / tips on live games + makeup · creator keeps remainder",
    potential: "Very High"
  },
  {
    id: "vip-lockout",
    stream: "Premium VIP / Lockout",
    howItWorks: "$20–$100/month or $1,000 Arena Lockout for super fans",
    potential: "High margin"
  },
  {
    id: "boosts",
    stream: "Boosts for visibility",
    howItWorks: "Participants may pay to boost panel rank · more votes · higher placement",
    potential: "Good"
  },
  {
    id: "sponsored",
    stream: "Sponsored panels",
    howItWorks: 'Brands pay to sponsor a game (e.g. "Croquet powered by [Beauty Brand]")',
    potential: "High in UK"
  },
  {
    id: "ads",
    stream: "Ads",
    howItWorks: "Non-intrusive banner or video ads for voters",
    potential: "Steady"
  },
  {
    id: "picnic",
    stream: "Future IslandPlate tie-in",
    howItWorks: "Sell park picnic baskets / delivery during events",
    potential: "Growing"
  }
];

export const ukGamesPublicEarnFootnote =
  "Participant entry is free. Live tips, voting unlocks, VIP, and premium lanes run through secure Arena checkout · 18+ verified. (Catalog only — not shown on public park panel while frozen.)";
