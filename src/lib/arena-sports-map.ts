export type ArenaSportsMapEntry = {
  name: string;
  emoji: string;
};

export type ArenaSportsMapZone = {
  id: string;
  title: string;
  flag: string;
  subtitle: string;
  sports: ArenaSportsMapEntry[];
};

export const ARENA_SPORTS_MAP_ZONES: ArenaSportsMapZone[] = [
  {
    id: "nav",
    title: "Nav · Sports Video Panel",
    flag: "🔝",
    subtitle: "Fixed reel under the top nav",
    sports: [
      { name: "Football", emoji: "⚽" },
      { name: "Man Utd action", emoji: "⚽" },

      { name: "Colombia sports night", emoji: "🇨🇴" },
      { name: "UK park games", emoji: "🌳" }
    ]
  },
  {
    id: "uk-cotswolds",
    title: "UK Cotswolds Room",
    flag: "🇬🇧",
    subtitle: "/rooms/uk-flag-cotswolds · most sports on site",
    sports: [
      { name: "Rounders", emoji: "🥎" },
      { name: "Frisbee", emoji: "🥏" },
      { name: "Croquet", emoji: "🏑" },
      { name: "Badminton", emoji: "🏸" },
      { name: "Tennis", emoji: "🎾" },
      { name: "Lawn bowls", emoji: "🟢" },
      { name: "Indoor bowls", emoji: "🟢" },
      { name: "Boules / Bocce", emoji: "🟢" },
      { name: "Pub darts", emoji: "🎯" },
      { name: "Snooker", emoji: "🎱" },
      { name: "Volleyball", emoji: "🏐" },
      { name: "Tug of War", emoji: "🪢" },
      { name: "Sack Race", emoji: "🏁" },
      { name: "Park Relay", emoji: "🏃" },
      { name: "Indoor Curling", emoji: "🥌" },
      { name: "Park football", emoji: "⚽" }
    ]
  },
  {
    id: "colombia",
    title: "Colombia Room",
    flag: "🇨🇴",
    subtitle: "/rooms/colombia-room",
    sports: [
      { name: "Fútbol / Liga", emoji: "⚽" },
      { name: "Volleyball", emoji: "🏐" },
      { name: "Salsa", emoji: "💃" },
      { name: "Surf", emoji: "🌊" },
      { name: "Cycling", emoji: "🚴" },

    ]
  },
  {
    id: "ecuador",
    title: "Ecuador Room",
    flag: "🇪🇨",
    subtitle: "/rooms/ecuador-room",
    sports: [
      { name: "Ecuavoley", emoji: "🏐" },
      { name: "LigaPro", emoji: "⚽" }
    ]
  },
  {
    id: "japan",
    title: "Japan Room",
    flag: "🇯🇵",
    subtitle: "/rooms/japan-room",
    sports: [{ name: "Kendo stage duel", emoji: "🥋" }]
  },
  {
    id: "china",
    title: "China",
    flag: "🇨🇳",
    subtitle: "/rooms/china-room",
    sports: [
      { name: "Wushu Duilian", emoji: "🥋" },
      { name: "Wushu Sanda", emoji: "🥋" }
    ]
  },
  {
    id: "records",
    title: "Popularity Arena · Sports Tab",
    flag: "📊",
    subtitle: "High scores modal · sports lane",
    sports: [
      { name: "Football", emoji: "⚽" },
      { name: "Ecuavoley", emoji: "🏐" },
      { name: "Kendo", emoji: "🥋" },
      { name: "Park football", emoji: "⚽" }
    ]
  }
];

export const ARENA_SPORTS_UNIQUE_LIST: ArenaSportsMapEntry[] = [
  { name: "Football", emoji: "⚽" },
  { name: "Park football", emoji: "⚽" },
  { name: "Five-a-side football", emoji: "⚽" },
  { name: "Ecuavoley", emoji: "🏐" },
  { name: "Volleyball", emoji: "🏐" },
  { name: "Kendo", emoji: "🥋" },
  { name: "Wushu Duilian", emoji: "🥋" },
  { name: "Wushu Sanda", emoji: "🥋" },
  { name: "Tennis", emoji: "🎾" },
  { name: "Badminton", emoji: "🏸" },
  { name: "Croquet", emoji: "🏑" },
  { name: "Rounders", emoji: "🥎" },
  { name: "Frisbee", emoji: "🥏" },
  { name: "Lawn bowls", emoji: "🟢" },
  { name: "Indoor bowls", emoji: "🟢" },
  { name: "Boules / Bocce", emoji: "🟢" },
  { name: "Pub darts", emoji: "🎯" },
  { name: "Snooker", emoji: "🎱" },
  { name: "Tug of War", emoji: "🪢" },
  { name: "Sack Race", emoji: "🏁" },
  { name: "Park Relay", emoji: "🏃" },
  { name: "Salsa", emoji: "💃" },
  { name: "Surf", emoji: "🌊" },
  { name: "Cycling", emoji: "🚴" },
  { name: "Indoor Curling", emoji: "🥌" }
];

export const ARENA_ESPORTS_LIST: ArenaSportsMapEntry[] = [
  { name: "Roblox", emoji: "🧱" },
  { name: "Among Us", emoji: "👽" }
];

export const ARENA_SPORTS_MAP_STATS = {
  uniqueSports: ARENA_SPORTS_UNIQUE_LIST.length,
  playableSimulators: 18,
  sportsRecordsTab: 4,
  richestRoom: "UK Cotswolds",
  richestRoomCount: 16,
  topSport: "Football"
};