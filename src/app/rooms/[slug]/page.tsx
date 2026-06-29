import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CategoryLoungePage } from "@/components/category-lounge-page";
import { ColombiaRoomPage } from "@/components/colombia-room-page";
import { ComedyFestPage } from "@/components/comedy-fest-page";
import { CotswoldsPage } from "@/components/cotswolds-page";
import { EcuadorRoomPage } from "@/components/ecuador-room-page";
import { TheEldersTablePage } from "@/components/the-elders-table-page";
import { FashionMonthPage } from "@/components/fashion-month-page";
import { FootballLadsPage } from "@/components/football-lads-page";
import { ChinaRoomPage } from "@/components/china-room-page";
import { JapanRoomPage } from "@/components/japan-room-page";
import { InternationalSuitePage } from "@/components/international-suite-page";
import { IslandHubPage } from "@/components/island-hub-page";

const categoryLounges = {
  "the-pair-room": {
    name: "Pair League",
    description:
      "Pick your match. His country and flag show right beside hers on every choice box — pair league protocol, next-decade style."
  }
} as const;

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "island-lounge" || slug === "island-hub") {
    return <IslandHubPage />;
  }

  if (slug === "the-elders-table") {
    return (
      <Suspense fallback={<main className="min-h-screen bg-[#040302]" />}>
        <TheEldersTablePage />
      </Suspense>
    );
  }

  if (slug === "colombia-room") {
    return <ColombiaRoomPage />;
  }

  if (slug === "ecuador-room") {
    return <EcuadorRoomPage />;
  }

  if (slug === "comedy-fest") {
    return <ComedyFestPage />;
  }

  if (slug === "football-lads") {
    return <FootballLadsPage />;
  }

  if (slug === "fashion-month") {
    return <FashionMonthPage />;
  }

  if (slug === "uk-flag-cotswolds") {
    return <CotswoldsPage />;
  }

  if (slug === "freedom-drive") {
    redirect("/freedom-drive");
  }

  if (slug === "japan-room") {
    return <JapanRoomPage />;
  }

  if (slug === "china-room") {
    return <ChinaRoomPage />;
  }

  if (slug === "international-suite") {
    return <InternationalSuitePage />;
  }

  const lounge = categoryLounges[slug as keyof typeof categoryLounges];
  if (lounge) {
    return <CategoryLoungePage {...lounge} />;
  }

  redirect("/#home");
}
