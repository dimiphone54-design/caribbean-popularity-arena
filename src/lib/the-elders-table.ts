export const eldersTableRoomDescription =
  "The Elders Table — Caribbean Freedom Arena. Tokyo, Sandton, Asia, and three rich black women from Jamaica — indoor games, backyard play, and Dubai park walks — all in one room. Adults only.";

export const eldersTableNoirTagline = "RICH MINDS. RICH STRATEGY. RICH GAMES.";

export const eldersTableNoirBrand = "CARIBBEAN FREEDOM ARENA · ALL IN ONE";

export const eldersTableBackdropImage = "/elders-table-slideshow-top.jpg";

export type EldersTableRichPhoto = {
  id: number;
  image: string;
  label: string;
  focus?: string;
  size?: string;
};

export const eldersTableSlideshowTopImage = "/elders-table-slideshow-top.jpg";
export const eldersTableSlideshowBottomImage = "/elders-table-slideshow-bottom.jpg";

/** Pre-cropped quarter images — one file per grid cell, no CSS sprite hacks. */
export const eldersTableRichPhotos: EldersTableRichPhoto[] = [
  {
    id: 1,
    image: "/elders-table-q-tl.jpg",
    label: "01 · Welcome",
    focus: "center center",
    size: "cover"
  },
  {
    id: 2,
    image: "/elders-table-q-tr.jpg",
    label: "02 · Arena Live",
    focus: "center center",
    size: "cover"
  },
  {
    id: 3,
    image: "/elders-table-q-bl.jpg",
    label: "03 · Grand Salon",
    focus: "center center",
    size: "cover"
  },
  {
    id: 4,
    image: "/elders-table-q-br.jpg",
    label: "04 · Salon Games Night",
    focus: "center center",
    size: "cover"
  }
];

export type EldersTableQuartetFrame = {
  id: number;
  label: string;
  indices: [number, number, number, number];
};

/** Fixed four-quarter grid — top row from hero banner, bottom row from salon banner. */
export const eldersTableQuartetFrames: EldersTableQuartetFrame[] = [
  {
    id: 1,
    label: "Caribbean Freedom Arena · 01 / 04",
    indices: [0, 1, 2, 3]
  }
];

/** @deprecated Use eldersTableRichPhotos — kept for type compatibility */
export type EldersTableHeroSlide = EldersTableRichPhoto;

/** @deprecated Use eldersTableQuartetFrames */
export const eldersTableHeroSlides: EldersTableHeroSlide[] = eldersTableRichPhotos;

export type EldersTableRegion = "tokyo" | "south-africa" | "asia" | "jamaica";

export type EldersTableScene = "indoor" | "outdoor-backyard" | "dubai-park";

export type EldersTableWoman = {
  id: number;
  name: string;
  age: number;
  region: EldersTableRegion;
  origin: string;
  flag: string;
  game: string;
  image: string;
};

export type EldersTableWorldSlide = {
  id: number;
  womanId: number;
  scene: EldersTableScene;
  activity: string;
  image: string;
};

export const eldersTableRegionLabels: Record<EldersTableRegion, string> = {
  tokyo: "Tokyo · 4 women",
  "south-africa": "Rich South Africa · 3 women",
  asia: "Asia · 2 women",
  jamaica: "Jamaica · 3 rich black women"
};

export const eldersTableSceneLabels: Record<EldersTableScene, string> = {
  indoor: "Indoor games",
  "outdoor-backyard": "Backyard games",
  "dubai-park": "Dubai park walk"
};

export const eldersTableWomen: EldersTableWoman[] = [
  {
    id: 1,
    name: "Akemi Sato",
    age: 29,
    region: "tokyo",
    origin: "Shibuya",
    flag: "🇯🇵",
    game: "Chess",
    image: "/cotswolds-elite-snow-indoor-1.png"
  },
  {
    id: 2,
    name: "Yuki Tanaka",
    age: 31,
    region: "tokyo",
    origin: "Ginza",
    flag: "🇯🇵",
    game: "Bridge",
    image: "/cotswolds-elite-snow-indoor-2.png"
  },
  {
    id: 3,
    name: "Hana Mori",
    age: 28,
    region: "tokyo",
    origin: "Roppongi",
    flag: "🇯🇵",
    game: "Go",
    image: "/cotswolds-snow-cards-3.png"
  },
  {
    id: 4,
    name: "Rio Nakamura",
    age: 33,
    region: "tokyo",
    origin: "Azabu",
    flag: "🇯🇵",
    game: "Negotiation",
    image: "/cotswolds-london-summer-women-5.png"
  },
  {
    id: 5,
    name: "Naledi Khumalo",
    age: 34,
    region: "south-africa",
    origin: "Sandton",
    flag: "🇿🇦",
    game: "Business sim",
    image: "/cotswolds-park-feed-games-night.png"
  },
  {
    id: 6,
    name: "Zanele Mbeki",
    age: 29,
    region: "south-africa",
    origin: "Camps Bay",
    flag: "🇿🇦",
    game: "Chess",
    image: "/cotswolds-elite-snow-indoor-3.png"
  },
  {
    id: 7,
    name: "Amahle Dlamini",
    age: 32,
    region: "south-africa",
    origin: "Umhlanga",
    flag: "🇿🇦",
    game: "Bridge",
    image: "/cotswolds-greenwich-park-london.png"
  },
  {
    id: 8,
    name: "Priya Anand",
    age: 30,
    region: "asia",
    origin: "Singapore",
    flag: "🇸🇬",
    game: "Go",
    image: "/cotswolds-elite-snow-indoor-4.png"
  },
  {
    id: 9,
    name: "Mei Lin Chen",
    age: 28,
    region: "asia",
    origin: "Hong Kong",
    flag: "🇭🇰",
    game: "Negotiation",
    image: "/cotswolds-hampstead-heath-london.png"
  },
  {
    id: 10,
    name: "Monique Sinclair",
    age: 34,
    region: "jamaica",
    origin: "Kingston",
    flag: "🇯🇲",
    game: "Chess",
    image: "/cotswolds-snow-cards-1.png"
  },
  {
    id: 11,
    name: "Aaliyah Grant",
    age: 29,
    region: "jamaica",
    origin: "Montego Bay",
    flag: "🇯🇲",
    game: "Bridge",
    image: "/cotswolds-snow-cards-2.png"
  },
  {
    id: 12,
    name: "Simone Blake",
    age: 32,
    region: "jamaica",
    origin: "Ocho Rios",
    flag: "🇯🇲",
    game: "Go",
    image: "/cotswolds-snow-cards-3.png"
  }
];

export type EldersTableBlackWoman = {
  id: number;
  name: string;
  age: number;
  game: string;
  role: string;
  image: string;
};

export const eldersTableBlackWomen: EldersTableBlackWoman[] = [
  {
    id: 101,
    name: "Keisha Monroe",
    age: 34,
    game: "Chess",
    role: "Gold table strategist",
    image: "/cotswolds-snow-cards-1.png"
  },
  {
    id: 102,
    name: "Tamara Wells",
    age: 29,
    game: "Bridge",
    role: "Gold table partner",
    image: "/cotswolds-snow-cards-2.png"
  }
];

const worldSlide = (
  id: number,
  womanId: number,
  scene: EldersTableScene,
  activity: string,
  image: string
): EldersTableWorldSlide => ({ id, womanId, scene, activity, image });

const woman = (id: number) => eldersTableWomen.find((entry) => entry.id === id)!;

export const eldersTableWorldSlideSets: EldersTableWorldSlide[][] = [
  [
    worldSlide(1, 1, "indoor", "Indoor chess · Shibuya", woman(1).image),
    worldSlide(2, 2, "indoor", "Indoor bridge · Ginza", woman(2).image),
    worldSlide(3, 3, "indoor", "Indoor Go · Roppongi", "/cotswolds-elite-snow-indoor-1.png"),
    worldSlide(4, 4, "indoor", "Indoor negotiation · Azabu", "/cotswolds-snow-cards-4.png"),
    worldSlide(5, 5, "indoor", "Indoor business sim · Sandton", "/cotswolds-elite-snow-indoor-2.png"),
    worldSlide(6, 6, "indoor", "Indoor chess · Camps Bay", woman(6).image),
    worldSlide(7, 7, "indoor", "Indoor bridge · Umhlanga", "/cotswolds-elite-snow-indoor-3.png"),
    worldSlide(8, 8, "indoor", "Indoor Go · Singapore", woman(8).image),
    worldSlide(9, 9, "indoor", "Indoor strategy · Hong Kong", "/cotswolds-snow-cards-5.png")
  ],
  [
    worldSlide(10, 1, "outdoor-backyard", "Backyard chess · Tokyo", "/cotswolds-park-safe-snow-cards.png"),
    worldSlide(11, 2, "outdoor-backyard", "Backyard bridge · Tokyo", "/cotswolds-london-park-games-six.png"),
    worldSlide(12, 3, "outdoor-backyard", "Backyard Go · Tokyo", "/cotswolds-park-drones-play-snow.png"),
    worldSlide(13, 4, "outdoor-backyard", "Backyard games · Azabu", "/cotswolds-park-feed-4.png"),
    worldSlide(14, 5, "outdoor-backyard", "Backyard lane · Sandton", woman(5).image),
    worldSlide(15, 6, "outdoor-backyard", "Backyard chess · Camps Bay", "/cotswolds-park-feed-games-night.png"),
    worldSlide(16, 7, "outdoor-backyard", "Backyard cards · Umhlanga", "/cotswolds-snow-cards-6.png"),
    worldSlide(17, 8, "outdoor-backyard", "Backyard Go · Singapore", "/cotswolds-park-drone-snow-girls.png"),
    worldSlide(18, 9, "outdoor-backyard", "Backyard games · Hong Kong", "/cotswolds-london-park-girls-3.png")
  ],
  [
    worldSlide(19, 1, "dubai-park", "Dubai park walk · Akemi", "/cotswolds-greenwich-park-london.png"),
    worldSlide(20, 2, "dubai-park", "Dubai park stroll · Yuki", "/cotswolds-holland-park-women-4.png"),
    worldSlide(21, 3, "dubai-park", "Dubai park lane · Hana", "/cotswolds-park-autumn-leaves.png"),
    worldSlide(22, 4, "dubai-park", "Dubai park pair · Rio", woman(4).image),
    worldSlide(23, 5, "dubai-park", "Dubai park walk · Naledi", "/cotswolds-hampstead-heath-london.png"),
    worldSlide(24, 6, "dubai-park", "Dubai park games · Zanele", woman(7).image),
    worldSlide(25, 7, "dubai-park", "Dubai park stroll · Amahle", woman(7).image),
    worldSlide(26, 8, "dubai-park", "Dubai park walk · Priya", "/cotswolds-park-happy-snow-1.png"),
    worldSlide(27, 9, "dubai-park", "Dubai park lane · Mei Lin", "/cotswolds-park-happy-snow-2.png")
  ],
  [
    worldSlide(28, 1, "indoor", "Tokyo × indoor chess", woman(1).image),
    worldSlide(29, 5, "outdoor-backyard", "Sandton × backyard sim", woman(5).image),
    worldSlide(30, 8, "indoor", "Singapore × indoor Go", woman(8).image),
    worldSlide(31, 2, "dubai-park", "Tokyo × Dubai park walk", "/cotswolds-holland-park-women-4.png"),
    worldSlide(32, 6, "outdoor-backyard", "Camps Bay × backyard chess", "/cotswolds-park-feed-games-night.png"),
    worldSlide(33, 9, "dubai-park", "Hong Kong × Dubai park lane", woman(9).image),
    worldSlide(34, 3, "indoor", "Roppongi × indoor Go", "/cotswolds-elite-snow-indoor-4.png"),
    worldSlide(35, 7, "dubai-park", "Umhlanga × Dubai stroll", "/cotswolds-greenwich-park-london.png"),
    worldSlide(36, 4, "outdoor-backyard", "All regions · backyard games", "/cotswolds-london-park-games-six.png")
  ],
  [
    worldSlide(37, 10, "indoor", "Kingston rich chess · Monique", woman(10).image),
    worldSlide(38, 11, "outdoor-backyard", "Montego Bay bridge · Aaliyah", woman(11).image),
    worldSlide(39, 12, "dubai-park", "Ocho Rios Go lane · Simone", woman(12).image),
    worldSlide(40, 10, "outdoor-backyard", "Jamaica backyard games", "/cotswolds-park-safe-snow-cards.png"),
    worldSlide(41, 11, "indoor", "Rich bridge · Montego Bay", "/cotswolds-elite-snow-indoor-1.png"),
    worldSlide(42, 12, "indoor", "Rich Go · Ocho Rios", "/cotswolds-snow-cards-4.png"),
    worldSlide(43, 10, "dubai-park", "Dubai park · Kingston walk", "/cotswolds-park-happy-snow-1.png"),
    worldSlide(44, 11, "dubai-park", "Dubai stroll · Aaliyah", "/cotswolds-holland-park-women-4.png"),
    worldSlide(45, 12, "outdoor-backyard", "Simone · rich lawn games", "/cotswolds-london-park-girls-3.png")
  ]
];

export const eldersTableWorldSlideLabels = [
  "Indoor games · 9 women",
  "Backyard games · 9 women",
  "Dubai park walk · 9 women",
  "All in one · Tokyo · SA · Asia",
  "Jamaica · 3 rich black women"
] as const;

export function getEldersTableWoman(id: number) {
  return eldersTableWomen.find((womanEntry) => womanEntry.id === id);
}

export const eldersTableGames = [
  { id: "chess", label: "Chess", symbol: "♔" },
  { id: "bridge", label: "Bridge", symbol: "♠" },
  { id: "go", label: "Go", symbol: "●" },
  { id: "business-sim", label: "Business simulations", symbol: "◆" },
  { id: "negotiation", label: "Negotiation games", symbol: "⇄" }
] as const;

export type EldersTableGameId = (typeof eldersTableGames)[number]["id"];

export const eldersTableGameQuestions = [
  {
    id: "chess",
    label: "Chess — open with the Italian Game or the Queen's Gambit at the gold table?",
    gameType: "Table strategy",
    available: "Chess · Italian Game · Queen's Gambit · gold table"
  },
  {
    id: "bridge",
    label: "Bridge — bid a disciplined contract or push a bold grand slam on the first board?",
    gameType: "Card strategy",
    available: "Bridge · contracts · grand slam · partnership rubber"
  },
  {
    id: "go",
    label: "Go — build territory on the third line or invade early at the star point?",
    gameType: "Territory strategy",
    available: "Go · third line · star point · corner invasion"
  },
  {
    id: "business-sim",
    label: "Business simulation — expand market share this quarter or defend cash reserves?",
    gameType: "Business simulation",
    available: "Market expansion · cash reserves · quarterly strategy boards"
  },
  {
    id: "negotiation",
    label: "Negotiation game — anchor high on the first offer or build rapport before numbers?",
    gameType: "Negotiation game",
    available: "High anchor · rapport-first · deal framing · numbers close"
  },
  {
    id: "tokyo-lane",
    label: "Tokyo quartet — indoor chess in Shibuya or backyard bridge under the Azabu sky?",
    gameType: "Tokyo · 4 women",
    available: "Indoor chess · backyard bridge · Shibuya · Azabu sky"
  },
  {
    id: "south-africa-lane",
    label: "Sandton trio — backyard business sim on the lawn or indoor chess in Camps Bay?",
    gameType: "Rich South Africa · 3 women",
    available: "Backyard business sim · indoor chess · Sandton · Camps Bay"
  },
  {
    id: "asia-dubai-lane",
    label: "Asia pair — indoor Go in Singapore or a Dubai park walk with Mei Lin?",
    gameType: "Asia · 2 women",
    available: "Indoor Go · Dubai park walk · Singapore · skyline lane"
  },
  {
    id: "all-in-one-scene",
    label: "One room — rotate indoor games, backyard play, and Dubai park walks together?",
    gameType: "All scenes · one room",
    available: "Indoor games · backyard play · Dubai park walks · full rotation"
  },
  {
    id: "keisha-tamara-chess",
    label: "Partner Keisha on chess or sit beside Tamara for the bridge rubber at the gold table?",
    gameType: "Gold table · 2 women",
    available: "Keisha · chess · Tamara · bridge · gold table"
  },
  {
    id: "world-table-lane",
    label: "Join the Tokyo four first, the Sandton three, or the Asia pair at the elders table?",
    gameType: "World roster · pick your lane",
    available: "Tokyo ×4 · Sandton ×3 · Asia ×2 · elders table cycle"
  }
] as const;

export type EldersTableGameQuestionId = (typeof eldersTableGameQuestions)[number]["id"];

export const eldersTableFeaturedPanelIds = ["chess", "business-sim", "tokyo-lane"] as const;

export type EldersTableFeaturedPanelId = (typeof eldersTableFeaturedPanelIds)[number];

export const eldersTableFeaturedPanelLabels: Record<EldersTableFeaturedPanelId, string> = {
  chess: "Chess",
  "business-sim": "Business sim",
  "tokyo-lane": "Tokyo"
};

export const eldersTableFeaturedPanelSymbols: Record<EldersTableFeaturedPanelId, string> = {
  chess: "♔",
  "business-sim": "◆",
  "tokyo-lane": "🇯🇵"
};

export function getEldersTableFeaturedPanelQuestions() {
  return eldersTableFeaturedPanelIds.map((id) => {
    const question = eldersTableGameQuestions.find((entry) => entry.id === id);
    if (!question) {
      throw new Error(`Missing elders table featured panel question for ${id}`);
    }

    return question;
  });
}

export const eldersTableGameResponses: Record<EldersTableGameQuestionId, string> = {
  chess:
    "The Italian Game keeps the opening elegant and readable — perfect when the table wants rhythm. Queen's Gambit signals control early; only play it when you intend to hold the center all night.",
  bridge:
    "A disciplined contract earns respect round after round. A bold grand slam is elders-table theatre — brilliant when the partnership is aligned, reckless when it is not.",
  go:
    "Third-line territory is patient wealth — stones that compound quietly. Early invasion is sharp pressure; choose it when you can read the whole board, not just one corner.",
  "business-sim":
    "Market expansion wins headlines in the simulation. Cash reserves win survival — the elders table rewards the player who knows which quarter demands which move.",
  negotiation:
    "A high anchor sets the frame when your case is solid. Rapport-first wins when trust is the real currency — then numbers land without friction.",
  "tokyo-lane":
    "Akemi and Yuki own the indoor lanes — chess and bridge under lantern light. Hana and Rio take the Tokyo backyard when the night opens up; all four play as one quartet.",
  "south-africa-lane":
    "Naledi runs the Sandton backyard like a boardroom lawn. Zanele and Amahle flip indoor chess and bridge in Camps Bay and Umhlanga — rich South Africa, one table.",
  "asia-dubai-lane":
    "Priya holds indoor Go with surgical calm. Mei Lin stretches the Dubai park walk — trees, skyline, and negotiation steps between each game stop.",
  "all-in-one-scene":
    "Yes — this room runs all three lanes in one loop: indoor games, backyard play, Dubai park walks. Nine women, three scenes, one elders table rhythm.",
  "keisha-tamara-chess":
    "Keisha reads chess like a ledger — calm, sharp, and three moves ahead. Tamara owns the bridge seat beside her while the world roster rotates behind them.",
  "world-table-lane":
    "Tokyo four set the precision tone. Sandton three bring backyard wealth games. Asia pair link indoor Go to Dubai park walks — pick your region, stay for the full cycle."
};

/** @deprecated Use eldersTableGameQuestions */
export const eldersTableMenPrompts = eldersTableGameQuestions;

/** @deprecated Use EldersTableGameQuestionId */
export type EldersTableMenPromptId = EldersTableGameQuestionId;

/** @deprecated Use eldersTableGameResponses */
export const eldersTablePromptResponses = eldersTableGameResponses;

export const eldersTableGameDetails = Object.fromEntries(
  eldersTableGames.map((game) => {
    const question = eldersTableGameQuestions.find((entry) => entry.id === game.id);
    if (!question) {
      throw new Error(`Missing elders table game question for ${game.id}`);
    }

    return [
      game.id,
      {
        gameType: question.gameType,
        available: question.available,
        blurb: eldersTableGameResponses[question.id]
      }
    ];
  })
) as Record<
  EldersTableGameId,
  {
    gameType: string;
    available: string;
    blurb: string;
  }
>;
