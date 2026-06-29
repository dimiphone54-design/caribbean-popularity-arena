import { unlockCountryRoomAccess } from "@/lib/country-room-access";
import {
  getInternationalSuiteCountryLiveRoomSlug,
  internationalSuiteCountries
} from "@/lib/international-suite";

/** Master key · unlock every country live-gift room gate */
export function unlockAllCountryRoomsForMasterKey() {
  if (typeof window === "undefined") return;

  const slugs = new Set<string>();
  for (const country of internationalSuiteCountries) {
    slugs.add(getInternationalSuiteCountryLiveRoomSlug(country.id));
    for (const room of country.rooms) {
      if (room.status === "open" && !room.href) {
        slugs.add(room.roomSlug);
      }
    }
  }

  slugs.forEach((roomSlug) => unlockCountryRoomAccess(roomSlug));
}
