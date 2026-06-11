import { CreatorLeaderboard } from "@/components/creator-leaderboard";
import { FirebaseIntegration } from "@/components/firebase-integration";
import { LiveArenaExperience } from "@/components/live-arena-experience";
import { MembershipPlans } from "@/components/membership-plans";
import { SiteFooter } from "@/components/site-footer";
import { VotingArena } from "@/components/voting-arena";

export default function Home() {
  return (
    <>
      <main>
        <LiveArenaExperience />
        <CreatorLeaderboard />
        <VotingArena />
        <MembershipPlans />
        <FirebaseIntegration />
      </main>
      <SiteFooter />
    </>
  );
}
