export type FootballLad = {
  id: number;
  name: string;
  age: number;
  flag: string;
  city: string;
  position: string;
  kit: string;
};

export const footballLadsRoomDescription =
  "Proper football lads lounge — Sunday league banter, five-a-side energy, pub-debate tactics, and UK match-day vibes wired for the arena.";

export const footballLadsRegions = "London · Manchester · Liverpool · Leeds · Birmingham · Glasgow";

export const footballLads: FootballLad[] = [
  { id: 1, name: "Jack Morrison", age: 26, flag: "🇬🇧", city: "London", position: "Striker", kit: "White · blue trim" },
  { id: 2, name: "Callum Hughes", age: 24, flag: "🇬🇧", city: "Manchester", position: "Midfield", kit: "Red · black" },
  { id: 3, name: "Dean Walsh", age: 25, flag: "🇬🇧", city: "Liverpool", position: "Winger", kit: "Red · gold" },
  { id: 4, name: "Ryan O'Connor", age: 23, flag: "🇬🇧", city: "Leeds", position: "Centre-back", kit: "White · yellow" },
  { id: 5, name: "Marcus Reid", age: 27, flag: "🇬🇧", city: "Birmingham", position: "Goalkeeper", kit: "Green · black" },
  { id: 6, name: "Tommy Fraser", age: 22, flag: "🇬🇧", city: "Glasgow", position: "Full-back", kit: "Blue · white" },
  { id: 7, name: "Kyle Bennett", age: 24, flag: "🇬🇧", city: "Newcastle", position: "Box-to-box", kit: "Black · white" },
  { id: 8, name: "Elliot Shaw", age: 25, flag: "🇬🇧", city: "Sheffield", position: "Playmaker", kit: "Red · white" }
];

export const footballLadsMenPrompts = [
  { id: "five-a-side", label: "Five-a-side tonight or full pitch Sunday league?" },
  { id: "pub-or-home", label: "Pub after the match or home for the replay?" },
  { id: "penalty", label: "Who takes the pen — you or the captain?" },
  { id: "formation", label: "4-4-2 classic or three at the back?" },
  { id: "banter", label: "Safe banter line or full wind-up mode?" },
  { id: "derby", label: "Derby day — nerves or pure buzz?" },
  { id: "boots", label: "Blades or mouldies on this surface?" },
  { id: "halftime", label: "Halftime pie or chips on the terrace?" }
] as const;

export type FootballLadsMenPromptId = (typeof footballLadsMenPrompts)[number]["id"];

export const footballLadsPromptResponses: Record<FootballLadsMenPromptId, string> = {
  "five-a-side":
    "Five-a-side sharpens the touch — tight space, quick feet, no hiding. Full pitch Sunday league is where the lungs get tested and the stories get written.",
  "pub-or-home":
    "Pub wins when the lads are buzzing and the table debate runs hot. Home wins when you need the replay, the stats, and a proper post-match autopsy.",
  "penalty":
    "Captain calls it on the day — but if you've been banging them in at training, step up. No dithering at the spot.",
  formation:
    "4-4-2 if you want shape and width. Three at the back if you're packing quality in midfield and trust the wing-backs to fly.",
  banter:
    "Safe banter keeps the group tight. Full wind-up mode only when everyone in the room can give it back — football lads code.",
  derby:
    "Derby day is pure buzz — form goes out the window, noise goes through the roof, and every tackle feels personal.",
  boots:
    "Mouldies on soft grass, blades when it's slick and you need grip. Wrong boots and you're sliding into group chat clips.",
  halftime:
    "Pie if you're proper match-day. Chips if you're on the terrace with cold hands and louder chants — both are elite halftime fuel."
};
