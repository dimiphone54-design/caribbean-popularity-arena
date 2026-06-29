/** CaribbeanFreedomArena · Trinidad & Tobago map projection for header slot maps */

export type TrinidadMapProjection = {
  width: number;
  height: number;
  padLeft: number;
  padRight: number;
  padTop: number;
  padBottom: number;
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export const trinidadTobagoMapProjection: TrinidadMapProjection = {
  width: 1024,
  height: 947,
  padLeft: 36,
  padRight: 36,
  padTop: 32,
  padBottom: 32,
  minLat: 10.02,
  maxLat: 11.36,
  minLng: -61.93,
  maxLng: -60.54
};

export function projectTrinidadMapPoint(
  lat: number,
  lng: number,
  map = trinidadTobagoMapProjection
): { x: number; y: number } {
  const innerW = map.width - map.padLeft - map.padRight;
  const innerH = map.height - map.padTop - map.padBottom;
  const x = map.padLeft + ((lng - map.minLng) / (map.maxLng - map.minLng)) * innerW;
  const y = map.padTop + ((map.maxLat - lat) / (map.maxLat - map.minLat)) * innerH;
  return { x, y };
}
