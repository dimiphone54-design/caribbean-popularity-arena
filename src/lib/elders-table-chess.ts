import { eldersTableGameResponses } from "@/lib/the-elders-table";

export const eldersTableChess2030 = {
  liveBadge: "Gold table · Live",
  symbol: "♔",
  title: "CHESS",
  gameType: "Table strategy · 2030 lane",
  available: "Italian Game · Queen's Gambit · gold table · indoor + backyard",
  blurb: eldersTableGameResponses.chess,
  openings: [
    { id: "italian", label: "Italian Game", note: "Elegant rhythm · readable center" },
    { id: "queens-gambit", label: "Queen's Gambit", note: "Control early · hold the night" }
  ],
  stats: [
    { label: "Tables live", value: "3" },
    { label: "Hosts", value: "Keisha · Akemi" },
    { label: "Scene", value: "Gold + indoor" }
  ],
  hosts: [
    { name: "Keisha", age: 34, flag: "🇯🇲", lane: "Gold table" },
    { name: "Akemi", age: 29, flag: "🇯🇵", lane: "Shibuya indoor" },
    { name: "Zanele", age: 29, flag: "🇿🇦", lane: "Camps Bay" },
    { name: "Monica", age: 28, flag: "🇺🇸", lane: "Win clip live" }
  ]
} as const;
