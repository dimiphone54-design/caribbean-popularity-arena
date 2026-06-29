import {
  projectTrinidadMapPoint,
  trinidadTobagoMapProjection
} from "@/lib/trinidad-island-map-projection";

type MapLabel = {
  lat: number;
  lng: number;
  name: string;
  capital?: boolean;
  anchor?: "start" | "middle" | "end";
  dx?: number;
  dy?: number;
};

export const trinidadSurroundingLabels: MapLabel[] = [
  { name: "Caribbean Sea", lat: 11.34, lng: -61.2, anchor: "middle", dy: -18 },
  { name: "Gulf of Paria", lat: 10.48, lng: -61.88, anchor: "start", dx: -8, dy: 0 },
  { name: "Atlantic", lat: 10.72, lng: -60.58, anchor: "end", dx: 8, dy: 0 }
];

export const trinidadCityLabels: MapLabel[] = [
  { name: "Port-of-Spain", lat: 10.674, lng: -61.515, capital: true, anchor: "end", dx: -6, dy: -4 },
  { name: "Arima", lat: 10.633, lng: -61.283, anchor: "start", dx: 6, dy: -2 },
  { name: "Tunapuna", lat: 10.652, lng: -61.389, anchor: "end", dx: -4, dy: 4 },
  { name: "Toco", lat: 10.829, lng: -60.984, anchor: "start", dx: 6, dy: 0 },
  { name: "Sangre Grande", lat: 10.587, lng: -61.131, anchor: "start", dx: 6, dy: 2 },
  { name: "Rio Claro", lat: 10.306, lng: -61.175, anchor: "start", dx: 6, dy: 0 },
  { name: "San Fernando", lat: 10.281, lng: -61.468, anchor: "end", dx: -6, dy: 5 },
  { name: "Point Lisas", lat: 10.364, lng: -61.456, anchor: "end", dx: -6, dy: -3 },
  { name: "Pt Pierre", lat: 10.317, lng: -61.461, anchor: "start", dx: 6, dy: 3 },
  { name: "Guayaguayare", lat: 10.157, lng: -61.089, anchor: "start", dx: 6, dy: 0 },
  { name: "Siparia", lat: 10.145, lng: -61.508, anchor: "end", dx: -6, dy: 0 },
  { name: "Point Fortin", lat: 10.174, lng: -61.683, anchor: "end", dx: -6, dy: 5 }
];

export const tobagoLabels: MapLabel[] = [
  { name: "Tobago", lat: 11.22, lng: -60.72, anchor: "middle", dy: -10 },
  { name: "Scarborough", lat: 11.183, lng: -60.736, capital: true, anchor: "start", dx: 6, dy: 4 }
];

export function projectTrinidadLabel(label: MapLabel) {
  return projectTrinidadMapPoint(label.lat, label.lng, trinidadTobagoMapProjection);
}

export type TrinidadMapLabel = MapLabel;
