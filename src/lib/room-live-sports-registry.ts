/** Country room sports panel · API-Sports row wiring · one free bucket per sport */

export type RoomLiveSportKind = "football" | "volleyball";

export type RoomLiveSportLink = {
  gameRowId: string;
  sport: RoomLiveSportKind;
  label: string;
  footballCountry?: string;
  footballLeagueIds?: number[];
  volleyballCountries?: string[];
};

export type RoomLiveSportsRoomConfig = {
  roomSlug: string;
  countryName: string;
  flag: string;
  panelTitle: string;
  links: RoomLiveSportLink[];
};

export const ROOM_LIVE_SPORTS_CONFIG: Record<string, RoomLiveSportsRoomConfig> = {
  "colombia-room": {
    roomSlug: "colombia-room",
    countryName: "Colombia",
    flag: "🇨🇴",
    panelTitle: "Colombia (CO) · deportes en vivo",
    links: [
      {
        gameRowId: "co-futbol",
        sport: "football",
        label: "Liga BetPlay · Fútbol CO",
        footballCountry: "Colombia",
        footballLeagueIds: [239, 240]
      },
      {
        gameRowId: "co-volleyball",
        sport: "volleyball",
        label: "Voleibol · feed en vivo",
        volleyballCountries: ["Colombia", "World"]
      }
    ]
  },
  "ecuador-room": {
    roomSlug: "ecuador-room",
    countryName: "Ecuador",
    flag: "🇪🇨",
    panelTitle: "Ecuador (EC) · deportes en vivo",
    links: [
      {
        gameRowId: "ec-ecuavoley",
        sport: "volleyball",
        label: "Ecuavoley · vóley en vivo",
        volleyballCountries: ["Ecuador", "World"]
      }
    ]
  }
};

export function getRoomLiveSportsConfig(roomSlug: string) {
  return ROOM_LIVE_SPORTS_CONFIG[roomSlug] ?? null;
}