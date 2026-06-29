"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useFreedomDriveAttractInput } from "@/components/freedom-drive/use-freedom-drive-attract-input";

const FreedomDriveScene = dynamic(
  () => import("@/components/freedom-drive/freedom-drive-scene").then((mod) => mod.FreedomDriveScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="ecuador-stat-panel-freedom-drive-fallback"
        style={{ backgroundImage: "url(/ecuador-room-gaming-party.png)" }}
        aria-hidden="true"
      />
    )
  }
);

/** Ecuador Drive · live 3D game clip in Ecuador stat panel video frame */
export function FreedomDriveStatPreview() {
  const attractInput = useFreedomDriveAttractInput(true);
  const playerId = useMemo(() => "fd-stat-preview", []);

  return (
    <div className="ecuador-stat-panel-game-video-wrap ecuador-stat-panel-game-video-wrap--drive">
      <span className="ecuador-stat-panel-game-video-live ecuador-stat-panel-game-video-live--drive" aria-hidden="true">
        🏎️ EN VIVO
      </span>
      <div className="ecuador-stat-panel-freedom-drive-canvas" aria-label="Ecuador Drive Simulator · clip en vivo">
        <FreedomDriveScene
          statPreview
          previewMode
          input={attractInput}
          playerId={playerId}
          playerName="Arena Guest"
          onStats={() => {}}
        />
      </div>
    </div>
  );
}
