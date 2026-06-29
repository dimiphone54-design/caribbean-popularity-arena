const accessKey = "cpa_arena_member_access";
const memberIdKey = "cpa_arena_member_id";

export const ARENA_MEMBER_ACCESS_EVENT = "cpa:arena-member-access";

export function readArenaMemberId(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(memberIdKey);
}

export function saveArenaMemberId(id: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(memberIdKey, id);
}

/** Arena · $6 Gift member sign-in unlocks personalized welcome panel. */
export function readArenaMemberAccess(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(accessKey) === "true";
}

export function markArenaMemberAccess() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(accessKey, "true");
  window.dispatchEvent(new CustomEvent(ARENA_MEMBER_ACCESS_EVENT));
}

export function clearArenaMemberAccess() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(accessKey);
  window.dispatchEvent(new CustomEvent(ARENA_MEMBER_ACCESS_EVENT));
}
