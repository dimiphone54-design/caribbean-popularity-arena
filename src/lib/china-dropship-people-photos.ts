/** China dropship · exact people photo uploads · hero + product thumbs */

export const chinaDropshipPeoplePhotos = {
  handshake: "/china-dropship-people-handshake.png",
  teamMeeting: "/china-dropship-people-team-meeting.png",
  tsinghuaBoardroom: "/china-dropship-people-tsinghua-boardroom.png",
  hkTeam: "/china-dropship-people-hk-team.png",
  tableMeeting: "/china-dropship-people-table-meeting.png"
} as const;

export type ChinaDropshipHeroSlide = {
  id: string;
  src: string;
  focus: string;
};

export const chinaDropshipHeroSlides: readonly ChinaDropshipHeroSlide[] = [
  { id: "handshake", src: chinaDropshipPeoplePhotos.handshake, focus: "center 42%" },
  { id: "team-meeting", src: chinaDropshipPeoplePhotos.teamMeeting, focus: "center 38%" },
  { id: "tsinghua-boardroom", src: chinaDropshipPeoplePhotos.tsinghuaBoardroom, focus: "center 40%" },
  { id: "hk-team", src: chinaDropshipPeoplePhotos.hkTeam, focus: "center 35%" },
  { id: "table-meeting", src: chinaDropshipPeoplePhotos.tableMeeting, focus: "center 45%" }
];
