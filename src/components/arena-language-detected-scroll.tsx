"use client";

import { ArenaAiRailMovingLetters } from "@/components/arena-ai-rail-moving-letters";
import { useArenaMemberLanguage } from "@/components/use-arena-member-language";

/** Arena · auto-detect only · browser primary language. */
export function ArenaLanguageDetectedScroll() {
  const { ready, meta, detectKicker } = useArenaMemberLanguage();

  return (
    <aside className="arena-lang-detected-micro-ai arena-lang-detected-micro-ai--mini-rail" aria-label="AI language auto-detect">
      <div className="arena-micro-rail-mini-box arena-lang-detected-micro-ai-shell">
        <div className="arena-ai-rail-info-stack">
          <p className="arena-ai-rail-info-line">
            <ArenaAiRailMovingLetters text="Auto-detect" />
          </p>
          <p className="arena-ai-rail-info-line arena-lang-detected-mini-detect-kicker">
            <ArenaAiRailMovingLetters text={ready ? detectKicker : "Detecting"} />
          </p>
          <p className="arena-ai-rail-info-line arena-lang-detected-mini-detect-value">
            <ArenaAiRailMovingLetters text={ready ? `${meta.flag} ${meta.label}` : "…"} />
          </p>
        </div>
      </div>
    </aside>
  );
}
