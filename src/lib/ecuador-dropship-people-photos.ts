/** Ecuador dropship · exact people photo uploads · hero + product thumbs */

export const ecuadorDropshipPeoplePhotos = {
  volunteers: "/ecuador-dropship-people-volunteers.png",
  hatsTeam: "/ecuador-dropship-people-hats-team.png",
  bancoGuayaquil: "/ecuador-dropship-people-banco-guayaquil.png"
} as const;

export type EcuadorDropshipHeroSlide = {
  id: string;
  src: string;
  focus: string;
};

export const ecuadorDropshipHeroSlides: readonly EcuadorDropshipHeroSlide[] = [
  { id: "volunteers", src: ecuadorDropshipPeoplePhotos.volunteers, focus: "center 42%" },
  { id: "hats-team", src: ecuadorDropshipPeoplePhotos.hatsTeam, focus: "center 38%" },
  { id: "banco-guayaquil", src: ecuadorDropshipPeoplePhotos.bancoGuayaquil, focus: "center 40%" }
];
