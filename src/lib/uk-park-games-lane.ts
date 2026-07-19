/**
 * UK room · park games under Best Makeup Look
 * Public = free play / trends · money catalog → Command Center FREEZE COMING SOON
 */

export type UkParkGameLane = {
  id: string;
  rank: number;
  emoji: string;
  title: string;
  badge: string;
  host: string;
  area: string;
  flag: string;
  /** Maps to CotswoldsGameSimulator config key */
  simName: string;
  whyTrends: string;
  /** Public free play line (no pay / tip / premium charge) */
  freePlay: string;
  /** Frozen money model · Command Center only */
  monetization: string;
};

export const ukParkGamesLane: UkParkGameLane[] = [
  {
    id: "croquet",
    rank: 1,
    emoji: "🏑",
    title: "Croquet",
    badge: "Classy lawn classic",
    host: "Margot",
    area: "Holland Park",
    flag: "🇬🇧",
    simName: "Croquet",
    whyTrends:
      "The ultimate classy British lawn game. Very popular at garden parties, Hyde Park events, and upscale gatherings. Strategic, photogenic, and perfect for luxury branding.",
    freePlay:
      "Free 18+ play · watch strategy · join Margot’s lawn heat · no paid VIP on public panel.",
    monetization:
      "Premium “Sovereign Wealth” VIP matches · high tipping during live play · corporate / brand sponsorships · easy to charge premium entry."
  },
  {
    id: "boules",
    rank: 2,
    emoji: "🟢",
    title: "Boules / Pétanque",
    badge: "Most Accessible & Viral",
    host: "Imogen",
    area: "Holland Park",
    flag: "🇬🇧",
    simName: "Boules",
    whyTrends:
      "Works on any surface (grass, gravel, park paths). Huge at UK summer festivals and parks. All ages browse · 18+ live play.",
    freePlay:
      "Free 18+ play · group heats · social park energy · no paid votes on public panel.",
    monetization:
      "High volume voting + group challenges · easy to run multiple heats · strong for quick tipping and match-making."
  },
  {
    id: "rounders",
    rank: 3,
    emoji: "🥎",
    title: "Rounders",
    badge: "Double Down",
    host: "Tessa",
    area: "London",
    flag: "🇬🇧",
    simName: "Rounders",
    whyTrends:
      "Classic British bat-and-ball game (like softball). Very popular in London parks and fetes. High energy, team-based, and shareable.",
    freePlay:
      "Free 18+ play · team heats · live scoreboard UI · no paid awards on public panel.",
    monetization:
      "Team voting battles · live scoreboards · “Best Player” awards · pairs perfectly with Tessa’s existing lane."
  },
  {
    id: "frisbee",
    rank: 4,
    emoji: "🥏",
    title: "Frisbee / Ultimate Frisbee",
    badge: "High Engagement",
    host: "Polly",
    area: "London",
    flag: "🇬🇧",
    simName: "Frisbee",
    whyTrends:
      "Simple, active, and very popular in London parks. Great visuals, athletic, and works well for younger users.",
    freePlay:
      "Free 18+ play · catch challenges · longest throw fun · no live tip charges on public panel.",
    monetization:
      "Catch challenges · longest throw contests · live streaming for tips · Polly’s entry already strong — double down on heats."
  },
  {
    id: "sack-race",
    rank: 5,
    emoji: "🏁",
    title: "Sack Race + Modern Twist",
    badge: "Fete Fun · Viral Shares",
    host: "Gwen",
    area: "London",
    flag: "🇬🇧",
    simName: "Sack Race",
    whyTrends:
      "Traditional British fete fun + modern inflatable / egg & spoon twists exploding at summer fairs. Gwen’s Sack Race fits perfectly.",
    freePlay:
      "Free 18+ play · elimination fun · costume vibes · no paid vote subcategories on public panel.",
    monetization:
      "Hilarious content = high shares & votes · elimination rounds · “Best Costume” subcategory for extra votes."
  }
];

/** Owner freeze catalog · FREEZE COMING SOON */
export const UK_PARK_GAMES_FREEZE_CATALOG = {
  panelTitle: "🇬🇧 UK park games · outdoor lane",
  publicStatus: "LIVE for public · free 18+ play · money removed",
  room: "/rooms/uk-flag-cotswolds#uk-park-games-lane",
  freePublic: [
    "Park games panel under Best Makeup Look",
    "Croquet · Boules · Rounders · Frisbee · Sack Race + twist",
    "Why it trends copy per game",
    "Free play button · CotswoldsGameSimulator (18+ age gate)",
    "Hosts: Margot · Imogen · Tessa · Polly · Gwen"
  ],
  frozenMoney: [
    "Per-game monetization stories (VIP · tips · voting · brands)",
    "Public “How it makes money” blocks",
    "Participant earn: tipping & virtual gifts",
    "Revenue share from paid voting unlocks",
    "Match portal premium success fees",
    "Secure Arena checkout for tips / vote / VIP (footnote)",
    "Full platform streams (vote fees · tip commission · VIP · boosts · sponsors · ads)"
  ],
  reopenNote:
    "When ready: restore “How it makes money” + public earn lanes; enable real-money flags for tips/votes/VIP."
} as const;
