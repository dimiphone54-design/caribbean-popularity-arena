import { formatArenaGiftAmount } from "@/lib/arena-gifts";
import { eldersTableGiftAmountUsd } from "@/lib/elders-table-gift-legal";

export type EldersRoomWinClip = {
  id: string;
  winnerName: string;
  winnerFrom: string;
  winnerFlag: string;
  matchedName: string;
  matchedFrom: string;
  matchedFlag: string;
  game: string;
  headline: string;
  detail: string;
  poster: string;
  hostImage: string;
  crowdImage: string;
  chatLines: string[];
  hostSpeech: string;
  audienceFlags: string[];
  roomSlug: string;
  watching: number;
};

export const eldersRoomMeta = {
  name: "THE ELDERS ROOM",
  level: 2,
  priceUsd: eldersTableGiftAmountUsd,
  currencyLabel: formatArenaGiftAmount(eldersTableGiftAmountUsd),
  tagline: "Live win clips · digital room access · send a Gift to enter"
} as const;

export const eldersRoomWinClips: EldersRoomWinClip[] = [
  {
    id: "monica-texas-grenada",
    winnerName: "Monica",
    winnerFrom: "Texas",
    winnerFlag: "🇺🇸",
    matchedName: "Devon",
    matchedFrom: "Grenada",
    matchedFlag: "🇬🇩",
    game: "Chess",
    headline: "Monica from Texas won a mate from Grenada",
    detail: "Chess · gold table · Elders Room digital showcase clip",
    poster: "/elders-table-q-tr.jpg",
    hostImage: "/cotswolds-london-park-girls-3.png",
    crowdImage: "/cotswolds-london-park-games-six.png",
    chatLines: [
      "Monica you're hilarious 😂",
      "Texas queen speak!!",
      "Grenada in the chat 🔥",
      "haha wait say that again"
    ],
    hostSpeech: "Haha yes — Grenada pull up!!",
    audienceFlags: ["🇺🇸", "🇬🇩", "🇯🇲", "🇬🇧", "🇿🇦", "🇯🇵"],
    roomSlug: "monica-texas",
    watching: 42
  },
  {
    id: "keisha-jamaica-antigua",
    winnerName: "Keisha",
    winnerFrom: "Jamaica",
    winnerFlag: "🇯🇲",
    matchedName: "Marcus",
    matchedFrom: "Antigua",
    matchedFlag: "🇦🇬",
    game: "Bridge",
    headline: "Keisha from Jamaica locked a boyfriend from Antigua",
    detail: "Bridge night · live clip from Level 2 digital Elders Room",
    poster: "/elders-table-q-bl.jpg",
    hostImage: "/cotswolds-holland-park-women-4.png",
    crowdImage: "/cotswolds-park-body-mix.png",
    chatLines: [
      "Keisha we hear you!!",
      "bridge queen laughing 😭",
      "Antigua crew in here",
      "yes girl keep talking"
    ],
    hostSpeech: "Wait wait — Marcus from Antigua!!",
    audienceFlags: ["🇯🇲", "🇦🇬", "🇹🇹", "🇧🇧", "🇬🇧", "🇺🇸"],
    roomSlug: "keisha-jamaica",
    watching: 31
  },
  {
    id: "naledi-sandton-tokyo",
    winnerName: "Naledi",
    winnerFrom: "Sandton",
    winnerFlag: "🇿🇦",
    matchedName: "Rio",
    matchedFrom: "Tokyo",
    matchedFlag: "🇯🇵",
    game: "Business sim",
    headline: "Naledi from Sandton won a Tokyo boardroom match",
    detail: "Business sim · negotiation win · clip replay live now",
    poster: "/elders-table-tokyo-marrakech-noir.png",
    hostImage: "/cotswolds-london-summer-women-5.png",
    crowdImage: "/cotswolds-uk-national-dish-crowd.png",
    chatLines: [
      "Naledi the room is packed",
      "Sandton energy!! 😂",
      "Tokyo said yes!!",
      "she's speaking live rn"
    ],
    hostSpeech: "Tokyo boardroom — we closed it live!",
    audienceFlags: ["🇿🇦", "🇯🇵", "🇺🇸", "🇬🇧", "🇦🇪", "🇰🇪"],
    roomSlug: "naledi-sandton",
    watching: 58
  }
];

export function getEldersRoomClip(id: string): EldersRoomWinClip | undefined {
  return eldersRoomWinClips.find((clip) => clip.id === id);
}
