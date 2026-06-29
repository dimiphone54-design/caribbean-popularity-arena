"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { FreedomDriveHud } from "@/components/freedom-drive/freedom-drive-hud";
import { FreedomDriveLeaderboardPanel } from "@/components/freedom-drive/freedom-drive-leaderboard-panel";
import { FreedomDriveMobileControls } from "@/components/freedom-drive/freedom-drive-mobile-controls";
import {
  defaultInput,
  defaultStats,
  FreedomDriveProvider
} from "@/components/freedom-drive/freedom-drive-context";
import { FreedomDriveScene } from "@/components/freedom-drive/freedom-drive-scene";
import { useFreedomDriveAttractInput } from "@/components/freedom-drive/use-freedom-drive-attract-input";
import { useFreedomDriveKeyboard } from "@/components/freedom-drive/use-freedom-drive-keyboard";
import { getFreedomDriveTheme, type FreedomDriveLocale } from "@/lib/freedom-drive/constants";
import { readArenaWelcomeDisplayName } from "@/lib/member-username-storage";
import type { FreedomDriveInput, FreedomDriveSessionStats } from "@/lib/freedom-drive/types";
import "@/components/freedom-drive/freedom-drive.css";

const PLAYER_ID_KEY = "cfa_freedom_drive_player_id";

function readPlayerId() {
  if (typeof window === "undefined") return "guest-driver";
  const existing = window.localStorage.getItem(PLAYER_ID_KEY);
  if (existing) return existing;
  const id = `fd-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(PLAYER_ID_KEY, id);
  return id;
}

type FreedomDriveSimulatorProps = {
  expanded?: boolean;
  onToggleExpand?: () => void;
  embedInRoom?: boolean;
  locale?: FreedomDriveLocale;
};

export function FreedomDriveSimulator({
  expanded = false,
  onToggleExpand,
  embedInRoom = false,
  locale = "uk"
}: FreedomDriveSimulatorProps) {
  const theme = useMemo(() => getFreedomDriveTheme(locale), [locale]);
  const [input, setInput] = useState<FreedomDriveInput>(defaultInput);
  const [stats, setStats] = useState<FreedomDriveSessionStats>(defaultStats);
  const [active, setActive] = useState(false);
  const [driveSession, setDriveSession] = useState(0);
  const statsRef = useRef(defaultStats);
  const attractInput = useFreedomDriveAttractInput(!active);
  const sceneInput = active ? input : attractInput;
  const playerName = useMemo(() => readArenaWelcomeDisplayName() || "Arena Guest", []);
  const playerId = useMemo(() => readPlayerId(), []);
  const canvasId = useId();

  useFreedomDriveKeyboard(setInput, active);

  const onStats = useCallback((next: FreedomDriveSessionStats) => {
    if (!active) return;
    statsRef.current = next;
    setStats(next);
  }, [active]);

  const startDrive = useCallback(() => {
    setDriveSession((n) => n + 1);
    setInput(defaultInput);
    setStats(defaultStats);
    statsRef.current = defaultStats;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const reset = () => setInput(defaultInput);
    window.addEventListener("blur", reset);
    return () => window.removeEventListener("blur", reset);
  }, [active]);

  return (
    <section
      id={theme.id}
      className={`fd-shell${expanded ? " fd-shell--expanded" : ""}${embedInRoom ? " fd-shell--embed" : ""}${
        locale === "ecuador" ? " fd-shell--ecuador" : ""
      }`}
      aria-label={theme.title}
    >
      <div className="fd-shell-head">
        <div>
          <p className="fd-shell-kicker">
            {theme.flag} {theme.subtitle}
          </p>
          <h2 className="fd-shell-title">{theme.title}</h2>
          <p className="fd-shell-copy">{theme.description}</p>
        </div>
        <div className="fd-shell-actions">
          {!active ? (
            <button type="button" className="fd-shell-btn fd-shell-btn-primary" onClick={startDrive}>
              {theme.startDrive}
            </button>
          ) : (
            <button type="button" className="fd-shell-btn" onClick={() => setActive(false)}>
              {theme.pause}
            </button>
          )}
          {embedInRoom && locale === "uk" ? (
            <a href="/freedom-drive" className="fd-shell-btn fd-shell-btn-link">
              {theme.fullPageLabel}
            </a>
          ) : null}
          {onToggleExpand ? (
            <button type="button" className="fd-shell-btn" onClick={onToggleExpand}>
              {expanded ? (locale === "ecuador" ? "Salir pantalla" : "Exit Fullscreen") : locale === "ecuador" ? "Pantalla completa" : "Fullscreen"}
            </button>
          ) : null}
        </div>
      </div>

      <FreedomDriveProvider
        playerName={playerName}
        theme={theme}
        input={input}
        setInput={setInput}
        stats={stats}
        setStats={setStats}
      >
        <div className="fd-stage">
          <div
            className={`fd-canvas-wrap${!active ? " fd-canvas-wrap--preview" : ""}`}
            id={canvasId.replace(/:/g, "")}
          >
            <FreedomDriveScene
              key={driveSession}
              input={sceneInput}
              playerId={playerId}
              playerName={playerName}
              onStats={onStats}
              previewMode={!active}
            />
            {!active ? (
              <div className="fd-canvas-attract" aria-hidden={false}>
                <div className="fd-canvas-attract-vignette" aria-hidden="true" />
                <div className="fd-canvas-attract-top">
                  <span className="fd-canvas-attract-live">
                    <span className="fd-canvas-attract-live-dot" aria-hidden="true" />
                    {theme.livePreview}
                  </span>
                </div>
                <div className="fd-canvas-attract-foot">
                  <button type="button" className="fd-shell-btn fd-shell-btn-primary fd-canvas-attract-launch" onClick={startDrive}>
                    {theme.launchSimulator}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          {active ? <FreedomDriveHud /> : null}
          {active ? <FreedomDriveMobileControls /> : null}
          {!expanded ? <FreedomDriveLeaderboardPanel /> : null}
        </div>
        {expanded ? (
          <div className="fd-expanded-leaderboard">
            <FreedomDriveLeaderboardPanel />
          </div>
        ) : null}
      </FreedomDriveProvider>

      <p className="fd-controls-hint">
        <span className="hidden md:inline">{theme.controlsHintDesktop}</span>
        {theme.controlsHint}
      </p>
    </section>
  );
}
