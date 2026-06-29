"use client";

import Link from "next/link";
import { ArenaWelcomeAgentGuide } from "@/components/arena-welcome-agent-guide";

type CfaBirthdayBlessTimePanelProps = {
  className?: string;
  variant?: "default" | "micro-rail";
};

function BirthdayBlessTimeContent({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className={stacked ? "cfa-birthday-vconf-micro-bless-stack" : "cfa-birthday-vconf-stage-inner"}>
      <p className="cfa-birthday-vconf-text">BIRTHDAY GIRL GETS 5 HOURS EXTRA OF BLESSTIME</p>
      <span
        className="cfa-birthday-vconf-magic"
        aria-label="Magic man blowing gifts onto birthday cake"
        title="Magic man blowing gifts onto birthday cake"
      >
        <span className="cfa-birthday-wizard-cast inline-block origin-bottom">🧙‍♂️</span>
        <span className="cfa-birthday-vconf-magic-gifts" aria-hidden="true">
          <span
            className="cfa-birthday-gift-fly"
            style={{ ["--gift-dist" as string]: "22px", animationDuration: "1.8s", animationDelay: "0s" }}
          >
            🎁
          </span>
          <span
            className="cfa-birthday-gift-fly"
            style={{ ["--gift-dist" as string]: "22px", animationDuration: "1.8s", animationDelay: "0.6s" }}
          >
            🎁
          </span>
          <span
            className="cfa-birthday-gift-fly"
            style={{ ["--gift-dist" as string]: "22px", animationDuration: "1.8s", animationDelay: "1.2s" }}
          >
            ✨
          </span>
        </span>
        <span className="cfa-birthday-cake-receive inline-block origin-bottom">🎂</span>
      </span>
      <Link href="/legal/birthday-promotion" className="cfa-birthday-vconf-terms">
        Promotion Terms
      </Link>
    </div>
  );
}

function BirthdayBlessTimeMicroRailPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`cfa-birthday-vconf-shell cfa-birthday-vconf-slim-4k cfa-birthday-vconf-micro-rail ${className}`.trim()}>
      <div
        className="cfa-birthday-vconf-panel cfa-birthday-vconf-micro-rail-panel arena-micro-rail-mini-box arena-micro-rail-mini-box--guide"
        aria-label="Welcome · AI Agent guide"
      >
        <ArenaWelcomeAgentGuide compact />
      </div>
    </div>
  );
}

export function CfaBirthdayBlessTimePanel({ className = "", variant = "default" }: CfaBirthdayBlessTimePanelProps) {
  if (variant === "micro-rail") {
    return <BirthdayBlessTimeMicroRailPanel className={className} />;
  }

  return (
    <div className={`cfa-birthday-vconf-shell cfa-birthday-vconf-slim-4k cfa-birthday-display-cell ${className}`.trim()}>
      <div
        className="cfa-birthday-vconf-panel cfa-birthday-display-panel"
        aria-label="Birthday BlessTime · welcome · AI Agent guide"
      >
        <div className="cfa-birthday-vconf-slim-bezel">
          <ArenaWelcomeAgentGuide />

          <div className="cfa-birthday-vconf-slim-footer">
            <div className="cfa-birthday-vconf-stage">
              <div className="cfa-birthday-vconf-stage-inner">
                <BirthdayBlessTimeContent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
