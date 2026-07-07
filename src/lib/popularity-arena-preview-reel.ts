export type PopularityPreviewScene = {
  id: string;
  src: string;
  poster?: string;
  label: string;
  flash?: boolean;
};

/** Nav pill · 5s exact · real MP4 clips in /nav-popularity-reel */
export const popularityArenaPreviewScenes: PopularityPreviewScene[] = [
  {
    id: "snow-games",
    src: "/nav-popularity-reel/snow-games.mp4",
    poster: "/cotswolds-park-drones-play-snow.png",
    label: "Snow games · park live"
  },
  {
    id: "swiss",
    src: "/nav-popularity-reel/swiss-flash.mp4",
    poster: "/cotswolds-elite-snow-indoor-1.png",
    label: "Swiss flash · alpine salon",
    flash: true
  },
  {
    id: "flash",
    src: "/nav-popularity-reel/arena-flash.mp4",
    poster: "/ecuador-dropship-people-banco-guayaquil.png",
    label: "Arena flash · live clip",
    flash: true
  },
  {
    id: "tokyo",
    src: "/nav-popularity-reel/tokyo.mp4",
    poster: "/japan-room-fuji-pagoda-bg.png",
    label: "Tokyo · Japan room 4K"
  },
  {
    id: "games",
    src: "/nav-popularity-reel/games-live.mp4",
    poster: "/cotswolds-park-drones-play-snow.png",
    label: "Games · Free Fire EC"
  },
  {
    id: "dropship",
    src: "/nav-popularity-reel/dropship.mp4",
    poster: "/japan-dropship-creator-live-slot.png",
    label: "Dropship · creator live lane"
  }
];

/** Exact 5 seconds per preview clip */
export const popularityPreviewSceneMs = 5000;