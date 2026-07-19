export type CountryTeam = {
  id: string;
  name: string;
  countryId: string;
  flag: string;
  ranking: number;
  wins: number;
  losses: number;
  points: number;
  players: number;
  color: string;
  accent: string;
};

export const countryTeams: CountryTeam[] = [
  { id: "trinidad", name: "Trinidad & Tobago", countryId: "trinidad", flag: "🇹🇹", ranking: 1, wins: 42, losses: 8, points: 840, players: 156, color: "#ce1126", accent: "#fcd116" },
  { id: "colombia", name: "Colombia", countryId: "colombia", flag: "🇨🇴", ranking: 2, wins: 38, losses: 12, points: 760, players: 203, color: "#fcd116", accent: "#ce1126" },
  { id: "japan", name: "Japan", countryId: "japan", flag: "🇯🇵", ranking: 3, wins: 36, losses: 14, points: 720, players: 178, color: "#bc002d", accent: "#ffffff" },
  { id: "ecuador", name: "Ecuador", countryId: "ecuador", flag: "🇪🇨", ranking: 4, wins: 34, losses: 16, points: 680, players: 142, color: "#ce1126", accent: "#fcd116" },
  { id: "china", name: "China", countryId: "china", flag: "🇨🇳", ranking: 5, wins: 30, losses: 20, points: 600, players: 189, color: "#de2910", accent: "#ffde00" },
  { id: "united_kingdom", name: "United Kingdom", countryId: "united_kingdom", flag: "🇬🇧", ranking: 6, wins: 28, losses: 22, points: 560, players: 167, color: "#00247d", accent: "#cf142b" }
];

export function getCountryTeam(countryId: string): CountryTeam | undefined {
  return countryTeams.find((t) => t.countryId === countryId);
}
