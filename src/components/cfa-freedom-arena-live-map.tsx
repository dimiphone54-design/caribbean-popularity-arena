"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import {
  arenaLiveMapCities,
  arenaLiveMapDefaultView
} from "@/lib/arena-live-map-cities";

export function CfaFreedomArenaLiveMap() {
  return (
    <MapContainer
      className="cfa-freedom-arena-live-map"
      center={arenaLiveMapDefaultView.center}
      zoom={arenaLiveMapDefaultView.zoom}
      minZoom={2}
      maxZoom={12}
      scrollWheelZoom
      worldCopyJump
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {arenaLiveMapCities.map((place) => (
        <CircleMarker
          key={place.id}
          center={[place.lat, place.lon]}
          radius={7}
          pathOptions={{
            color: "#4ade80",
            weight: 2,
            fillColor: "#16a34a",
            fillOpacity: 0.92
          }}
        >
          <Popup>
            <strong>
              {place.flag} {place.city}
            </strong>
            <br />
            {place.country}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}