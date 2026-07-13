"use client";

import { useEffect, useState } from "react";
import { DominoGame } from "@/components/games/domino/domino-game";
import { ecuadorDominoTheme } from "@/components/games/domino/domino-config";
import { EcuadorThePit } from "@/components/ecuador-the-pit";
import { RoomSportsStack } from "@/components/room-sports-stack";
import type { EcuadorRoomGameSelection } from "@/lib/ecuador-country";

const ECUADOR_ROOM_SLUG = "ecuador-room";

type EcuadorRoomGamesTabPanelProps = {
  requestedGameId?: EcuadorRoomGameSelection | null;
  onRequestedGameHandled?: () => void;
};

/** Ecuador room · Dominó Ecuatoriano + The Pit sports stack */
export function EcuadorRoomGamesTabPanel({
  requestedGameId = null,
  onRequestedGameHandled
}: EcuadorRoomGamesTabPanelProps) {
  const [showDomino, setShowDomino] = useState(false);

  useEffect(() => {
    if (requestedGameId === "Dominó Ecuatoriano") {
      setShowDomino(true);
      onRequestedGameHandled?.();
    }
  }, [requestedGameId, onRequestedGameHandled]);

  return (
    <div className="ecuador-room-games-tab-panel space-y-5">
      <div className="overflow-hidden rounded-xl border border-[#fcd116]/25 bg-[#040a08]/55">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#67e8f9]">
              Juego original · CFA
            </p>
            <p className="mt-0.5 text-sm font-black text-[#fef9c3]">🇪🇨 Dominó Ecuatoriano</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#fcd116]/90">
              Ecuadorian Dominoes
            </p>
            <p className="text-[11px] text-[#c4b89a]">Bloque · vs IA · ¡Dale pues, pilas!</p>
          </div>
          <button
            type="button"
            onClick={() => setShowDomino((open) => !open)}
            className="shrink-0 rounded-lg border border-[#fcd116]/45 bg-gradient-to-r from-[#ce1126]/80 to-[#fcd116]/30 px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-[#fef9c3]"
            aria-expanded={showDomino}
          >
            {showDomino ? "Cerrar mesa" : "Jugar dominó"}
          </button>
        </div>

        {/* Photo of the game · exact under Ecuadorian Dominoes title */}
        <div className="border-t border-[#fcd116]/15 px-3 pb-3 pt-0">
          <div className="relative mt-2 aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#fcd116]/20 bg-[#0a1410]">
            <img
              src="/ecuador-domino-game-photo.jpg"
              alt="Ecuadorian Dominoes · mesa de barrio · double-six game in play"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#040a08]/85 to-transparent px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#fef9c3]">
              Dominó Ecuatoriano · original CFA
            </span>
          </div>
        </div>
      </div>

      {showDomino ? <DominoGame theme={ecuadorDominoTheme} /> : null}

      <EcuadorThePit>
        <RoomSportsStack
          roomSlug={ECUADOR_ROOM_SLUG}
          requestedGameId={
            requestedGameId === "Dominó Ecuatoriano" ? null : requestedGameId
          }
          onRequestedGameHandled={onRequestedGameHandled}
        />
      </EcuadorThePit>
    </div>
  );
}
