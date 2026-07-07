import { internationalSuiteCountries } from "@/lib/international-suite";

export type ArenaLiveMapCity = {
  id: string;
  city: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
};

const capitalCoordinates: Record<string, { lat: number; lon: number; city?: string }> = {
  CO: { lat: 4.711, lon: -74.0721, city: "Bogotá" },
  UK: { lat: 51.5074, lon: -0.1278, city: "London" },
  LT: { lat: 54.6872, lon: 25.2797, city: "Vilnius" },
  EC: { lat: -0.1807, lon: -78.4678, city: "Quito" },
  TT: { lat: 10.6549, lon: -61.5019, city: "Port of Spain" },
  JM: { lat: 17.997, lon: -76.7936, city: "Kingston" },
  VE: { lat: 10.4806, lon: -66.9036, city: "Caracas" },
  PL: { lat: 52.2297, lon: 21.0122, city: "Warsaw" },
  TN: { lat: 36.8065, lon: 10.1815, city: "Tunis" },
  GY: { lat: 6.8013, lon: -58.1551, city: "Georgetown" },
  CN: { lat: 31.2304, lon: 121.4737, city: "Shanghai" },
  JP: { lat: 35.6762, lon: 139.6503, city: "Tokyo" }
};

export const arenaLiveMapCities: ArenaLiveMapCity[] = internationalSuiteCountries.map((country) => {
  const coords = capitalCoordinates[country.islandCode];
  const capital = coords?.city ?? country.name;
  return {
    id: country.id,
    city: capital,
    country: country.name,
    flag: country.flag,
    lat: coords?.lat ?? 0,
    lon: coords?.lon ?? 0
  };
}).filter((entry) => entry.lat !== 0 || entry.lon !== 0);

export const arenaLiveMapDefaultView = {
  center: [14, -62] as [number, number],
  zoom: 3
};