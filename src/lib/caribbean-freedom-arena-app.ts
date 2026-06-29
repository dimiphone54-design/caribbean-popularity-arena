/** CaribbeanFreedomArena · website + installable app (PWA) */
export const caribbeanFreedomArenaApp = {
  id: "caribbean-freedom-arena",
  name: "CaribbeanFreedomArena",
  shortName: "CFA Arena",
  tagline: "Freedom or nothing.",
  description:
    "CaribbeanFreedomArena — fan-powered creator arena, 12 islands live, voting, lounges, and member access. Same site, install as an app.",
  startUrl: "/#home",
  scope: "/",
  themeColor: "#CE1126",
  backgroundColor: "#030208",
  icon192: "/palm-tree.png",
  icon512: "/palm-tree.png",
  appleTouchIcon: "/palm-tree.png",
  swPath: "/sw.js"
} as const;

export function isCaribbeanFreedomArenaStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function isIosInstallBrowser() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream;
}
