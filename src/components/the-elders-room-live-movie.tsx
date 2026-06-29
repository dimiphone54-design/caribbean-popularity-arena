"use client";

import { useEffect, useState } from "react";
import {
  eldersRoomMovieMeta,
  eldersRoomMovieScenes,
  eldersRoomPolandCast,
  eldersRoomUkCast
} from "@/lib/elders-room-live-movie";

const SCENE_HOLD_MS = 4200;
const SCENE_FADE_MS = 900;

function MovieFrame({
  sceneIndex,
  motionSeed,
  visible
}: {
  sceneIndex: number;
  motionSeed: number;
  visible: boolean;
}) {
  const scene = eldersRoomMovieScenes[sceneIndex];

  return (
    <div className={`elders-room-live-movie-frame${visible ? " elders-room-live-movie-frame-visible" : ""}`}>
      <div
        className={`elders-room-live-movie-photo elders-room-live-movie-photo-motion-${motionSeed % 3}`}
        style={{ backgroundImage: `url('${scene.image}')` }}
      />
      <div className="elders-room-live-movie-vignette" aria-hidden="true" />
      <p className="elders-room-live-movie-scene-label">{scene.label}</p>
      <p className="elders-room-live-movie-scene-speech">{scene.speech}</p>
    </div>
  );
}

export function TheEldersRoomLiveMovie() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [crossfading, setCrossfading] = useState(false);
  const [resetTrack, setResetTrack] = useState(false);
  const sceneCount = eldersRoomMovieScenes.length;
  const nextIndex = (sceneIndex + 1) % sceneCount;
  const activeScene = eldersRoomMovieScenes[sceneIndex];

  useEffect(() => {
    let fadeTimer: number | undefined;
    let resetTimer: number | undefined;

    const cycleTimer = window.setInterval(() => {
      setCrossfading(true);

      fadeTimer = window.setTimeout(() => {
        setResetTrack(true);
        setSceneIndex((value) => (value + 1) % sceneCount);
        setCrossfading(false);

        resetTimer = window.setTimeout(() => {
          setResetTrack(false);
        }, 40);
      }, SCENE_FADE_MS);
    }, SCENE_HOLD_MS);

    return () => {
      window.clearInterval(cycleTimer);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [sceneCount]);

  return (
    <div className="elders-room-live-movie" aria-label="Real life movie live">
      <div className="elders-room-live-movie-letterbox elders-room-live-movie-letterbox-top" aria-hidden="true" />
      <div className="elders-room-live-movie-letterbox elders-room-live-movie-letterbox-bottom" aria-hidden="true" />

      <div className="elders-room-live-movie-track">
        <div
          className={`elders-room-live-movie-track-inner${
            crossfading ? " elders-room-live-movie-track-inner-fading" : ""
          }${resetTrack ? " elders-room-live-movie-track-inner-reset" : ""}`}
        >
          <MovieFrame sceneIndex={sceneIndex} motionSeed={sceneIndex} visible={!crossfading} />
          <MovieFrame sceneIndex={nextIndex} motionSeed={nextIndex} visible={crossfading} />
        </div>
      </div>

      <div className="elders-room-live-movie-grain" aria-hidden="true" />

      <div className="elders-room-live-movie-hud">
        <span className="elders-room-live-movie-rec">
          <span className="elders-room-live-movie-rec-dot" aria-hidden="true" />
          REC
        </span>
        <span className="elders-room-live-movie-title">{eldersRoomMovieMeta.title}</span>
        <span className="elders-room-live-movie-scene-count">
          {String(sceneIndex + 1).padStart(2, "0")}/{String(sceneCount).padStart(2, "0")}
        </span>
      </div>

      <div className="elders-room-live-movie-roster" aria-label="Live cast">
        <div className="elders-room-live-movie-roster-block">
          <p className="elders-room-live-movie-roster-head">
            🇬🇧 UK · 6 girls
          </p>
          <div className="elders-room-live-movie-roster-row">
            {eldersRoomUkCast.map((member) => (
              <span
                key={member.id}
                className={`elders-room-live-movie-chip${
                  activeScene.castId === member.id ? " elders-room-live-movie-chip-active" : ""
                }`}
                title={`${member.name} · ${member.age} · ${member.city}`}
              >
                {member.name.slice(0, 1)}
              </span>
            ))}
          </div>
        </div>
        <div className="elders-room-live-movie-roster-block">
          <p className="elders-room-live-movie-roster-head">
            🇵🇱 Poland · 4 · 18–29
          </p>
          <div className="elders-room-live-movie-roster-row">
            {eldersRoomPolandCast.map((member) => (
              <span
                key={member.id}
                className={`elders-room-live-movie-chip${
                  activeScene.castId === member.id ? " elders-room-live-movie-chip-active" : ""
                }`}
                title={`${member.name} · ${member.age} · ${member.city}`}
              >
                {member.name.slice(0, 1)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="elders-room-live-movie-caption">
        {activeScene.region === "UK"
          ? eldersRoomMovieMeta.locationUk
          : activeScene.region === "Poland"
            ? eldersRoomMovieMeta.locationPl
            : "UK × Poland · live movie"}
      </p>
    </div>
  );
}
