import { ArenaHeader } from "@/components/arena-header";
import { CreatorLeaderboard } from "@/components/creator-leaderboard";
import { FirebaseIntegration } from "@/components/firebase-integration";
import { HeroSection } from "@/components/hero-section";
import { MembershipPlans } from "@/components/membership-plans";
import { SiteFooter } from "@/components/site-footer";
import { VotingArena } from "@/components/voting-arena";

export default function Home() {
  return (
    <>
      <ArenaHeader />
      <main>
        <HeroSection />
        <CreatorLeaderboard />
        <VotingArena />
        <MembershipPlans />
        <FirebaseIntegration />
      </main>
      <SiteFooter />
    </>
  );
}
