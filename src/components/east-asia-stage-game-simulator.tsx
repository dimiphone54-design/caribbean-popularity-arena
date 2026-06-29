"use client";

import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";

type EastAsiaStageGameSimulatorProps = {
  gameName: string;
  host: string;
  roomKicker: string;
  countryLabel: string;
  onClose: () => void;
};

/** Live on-stage duel · two fighters · flame burst on strike */
export function EastAsiaStageGameSimulator(props: EastAsiaStageGameSimulatorProps) {
  return (
    <CotswoldsGameSimulator
      gameName={props.gameName}
      host={props.host}
      roomKicker={props.roomKicker}
      stageCountryLabel={props.countryLabel}
      onClose={props.onClose}
    />
  );
}
