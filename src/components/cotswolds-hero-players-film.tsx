"use client";

import { cotswoldsLondonParkGirlsFilmFrames } from "@/lib/cotswolds";

const PHOTO = cotswoldsLondonParkGirlsFilmFrames[0];

export function CotswoldsHeroPlayersFilm() {
  return (
    <div className="cotswolds-hero-film" aria-hidden="true">
      <div
        className="cotswolds-hero-film-frame cotswolds-hero-film-frame--motion-0 cotswolds-hero-film-frame--active cotswolds-hero-film-frame--manchester"
        style={{ backgroundImage: `url('${PHOTO}')` }}
      />
      <div className="cotswolds-hero-film-scrim" />
      <div className="cotswolds-hero-film-grain" />
      <div className="cotswolds-hero-film-scan" />
      <div className="cotswolds-hero-film-hud">
        <span className="cotswolds-hero-film-rec">● REC</span>
        <span className="cotswolds-hero-film-tag">MANCHESTER · LIVE</span>
      </div>
    </div>
  );
}
