"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getArenaAgentGuideReply,
  getArenaAgentGuideTip,
  type ArenaAgentGuideReply
} from "@/lib/arena-agent-guide";
import { ArenaAiRailMovingLetters } from "@/components/arena-ai-rail-moving-letters";
import { useArenaWelcomeMember, formatArenaWelcomeLine } from "@/components/use-arena-welcome-member";
import { ARENA_PRIMARY_MASTER } from "@/lib/arena-master-identity";
import {
  ARENA_SITE_WELCOME_PANEL_LINE,
  ARENA_SITE_WELCOME_RAIL_LINES
} from "@/lib/member-username-storage";

const guideQuickPrompts = ["12 slots?", "Member Sign In?", "Rooms?", "Help"] as const;
const railGuideQuickPrompts = ["12 slots?", "Member Sign In?"] as const;

type ArenaWelcomeAgentGuideProps = {
  compact?: boolean;
};

type DisplayMode = "welcome" | "guide" | "thinking";

export function ArenaWelcomeAgentGuide({ compact = false }: ArenaWelcomeAgentGuideProps) {
  const { welcomeLine, isMemberWelcome, enterPulse, isMaster } = useArenaWelcomeMember();

  const welcomeLineText = useMemo(() => {
    if (welcomeLine && isMemberWelcome) return welcomeLine;
    if (isMaster) return formatArenaWelcomeLine(ARENA_PRIMARY_MASTER.welcomePanelName);
    return ARENA_SITE_WELCOME_PANEL_LINE;
  }, [welcomeLine, isMemberWelcome, isMaster]);

  const showSiteWelcomeRail = !isMaster && !(welcomeLine && isMemberWelcome);

  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mode, setMode] = useState<DisplayMode>("welcome");
  const [guideReply, setGuideReply] = useState<ArenaAgentGuideReply | null>(null);
  const [draft, setDraft] = useState("");
  const thinkTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);
  const prevWelcomeLine = useRef<string | null | undefined>(undefined);

  const clearThinkTimer = useCallback(() => {
    if (thinkTimer.current !== null) {
      window.clearTimeout(thinkTimer.current);
      thinkTimer.current = null;
    }
  }, []);

  const clearResetTimer = useCallback(() => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (prevWelcomeLine.current === welcomeLine) return;
    prevWelcomeLine.current = welcomeLine;

    setTipIndex(0);
    setMode("welcome");
    setGuideReply(null);
    setVisible(true);
    clearThinkTimer();
    clearResetTimer();
  }, [welcomeLine, clearThinkTimer, clearResetTimer]);

  useEffect(() => {
    if (!welcomeLine || mode !== "welcome") return;

    setVisible(false);
    const flashTimer = window.setTimeout(() => setVisible(true), 120);
    return () => window.clearTimeout(flashTimer);
  }, [enterPulse, welcomeLine, mode]);

  useEffect(() => {
    return () => {
      clearThinkTimer();
      clearResetTimer();
    };
  }, [clearThinkTimer, clearResetTimer]);

  useEffect(() => {
    if (mode !== "welcome" || !isMemberWelcome) return;

    let fadeTimer: number | undefined;

    const cycle = window.setInterval(() => {
      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setTipIndex((index) => index + 1);
        setVisible(true);
      }, 450);
    }, 7000);

    return () => {
      window.clearInterval(cycle);
      if (fadeTimer) window.clearTimeout(fadeTimer);
    };
  }, [isMemberWelcome, mode]);

  const askGuide = useCallback(
    (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || mode === "thinking") return;

      clearThinkTimer();
      clearResetTimer();

      setDraft("");
      setGuideReply(null);
      setMode("thinking");
      setVisible(true);

      thinkTimer.current = window.setTimeout(() => {
        const reply = getArenaAgentGuideReply(trimmed);
        setGuideReply(reply);
        setMode("guide");

        resetTimer.current = window.setTimeout(() => {
          setMode("welcome");
          setGuideReply(null);
          setVisible(true);
        }, compact ? 18000 : 24000);
      }, compact ? 280 : 360);
    },
    [clearResetTimer, clearThinkTimer, compact, mode]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askGuide(draft);
  };

  const memberGuideLine =
    isMemberWelcome && mode === "welcome" && tipIndex > 0 && tipIndex % 2 === 0
      ? getArenaAgentGuideTip(Math.floor(tipIndex / 2))
      : null;

  const cineLine = memberGuideLine ?? welcomeLineText;
  const guideBusy = mode === "thinking";

  return (
    <div className={`arena-welcome-agent-guide ${compact ? "arena-welcome-agent-guide--micro arena-welcome-agent-guide--rail" : ""}`.trim()}>
      {compact ? (
        <div className="arena-ai-rail-info-stack arena-welcome-agent-guide-rail-lines" aria-live="polite">
          <p className="arena-ai-rail-info-line">
            <ArenaAiRailMovingLetters text="AI AGENT" />
          </p>
          {showSiteWelcomeRail ? (
            <>
              {ARENA_SITE_WELCOME_RAIL_LINES.map((line) => (
                <p
                  key={line}
                  className={`arena-ai-rail-info-line arena-ai-rail-info-line--site-welcome arena-ai-rail-text-move--welcome${visible ? " is-lit" : ""}`}
                >
                  <ArenaAiRailMovingLetters text={line} />
                </p>
              ))}
            </>
          ) : (
            <p
              className={`arena-ai-rail-info-line arena-ai-rail-text-move--welcome${visible ? " is-lit" : ""}`}
            >
              <ArenaAiRailMovingLetters text={cineLine} />
            </p>
          )}
          <p className="arena-ai-rail-info-line">
            <ArenaAiRailMovingLetters text="Welcome · Guide" />
          </p>
        </div>
      ) : (
        <div
          className={`cfa-birthday-vconf-cine ${mode === "guide" ? "cfa-birthday-vconf-cine--guide-reply" : ""}`.trim()}
          aria-live="polite"
        >
          <span className="cfa-birthday-vconf-cine-letterbox cfa-birthday-vconf-cine-letterbox-top" aria-hidden="true" />
          <span className="cfa-birthday-vconf-cine-letterbox cfa-birthday-vconf-cine-letterbox-bottom" aria-hidden="true" />

          <div className="cfa-birthday-vconf-cine-viewport">
            <div className="cfa-birthday-vconf-cine-rig">
              <div className="cfa-birthday-vconf-cine-shake">
                <span className="cfa-birthday-vconf-cine-feed" aria-hidden="true" />
                <span className="cfa-birthday-vconf-cine-bokeh" aria-hidden="true" />
                <span className="cfa-birthday-vconf-cine-grain" aria-hidden="true" />
                <span className="cfa-birthday-vconf-cine-vignette" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="cfa-birthday-vconf-cine-hud">
            <span className="cfa-birthday-vconf-cine-pip">
              <span className="cfa-birthday-vconf-cine-pip-orb" aria-hidden="true">
                ✦
              </span>
              <span className="cfa-birthday-vconf-cine-pip-label">
                {isMaster && mode === "welcome"
                  ? "THE MASTER"
                  : mode === "guide"
                    ? "AI GUIDE"
                    : "AI AGENT"}
              </span>
            </span>

            <p
              className={`cfa-birthday-vconf-cine-line ${mode === "welcome" && visible ? "is-visible" : mode !== "welcome" ? "is-visible" : ""}`.trim()}
            >
              {mode === "thinking"
                ? "One moment · replying…"
                : mode === "guide"
                  ? "Reply ready ↓"
                  : showSiteWelcomeRail
                    ? ARENA_SITE_WELCOME_RAIL_LINES.join(" ")
                    : cineLine}
            </p>

            <span className="cfa-birthday-vconf-cine-rec" aria-hidden="true">
              {mode === "guide" ? "GUIDE ◉" : mode === "thinking" ? "SYNC ◉" : "REC ◉"}
            </span>
          </div>
        </div>
      )}

      {mode === "thinking" ? (
        <p
          className={`${compact ? "arena-ai-rail-info-line " : ""}arena-welcome-agent-guide-reply arena-welcome-agent-guide-reply--thinking`.trim()}
          role="status"
        >
          AI Agent guide is reading your question about CaribbeanFreedomArena…
        </p>
      ) : null}

      {mode === "guide" && guideReply ? (
        <div
          className={`${compact ? "arena-ai-rail-info-stack " : ""}arena-welcome-agent-guide-reply`.trim()}
          role="status"
          aria-live="polite"
        >
          <p className={`${compact ? "arena-ai-rail-info-line " : ""}arena-welcome-agent-guide-reply-kicker`.trim()}>
            CaribbeanFreedomArena · AI Guide
          </p>
          <p className={`${compact ? "arena-ai-rail-info-line " : ""}arena-welcome-agent-guide-reply-body`.trim()}>{guideReply.answer}</p>
        </div>
      ) : null}

      <form className="arena-welcome-agent-guide-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={compact ? "arena-guide-ask-micro" : "arena-guide-ask"}>
          Ask the AI Agent guide about this website
        </label>
        <input
          id={compact ? "arena-guide-ask-micro" : "arena-guide-ask"}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={compact ? "Ask about the site…" : "Ask anything about CaribbeanFreedomArena…"}
          className={`arena-welcome-agent-guide-input${compact ? " arena-ai-rail-text-letters-drift" : ""}`}
          autoComplete="off"
          maxLength={180}
          disabled={guideBusy}
        />
        <button
          type="submit"
          className={`arena-welcome-agent-guide-send${compact ? " arena-ai-rail-text-letters-drift" : ""}`}
          disabled={!draft.trim() || guideBusy}
        >
          <ArenaAiRailMovingLetters text="Ask" />
        </button>
      </form>

      <div className="arena-welcome-agent-guide-chips" role="group" aria-label="Quick guide prompts">
        {(compact ? railGuideQuickPrompts : guideQuickPrompts).map((prompt) => (
          <button
            key={prompt}
            type="button"
            className={`arena-welcome-agent-guide-chip${compact ? " arena-ai-rail-text-letters-drift" : ""}`}
            onClick={() => askGuide(prompt.replace("?", ""))}
            disabled={guideBusy}
          >
            {compact ? <ArenaAiRailMovingLetters text={prompt} /> : prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
