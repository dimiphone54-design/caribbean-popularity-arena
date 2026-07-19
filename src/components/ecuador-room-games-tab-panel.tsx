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

/** Ecuador room · Dominó + Ecuavoley only (hub panel removed) */
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
    <div
      className="ecuador-room-games-tab-panel ecuador-juegos-panel space-y-1.5"
      aria-label="Juegos de Ecuador · Dominó y Ecuavoley"
      lang="es-EC"
    >
      <section
        className="ecuador-domino-badass overflow-hidden rounded-xl border border-[#fcd116]/55 bg-[radial-gradient(circle_at_top_left,rgba(206,17,38,0.28),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(252,209,22,0.18),transparent_48%),linear-gradient(155deg,rgba(6,4,4,0.98),rgba(12,8,4,0.96))] shadow-[0_0_28px_rgba(206,17,38,0.18),inset_0_1px_0_rgba(252,209,22,0.2)]"
        aria-label="Dominó Ecuatoriano"
      >
        <div className="relative overflow-hidden px-3 py-2 sm:px-3.5 sm:py-2.5">
          <span
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-[#ce1126] via-[#fcd116] to-[#0066a1]"
            aria-hidden="true"
          />
          {/* Compact full-bleed bg */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <img
              src="/ecuador-domino-hands-ready.jpg"
              alt=""
              className="h-full w-full object-cover object-[center_58%] opacity-[0.38]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040a08]/96 via-[#040a08]/82 to-[#040a08]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040a08]/88 via-transparent to-[#040a08]/50" />
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1 rounded-full border border-[#67e8f9]/40 bg-[#0c1a22]/85 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-[#67e8f9]">
                <span className="relative flex h-1 w-1" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#67e8f9] opacity-70" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-[#67e8f9]" />
                </span>
                Juego original · CFA
              </p>
              <h3 className="mt-1 font-['Bebas_Neue',Impact,sans-serif] text-[1.35rem] leading-none tracking-[0.06em] text-[#fef9c3] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-[1.55rem]">
                🇪🇨 DOMINÓ ECUATORIANO
              </h3>
              <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#fcd116]">
                Doble seis · mesa de barrio ·{" "}
                <span className="text-[#ff6b6b]">¡DALE PUES!</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDomino((open) => !open)}
              className="shrink-0 rounded-lg border border-[#fcd116] bg-gradient-to-br from-[#ce1126] via-[#a00e1e] to-[#6b0a14] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#fef9c3] shadow-[0_0_16px_rgba(206,17,38,0.45)] transition hover:brightness-110"
              aria-expanded={showDomino}
            >
              {showDomino ? "Cerrar mesa" : "⚔ Entrar a la mesa"}
            </button>
          </div>

          {/* Short photo strip · one image only */}
          <div className="relative z-10 mt-2 overflow-hidden rounded-lg border border-[#fcd116]/35">
            <div className="relative h-[4.25rem] w-full sm:h-[4.75rem]">
              <img
                src="/ecuador-domino-game-photo.jpg"
                alt="Dominó Ecuatoriano · mesa de barrio"
                className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040a08]/85 via-transparent to-[#040a08]/20" />
              <span className="pointer-events-none absolute bottom-1.5 left-2 right-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#fef9c3] drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                🁣 Mesa de barrio · original CFA
              </span>
            </div>
          </div>
        </div>

        {showDomino ? (
          <div className="border-t border-[#fcd116]/25 px-1.5 pb-2 pt-1.5 sm:px-2">
            <DominoGame theme={ecuadorDominoTheme} />
          </div>
        ) : null}
      </section>

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
