"use client";

import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { ArenaLoungeFrostBadge, ArenaLoungeFrostPanel } from "@/components/arena-lounge-frost-panel";
import { SiteFooter } from "@/components/site-footer";

type CategoryLoungePageProps = {
  name: string;
  description: string;
};

export function CategoryLoungePage({ name, description }: CategoryLoungePageProps) {
  return (
    <>
      <main className="arena-2030 relative min-h-screen overflow-hidden">
        <Arena2030Backdrop intensity="deep" />

        <div className="relative z-10 px-4 pt-[11.5rem] sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Arena2030Header title={name.toUpperCase()} description={description} />

            <ArenaLoungeFrostBadge />

            <ArenaLoungeFrostPanel className="a2030-holo-panel mt-8 rounded-[1.75rem] p-6 sm:p-8">
              <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff] sm:text-xs">
                Lounge status // open preview
              </p>
              <p className="mt-4 text-sm leading-7 text-[#c8d8f0]">{description}</p>
              <p className="mt-5 inline-flex rounded-full border border-[#b8ff3c]/35 bg-[#b8ff3c]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#b8ff3c]">
                $0 Cost · Holo Preview · 2030
              </p>
            </ArenaLoungeFrostPanel>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
