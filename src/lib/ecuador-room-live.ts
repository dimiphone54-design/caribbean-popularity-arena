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
  title: "Arena Flash en vivo: drop exclusivo | Solo hoy",
  subtext: "Backstage con los artistas + merch limitada",
  thumbnailSrc: "/arena-real-people/slot-01.jpg",
  videoSrc: "/ecuador-arena-flash-live-clip.mp4",
  nextLiveLabel: "Próximo en vivo: viernes 8 p. m."
};

/** Second live slot · different Ecuador clip (Ecuavoley court energy) */
export const ecuadorFlashLiveConfigB: EcuadorFlashLiveConfig = {
  isLive: true,
  viewers: 982,
  link: "https://www.youtube.com/live",
  title: "Arena Flash en vivo: noche de sala | Quito–Guayaquil",
  subtext: "Creadores en vivo + drop de la cuadra · solo esta noche",
  thumbnailSrc: "/ecuador-ecuavoley-poster.jpg",
  videoSrc: "/ecuador-ecuavoley-live.mp4",
  nextLiveLabel: "Próximo en vivo: sábado 9 p. m."
};

export const ecuadorFlashLiveSlots: readonly EcuadorFlashLiveConfig[] = [
  ecuadorFlashLiveConfig,
  ecuadorFlashLiveConfigB
];
