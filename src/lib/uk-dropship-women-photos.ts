import {
  cotswoldsBodyMixFeed,
  cotswoldsEliteSnowIndoorFeeds,
  cotswoldsEveryoneUnifiedFeed,
  cotswoldsHollandParkWomenFeed,
  cotswoldsLondonSummerWomenFeed,
  cotswoldsParkSeasonFeeds,
  cotswoldsSixPhotoSlideshow
} from "@/lib/cotswolds";

/** UK dropship · exact UK women photos from Cotswolds database · no football / men stock */
export const ukDropshipWomenPhotos = {
  hollandParkFour: cotswoldsHollandParkWomenFeed.image,
  londonSummerFive: cotswoldsLondonSummerWomenFeed.image,
  londonParkGirls: "/cotswolds-london-park-girls-3.png",
  parkGamesSix: "/cotswolds-london-park-games-six.png",
  fishChips: cotswoldsSixPhotoSlideshow[0].image,
  gamesNight: cotswoldsSixPhotoSlideshow[1].image,
  happySnowCards: cotswoldsSixPhotoSlideshow[3].image,
  droneSnowGirls: cotswoldsSixPhotoSlideshow[4].image,
  parkTrio: cotswoldsParkSeasonFeeds[1].image,
  bodyMix: cotswoldsBodyMixFeed.image,
  everyoneUnified: cotswoldsEveryoneUnifiedFeed.image,
  eliteIndoor1: cotswoldsEliteSnowIndoorFeeds[0].image,
  eliteIndoor2: cotswoldsEliteSnowIndoorFeeds[1].image,
  eliteIndoor3: cotswoldsEliteSnowIndoorFeeds[2].image,
  eliteIndoor4: cotswoldsEliteSnowIndoorFeeds[3].image,
  arenaUk: "/arena-real-people/uk.jpg",
  arenaUk2: "/arena-real-people/uk2.jpg"
} as const;

export type UkDropshipWomenSlide = {
  id: string;
  src: string;
  focus: string;
};

/** Every UK women photo · exact paths · shop grid + lane thumbs */
export const ukDropshipWomenHeroSlides: readonly UkDropshipWomenSlide[] = [
  { id: "holland-park-4", src: ukDropshipWomenPhotos.hollandParkFour, focus: "center 38%" },
  { id: "london-summer-5", src: ukDropshipWomenPhotos.londonSummerFive, focus: "center 40%" },
  { id: "london-park-girls", src: ukDropshipWomenPhotos.londonParkGirls, focus: "center 42%" },
  { id: "park-games-six", src: ukDropshipWomenPhotos.parkGamesSix, focus: "center 40%" },
  { id: "fish-chips", src: ukDropshipWomenPhotos.fishChips, focus: "center 45%" },
  { id: "games-night", src: ukDropshipWomenPhotos.gamesNight, focus: "center 38%" },
  { id: "happy-snow-cards", src: ukDropshipWomenPhotos.happySnowCards, focus: "center 42%" },
  { id: "drone-snow-girls", src: ukDropshipWomenPhotos.droneSnowGirls, focus: "center 35%" },
  { id: "park-trio", src: ukDropshipWomenPhotos.parkTrio, focus: "center 40%" },
  { id: "body-mix", src: ukDropshipWomenPhotos.bodyMix, focus: "center 38%" },
  { id: "everyone-unified", src: ukDropshipWomenPhotos.everyoneUnified, focus: "center 42%" },
  { id: "elite-indoor-1", src: ukDropshipWomenPhotos.eliteIndoor1, focus: "center 40%" },
  { id: "elite-indoor-2", src: ukDropshipWomenPhotos.eliteIndoor2, focus: "center 40%" },
  { id: "elite-indoor-3", src: ukDropshipWomenPhotos.eliteIndoor3, focus: "center 40%" },
  { id: "elite-indoor-4", src: ukDropshipWomenPhotos.eliteIndoor4, focus: "center 40%" },
  { id: "arena-uk", src: ukDropshipWomenPhotos.arenaUk, focus: "center 35%" },
  { id: "arena-uk2", src: ukDropshipWomenPhotos.arenaUk2, focus: "center 35%" }
];
