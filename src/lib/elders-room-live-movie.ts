export type EldersRoomMovieCastMember = {
  id: string;
  name: string;
  age: number;
  city: string;
  country: "UK" | "Poland";
  flag: string;
  sceneImage: string;
  line: string;
};

export const eldersRoomMovieMeta = {
  title: "REAL LIFE MOVIE",
  subtitle: "6 UK girls · 4 Poland women · 18–29",
  locationUk: "England · Scotland · Wales",
  locationPl: "Warsaw · Kraków · Gdańsk · Wrocław"
} as const;

export const eldersRoomUkCast: EldersRoomMovieCastMember[] = [
  {
    id: "uk-tessa",
    name: "Tessa",
    age: 24,
    city: "London",
    country: "UK",
    flag: "🇬🇧",
    sceneImage: "/cotswolds-london-park-girls-3.png",
    line: "Haha yes — the whole park is live with us!!"
  },
  {
    id: "uk-polly",
    name: "Polly",
    age: 23,
    city: "Manchester",
    country: "UK",
    flag: "🇬🇧",
    sceneImage: "/cotswolds-park-feed-games-night.png",
    line: "Games night energy — say hi in chat!!"
  },
  {
    id: "uk-gwen",
    name: "Gwen",
    age: 22,
    city: "Birmingham",
    country: "UK",
    flag: "🇬🇧",
    sceneImage: "/cotswolds-park-feed-2.png",
    line: "Wait wait — who is from Wales rn?"
  },
  {
    id: "uk-chloe",
    name: "Chloe",
    age: 22,
    city: "Leeds",
    country: "UK",
    flag: "🇬🇧",
    sceneImage: "/cotswolds-park-trio-snow.png",
    line: "Snow lane laughing — pull up!!"
  },
  {
    id: "uk-lila",
    name: "Lila",
    age: 24,
    city: "Cardiff",
    country: "UK",
    flag: "🇬🇧",
    sceneImage: "/cotswolds-greenwich-park-london.png",
    line: "Fish & chips crew — we hear you!!"
  },
  {
    id: "uk-eleanor",
    name: "Eleanor",
    age: 24,
    city: "Edinburgh",
    country: "UK",
    flag: "🇬🇧",
    sceneImage: "/cotswolds-elite-snow-indoor-1.png",
    line: "Elite snow salon — chess and laughs live."
  }
];

export const eldersRoomPolandCast: EldersRoomMovieCastMember[] = [
  {
    id: "pl-zofia",
    name: "Zofia",
    age: 22,
    city: "Warsaw",
    country: "Poland",
    flag: "🇵🇱",
    sceneImage: "/cotswolds-elite-snow-indoor-2.png",
    line: "Cześć!! Warsaw in the house 😂"
  },
  {
    id: "pl-kasia",
    name: "Kasia",
    age: 24,
    city: "Kraków",
    country: "Poland",
    flag: "🇵🇱",
    sceneImage: "/cotswolds-elite-snow-indoor-3.png",
    line: "Kraków girls — keep talking to us!!"
  },
  {
    id: "pl-natalia",
    name: "Natalia",
    age: 20,
    city: "Gdańsk",
    country: "Poland",
    flag: "🇵🇱",
    sceneImage: "/cotswolds-elite-snow-indoor-4.png",
    line: "Gdańsk live — haha yes!!"
  },
  {
    id: "pl-ania",
    name: "Ania",
    age: 26,
    city: "Wrocław",
    country: "Poland",
    flag: "🇵🇱",
    sceneImage: "/cotswolds-mall-backdrop.png",
    line: "Wrocław crew laughing with the UK room."
  }
];

export type EldersRoomMovieScene = {
  id: string;
  castId: string | null;
  image: string;
  label: string;
  speech: string;
  region: "UK" | "Poland" | "both";
};

export const eldersRoomMovieScenes: EldersRoomMovieScene[] = [
  {
    id: "uk-group-six",
    castId: null,
    image: "/cotswolds-london-park-games-six.png",
    label: "6 UK girls · outdoor games live",
    speech: "All six of us laughing in the park — chat is flying!!",
    region: "UK"
  },
  ...eldersRoomUkCast.map((member) => ({
    id: `scene-${member.id}`,
    castId: member.id,
    image: member.sceneImage,
    label: `${member.name} · ${member.age} · ${member.city} ${member.flag}`,
    speech: member.line,
    region: "UK" as const
  })),
  {
    id: "pl-group-four",
    castId: null,
    image: "/cotswolds-holland-park-women-4.png",
    label: "4 Poland women · 18–29 · autumn walk",
    speech: "Four cities — one live room — keep speaking with us!!",
    region: "Poland"
  },
  ...eldersRoomPolandCast.map((member) => ({
    id: `scene-${member.id}`,
    castId: member.id,
    image: member.sceneImage,
    label: `${member.name} · ${member.age} · ${member.city} ${member.flag}`,
    speech: member.line,
    region: "Poland" as const
  }))
];

export const eldersRoomMovieCast = [...eldersRoomUkCast, ...eldersRoomPolandCast];
