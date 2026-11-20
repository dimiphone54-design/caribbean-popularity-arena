
"use client";

import dynamic from "next/dynamic";

const CommandCenterPage = dynamic(
  () => import("@/components/command-center-page").then((m) => m.CommandCenterPage),
  { ssr: false }
);

export function CommandCenterPageClient() {
  return (
    <CommandCenterPage />
  );
}
