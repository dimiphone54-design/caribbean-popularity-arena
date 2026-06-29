"use client";

import { ArenaAiVoiceMicroPanel } from "@/components/arena-ai-voice-micro-panel";
import { ArenaLanguageDetectedScroll } from "@/components/arena-language-detected-scroll";
import { CfaBirthdayBlessTimePanel } from "@/components/cfa-birthday-bless-time-panel";

/** Shared AI micro panels · Welcome · Guide → Auto-detect → Voice · wall stack order */
export function ArenaMicroRightRailPanels() {
  return (
    <>
      <CfaBirthdayBlessTimePanel variant="micro-rail" />
      <ArenaLanguageDetectedScroll />
      <ArenaAiVoiceMicroPanel />
    </>
  );
}
