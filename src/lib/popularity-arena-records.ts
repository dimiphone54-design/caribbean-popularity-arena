import { FIFA_RECENT_RESULTS } from "@/lib/football-fifa-recent";
import { internationalSuiteCountries } from "@/lib/international-suite";

export type PopularityMatchScore = {
  id: string;
  roomSlug: string;
  roomLabel: string;
  countryId: string;
  flag: string;
  player: string;
  match: string;
  scoreLabel: string;
  score: number;
  recordedAt: string;
};

export type PopularityDropshipSale = {
  id: string;
  roomSlug: string;
  roomLabel: string;
  countryId: string;
  flag: string;
  productName: string;
  units: number;
  amount: number;
  currency: string;
  recordedAt: string;
};

export type PopularityArenaRoomOption = {
  roomSlug: string;
  roomLabel: string;
  countryId: string;
  flag: string;
  href: string;
};

export type PopularitySportsRecord = {
  id: string;
  roomSlug: string;
  roomLabel: string;
  countryId: string;
  flag: string;
  sport: string;
  sportEmoji: string;
  headline: string;
  playerOrTeam: string;
  scoreLabel: string;
  score: number;
  resultLine?: string;
  recordedAt: string;
};

const seedMatchScores: PopularityMatchScore[] = [
  {
    id: "match-ec-volley-1",
    roomSlug: "ecuador-room",
    roomLabel: "Ecuador",
    countryId: "ecuador",
    flag: "🇪🇨",
    player: "QuitoTres",
    match: "Ecuavoley · Guayaquil lane",
    scoreLabel: "Rally streak",
    score: 47,
    recordedAt: "2026-06-22T18:40:00.000Z"
  },
  {
    id: "match-ec-ecuavoley-1",
    roomSlug: "ecuador-room",
    roomLabel: "Ecuador",
    countryId: "ecuador",
    flag: "🇪🇨",
    player: "AndesVolley",
    match: "Ecuavoley · cancha dominical",
    scoreLabel: "Wins",
    score: 12,
    recordedAt: "2026-07-01T14:02:00.000Z"
  },
  {
    id: "match-jp-kendo-1",
    roomSlug: "japan-room",
    roomLabel: "Japan",
    countryId: "japan",
    flag: "🇯🇵",
    player: "SakuraStrike",
    match: "Kendo stage duel · best of 5",
    scoreLabel: "Wins",
    score: 5,
    recordedAt: "2026-06-30T11:20:00.000Z"
  },
  {
    id: "match-jp-variety-1",
    roomSlug: "japan-room",
    roomLabel: "Japan",
    countryId: "japan",
    flag: "🇯🇵",
    player: "TokyoVariety",
    match: "Variety games · talk-show lane",
    scoreLabel: "Crowd pts",
    score: 9820,
    recordedAt: "2026-06-18T09:55:00.000Z"
  },
  {
    id: "match-cn-wushu-1",
    roomSlug: "china-room",
    roomLabel: "China",
    countryId: "china",
    flag: "🇨🇳",
    player: "ShanghaiBlade",
    match: "武术对练 · sword & staff",
    scoreLabel: "Technique pts",
    score: 9400,
    recordedAt: "2026-06-25T16:30:00.000Z"
  },
  {
    id: "match-co-football-1",
    roomSlug: "colombia-room",
    roomLabel: "Colombia",
    countryId: "colombia",
    flag: "🇨🇴",
    player: "MedellinUltra",
    match: "Match-day predictions · Liga",
    scoreLabel: "Correct picks",
    score: 11,
    recordedAt: "2026-07-02T22:10:00.000Z"
  },
  {
    id: "match-co-salsa-1",
    roomSlug: "colombia-room",
    roomLabel: "Colombia",
    countryId: "colombia",
    flag: "🇨🇴",
    player: "CaliFlow",
    match: "Salsa battle · Cali lane",
    scoreLabel: "Judge pts",
    score: 8760,
    recordedAt: "2026-06-14T20:45:00.000Z"
  },
  {
    id: "match-uk-football-1",
    roomSlug: "football-lads",
    roomLabel: "FOOTBALL LADS",
    countryId: "uk",
    flag: "🇬🇧",
    player: "SundayLeagueKing",
    match: "Five-a-side · pub league cup",
    scoreLabel: "Goals",
    score: 9,
    recordedAt: "2026-06-29T19:00:00.000Z"
  },
  {
    id: "match-uk-cotswolds-1",
    roomSlug: "uk-flag-cotswolds",
    roomLabel: "United Kingdom",
    countryId: "uk",
    flag: "🇬🇧",
    player: "HydeParkCrew",
    match: "Park games · drone snow lane",
    scoreLabel: "Team pts",
    score: 12450,
    recordedAt: "2026-06-11T15:30:00.000Z"
  },
  {
    id: "match-tt-carnival-1",
    roomSlug: "trinidad-front12-slot",
    roomLabel: "SLOT 5 · TRINIDAD & TOBAGO",
    countryId: "trinidad",
    flag: "🇹🇹",
    player: "CarnivalQueen",
    match: "Soca vote battle · Port of Spain",
    scoreLabel: "Fan votes",
    score: 22840,
    recordedAt: "2026-05-30T23:50:00.000Z"
  }
];

const seedDropshipSales: PopularityDropshipSale[] = [
  {
    id: "sale-jp-matcha",
    roomSlug: "japan-room",
    roomLabel: "Japan",
    countryId: "japan",
    flag: "🇯🇵",
    productName: "Kyoto ceremonial matcha kit",
    units: 142,
    amount: 18460,
    currency: "USD",
    recordedAt: "2026-07-03T08:00:00.000Z"
  },
  {
    id: "sale-jp-street",
    roomSlug: "japan-room",
    roomLabel: "Japan",
    countryId: "japan",
    flag: "🇯🇵",
    productName: "Harajuku street fashion box",
    units: 96,
    amount: 11280,
    currency: "USD",
    recordedAt: "2026-06-27T12:00:00.000Z"
  },
  {
    id: "sale-cn-tech",
    roomSlug: "china-room",
    roomLabel: "China",
    countryId: "china",
    flag: "🇨🇳",
    productName: "Shenzhen smart gadget bundle",
    units: 210,
    amount: 33600,
    currency: "USD",
    recordedAt: "2026-07-01T06:00:00.000Z"
  },
  {
    id: "sale-ec-artisan",
    roomSlug: "ecuador-room",
    roomLabel: "Ecuador",
    countryId: "ecuador",
    flag: "🇪🇨",
    productName: "Otavalo artisan market pack",
    units: 78,
    amount: 6240,
    currency: "USD",
    recordedAt: "2026-06-26T17:00:00.000Z"
  },
  {
    id: "sale-co-coffee",
    roomSlug: "colombia-room",
    roomLabel: "Colombia",
    countryId: "colombia",
    flag: "🇨🇴",
    productName: "Huila specialty coffee crate",
    units: 164,
    amount: 14760,
    currency: "USD",
    recordedAt: "2026-06-24T14:00:00.000Z"
  },
  {
    id: "sale-co-auto",
    roomSlug: "colombia-room",
    roomLabel: "Colombia",
    countryId: "colombia",
    flag: "🇨🇴",
    productName: "Bogotá car accessories lane",
    units: 53,
    amount: 9540,
    currency: "USD",
    recordedAt: "2026-06-19T10:00:00.000Z"
  },
  {
    id: "sale-uk-women",
    roomSlug: "uk-flag-cotswolds",
    roomLabel: "United Kingdom",
    countryId: "uk",
    flag: "🇬🇧",
    productName: "UK dropship women · park lane edit",
    units: 118,
    amount: 16520,
    currency: "USD",
    recordedAt: "2026-07-02T16:00:00.000Z"
  },
  {
    id: "sale-uk-football",
    roomSlug: "football-lads",
    roomLabel: "FOOTBALL LADS",
    countryId: "uk",
    flag: "🇬🇧",
    productName: "Sunday league kit drop",
    units: 87,
    amount: 10440,
    currency: "USD",
    recordedAt: "2026-06-21T18:00:00.000Z"
  },
  {
    id: "sale-market-global",
    roomSlug: "dropship-market",
    roomLabel: "Dropship Market",
    countryId: "colombia",
    flag: "🪂",
    productName: "Arena parachute checkout lane · all rooms",
    units: 402,
    amount: 48240,
    currency: "USD",
    recordedAt: "2026-07-04T00:00:00.000Z"
  }
];

const fifaSportsRecords: PopularitySportsRecord[] = FIFA_RECENT_RESULTS.map((game) => {
  const caribbean = game.league.toLowerCase().includes("caribbean");
  const roomSlug = caribbean ? "trinidad-front12-slot" : "football-lads";
  const roomLabel = caribbean ? "Caribbean Freedom Cup" : "FOOTBALL LADS";
  const countryId = caribbean ? "trinidad" : "uk";
  const flag = caribbean ? "🇹🇹" : "🇬🇧";
  const topScorer = game.homeScore >= game.awayScore ? game.homeTeam : game.awayTeam;
  const totalGoals = game.homeScore + game.awayScore;

  return {
    id: `sport-fifa-${game.id}`,
    roomSlug,
    roomLabel,
    countryId,
    flag,
    sport: "Football",
    sportEmoji: "⚽",
    headline: `${game.league} · ${game.mode}`,
    playerOrTeam: topScorer,
    scoreLabel: "Match score",
    score: Math.max(game.homeScore, game.awayScore),
    resultLine: `${game.homeTeam} ${game.homeScore}–${game.awayScore} ${game.awayTeam}`,
    recordedAt: game.playedAt
  };
});

const seedSportsRecords: PopularitySportsRecord[] = [
  ...fifaSportsRecords,
  {
    id: "sport-uk-predict-1",
    roomSlug: "football-lads",
    roomLabel: "FOOTBALL LADS",
    countryId: "uk",
    flag: "🇬🇧",
    sport: "Football",
    sportEmoji: "⚽",
    headline: "Prediction Arena · Premier League week",
    playerOrTeam: "NorthLondonOracle",
    scoreLabel: "Prediction pts",
    score: 186,
    resultLine: "11/12 picks · perfect score bonus",
    recordedAt: "2026-07-02T22:10:00.000Z"
  },
  {
    id: "sport-uk-five-a-side-1",
    roomSlug: "football-lads",
    roomLabel: "FOOTBALL LADS",
    countryId: "uk",
    flag: "🇬🇧",
    sport: "Football",
    sportEmoji: "⚽",
    headline: "Sunday league · pub cup final",
    playerOrTeam: "SundayLeagueKing",
    scoreLabel: "Goals",
    score: 9,
    resultLine: "5-a-side golden boot",
    recordedAt: "2026-06-29T19:00:00.000Z"
  },
  {
    id: "sport-co-liga-1",
    roomSlug: "colombia-room",
    roomLabel: "Colombia",
    countryId: "colombia",
    flag: "🇨🇴",
    sport: "Football",
    sportEmoji: "⚽",
    headline: "Liga · match-day prediction lane",
    playerOrTeam: "MedellinUltra",
    scoreLabel: "Prediction pts",
    score: 142,
    resultLine: "Correct score + first scorer",
    recordedAt: "2026-07-02T22:10:00.000Z"
  },
  {
    id: "sport-ec-volley-1",
    roomSlug: "ecuador-room",
    roomLabel: "Ecuador",
    countryId: "ecuador",
    flag: "🇪🇨",
    sport: "Ecuavoley",
    sportEmoji: "🏐",
    headline: "Guayaquil barrio court · three-player classic",
    playerOrTeam: "QuitoTres",
    scoreLabel: "Rally streak",
    score: 47,
    resultLine: "Arena sports high mark",
    recordedAt: "2026-06-22T18:40:00.000Z"
  },
  {
    id: "sport-ec-volley-2",
    roomSlug: "ecuador-room",
    roomLabel: "Ecuador",
    countryId: "ecuador",
    flag: "🇪🇨",
    sport: "Ecuavoley",
    sportEmoji: "🏐",
    headline: "Quito altitude invitational",
    playerOrTeam: "AndesSpike",
    scoreLabel: "Set wins",
    score: 3,
    resultLine: "2–1 comeback final",
    recordedAt: "2026-06-15T16:20:00.000Z"
  },
  {
    id: "sport-jp-kendo-1",
    roomSlug: "japan-room",
    roomLabel: "Japan",
    countryId: "japan",
    flag: "🇯🇵",
    sport: "Kendo",
    sportEmoji: "🥋",
    headline: "Stage duel · best of five",
    playerOrTeam: "SakuraStrike",
    scoreLabel: "Ippon wins",
    score: 5,
    resultLine: "Clean sweep · sports lane",
    recordedAt: "2026-06-30T11:20:00.000Z"
  },
  {
    id: "sport-uk-cotswolds-park-1",
    roomSlug: "uk-flag-cotswolds",
    roomLabel: "United Kingdom",
    countryId: "uk",
    flag: "🇬🇧",
    sport: "Park football",
    sportEmoji: "⚽",
    headline: "Hyde Park · mixed squad kickabout",
    playerOrTeam: "HydeParkCrew",
    scoreLabel: "Team pts",
    score: 18,
    resultLine: "6 goals · 4 assists",
    recordedAt: "2026-06-11T15:30:00.000Z"
  }
];

export function getPopularityArenaRoomOptions(): PopularityArenaRoomOption[] {
  const rooms: PopularityArenaRoomOption[] = [
    {
      roomSlug: "dropship-market",
      roomLabel: "Dropship Market",
      countryId: "dropship-market",
      flag: "🪂",
      href: "/rooms/dropship-market"
    }
  ];

  for (const country of internationalSuiteCountries) {
    for (const room of country.rooms) {
      if (room.status !== "open" || room.href) continue;
      rooms.push({
        roomSlug: room.roomSlug,
        roomLabel: room.roomLabel,
        countryId: country.id,
        flag: country.flag,
        href: `/rooms/${room.roomSlug}`
      });
    }
  }

  return rooms;
}

export function getSeedPopularityMatchScores(roomSlug?: string) {
  const rows = [...seedMatchScores].sort((a, b) => b.score - a.score);
  if (!roomSlug || roomSlug === "all") return rows;
  return rows.filter((row) => row.roomSlug === roomSlug);
}

export function getSeedPopularityDropshipSales(roomSlug?: string) {
  const rows = [...seedDropshipSales].sort((a, b) => b.amount - a.amount);
  if (!roomSlug || roomSlug === "all") return rows;
  return rows.filter((row) => row.roomSlug === roomSlug);
}

export function getSeedPopularitySportsRecords(roomSlug?: string) {
  const rows = [...seedSportsRecords].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  );
  if (!roomSlug || roomSlug === "all") return rows;
  return rows.filter((row) => row.roomSlug === roomSlug);
}

export function getPopularitySportsRoomHref(roomSlug: string) {
  if (roomSlug === "all") return "/rooms/football-lads";
  const room = getPopularityArenaRoomOptions().find((entry) => entry.roomSlug === roomSlug);
  return room?.href ?? "/rooms/football-lads";
}

export function mergePopularityDropshipSales(
  seed: PopularityDropshipSale[],
  fromOrders: PopularityDropshipSale[]
) {
  const merged = [...fromOrders, ...seed];
  const seen = new Set<string>();
  const unique: PopularityDropshipSale[] = [];

  for (const row of merged.sort((a, b) => b.amount - a.amount)) {
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    unique.push(row);
  }

  return unique;
}

export function formatPopularityRecordDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function formatPopularitySaleAmount(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-US")}`;
  }
}