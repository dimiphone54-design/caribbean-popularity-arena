"use client";

import { useEffect, useState } from "react";
import { AiVoiceGreetingToggle } from "@/components/ai-voice-greeting-toggle";
import { ArenaAiRailMovingLetters } from "@/components/arena-ai-rail-moving-letters";
import { isAiVoiceSupported } from "@/lib/ai-voice-greeting";

/** ✦ AI · Voice · ON/OFF · shared mini rail + footer shell */
export function ArenaAiVoiceMicroPanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAiVoiceSupported()) return null;

  return (
    <aside
      className="arena-lang-detected-micro-ai arena-lang-detected-micro-ai--mini-rail site-footer-ai-micro-box arena-ai-voice-micro-panel"
      aria-label="AI voice toggle"
    >
      <div className="arena-micro-rail-mini-box arena-lang-detected-micro-ai-shell">
        <div className="arena-ai-rail-info-stack">
          <p className="arena-ai-rail-info-line">
            <ArenaAiRailMovingLetters text="Voice" />
          </p>
          <p className="arena-ai-rail-info-line">
            <ArenaAiRailMovingLetters text="AI Voice" />
          </p>
          <AiVoiceGreetingToggle
            variant="footer-micro"
            className="arena-ai-rail-info-line arena-ai-rail-info-line--action arena-ai-rail-text-letters-drift"
          />
        </div>
      </div>
    </aside>
  );
}
