/** Nav sports recap · visual style picker (clips come from API-Sports + YouTube) */

export const FIFA_RECAP_STYLE_KEY = "cfa-fifa-recap-style";

export type FifaRecapStyle = "arena-tv" | "cinematic" | "split-pip" | "ticker" | "card-stack";

export const FIFA_RECAP_STYLES: { id: FifaRecapStyle; label: string; blurb: string }[] = [
  { id: "arena-tv", label: "Arena TV", blurb: "CRT bezel · scanlines · REC badge" },
  { id: "cinematic", label: "Cinematic", blurb: "Letterbox film · score lower third" },
  { id: "split-pip", label: "Split PiP", blurb: "Video left · today/tomorrow rail" },
  { id: "ticker", label: "Ticker", blurb: "Clip strip · scrolling recap tape" },
  { id: "card-stack", label: "Card stack", blurb: "Layered cards · top clip plays" }
];

export function isFifaRecapStyle(value: string): value is FifaRecapStyle {
  return FIFA_RECAP_STYLES.some((style) => style.id === value);
}