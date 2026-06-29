import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommandCenterPage } from "@/components/command-center-page";
import { isCommandCenterEnabled } from "@/lib/command-center-access";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false }
};

export default function Page() {
  if (!isCommandCenterEnabled) {
    redirect("/");
  }

  return <CommandCenterPage />;
}
