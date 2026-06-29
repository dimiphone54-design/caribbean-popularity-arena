/** Creator-led live rooms — optional gifts, no fan rankings. */
export const liveCreatorSessionPolicy = {
  headline: "Creator-led live · games & culture",
  giftsNote: "Anyone can send a gift to cheer the stream. No rankings and no competition between viewers."
} as const;

export type LiveTrendingTopic = {
  id: string;
  label: string;
  flag: string;
  blurb: string;
};

/** Seven simple Live 1 talk topics — country, football, menu, university, and more. */
export const colombiaRoomTrendingTopics: LiveTrendingTopic[] = [
  {
    id: "co-talk-country",
    label: "Talk about your country",
    flag: "🌍",
    blurb: "Where you're from · what you miss · proud moments · home stories"
  },
  {
    id: "co-talk-football",
    label: "Favourite football team",
    flag: "⚽",
    blurb: "Nacional · Millonarios · your club · match-day banter · who you support"
  },
  {
    id: "co-talk-menu",
    label: "Tonight's menu",
    flag: "🍽️",
    blurb: "What's cooking · arepas · bandeja · dinner plans · food with love"
  },
  {
    id: "co-talk-university",
    label: "University · campus chat",
    flag: "🎓",
    blurb: "Classes · friends · campus life · study tips · assistant topics"
  },
  {
    id: "co-talk-music",
    label: "Music tonight",
    flag: "🎵",
    blurb: "Reggaeton · salsa · vallenato · what's on your playlist"
  },
  {
    id: "co-talk-city",
    label: "My city · local story",
    flag: "🏙️",
    blurb: "Bogotá · Medellín · Cali · your barrio · hidden gems"
  },
  {
    id: "co-talk-qa",
    label: "Ask me anything",
    flag: "💬",
    blurb: "Open Q&A · chat with the room · simple talk · no script"
  }
];

export const defaultColombiaTrendingTopicId = colombiaRoomTrendingTopics[0]!.id;

export function findColombiaTrendingTopic(id: string) {
  return colombiaRoomTrendingTopics.find((topic) => topic.id === id) ?? colombiaRoomTrendingTopics[0]!;
}
