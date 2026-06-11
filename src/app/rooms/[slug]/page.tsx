import { redirect } from "next/navigation";
import { IslandHubPage } from "@/components/island-hub-page";

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "island-lounge" || slug === "island-hub") {
    return <IslandHubPage />;
  }

  redirect("/rooms/island-hub");
}
