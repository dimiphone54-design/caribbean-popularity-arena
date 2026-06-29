/** Equirectangular world coords · Trinidad & Tobago centered in the clock face. */
export const TRINIDAD_WORLD_CENTER = { lat: 10.651, lng: -61.447 };

/** Clock-face anchor · Trinidad main island (excludes Tobago pull on the flag map). */
export const TRINIDAD_ISLAND_FACE_CENTER = { lat: 10.44, lng: -61.38 };

export type WorldViewport = {
  width: number;
  height: number;
  centerLat: number;
  centerLng: number;
};

export function projectWorldPoint(
  lat: number,
  lng: number,
  view: WorldViewport
): { x: number; y: number } {
  let dLng = lng - view.centerLng;
  while (dLng > 180) dLng -= 360;
  while (dLng < -180) dLng += 360;

  const x = view.width / 2 + (dLng / 180) * (view.width * 0.46);
  const y = view.height / 2 + ((view.centerLat - lat) / 90) * (view.height * 0.44);
  return { x, y };
}

/** Simplified land hints · Americas + Atlantic rim for realtime world context. */
export const worldLandHints: Array<{ id: string; d: string }> = [
  {
    id: "north-america",
    d: "M 28 52 L 48 38 L 72 34 L 98 40 L 118 52 L 128 68 L 120 82 L 98 88 L 72 86 L 48 78 L 32 68 Z"
  },
  {
    id: "south-america",
    d: "M 92 88 L 108 82 L 118 92 L 122 108 L 116 128 L 104 142 L 92 136 L 86 118 L 88 98 Z"
  },
  {
    id: "africa-rim",
    d: "M 168 72 L 188 68 L 198 82 L 196 102 L 184 112 L 172 98 Z"
  },
  {
    id: "europe-rim",
    d: "M 148 48 L 168 44 L 176 54 L 168 62 L 152 60 Z"
  }
];

export function worldGraticuleLines(view: WorldViewport) {
  const latLines = [-30, 0, 10, 20, 30];
  const lngLines = [-120, -90, -60, -30, 0, 30];

  const parallels = latLines.map((lat) => {
    const y = projectWorldPoint(lat, view.centerLng, view).y;
    return { lat, y };
  });

  const meridians = lngLines.map((lng) => {
    const x = projectWorldPoint(view.centerLat, lng, view).x;
    return { lng, x };
  });

  return { parallels, meridians };
}
