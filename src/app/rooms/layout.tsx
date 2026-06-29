import { Suspense } from "react";
import { RoomsLayoutClient } from "@/app/rooms/rooms-layout-client";

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#040302]" />}>
      <RoomsLayoutClient>{children}</RoomsLayoutClient>
    </Suspense>
  );
}
