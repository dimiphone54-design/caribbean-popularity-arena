import { redirect } from "next/navigation";
import { CategoryLoungePage } from "@/components/category-lounge-page";
import { ComedyFestPage } from "@/components/comedy-fest-page";
import { IslandHubPage } from "@/components/island-hub-page";

const categoryLounges = {
  "retro-sugar": {
    name: "Retro Sugar",
    eyebrow: "Category lounge · Room #2",
    description:
      "Old-school sweet Caribbean flavor — vintage vibes, classic riddims, and golden-era arena memories.",
    accent: "from-pink-500/20 via-fuchsia-500/10 to-purple-700/20"
  },
  "the-pair-room": {
    name: "Pair League",
    eyebrow: "Category lounge · Room #3",
    description:
      "Pick your match. His country and flag show right beside hers on every choice box.",
    accent: "from-[#00c9a7]/20 via-[#111830] to-[#f5c842]/10"
  }
} as const;

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "island-lounge" || slug === "island-hub") {
    return <IslandHubPage />;
  }

  if (slug === "comedy-fest") {
    return <ComedyFestPage />;
  }

  const lounge = categoryLounges[slug as keyof typeof categoryLounges];
  if (lounge) {
    return <CategoryLoungePage {...lounge} />;
  }

  redirect("/#home");
}
