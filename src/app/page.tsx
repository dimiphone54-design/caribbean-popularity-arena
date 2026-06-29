import { CreatorLeaderboard } from "@/components/creator-leaderboard";
import { FirebaseIntegration } from "@/components/firebase-integration";
import { LiveArenaExperience } from "@/components/live-arena-experience";
import { MembershipPlans } from "@/components/membership-plans";
import { SiteFooter } from "@/components/site-footer";
import { SlotAutomationPanel } from "@/components/slot-automation-panel";
import { VotingArena } from "@/components/voting-arena";

export default function Home() {
  return (
    <>
      <main>
        <LiveArenaExperience />
        <div className="luxury-club-sections">
          <div className="a2030-content-column">
            <SlotAutomationPanel />
            <CreatorLeaderboard />
            <VotingArena />
            <MembershipPlans />
            <FirebaseIntegration />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
