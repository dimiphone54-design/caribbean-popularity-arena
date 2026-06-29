/** Caribbean nations · geo positions on equirectangular globe (Arena header) */
export type CaribbeanGlobeNation = {
  id: string;
  label: string;
  flag: string;
  lat: number;
  lng: number;
  /** Trinidad uses exact flag-map silhouette instead of emoji */
  exactIslandMap?: boolean;
};

export const CFA_CARIBBEAN_GLOBE_NATIONS: CaribbeanGlobeNation[] = [
  { id: "tt", label: "Trinidad & Tobago", flag: "🇹🇹", lat: 10.5, lng: -61.3, exactIslandMap: true },
  { id: "jm", label: "Jamaica", flag: "🇯🇲", lat: 18.1, lng: -77.3 },
  { id: "bb", label: "Barbados", flag: "🇧🇧", lat: 13.2, lng: -59.5 },
  { id: "gy", label: "Guyana", flag: "🇬🇾", lat: 5.0, lng: -59.0 },
  { id: "lc", label: "St. Lucia", flag: "🇱🇨", lat: 13.9, lng: -61.0 },
  { id: "gd", label: "Grenada", flag: "🇬🇩", lat: 12.1, lng: -61.7 },
  { id: "vc", label: "St. Vincent", flag: "🇻🇨", lat: 13.3, lng: -61.2 },
  { id: "ag", label: "Antigua", flag: "🇦🇬", lat: 17.1, lng: -61.8 },
  { id: "dm", label: "Dominica", flag: "🇩🇲", lat: 15.4, lng: -61.4 },
  { id: "kn", label: "St. Kitts", flag: "🇰🇳", lat: 17.3, lng: -62.7 },
  { id: "bz", label: "Belize", flag: "🇧🇿", lat: 17.2, lng: -88.8 },
  { id: "sr", label: "Suriname", flag: "🇸🇷", lat: 4.0, lng: -56.0 },
  { id: "bs", label: "Bahamas", flag: "🇧🇸", lat: 25.0, lng: -77.4 },
  { id: "cu", label: "Cuba", flag: "🇨🇺", lat: 22.0, lng: -79.5 },
  { id: "do", label: "Dominican Republic", flag: "🇩🇴", lat: 19.0, lng: -70.7 },
  { id: "ht", label: "Haiti", flag: "🇭🇹", lat: 19.1, lng: -72.3 },
  { id: "pr", label: "Puerto Rico", flag: "🇵🇷", lat: 18.2, lng: -66.6 },
  { id: "aw", label: "Aruba", flag: "🇦🇼", lat: 12.5, lng: -69.9 },
  { id: "cw", label: "Curacao", flag: "🇨🇼", lat: 12.2, lng: -68.9 },
  { id: "bm", label: "Bermuda", flag: "🇧🇲", lat: 32.3, lng: -64.8 },
  { id: "ky", label: "Cayman Islands", flag: "🇰🇾", lat: 19.3, lng: -81.4 },
  { id: "tc", label: "Turks & Caicos", flag: "🇹🇨", lat: 21.8, lng: -71.8 },
  { id: "vg", label: "British Virgin Islands", flag: "🇻🇬", lat: 18.4, lng: -64.6 },
  { id: "vi", label: "U.S. Virgin Islands", flag: "🇻🇮", lat: 18.3, lng: -64.9 },
  { id: "ai", label: "Anguilla", flag: "🇦🇮", lat: 18.2, lng: -63.1 },
  { id: "ms", label: "Montserrat", flag: "🇲🇸", lat: 16.8, lng: -62.2 },
  { id: "gp", label: "Guadeloupe", flag: "🇬🇵", lat: 16.3, lng: -61.6 },
  { id: "mq", label: "Martinique", flag: "🇲🇶", lat: 14.6, lng: -61.0 },
  { id: "mf", label: "Saint Martin", flag: "🇲🇫", lat: 18.1, lng: -63.1 },
  { id: "sx", label: "Sint Maarten", flag: "🇸🇽", lat: 18.0, lng: -63.1 },
  { id: "bl", label: "Saint Barthelemy", flag: "🇧🇱", lat: 17.9, lng: -62.8 },
  { id: "bq", label: "Bonaire", flag: "🇧🇶", lat: 12.2, lng: -68.3 },
  { id: "saba", label: "Saba", flag: "🇧🇶", lat: 17.6, lng: -63.2 },
  { id: "eustatius", label: "Sint Eustatius", flag: "🇧🇶", lat: 17.5, lng: -62.9 }
];

/** Equirectangular position on the 200%-wide rotating map layer */
export function caribbeanGlobeLngLatPercent(lng: number, lat: number): { left: number; top: number } {
  return {
    left: ((lng + 180) / 360) * 100,
    top: ((90 - lat) / 180) * 100
  };
}
