"use client";

import { Arena2030Backdrop } from "@/components/arena-2030-backdrop";
import { CfaBirthdayBlessTimePanel } from "@/components/cfa-birthday-bless-time-panel";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { SiteFooter } from "@/components/site-footer";

export function InformationAiPage() {
  return (
    <>
      <main className="arena-2030 relative min-h-screen overflow-hidden text-[#f7efe0]">
        <Arena2030Backdrop intensity="deep" />

        <div className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
            <RoomBackToArena />

            <div className="flex flex-1 flex-col items-center justify-center py-8">
              <CfaBirthdayBlessTimePanel className="cfa-birthday-vconf-shell--screen" />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
