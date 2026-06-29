export type ArenaLoungeRoom = {
  id: string;
  label: string;
  href: string;
  hint: string;
  /** Ice-frost tab · preview lane · not live yet */
  frostFrozen?: boolean;
};

const loungeSlugById: Record<string, string> = {
  "pair-league": "the-pair-room",
};

export function getArenaLoungeRoomSlug(room: ArenaLoungeRoom) {
  return loungeSlugById[room.id] ?? room.id;
}

export function getArenaLoungeRoomBySlug(slug: string): ArenaLoungeRoom | undefined {
  return arenaLoungeRooms.find((room) => getArenaLoungeRoomSlug(room) === slug);
}

export function isArenaLoungeRoomFrostedBySlug(slug: string) {
  return getArenaLoungeRoomBySlug(slug)?.frostFrozen === true;
}

export const arenaLoungeRooms: ArenaLoungeRoom[] = [
  {
    id: "the-elders-table",
    label: "The Elders Table",
    href: "/rooms/the-elders-table",
    hint: "Jamaica ×3 · Caribbean Freedom Arena"
  },
  {
    id: "comedy-fest",
    label: "Comedy Fest",
    href: "/rooms/comedy-fest",
    hint: "Laugh belly full · 10 games · live",
    frostFrozen: true
  },
  {
    id: "pair-league",
    label: "Pair League",
    href: "/rooms/the-pair-room",
    hint: "His flag beside hers · pick your match",
    frostFrozen: true
  },
  {
    id: "fashion-month",
    label: "Fashion Month",
    href: "/rooms/fashion-month",
    hint: "Runway glam · street couture · live looks",
    frostFrozen: true
  },
  {
    id: "island-hub",
    label: "Island Hub",
    href: "/rooms/island-hub",
    hint: "Central holo-lounge · island flags",
    frostFrozen: true
  }
];
