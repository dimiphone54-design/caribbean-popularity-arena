"use client";

import { FootballPredictionArena } from "@/components/football-prediction/football-prediction-arena";

type FootballPredictionModalProps = {
  countryId: string;
  countryName: string;
  flag: string;
  initialTab?: "matches" | "active" | "leaderboard" | "stats" | "tournaments";
  onClose: () => void;
};

export function FootballPredictionModal({
  countryId,
  countryName,
  flag,
  initialTab = "matches",
  onClose
}: FootballPredictionModalProps) {
  return (
    <div
      className="target-shooter-overlay football-prediction-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Football Prediction Arena · ${countryName}`}
      onClick={onClose}
    >
      <div
        className="target-shooter-modal football-prediction-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <FootballPredictionArena
          countryId={countryId}
          countryName={countryName}
          flag={flag}
          initialTab={initialTab}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
