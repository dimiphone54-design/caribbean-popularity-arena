import Link from "next/link";
import { FirebaseIntegration } from "@/components/firebase-integration";
import { LiveArenaExperience } from "@/components/live-arena-experience";

import { SiteFooter } from "@/components/site-footer";
import { SlotAutomationPanel } from "@/components/slot-automation-panel";
import { VotingArena } from "@/components/voting-arena";

export default function Home() {
  return (
    <>
      <main>
        <div style={{ textAlign: "center", padding: "10px 16px", background: "#111" }}>
          <Link
            href="/join"
            style={{
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: 999,
              background: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
              color: "#0a0e1f",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            ✦ Join the Arena — Sell · Teach · Create · Shop
          </Link>
        </div>
        <LiveArenaExperience />
        <div className="luxury-club-sections">
          <div className="a2030-content-column">
            <SlotAutomationPanel />
            <VotingArena />
            <FirebaseIntegration />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}