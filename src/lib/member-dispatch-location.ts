export type MemberDispatchLocation = {
  country: string;
  area: string;
};

export const MEMBER_DISPATCH_LOCATION_EVENT = "cpa:member-dispatch-location";

const countryKey = "cpa_member_dispatch_country";
const areaKey = "cpa_member_dispatch_area";

export const DEFAULT_MEMBER_DISPATCH_TITLE = "TRINIDAD";

export function detectMemberDispatchLocation(): MemberDispatchLocation {
  return { country: "Trinidad & Tobago", area: "Port of Spain" };
}

export function readMemberDispatchLocation(): MemberDispatchLocation | null {
  if (typeof window === "undefined") return null;

  const country = window.localStorage.getItem(countryKey)?.trim() ?? "";
  const area = window.localStorage.getItem(areaKey)?.trim() ?? "";

  if (!country) return null;
  return { country, area: area || country };
}

export function saveMemberDispatchLocation(location: MemberDispatchLocation) {
  if (typeof window === "undefined") return;

  const country = location.country.trim();
  const area = location.area.trim();
  if (!country) return;

  window.localStorage.setItem(countryKey, country);
  window.localStorage.setItem(areaKey, area || country);
  window.dispatchEvent(new CustomEvent(MEMBER_DISPATCH_LOCATION_EVENT, { detail: { country, area } }));
}

export function syncMemberDispatchLocationOnSignIn() {
  saveMemberDispatchLocation(detectMemberDispatchLocation());
}

export function formatMemberDispatchTitle(
  location: MemberDispatchLocation | null,
  signedIn: boolean
): string {
  if (!signedIn || !location?.country.trim()) {
    return DEFAULT_MEMBER_DISPATCH_TITLE;
  }

  const country = location.country.trim().toUpperCase();
  const area = location.area.trim().toUpperCase();

  if (!area || area === country) {
    return country;
  }

  return `${country} · ${area}`;
}
