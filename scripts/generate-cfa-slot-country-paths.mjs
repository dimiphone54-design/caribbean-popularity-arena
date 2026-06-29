/**
 * Generates real Natural Earth silhouettes for Front 12 slot nations.
 * Run: node scripts/generate-cfa-slot-country-paths.mjs
 */

import { writeFileSync } from "node:fs";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";

const WIDTH = 1024;
const HEIGHT = 947;
const PADDING = 18;

const SLOT_GEO = [
  { islandCode: "CO", isoA2: "CO" },
  { islandCode: "UK", isoA2: "GB" },
  { islandCode: "LT", isoA2: "LT" },
  { islandCode: "EC", isoA2: "EC" },
  { islandCode: "TT", isoA2: "TT" },
  { islandCode: "JM", isoA2: "JM" },
  { islandCode: "VE", isoA2: "VE" },
  { islandCode: "PL", isoA2: "PL" },
  { islandCode: "TN", isoA2: "TN" },
  { islandCode: "GY", isoA2: "GY" },
  { islandCode: "CN", isoA2: "CN" },
  { islandCode: "JP", isoA2: "JP" }
];

const FLAG_STRIPES = {
  CO: { stripeA: "#FCD116", stripeB: "#003893", stripeC: "#CE1126" },
  UK: { stripeA: "#CF142B", stripeB: "#FFFFFF", stripeC: "#00247D" },
  LT: { stripeA: "#FDB913", stripeB: "#006A44", stripeC: "#C1272D" },
  EC: { stripeA: "#FFD100", stripeB: "#0033A0", stripeC: "#EF3340" },
  TT: { stripeA: "#CE1126", stripeB: "#FFFFFF", stripeC: "#000000" },
  JM: { stripeA: "#009B3A", stripeB: "#FED100", stripeC: "#000000" },
  VE: { stripeA: "#FFCC00", stripeB: "#00247D", stripeC: "#CF142B" },
  PL: { stripeA: "#FFFFFF", stripeB: "#DC143C", stripeC: "#FFFFFF" },
  TN: { stripeA: "#E70013", stripeB: "#FFFFFF", stripeC: "#E70013" },
  GY: { stripeA: "#009E49", stripeB: "#FCD116", stripeC: "#CE1126" },
  CN: { stripeA: "#DE2910", stripeB: "#FFDE00", stripeC: "#DE2910" },
  JP: { stripeA: "#FFFFFF", stripeB: "#BC002D", stripeC: "#FFFFFF" }
};

const geoUrl =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson";

const response = await fetch(geoUrl);
if (!response.ok) {
  throw new Error(`Failed to fetch Natural Earth geojson: ${response.status}`);
}

const world = await response.json();

function findFeature(isoA2) {
  const feature =
    world.features.find((item) => item.properties?.ISO_A2 === isoA2) ??
    world.features.find((item) => item.properties?.WB_A2 === isoA2) ??
    world.features.find((item) => item.properties?.ADM0_A3 === isoA2);

  if (!feature) {
    throw new Error(`Missing Natural Earth feature for ${isoA2}`);
  }

  return feature;
}

function featureToPaths(feature) {
  const projection = geoMercator().fitExtent(
    [
      [PADDING, PADDING],
      [WIDTH - PADDING, HEIGHT - PADDING]
    ],
    feature
  );

  const pathGen = geoPath(projection);
  const geometry = feature.geometry;

  if (geometry.type === "Polygon") {
    return [pathGen(feature)];
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.map((polygon) =>
      pathGen({
        type: "Feature",
        properties: feature.properties,
        geometry: { type: "Polygon", coordinates: polygon }
      })
    );
  }

  const path = pathGen(feature);
  return path ? [path] : [];
}

const output = {};

for (const slot of SLOT_GEO) {
  const feature = findFeature(slot.isoA2);
  const projection = geoMercator().fitExtent(
    [
      [PADDING, PADDING],
      [WIDTH - PADDING, HEIGHT - PADDING]
    ],
    feature
  );
  const centroid = projection(geoCentroid(feature));
  const stripes = FLAG_STRIPES[slot.islandCode];

  output[slot.islandCode] = {
    width: WIDTH,
    height: HEIGHT,
    ...stripes,
    silhouettePaths: featureToPaths(feature).filter(Boolean),
    joinAnchor: {
      cx: Number((centroid?.[0] ?? WIDTH / 2).toFixed(2)),
      cy: Number((centroid?.[1] ?? HEIGHT / 2).toFixed(2))
    }
  };
}

writeFileSync(
  new URL("../src/lib/cfa-header-slot-country-paths.generated.json", import.meta.url),
  `${JSON.stringify(output, null, 2)}\n`
);

console.log("Wrote src/lib/cfa-header-slot-country-paths.generated.json");
