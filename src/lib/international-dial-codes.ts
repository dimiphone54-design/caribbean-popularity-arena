export type InternationalDialCode = {
  id: string;
  flag: string;
  country: string;
  code: string;
  region: string;
};

/** International dial codes · Caribbean · UK · suite countries */
export const internationalDialCodes: InternationalDialCode[] = [
  { id: "uk", flag: "🇬🇧", country: "United Kingdom", code: "+44", region: "Europe" },
  { id: "tt", flag: "🇹🇹", country: "Trinidad & Tobago", code: "+1-868", region: "Caribbean" },
  { id: "jm", flag: "🇯🇲", country: "Jamaica", code: "+1-876", region: "Caribbean" },
  { id: "bb", flag: "🇧🇧", country: "Barbados", code: "+1-246", region: "Caribbean" },
  { id: "gd", flag: "🇬🇩", country: "Grenada", code: "+1-473", region: "Caribbean" },
  { id: "lc", flag: "🇱🇨", country: "St Lucia", code: "+1-758", region: "Caribbean" },
  { id: "vc", flag: "🇻🇨", country: "St Vincent", code: "+1-784", region: "Caribbean" },
  { id: "ag", flag: "🇦🇬", country: "Antigua & Barbuda", code: "+1-268", region: "Caribbean" },
  { id: "dm", flag: "🇩🇲", country: "Dominica", code: "+1-767", region: "Caribbean" },
  { id: "kn", flag: "🇰🇳", country: "St Kitts & Nevis", code: "+1-869", region: "Caribbean" },
  { id: "bs", flag: "🇧🇸", country: "Bahamas", code: "+1-242", region: "Caribbean" },
  { id: "ht", flag: "🇭🇹", country: "Haiti", code: "+509", region: "Caribbean" },
  { id: "sr", flag: "🇸🇷", country: "Suriname", code: "+597", region: "Caribbean" },
  { id: "mq", flag: "🇲🇶", country: "Martinique", code: "+596", region: "Caribbean" },
  { id: "co", flag: "🇨🇴", country: "Colombia", code: "+57", region: "Americas" },
  { id: "us", flag: "🇺🇸", country: "United States", code: "+1", region: "Americas" },
  { id: "ca", flag: "🇨🇦", country: "Canada", code: "+1", region: "Americas" },
  { id: "cd", flag: "🇨🇩", country: "DR Congo", code: "+243", region: "Africa" },
  { id: "ng", flag: "🇳🇬", country: "Nigeria", code: "+234", region: "Africa" },
  { id: "gh", flag: "🇬🇭", country: "Ghana", code: "+233", region: "Africa" },
  { id: "in", flag: "🇮🇳", country: "India", code: "+91", region: "Asia" },
  { id: "cn", flag: "🇨🇳", country: "China", code: "+86", region: "Asia" },
  { id: "fr", flag: "🇫🇷", country: "France", code: "+33", region: "Europe" },
  { id: "de", flag: "🇩🇪", country: "Germany", code: "+49", region: "Europe" },
  { id: "es", flag: "🇪🇸", country: "Spain", code: "+34", region: "Europe" }
];
