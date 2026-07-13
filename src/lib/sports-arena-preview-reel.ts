export type SportsPreviewScene = {
  id: string;
  src: string;
  poster?: string;
  label: string;
  flash?: boolean;
};

/** Sports dock · 5s exact · real MP4 clips in /nav-sports-reel */
export const sportsArenaPreviewScenes: SportsPreviewScene[] = [
  {
    id: "football",
    src: "/nav-sports-reel/football-live.mp4",
    poster: "/colombia-bg-football-match.png",
    label: "Football · Colombia match night"
  },
  {
    id: "man-utd",
    src: "/nav-sports-reel/man-utd-action.mp4",
    poster: "/manchester-united-live-action.png",
    label: "Man Utd · live action",
    flash: true
  },
  {
    id: "arena-flash",
    src: "/nav-sports-reel/arena-flash.mp4",
    poster: "/ecuador-dropship-people-banco-guayaquil.png",
    label: "Arena flash · sports lane",
    flash: true
  },
  {
    id: "games",
    src: "/nav-sports-reel/games-live.mp4",
    poster: "/cotswolds-park-feed-games-night.png",
    label: "Games · Ecuavoley"
  },
  {
    id: "colombia",
    src: "/nav-sports-reel/colombia-sports.mp4",
    poster: "/colombia-nightlife-real.png",
    label: "Colombia · sports nightlife"
  },
  {
    id: "park",
    src: "/nav-sports-reel/park-games.mp4",
    poster: "/cotswolds-park-drones-play-snow.png",
    label: "Park games · live crowd"
  }
];

export const sportsPreviewSceneMs = 5000;