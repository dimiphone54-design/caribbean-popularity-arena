"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type GameKind = "aim" | "tap";

type GameConfig = {
  kind: GameKind;
  emoji: string;
  goal: string;
  action: string;
  targetWord: string;
  opponent: string;
  field: string;
};

const GAME_CONFIG: Record<string, GameConfig> = {
  Rounders: {
    kind: "aim",
    emoji: "🥎",
    goal: "Time your swing — stop the bat as the ball crosses the strike zone.",
    action: "SWING!",
    targetWord: "strike zone",
    opponent: "Bowler",
    field: "Hyde Park diamond"
  },
  Frisbee: {
    kind: "aim",
    emoji: "🥏",
    goal: "Release so the frisbee drifts into the target ring.",
    action: "THROW!",
    targetWord: "target ring",
    opponent: "Catcher",
    field: "Open park lawn"
  },
  "Sack Race": {
    kind: "tap",
    emoji: "🏁",
    goal: "Tap fast to hop your sack down the lane before your rival.",
    action: "HOP!",
    targetWord: "finish line",
    opponent: "Rival hopper",
    field: "Park finish lane"
  },
  Croquet: {
    kind: "aim",
    emoji: "🏑",
    goal: "Stop the power gauge so the ball rolls cleanly through the hoop.",
    action: "STRIKE!",
    targetWord: "hoop",
    opponent: "Green keeper",
    field: "Manor lawn court"
  },
  Badminton: {
    kind: "aim",
    emoji: "🏸",
    goal: "Time the smash as the shuttle hits the sweet spot.",
    action: "SMASH!",
    targetWord: "sweet spot",
    opponent: "Net rival",
    field: "Club court"
  },
  Boules: {
    kind: "aim",
    emoji: "🟢",
    goal: "Roll the boule so it stops nearest the jack.",
    action: "ROLL!",
    targetWord: "jack",
    opponent: "Boules ace",
    field: "Gravel piste"
  },
  "Lawn bowls": {
    kind: "aim",
    emoji: "🟢",
    goal: "Stop the weight gauge so your bowl rests nearest the jack.",
    action: "DRAW!",
    targetWord: "jack",
    opponent: "Green rival",
    field: "UK lawn green"
  },
  Tennis: {
    kind: "aim",
    emoji: "🎾",
    goal: "Time the swing as the ball crosses the sweet spot on the public court.",
    action: "SERVE!",
    targetWord: "sweet spot",
    opponent: "Court rival",
    field: "Hyde Park · public courts"
  },
  "Pub darts": {
    kind: "aim",
    emoji: "🎯",
    goal: "Stop the marker on your checkout zone — 501 or Around the Clock.",
    action: "THROW!",
    targetWord: "checkout zone",
    opponent: "Pub ace",
    field: "UK pub board"
  },
  "Pub quiz": {
    kind: "tap",
    emoji: "🧠",
    goal: "Tap fast — buzz in before the rival team on picture round or general knowledge.",
    action: "BUZZ!",
    targetWord: "buzzer",
    opponent: "Rival team",
    field: "UK pub quiz night"
  },
  "Tug of War": {
    kind: "tap",
    emoji: "🪢",
    goal: "Tap fast to drag the rope marker past the centre line.",
    action: "PULL!",
    targetWord: "centre line",
    opponent: "Team B",
    field: "Park rope pit"
  },
  "Park Relay": {
    kind: "tap",
    emoji: "🏃‍♀️",
    goal: "Tap fast to power her relay leg past the rival runner in Hyde Park.",
    action: "RUN!",
    targetWord: "finish line",
    opponent: "Rival runner",
    field: "Hyde Park · live"
  },
  "Best Makeup Look": {
    kind: "aim",
    emoji: "💄",
    goal: "Time the brush — land the stroke in the glam zone for the best live look.",
    action: "SET LOOK!",
    targetWord: "glam zone",
    opponent: "Glam judge",
    field: "Hyde Park · live 3h"
  },
  "Free Fire": {
    kind: "aim",
    emoji: "🔫",
    goal: "Time your shot — land the crosshair in the headshot zone before the rival squad tags you.",
    action: "FIRE!",
    targetWord: "headshot zone",
    opponent: "Rival squad",
    field: "Bermuda ranked · Bogotá sala"
  },
  "Free Fire EC": {
    kind: "aim",
    emoji: "🔫",
    goal: "Para el tiro — mira la cabeza en la zona headshot antes de que el squad rival te baje.",
    action: "¡DISPARA!",
    targetWord: "zona headshot",
    opponent: "Squad rival",
    field: "Sala ecuatoriana · Guayaquil · ranked BR"
  },
  Ecuavoley: {
    kind: "aim",
    emoji: "🏐",
    goal: "Para el remate — detén el marcador cuando la pelota cruza la zona de red.",
    action: "¡REMATE!",
    targetWord: "zona de red",
    opponent: "Rival de la cancha",
    field: "Cancha de barrio · Ecuador"
  },
  "Kendo Stage Duel": {
    kind: "aim",
    emoji: "⚔️",
    goal: "Time the strike — clash swords as the flame window opens on the JAPAN stage.",
    action: "STRIKE!",
    targetWord: "flame window",
    opponent: "Rival kendoka",
    field: "JAPAN dojo stage · live"
  },
  "Wushu Duilian": {
    kind: "aim",
    emoji: "🥋",
    goal: "Time the clash — land the strike as the duilian window opens on the Shanghai stage.",
    action: "CLASH!",
    targetWord: "duilian window",
    opponent: "Rival martial artist",
    field: "Shanghai stage · 武术对练"
  },
};

const DEFAULT_CONFIG: GameConfig = {
  kind: "aim",
  emoji: "🎯",
  goal: "Stop the marker on the target.",
  action: "GO!",
  targetWord: "target",
  opponent: "Rival",
  field: "UK park"
};

function resolveConfig(gameName: string): GameConfig {
  return GAME_CONFIG[gameName] ?? DEFAULT_CONFIG;
}

function AimGame({ config, onStrike }: { config: GameConfig; onStrike?: () => void }) {
  const [marker, setMarker] = useState(0);
  const [targetCenter, setTargetCenter] = useState(50);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [running, setRunning] = useState(true);
  const [done, setDone] = useState(false);

  const dirRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(true);
  const totalRounds = 3;
  const targetHalfWidth = 9;

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    let last = performance.now();
    const speed = 70 + round * 14;

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (runningRef.current) {
        setMarker((prev) => {
          let next = prev + dirRef.current * speed * dt;
          if (next >= 100) {
            next = 100;
            dirRef.current = -1;
          } else if (next <= 0) {
            next = 0;
            dirRef.current = 1;
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [round]);

  const lock = useCallback(() => {
    if (!runningRef.current || done) return;
    setRunning(false);
    onStrike?.();

    const distance = Math.abs(marker - targetCenter);
    let gained = 0;
    let label = "";
    if (distance <= 3) {
      gained = 100;
      label = `Bullseye on the ${config.targetWord}! +100`;
    } else if (distance <= targetHalfWidth) {
      gained = 60;
      label = `Clean hit · +60`;
    } else if (distance <= targetHalfWidth + 8) {
      gained = 25;
      label = `Edge of the ${config.targetWord} · +25`;
    } else {
      gained = 0;
      label = "Missed it — reset and reload.";
    }

    setScore((prev) => prev + gained);
    setLastResult(label);

    window.setTimeout(() => {
      if (round >= totalRounds) {
        setDone(true);
        return;
      }
      setRound((prev) => prev + 1);
      setTargetCenter(22 + Math.random() * 56);
      setMarker(0);
      dirRef.current = 1;
      setRunning(true);
    }, 950);
  }, [marker, targetCenter, round, done, config.targetWord, onStrike]);

  const restart = () => {
    setScore(0);
    setRound(1);
    setLastResult(null);
    setTargetCenter(22 + Math.random() * 56);
    setMarker(0);
    dirRef.current = 1;
    setDone(false);
    setRunning(true);
  };

  return (
    <div className="cotswolds-sim-body">
      <div className="cotswolds-sim-stat-row">
        <span>
          Round {Math.min(round, totalRounds)}/{totalRounds}
        </span>
        <span>vs {config.opponent}</span>
        <span className="cotswolds-sim-score">{score} pts</span>
      </div>

      <div className="cotswolds-sim-track">
        <span
          className="cotswolds-sim-target"
          style={{ left: `${targetCenter}%`, width: `${targetHalfWidth * 2}%` }}
        />
        <span className="cotswolds-sim-marker" style={{ left: `${marker}%` }}>
          {config.emoji}
        </span>
      </div>

      <p className="cotswolds-sim-feedback">{lastResult ?? config.goal}</p>

      {!done ? (
        <button type="button" className="cotswolds-sim-fire" onClick={lock} disabled={!running}>
          {config.action}
        </button>
      ) : (
        <div className="cotswolds-sim-end">
          <p className="cotswolds-sim-end-score">{score} pts</p>
          <p className="cotswolds-sim-end-grade">
            {score >= 240
              ? "🏆 Park champion — you beat the room!"
              : score >= 140
                ? "👏 Solid round — rematch?"
                : "Keep at it — tap play again."}
          </p>
          <button type="button" className="cotswolds-sim-fire" onClick={restart}>
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}

function TapGame({ config }: { config: GameConfig }) {
  const [you, setYou] = useState(config.kind === "tap" ? 50 : 0);
  const [opponent, setOpponent] = useState(50);
  const [timeLeft, setTimeLeft] = useState(14);
  const [phase, setPhase] = useState<"play" | "won" | "lost">("play");

  const isTug = config.targetWord === "centre line";
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    setYou(isTug ? 50 : 0);
    setOpponent(isTug ? 50 : 0);
  }, [isTug]);

  useEffect(() => {
    if (phase !== "play") return;

    const oppTimer = window.setInterval(() => {
      if (phaseRef.current !== "play") return;
      if (isTug) {
        setYou((prev) => {
          const next = Math.max(0, prev - (1.4 + Math.random() * 1.8));
          if (next <= 4) setPhase("lost");
          return next;
        });
      } else {
        setOpponent((prev) => {
          const next = Math.min(100, prev + (1.6 + Math.random() * 2.2));
          if (next >= 100) setPhase("lost");
          return next;
        });
      }
    }, 180);

    const clock = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(clock);
          if (phaseRef.current === "play") {
            setPhase((p) => (p === "play" ? (isTug ? "won" : "lost") : p));
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(oppTimer);
      window.clearInterval(clock);
    };
  }, [phase, isTug]);

  const tap = () => {
    if (phase !== "play") return;
    setYou((prev) => {
      const next = Math.min(100, prev + (isTug ? 4.5 : 5.5));
      if (next >= 100) setPhase("won");
      return next;
    });
  };

  const restart = () => {
    setYou(isTug ? 50 : 0);
    setOpponent(isTug ? 50 : 0);
    setTimeLeft(14);
    setPhase("play");
  };

  return (
    <div className="cotswolds-sim-body">
      <div className="cotswolds-sim-stat-row">
        <span>You {Math.round(you)}%</span>
        <span className="cotswolds-sim-score">{timeLeft}s</span>
        <span>
          {config.opponent} {Math.round(isTug ? 100 - you : opponent)}%
        </span>
      </div>

      <div className="cotswolds-sim-tug">
        <span className="cotswolds-sim-tug-fill" style={{ width: `${you}%` }} />
        <span className="cotswolds-sim-tug-knot" style={{ left: `${you}%` }}>
          {config.emoji}
        </span>
      </div>

      <p className="cotswolds-sim-feedback">
        {phase === "play"
          ? config.goal
          : phase === "won"
            ? "🏆 You won the round — the room cheers!"
            : `${config.opponent} edged it — run it back.`}
      </p>

      {phase === "play" ? (
        <button type="button" className="cotswolds-sim-fire cotswolds-sim-fire--tap" onClick={tap}>
          {config.action}
        </button>
      ) : (
        <button type="button" className="cotswolds-sim-fire" onClick={restart}>
          PLAY AGAIN
        </button>
      )}
    </div>
  );
}

function EastAsiaLiveStagePreview({
  countryLabel,
  flameBurst
}: {
  countryLabel: string;
  flameBurst: boolean;
}) {
  return (
    <div className="east-asia-live-stage east-asia-live-stage--sim" aria-hidden="true">
      <div className="east-asia-live-stage-lights" />
      <div className="east-asia-live-stage-floor" />
      <div className="east-asia-live-stage-fighter east-asia-live-stage-fighter--left">
        <span className="east-asia-live-stage-fighter-icon">🥋</span>
        <span className="east-asia-live-stage-fighter-sword">⚔️</span>
      </div>
      <div className="east-asia-live-stage-fighter east-asia-live-stage-fighter--right">
        <span className="east-asia-live-stage-fighter-icon">🥋</span>
        <span className="east-asia-live-stage-fighter-sword">⚔️</span>
      </div>
      <div className={`east-asia-live-stage-clash${flameBurst ? " east-asia-live-stage-clash--burst" : ""}`}>
        <span className="east-asia-live-stage-flame" />
        <span className="east-asia-live-stage-spark" />
      </div>
      <p className="east-asia-live-stage-caption">{countryLabel} · live on stage</p>
    </div>
  );
}

export function CotswoldsGameSimulator({
  gameName,
  host,
  roomKicker = "UK park · live game",
  stageCountryLabel,
  onClose
}: {
  gameName: string;
  host: string;
  roomKicker?: string;
  /** When set, renders two-fighter live stage with flame burst on strike */
  stageCountryLabel?: string;
  onClose: () => void;
}) {
  const config = resolveConfig(gameName);
  const [flameBurst, setFlameBurst] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="cotswolds-sim-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${gameName} simulator`}
      onClick={onClose}
    >
      <div className="cotswolds-sim-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="cotswolds-sim-close" onClick={onClose} aria-label="Close game">
          ✕
        </button>
        <p className="cotswolds-sim-kicker">{roomKicker}</p>
        <h3 className="cotswolds-sim-title">
          <span className="cotswolds-sim-title-emoji">{config.emoji}</span>
          {gameName}
        </h3>
        <p className="cotswolds-sim-host">
          {host} · {config.field}
        </p>

        {stageCountryLabel ? (
          <EastAsiaLiveStagePreview countryLabel={stageCountryLabel} flameBurst={flameBurst} />
        ) : null}

        {config.kind === "aim" ? (
          <AimGame
            config={config}
            onStrike={
              stageCountryLabel
                ? () => {
                    setFlameBurst(true);
                    window.setTimeout(() => setFlameBurst(false), 520);
                  }
                : undefined
            }
          />
        ) : (
          <TapGame config={config} />
        )}
      </div>
    </div>,
    document.body
  );
}
