import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommandCenterPageClient } from "@/components/command-center-page-client";
import { isCommandCenterEnabled } from "@/lib/command-center-access";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false }
};

/**
 * Server: flag must be on (your .env.local only — excluded from public zips).
 * Client: CommandCenterPageClient also requires MASTER recognition · everyone else → home.
 */
export default function Page() {
  if (!isCommandCenterEnabled) {
    redirect("/");
  }

  return <CommandCenterPageClient />;
}
