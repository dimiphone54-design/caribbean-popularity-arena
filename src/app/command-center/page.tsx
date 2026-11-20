import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CommandCenterPageClient } from "@/components/command-center-page-client";
import { CommandCenterUnlockClient } from "@/components/command-center-unlock-client";
import { isCommandCenterEnabled } from "@/lib/command-center-access";
import { ARENA_OWNER_COOKIE, hasArenaOwnerSessionCookie } from "@/lib/auth/arena-owner-session";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!isCommandCenterEnabled) redirect("/");

  const cookieStore = await cookies();
  const ownerCookie = cookieStore.get(ARENA_OWNER_COOKIE)?.value ?? "";
  const authenticated = hasArenaOwnerSessionCookie(
    ownerCookie ? `${ARENA_OWNER_COOKIE}=${ownerCookie}` : ""
  );

  return authenticated
    ? <CommandCenterPageClient />
    : <CommandCenterUnlockClient />;
}
