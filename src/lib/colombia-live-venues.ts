export type ColombiaLiveVenue = {
  id: string;
  emoji: string;
  previewImage: string;
};

/** Twelve Colombia day plans — Live 2 picks where she goes live during the day. */
export const colombiaLiveVenues: ColombiaLiveVenue[] = [
  { id: "co-day-coffee", emoji: "☕", previewImage: "/colombia-bg-coffee-couple.png" },
  { id: "co-day-ciclovia", emoji: "🚴", previewImage: "/colombia-park-people.png" },
  { id: "co-day-beach", emoji: "🏖️", previewImage: "/colombia-beach-baru.png" },
  { id: "co-day-horse", emoji: "🐴", previewImage: "/colombia-bg-horse-cartagena-friends.png" },
  { id: "co-day-salsa", emoji: "💃", previewImage: "/colombia-bg-football-match.png" },
  { id: "co-day-food", emoji: "🥟", previewImage: "/colombia-food-medellin-bandeja.png" },
  { id: "co-day-cerro", emoji: "⛰️", previewImage: "/colombia-bg-paragliding-crowd.png" },
  { id: "co-day-cartagena", emoji: "🏛️", previewImage: "/colombia-food-cartagena-arepa.png" },
  { id: "co-day-flowers", emoji: "🌸", previewImage: "/colombia-food-bogota-ajiaco.png" },
  { id: "co-day-guatape", emoji: "🎨", previewImage: "/colombia-bg-chess-waterfalls.png" },
  { id: "co-day-rosario", emoji: "🐠", previewImage: "/colombia-beach-happy.png" },
  { id: "co-day-museum", emoji: "🏺", previewImage: "/colombia-nightlife-real.png" }
];

export const defaultColombiaLiveVenueId = colombiaLiveVenues[0]!.id;

export function findColombiaLiveVenue(id: string) {
  return colombiaLiveVenues.find((venue) => venue.id === id) ?? colombiaLiveVenues[0]!;
}
