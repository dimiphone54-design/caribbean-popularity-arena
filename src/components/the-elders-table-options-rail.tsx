"use client";

import { useEffect, useState } from "react";
import { EldersTableChess2030Panel } from "@/components/elders-table-chess-2030-panel";
import {
  eldersTableFeaturedPanelLabels,
  eldersTableGameQuestions,
  eldersTableGameResponses,
  type EldersTableFeaturedPanelId,
  type EldersTableGameQuestionId
} from "@/lib/the-elders-table";
import type { EldersTableVersionConfig } from "@/lib/the-elders-table-versions";

type TheEldersTableOptionsRailProps = {
  config: EldersTableVersionConfig;
  clientAnchor?: boolean;
};

export function TheEldersTableOptionsRail({ config, clientAnchor = false }: TheEldersTableOptionsRailProps) {
  const clickMode = !config.optionsHoverOnly;
  const [isOpen, setIsOpen] = useState(false);
  const [railActive, setRailActive] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState<EldersTableGameQuestionId | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<EldersTableGameQuestionId | null>(null);
  const [chessDeployKey, setChessDeployKey] = useState(0);

  const panelQuestions =
    config.optionsItems === "all"
      ? [...eldersTableGameQuestions]
      : eldersTableGameQuestions.filter((question) =>
          (config.optionsItems as EldersTableFeaturedPanelId[]).includes(question.id as EldersTableFeaturedPanelId)
        );

  const expanded = clickMode ? isOpen : railActive;
  const activeQuestionId = clickMode ? selectedQuestion : hoveredQuestion;
  const activeQuestion = panelQuestions.find((question) => question.id === activeQuestionId);

  function labelForQuestion(id: EldersTableGameQuestionId) {
    if (config.optionsItems !== "all" && id in eldersTableFeaturedPanelLabels) {
      return eldersTableFeaturedPanelLabels[id as EldersTableFeaturedPanelId];
    }

    const head = eldersTableGameQuestions.find((question) => question.id === id)?.label.split(" — ")[0]?.trim();
    if (!head) return id;
    return head.length > 14 ? `${head.slice(0, 12)}…` : head;
  }

  function toggleRail() {
    setIsOpen((open) => {
      if (open) {
        setSelectedQuestion(null);
      }
      return !open;
    });
  }

  function toggleQuestion(id: EldersTableGameQuestionId) {
    setSelectedQuestion((current) => {
      const next = current === id ? null : id;
      if (next === "chess") {
        setChessDeployKey((value) => value + 1);
      }
      return next;
    });
  }

  useEffect(() => {
    if (!clientAnchor || !clickMode) return;

    const openTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, 1600);

    const chessTimer = window.setTimeout(() => {
      setSelectedQuestion("chess");
      setChessDeployKey((value) => value + 1);
    }, 2600);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(chessTimer);
    };
  }, [clientAnchor, clickMode]);

  const chessActive = activeQuestionId === "chess";

  return (
    <aside
      className={`elders-table-noir-options-rail ${
        clientAnchor ? "bottom-5 sm:bottom-6" : "bottom-24 sm:bottom-28"
      } right-3 sm:right-5${
        clickMode ? " elders-table-noir-options-rail-click" : ""
      }${expanded ? " elders-table-noir-options-rail-open" : ""}${
        chessActive ? " elders-table-noir-options-rail-chess-open" : ""
      }${!clickMode && railActive ? " elders-table-noir-options-rail-hot" : ""}`}
      aria-label="Game options"
      onMouseEnter={clickMode ? undefined : () => setRailActive(true)}
      onMouseLeave={
        clickMode
          ? undefined
          : () => {
              setRailActive(false);
              setHoveredQuestion(null);
            }
      }
    >
      {activeQuestion && activeQuestion.id !== "chess" ? (
        <div className="elders-table-noir-options-detail elders-table-noir-options-detail-drop" role="region" aria-live="polite">
          <p className="elders-table-noir-options-detail-kicker">{activeQuestion.gameType}</p>
          <h2 className="elders-table-noir-options-detail-title">{labelForQuestion(activeQuestion.id)}</h2>
          <p className="elders-table-noir-options-detail-available">
            <span>Available · </span>
            {activeQuestion.available}
          </p>
          <p className="elders-table-noir-options-detail-text">{eldersTableGameResponses[activeQuestion.id]}</p>
        </div>
      ) : null}

      {clickMode ? (
        <button
          type="button"
          className="elders-table-noir-options-rail-toggle"
          onClick={toggleRail}
          aria-expanded={isOpen}
        >
          <span className="elders-table-noir-options-rail-chevron" aria-hidden="true">
            {isOpen ? "▴" : "◂"}
          </span>
          <span className="elders-table-noir-options-rail-title">Options</span>
          <span className="elders-table-noir-options-rail-count">{panelQuestions.length}</span>
          <span className="elders-table-noir-options-rail-action">{isOpen ? "Close" : "Open"}</span>
        </button>
      ) : (
        <div className="elders-table-noir-options-rail-tab">
          <span className="elders-table-noir-options-rail-chevron" aria-hidden="true">
            ◂
          </span>
          <span className="elders-table-noir-options-rail-title">Options</span>
          <span className="elders-table-noir-options-rail-count">{panelQuestions.length}</span>
        </div>
      )}

      <div className="elders-table-noir-options-row">
        <div className="elders-table-noir-options-scroll">
          <ul className="elders-table-noir-options-list">
            {panelQuestions.map((question, index) => {
              const active = activeQuestionId === question.id;

              return (
                <li key={question.id} className="elders-table-noir-option-item">
                  {clickMode ? (
                  <button
                    type="button"
                    className={`elders-table-noir-option-chip${active ? " elders-table-noir-option-chip-hot" : ""}`}
                    onClick={() => toggleQuestion(question.id)}
                    aria-expanded={active}
                  >
                    <span className="elders-table-noir-option-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="elders-table-noir-option-label">{labelForQuestion(question.id)}</span>
                  </button>
                ) : (
                  <div
                    className={`elders-table-noir-option-chip${active ? " elders-table-noir-option-chip-hot" : ""}`}
                    onMouseEnter={() => setHoveredQuestion(question.id)}
                    onFocus={() => setHoveredQuestion(question.id)}
                    tabIndex={0}
                  >
                    <span className="elders-table-noir-option-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="elders-table-noir-option-label">{labelForQuestion(question.id)}</span>
                  </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {chessActive && expanded ? (
          <EldersTableChess2030Panel
            key={chessDeployKey}
            variant="rail-drop"
            className="elders-table-noir-options-detail elders-table-noir-options-detail-2030 elders-table-noir-options-detail-chess-anchor"
          />
        ) : null}
      </div>
    </aside>
  );
}
