import { redirect } from "next/navigation";
import { CommandCenterPage } from "@/components/command-center-page";
import { isCommandCenterEnabled } from "@/lib/command-center-access";

export default function Page() {
  if (!isCommandCenterEnabled) {
    redirect("/");
  }

  return <CommandCenterPage />;
}
