"use client";

import { useState } from "react";
import { EldersTableChess2030Panel } from "@/components/elders-table-chess-2030-panel";
import {
  eldersTableFeaturedPanelLabels,
  eldersTableFeaturedPanelSymbols,
  eldersTableGameDetails,
  eldersTableGameQuestions,
  eldersTableGameResponses,
  eldersTableGames,
  type EldersTableFeaturedPanelId
} from "@/lib/the-elders-table";
import type { EldersTableVersionConfig } from "@/lib/the-elders-table-versions";

type TheEldersTableGamesPanelProps = {
  config: EldersTableVersionConfig;
  className?: string;
};

type PanelItem = {
  id: string;
  label: string;
  symbol: string;
  gameType: string;
  available: string;
  blurb: string;
};

function buildPanelItems(config: EldersTableVersionConfig): PanelItem[] {
  if (config.gamesItems === "all") {
    return eldersTableGames.map((game) => {
      const detail = eldersTableGameDetails[game.id];

      return {
        id: game.id,
        label: game.label,
        symbol: game.symbol,
        gameType: detail.gameType,
        available: detail.available,
        blurb: detail.blurb
      };
    });
  }

  return (config.gamesItems as EldersTableFeaturedPanelId[]).map((id) => {
    const question = eldersTableGameQuestions.find((entry) => entry.id === id);
    if (!question) {
      throw new Error(`Missing featured game question for ${id}`);
    }

    return {
      id,
      label: eldersTableFeaturedPanelLabels[id],
      symbol: eldersTableFeaturedPanelSymbols[id],
      gameType: question.gameType,
      available: question.available,
      blurb: eldersTableGameResponses[question.id]
    };
  });
}

export function TheEldersTableGamesPanel({ config, className = "" }: TheEldersTableGamesPanelProps) {
  const [panelActive, setPanelActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const panelItems = buildPanelItems(config);
  const activeItem = panelItems.find((item) => item.id === hoveredItem);

  const chessActive = hoveredItem === "chess";

  return (
    <div
      className={`elders-table-noir-games-panel${panelActive ? " elders-table-noir-games-panel-hot" : ""}${
        chessActive ? " elders-table-noir-games-panel-chess-hot" : ""
      }${className ? ` ${className}` : ""}`}
      onMouseEnter={() => setPanelActive(true)}
      onMouseLeave={() => {
        setPanelActive(false);
        setHoveredItem(null);
      }}
    >
      <div className={`elders-table-noir-games-row${chessActive ? " elders-table-noir-games-row-chess" : ""}`}>
        <ul className="elders-table-noir-games elders-table-noir-games-scroll flex flex-col gap-2">
          {panelItems.map((item) => {
            const active = hoveredItem === item.id;

            return (
              <li key={item.id} className="elders-table-noir-game-item">
                <div
                className={`elders-table-noir-game-chip inline-flex w-full items-center justify-start gap-2 rounded-full px-3 py-1.5 text-left text-[11px] font-semibold sm:text-xs${active ? " elders-table-noir-game-chip-hot" : ""}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onFocus={() => setHoveredItem(item.id)}
                tabIndex={0}
              >
                <span aria-hidden="true">{item.symbol}</span>
                <span>{item.label}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {chessActive ? (
          <EldersTableChess2030Panel
            variant="inline"
            className="elders-table-noir-game-detail elders-table-noir-game-detail-2030 elders-table-noir-game-detail-chess-anchor"
          />
        ) : null}
      </div>

      {activeItem && activeItem.id !== "chess" ? (
        <div className="elders-table-noir-game-detail" role="region" aria-live="polite">
          <p className="elders-table-noir-options-detail-kicker">{activeItem.gameType}</p>
          <h2 className="elders-table-noir-options-detail-title">{activeItem.label}</h2>
          <p className="elders-table-noir-options-detail-available">
            <span>Available · </span>
            {activeItem.available}
          </p>
          <p className="elders-table-noir-options-detail-text">{activeItem.blurb}</p>
        </div>
      ) : null}
    </div>
  );
}
