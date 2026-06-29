export type CotswoldsParkFeed = {
  id: number;
  label: string;
  caption: string;
  image: string;
  location?: string;
  region?: string;
  timeZone?: string;
};

export const cotswoldsParkFeeds: CotswoldsParkFeed[] = [
  {
    id: 1,
    label: "Feed 01 // UK favourite dish",
    caption: "Charlotte & Rosie — fish & chips on the bench, cute faces and classic UK park lunch.",
    image: "/cotswolds-park-feed-uk-dish.png"
  },
  {
    id: 2,
    label: "Feed 02 // 3 Girls games night",
    caption: "Three London girls — UK games night live in the park.",
    image: "/cotswolds-park-feed-games-night.png"
  },
  {
    id: 3,
    label: "Feed 03 // Cotswolds party boys",
    caption: "Three Cotswolds party boys — paired up and running the party games lane.",
    image: "/cotswolds-park-feed-3.png"
  },
  {
    id: 4,
    label: "Feed 04 // All mixed pairs",
    caption: "Everyone in Hyde Park — mixed pairs playing, three drones shooting snow on the happy crowd.",
    image: "/cotswolds-park-feed-4.png"
  }
];

export const cotswoldsEveryoneUnifiedFeed: CotswoldsParkFeed = {
  id: 0,
  label: "Master // All women aligned",
  caption:
    "Every woman returned — slim, gym, curvy, Caribbean, games night, shopping, park trio. Autumn leaves, light snow, adults only.",
  image: "/cotswolds-everyone-unified.png"
};

export const cotswoldsParkSeasonFeeds: CotswoldsParkFeed[] = [
  {
    id: 15,
    label: "Park 01 // Autumn leaves lane",
    caption: "UK plane trees and oaks — golden leaves blowing, happy adult crowd, light snow dusting.",
    image: "/cotswolds-park-autumn-leaves.png"
  },
  {
    id: 16,
    label: "Park 02 // Park trio",
    caption: "Chloe, Jade, Hannah — park trio in light snow.",
    image: "/cotswolds-park-trio-snow.png"
  },
  {
    id: 17,
    label: "Park 03 // Regent's happy lane",
    caption: "Regent's Park — real crowd energy, leaves in the wind, patchy snow on the lawn.",
    image: "/cotswolds-park-happy-snow-1.png"
  },
  {
    id: 18,
    label: "Park 04 // Lakeside walk",
    caption: "Hyde Park lakeside — autumn leaves, light snow, adults happy on the path.",
    image: "/cotswolds-park-happy-snow-2.png"
  }
];

export const cotswoldsBodyMixFeed: CotswoldsParkFeed = {
  id: 19,
  label: "Mix 01 // Slim · gym · curvy",
  caption: "Ivy gym-toned, Naomi curvy, Ella slim — three beautiful body types laughing together in the park.",
  image: "/cotswolds-park-body-mix.png"
};

export const cotswoldsDroneSnowFeed: CotswoldsParkFeed = {
  id: 36,
  label: "Snow 07 // Drone snow blast",
  caption: "Mia 20, Poppy 19, Skye 19 — having fun in the snow while three drones shoot snow at them.",
  image: "/cotswolds-park-drone-snow-girls.png"
};

export const cotswoldsSnowCardFeeds: CotswoldsParkFeed[] = [
  {
    id: 5,
    label: "Snow 01 // Backyard spades",
    caption: "Sisters — spades on the patio while snow falls.",
    image: "/cotswolds-snow-cards-1.png"
  },
  {
    id: 6,
    label: "Snow 02 // Deck laugh lane",
    caption: "Three queens — cards, scarves, and snowtime laughter.",
    image: "/cotswolds-snow-cards-2.png"
  },
  {
    id: 7,
    label: "Snow 03 // Fire pit poker",
    caption: "Crew — poker by the fire pit in the snow.",
    image: "/cotswolds-snow-cards-3.png"
  },
  {
    id: 8,
    label: "Snow 04 // Porch rummy",
    caption: "Porch rummy night — cocoa, fairy lights, and a snowy backyard.",
    image: "/cotswolds-snow-cards-4.png"
  },
  {
    id: 9,
    label: "Snow 05 // Picnic table deal",
    caption: "Four women dealing cards at a snow-cleared picnic table.",
    image: "/cotswolds-snow-cards-5.png"
  },
  {
    id: 10,
    label: "Snow 06 // Patio heater night",
    caption: "Late snow night — cards, heater glow, and backyard lanterns.",
    image: "/cotswolds-snow-cards-6.png"
  }
];

export const cotswoldsEliteSnowIndoorFeeds: CotswoldsParkFeed[] = [
  {
    id: 11,
    label: "Elite 01 // Ice chess salon",
    caption: "Ice chess open to the public in the snow manor lounge.",
    image: "/cotswolds-elite-snow-indoor-1.png"
  },
  {
    id: 12,
    label: "Elite 02 // Indoor curling lane",
    caption: "Elite curling lane — players and the crowd watching.",
    image: "/cotswolds-elite-snow-indoor-2.png"
  },
  {
    id: 13,
    label: "Elite 03 // Snow billiards pavilion",
    caption: "Heated pavilion billiards — public snow games night in full swing.",
    image: "/cotswolds-elite-snow-indoor-3.png"
  },
  {
    id: 14,
    label: "Elite 04 // Trivia gala ballroom",
    caption: "Buzzers up — elite indoor trivia gala with snow ballroom decor.",
    image: "/cotswolds-elite-snow-indoor-4.png"
  }
];

export const cotswoldsSixPhotoSlideshow: CotswoldsParkFeed[] = [
  {
    id: 101,
    label: "01 // Fish & chips park",
    caption: "Charlotte & Rosie — adult park lunch, fully clothed, autumn leaves, light snow.",
    image: "/cotswolds-park-feed-uk-dish.png"
  },
  {
    id: 102,
    label: "02 // Games night park",
    caption: "Lila, Sasha, Amber — pub quiz and board games, modest coats, happy adults only.",
    image: "/cotswolds-park-feed-games-night.png"
  },
  {
    id: 103,
    label: "03 // Regent's happy lane",
    caption: "Adult women playing picnic games — wholesome, clothed, leaves and light snow.",
    image: "/cotswolds-park-happy-snow-1.png"
  },
  {
    id: 104,
    label: "04 // Snow cards park",
    caption: "Sisters — cards in the park, modest winter wear, no kids.",
    image: "/cotswolds-park-safe-snow-cards.png"
  },
  {
    id: 105,
    label: "05 // Drone snow blast",
    caption: "Mia, Poppy, Skye — three drones shoot snow on them playing happy in Hyde Park.",
    image: "/cotswolds-park-drone-snow-girls.png"
  },
  {
    id: 106,
    label: "06 // Drones · play lane",
    caption: "Adults playing lawn games — three drones shooting snow on the happy players.",
    image: "/cotswolds-park-drones-play-snow.png"
  }
];

export const cotswoldsLondonParkGirlsFeed: CotswoldsParkFeed = {
  id: 40,
  label: "Manchester · 6 outdoor games",
  caption:
    "",
  image: "/manchester-united-live-action.png",
  location: "Heaton Park, Manchester",
  region: "England · Greater Manchester",
  timeZone: "Europe/London"
};

/** Live-action film · SET 01 hero panel · single Manchester live shot */
export const cotswoldsLondonParkGirlsFilmFrames: string[] = ["/manchester-united-live-action.png"];

export const cotswoldsHollandParkWomenFeed: CotswoldsParkFeed = {
  id: 41,
  label: "Edinburgh · 4 women",
  caption: "Margot 22, Freya 25, Imogen 23, Clara 22 — Holland Park games: croquet, badminton, boules. Get ready, join and play.",
  image: "/cotswolds-holland-park-women-4.png",
  location: "Holyrood Park, Edinburgh",
  region: "Scotland · Edinburgh",
  timeZone: "Europe/London"
};

export const cotswoldsOxfordPartyDronesFeed: CotswoldsParkFeed = {
  id: 42,
  label: "Oxford · 2 party men",
  caption: "James & Henry — Oxford University party, drones shooting snow on the happy crowd in the air.",
  image: "/cotswolds-oxford-party-drones-snow.png",
  location: "Oxford, England",
  region: "England · Oxfordshire",
  timeZone: "Europe/London"
};

export const cotswoldsNationalDishCrowdFeed: CotswoldsParkFeed = {
  id: 43,
  label: "UK national dish // fish & chips",
  caption: "Everybody eating fish & chips — classic UK national dish in the park.",
  image: "/cotswolds-uk-national-dish-crowd.png",
  location: "Bute Park, Cardiff",
  region: "Wales · Cardiff",
  timeZone: "Europe/London"
};

export const cotswoldsLondonSummerWomenFeed: CotswoldsParkFeed = {
  id: 44,
  label: "Leeds · 5 summer women",
  caption: "Five adult women in summer London — sunshine, park dresses, happy group lane.",
  image: "/cotswolds-london-summer-women-5.png",
  location: "Roundhay Park, Leeds",
  region: "England · West Yorkshire",
  timeZone: "Europe/London"
};

export const cotswoldsGreenwichParkFeed: CotswoldsParkFeed = {
  id: 45,
  label: "Greenwich Park // London skyline",
  caption: "Adults on Greenwich Park lawns — Royal Observatory hill, London skyline, autumn leaves.",
  image: "/cotswolds-greenwich-park-london.png",
  location: "Greenwich Park, London",
  region: "England · Greenwich",
  timeZone: "Europe/London"
};

export const cotswoldsHampsteadHeathFeed: CotswoldsParkFeed = {
  id: 46,
  label: "Hampstead Heath // heath walk",
  caption: "Adults on Hampstead Heath — rolling heathland, autumn grass, light snow dusting.",
  image: "/cotswolds-hampstead-heath-london.png",
  location: "Hampstead Heath, London",
  region: "England · Camden",
  timeZone: "Europe/London"
};

export const cotswoldsHeroQuarterSet: CotswoldsParkFeed[] = [
  cotswoldsLondonParkGirlsFeed,
  cotswoldsHollandParkWomenFeed,
  cotswoldsOxfordPartyDronesFeed,
  cotswoldsNationalDishCrowdFeed
];

export const cotswoldsQuarterSlideSets: CotswoldsParkFeed[][] = [
  cotswoldsHeroQuarterSet,
  [
    {
      ...cotswoldsSixPhotoSlideshow[0],
      location: "Hyde Park, London",
      region: "England · Westminster",
      timeZone: "Europe/London"
    },
    cotswoldsGreenwichParkFeed,
    {
      ...cotswoldsSixPhotoSlideshow[4],
      location: "Hyde Park, London",
      region: "England · Westminster",
      timeZone: "Europe/London"
    },
    {
      ...cotswoldsSixPhotoSlideshow[5],
      location: "Hyde Park, London",
      region: "England · Westminster",
      timeZone: "Europe/London"
    }
  ],
  [
    cotswoldsHampsteadHeathFeed,
    cotswoldsLondonSummerWomenFeed,
    {
      ...cotswoldsParkSeasonFeeds[1],
      location: "Hyde Park, London",
      region: "England · Westminster",
      timeZone: "Europe/London"
    },
    {
      ...cotswoldsParkFeeds[3],
      location: "Hyde Park, London",
      region: "England · Westminster",
      timeZone: "Europe/London"
    }
  ]
];

export const cotswoldsMovieFeeds: CotswoldsParkFeed[] = [
  cotswoldsEveryoneUnifiedFeed,
  cotswoldsParkSeasonFeeds[0],
  cotswoldsSixPhotoSlideshow[0],
  cotswoldsSixPhotoSlideshow[1],
  cotswoldsParkSeasonFeeds[1],
  cotswoldsBodyMixFeed,
  cotswoldsSixPhotoSlideshow[2],
  cotswoldsParkSeasonFeeds[3],
  cotswoldsSixPhotoSlideshow[3],
  cotswoldsSnowCardFeeds[0],
  cotswoldsSnowCardFeeds[1],
  cotswoldsSixPhotoSlideshow[4],
  cotswoldsSixPhotoSlideshow[5],
  cotswoldsEliteSnowIndoorFeeds[0],
  cotswoldsEliteSnowIndoorFeeds[1],
  cotswoldsParkFeeds[3]
];

export const cotswoldsAllBackdropFeeds: CotswoldsParkFeed[] = cotswoldsQuarterSlideSets.flat();

export type CotswoldsMemberGroup =
  | "white-girls"
  | "caribbean-women"
  | "cotswolds-party-boys"
  | "university-mix"
  | "games-night-girls"
  | "elite-snow-indoor-girls"
  | "shopping-girls"
  | "park-trio"
  | "body-mix-girls"
  | "drone-snow-girls"
  | "london-park-girls"
  | "holland-park-women"
  | "oxford-party-men";

export type CotswoldsParkMember = {
  id: number;
  name: string;
  age: number;
  area: string;
  flag: string;
  group: CotswoldsMemberGroup;
  game: string;
};

export const cotswoldsWhiteGirls: CotswoldsParkMember[] = [
  { id: 1, name: "Charlotte Ashford", age: 23, area: "Holland Park", flag: "🇬🇧", group: "white-girls", game: "Fish & Chips Lunch" },
  { id: 2, name: "Emily Harrington", age: 22, area: "Kensington", flag: "🇬🇧", group: "white-girls", game: "Picnic Quiz" },
  { id: 3, name: "Victoria Langley", age: 24, area: "Hyde Park", flag: "🇬🇧", group: "white-girls", game: "Relay Pair" },
  { id: 4, name: "Harriet Sinclair", age: 21, area: "Regent's Park", flag: "🇬🇧", group: "white-girls", game: "Bocce Pair" },
  { id: 5, name: "Florence Mercer", age: 23, area: "Chelsea", flag: "🇬🇧", group: "white-girls", game: "Scavenger Hunt" },
  { id: 6, name: "Beatrice Cole", age: 22, area: "Notting Hill", flag: "🇬🇧", group: "white-girls", game: "Volleyball Pair" },
  { id: 22, name: "Rosie Paddington", age: 23, area: "Paddington", flag: "🇬🇧", group: "white-girls", game: "Fish & Chips Pair" }
];

export const cotswoldsCaribbeanWomen: CotswoldsParkMember[] = [
  { id: 7, name: "Nadia Baptiste", age: 24, area: "Trinidad", flag: "🇹🇹", group: "caribbean-women", game: "Croquet Pair" },
  { id: 8, name: "Priya Ramkissoon", age: 23, area: "Guyana", flag: "🇬🇾", group: "caribbean-women", game: "Picnic Quiz" },
  { id: 9, name: "Kaya Rolle", age: 22, area: "Bahamas", flag: "🇧🇸", group: "caribbean-women", game: "Relay Pair" },
  { id: 10, name: "Sienna Missick", age: 25, area: "Turks & Caicos", flag: "🇹🇨", group: "caribbean-women", game: "Bocce Pair" },
  { id: 11, name: "Anaya Pierre", age: 21, area: "Haiti", flag: "🇭🇹", group: "caribbean-women", game: "Scavenger Hunt" }
];

export const cotswoldsPartyBoys: CotswoldsParkMember[] = [
  { id: 12, name: "Jack Whitmore", age: 24, area: "Bourton-on-the-Water", flag: "🇬🇧", group: "cotswolds-party-boys", game: "Frisbee Pair" },
  { id: 13, name: "Alfie Pemberton", age: 23, area: "Stow-on-the-Wold", flag: "🇬🇧", group: "cotswolds-party-boys", game: "Dice Lane Pair" },
  { id: 14, name: "Mason Sinclair", age: 22, area: "Broadway", flag: "🇬🇧", group: "cotswolds-party-boys", game: "Dance-Off Pair" }
];

export const cotswoldsGamesNightGirls: CotswoldsParkMember[] = [
  { id: 19, name: "Lila Kensington", age: 24, area: "Kensington", flag: "🇬🇧", group: "games-night-girls", game: "Pub Quiz Night" },
  { id: 20, name: "Sasha Chelsea", age: 23, area: "Chelsea", flag: "🇬🇧", group: "games-night-girls", game: "Darts Lane" },
  { id: 21, name: "Amber Notting Hill", age: 22, area: "Notting Hill", flag: "🇬🇧", group: "games-night-girls", game: "Board Games Night" }
];

export const cotswoldsEliteSnowIndoorGirls: CotswoldsParkMember[] = [
  { id: 23, name: "Eleanor St James", age: 24, area: "Mayfair", flag: "🇬🇧", group: "elite-snow-indoor-girls", game: "Ice Chess Salon" },
  { id: 24, name: "Isabelle Hampstead", age: 23, area: "Hampstead", flag: "🇬🇧", group: "elite-snow-indoor-girls", game: "Indoor Curling Lane" },
  { id: 25, name: "Cordelia Knightsbridge", age: 25, area: "Knightsbridge", flag: "🇬🇧", group: "elite-snow-indoor-girls", game: "Snow Billiards Pavilion" },
  { id: 26, name: "Arabella Richmond", age: 22, area: "Richmond", flag: "🇬🇧", group: "elite-snow-indoor-girls", game: "Trivia Gala Ballroom" }
];

export const cotswoldsShoppingGirls: CotswoldsParkMember[] = [
  { id: 27, name: "Zara Brixton", age: 23, area: "Brixton", flag: "🇬🇧", group: "shopping-girls", game: "Market Shopping Lane" },
  { id: 28, name: "Maya Peckham", age: 22, area: "Peckham", flag: "🇬🇧", group: "shopping-girls", game: "Festival Bag Hunt" },
  { id: 29, name: "Tiana Stratford", age: 24, area: "Stratford", flag: "🇬🇧", group: "shopping-girls", game: "Stall Mix & Shop" }
];

export const cotswoldsParkTrio: CotswoldsParkMember[] = [
  { id: 30, name: "Chloe Bluewater", age: 22, area: "Hyde Park", flag: "🇬🇧", group: "park-trio", game: "Blue-Eye Snow Walk" },
  { id: 31, name: "Jade Greenfield", age: 24, area: "London", flag: "🇬🇧", group: "park-trio", game: "Green-Eye Park Lane" },
  { id: 32, name: "Hannah Cole", age: 23, area: "Kensington", flag: "🇬🇧", group: "park-trio", game: "Snow Stroll Mix" }
];

export const cotswoldsBodyMixGirls: CotswoldsParkMember[] = [
  { id: 33, name: "Ivy Runner", age: 23, area: "Shoreditch", flag: "🇬🇧", group: "body-mix-girls", game: "Gym Park Sprint" },
  { id: 34, name: "Naomi Curves", age: 25, area: "Camden", flag: "🇬🇧", group: "body-mix-girls", game: "Curvy Snow Lane" },
  { id: 35, name: "Ella Fine", age: 22, area: "Marylebone", flag: "🇬🇧", group: "body-mix-girls", game: "Slim Park Pace" }
];

export const cotswoldsDroneSnowGirls: CotswoldsParkMember[] = [
  { id: 36, name: "Mia Snowlane", age: 20, area: "Hyde Park", flag: "🇬🇧", group: "drone-snow-girls", game: "Drone Snow Blast" },
  { id: 37, name: "Poppy Frost", age: 19, area: "Westminster", flag: "🇬🇧", group: "drone-snow-girls", game: "Snow Jump Lane" },
  { id: 38, name: "Skye Winter", age: 19, area: "South Bank", flag: "🇬🇧", group: "drone-snow-girls", game: "Drone Laugh Run" }
];

export const cotswoldsLondonParkGirls: CotswoldsParkMember[] = [
  { id: 88, name: "Bella Soho", age: 23, area: "Hyde Park", flag: "🇬🇧", group: "london-park-girls", game: "Game 1 · Best Makeup Look" },
  { id: 39, name: "Tessa Camden", age: 24, area: "London", flag: "🇬🇧", group: "london-park-girls", game: "Game 2 · Rounders" },
  { id: 40, name: "Polly Shoreditch", age: 23, area: "London", flag: "🇬🇧", group: "london-park-girls", game: "Game 3 · Frisbee" },
  { id: 41, name: "Gwen Islington", age: 22, area: "London", flag: "🇬🇧", group: "london-park-girls", game: "Game 4 · Sack Race" }
];

export const cotswoldsHollandParkWomen: CotswoldsParkMember[] = [
  { id: 42, name: "Margot Holland", age: 22, area: "Holland Park", flag: "🇬🇧", group: "holland-park-women", game: "Game 1 · Croquet" },
  { id: 43, name: "Freya Kensington", age: 25, area: "Holland Park", flag: "🇬🇧", group: "holland-park-women", game: "Game 2 · Badminton" },
  { id: 44, name: "Imogen Notting Hill", age: 23, area: "Holland Park", flag: "🇬🇧", group: "holland-park-women", game: "Game 3 · Boules" },
  { id: 45, name: "Clara Holland", age: 22, area: "Holland Park", flag: "🇬🇧", group: "holland-park-women", game: "Game 4 · Tug of War" }
];

export const cotswoldsOxfordPartyMen: CotswoldsParkMember[] = [
  { id: 46, name: "James Whitfield", age: 21, area: "Oxford", flag: "🇬🇧", group: "oxford-party-men", game: "Drone Snow Party" },
  { id: 47, name: "Henry Thornton", age: 20, area: "Oxford", flag: "🇬🇧", group: "oxford-party-men", game: "Uni Snow Mixer" }
];

export const cotswoldsUniversityMix: CotswoldsParkMember[] = [
  { id: 15, name: "Oliver Pemberton", age: 22, area: "Cambridge", flag: "🇬🇧", group: "university-mix", game: "Debate Circle" },
  { id: 16, name: "Leo Ashford", age: 21, area: "Imperial", flag: "🇬🇧", group: "university-mix", game: "Park Mixer" },
  { id: 17, name: "Ethan Balliol", age: 22, area: "Oxford", flag: "🇬🇧", group: "university-mix", game: "Rowing Chat" },
  { id: 18, name: "Noah Trinity", age: 21, area: "Cambridge", flag: "🇬🇧", group: "university-mix", game: "Chess & Coffee" }
];

export type CotswoldsGamePair = {
  id: number;
  playerA: string;
  playerB: string;
  game: string;
  feed: number;
};

export const cotswoldsGamePairs: CotswoldsGamePair[] = [
  { id: 1, playerA: "Charlotte", playerB: "Rosie", game: "Fish & Chips Pair", feed: 1 },
  { id: 2, playerA: "Emily", playerB: "Priya", game: "Picnic Quiz", feed: 1 },
  { id: 3, playerA: "Victoria", playerB: "Kaya", game: "Relay Pair", feed: 2 },
  { id: 4, playerA: "Harriet", playerB: "Sienna", game: "Bocce Pair", feed: 2 },
  { id: 5, playerA: "Florence", playerB: "Anaya", game: "Scavenger Hunt", feed: 2 },
  { id: 6, playerA: "Beatrice", playerB: "Jack", game: "Volleyball Pair", feed: 3 },
  { id: 7, playerA: "Alfie", playerB: "Mason", game: "Party Dice Lane", feed: 3 },
  { id: 8, playerA: "James", playerB: "Henry", game: "Oxford Drone Snow Party", feed: 3 },
  { id: 9, playerA: "Oliver", playerB: "Leo", game: "Park Strategy", feed: 4 }
];

export const cotswoldsAllMembers = [
  ...cotswoldsWhiteGirls,
  ...cotswoldsLondonParkGirls,
  ...cotswoldsHollandParkWomen,
  ...cotswoldsOxfordPartyMen,
  ...cotswoldsCaribbeanWomen,
  ...cotswoldsPartyBoys,
  ...cotswoldsGamesNightGirls,
  ...cotswoldsEliteSnowIndoorGirls,
  ...cotswoldsShoppingGirls,
  ...cotswoldsParkTrio,
  ...cotswoldsBodyMixGirls,
  ...cotswoldsDroneSnowGirls,
  ...cotswoldsUniversityMix
];

export const cotswoldsMeetupLine =
  "3 London park · 4 Holland Park 22-25 · 2 Oxford party drones · UK fish & chips · 7 UK · 3 games-night · 3 park trio · 4 elite · 5 Caribbean · 3 party boys · 4 uni mix";

export const cotswoldsRoomDescription =
  "Eh up, bab! Don't just stand in the doorway—get stuck in and have a proper look about. We've put on a mint display for you, and we're absolutely chuffed you've dropped by. Make yourself comfortable and enjoy the view!";

export const cotswoldsMenPrompts = [
  { id: "croquet", label: "Croquet — pick your mallet colour and who breaks first?" },
  { id: "lawn-bowls", label: "Lawn bowls — short jack or long jack on the green?" },
  { id: "rounders", label: "Rounders — field positions set or first at bat?" },
  { id: "tennis", label: "Tennis — public court singles or doubles?" },
  { id: "pub-darts", label: "Pub darts — 501 checkout or Around the Clock?" },
  { id: "snooker", label: "Snooker — open break or safety frame?" },
  { id: "pub-quiz", label: "Pub quiz — picture round or general knowledge?" },
  { id: "indoor-bowls", label: "Indoor bowls — tie-break end or sudden death?" }
] as const;

export type CotswoldsMenPromptId = (typeof cotswoldsMenPrompts)[number]["id"];

export const cotswoldsPromptResponses: Record<CotswoldsMenPromptId, string> = {
  croquet:
    "Classic UK lawn croquet — pick blue, red, black, or yellow, call the opening break, and tell the room your first hoop plan.",
  "lawn-bowls":
    "Real outdoor bowls on a UK green — short jack for tight ends or long jack for draw weight. Name your line and length.",
  rounders:
    "Park rounders — deep field, square leg, or first swing? Call your role and one line that fires up the team.",
  tennis:
    "Hyde Park or club public courts — singles grind or doubles at the net? Pick your side and sell your opening game.",
  "pub-darts":
    "Proper pub darts — 501 with a checkout call, or Around the Clock for pace. Name your first target and finish.",
  snooker:
    "Indoor snooker hall — aggressive open break or tight safety? Call the frame plan in two lines max.",
  "pub-quiz":
    "UK pub quiz night — picture round specialist or general knowledge anchor? Pick your round and back it up.",
  "indoor-bowls":
    "Indoor bowls rink — tie-break final end or sudden-death shootout? Call your weight and why the room should watch."
};

/** Men's entry · UK games · one exact panel each */
export const cotswoldsMenActivityPanels = [
  {
    id: "croquet" as const,
    title: "Croquet",
    question: "pick your mallet colour and who breaks first?",
    emoji: "🏑",
    simGame: "Croquet",
    simHost: "Margot · Holland Park"
  },
  {
    id: "lawn-bowls" as const,
    title: "Lawn bowls",
    question: "short jack or long jack on the green?",
    emoji: "🟢",
    simGame: "Lawn bowls",
    simHost: "UK green · live"
  },
  {
    id: "tennis" as const,
    title: "Tennis",
    question: "public court singles or doubles?",
    emoji: "🎾",
    simGame: "Tennis",
    simHost: "Hyde Park courts"
  },
  {
    id: "pub-darts" as const,
    title: "Pub darts",
    question: "501 checkout or Around the Clock?",
    emoji: "🎯",
    simGame: "Pub darts",
    simHost: "UK pub · live"
  },
  {
    id: "pub-quiz" as const,
    title: "Pub quiz",
    question: "picture round or general knowledge?",
    emoji: "🧠",
    simGame: "Pub quiz",
    simHost: "UK pub · quiz night"
  }
] as const;

export type CotswoldsMenActivityPanelId = (typeof cotswoldsMenActivityPanels)[number]["id"];
