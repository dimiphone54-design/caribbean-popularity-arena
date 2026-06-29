/** Ecuador room · Arena Flash Live · edit viewers / link / isLive here */
export type EcuadorFlashLiveConfig = {
  isLive: boolean;
  viewers: number;
  link: string;
  title: string;
  subtext: string;
  thumbnailSrc: string;
  videoSrc: string;
  nextLiveLabel: string;
};

export const ecuadorFlashLiveConfig: EcuadorFlashLiveConfig = {
  isLive: true,
  viewers: 1247,
  link: "https://www.youtube.com/live",
  title: "Arena Flash Live: Drop Exclusivo | Solo hoy",
  subtext: "Backstage con los artistas + merch limitada",
  thumbnailSrc: "/arena-real-people/slot-01.jpg",
  videoSrc: "/ecuador-arena-flash-live-clip.mp4",
  nextLiveLabel: "El próximo LIVE: Viernes 8PM"
};
