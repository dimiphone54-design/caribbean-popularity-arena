"use client";

import { SiteFooter } from "@/components/site-footer";
import { RoomBackToArena } from "@/components/room-back-to-arena";

type CategoryLoungePageProps = {
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
};

export function CategoryLoungePage({ name, eyebrow, description, accent }: CategoryLoungePageProps) {
  return (
    <>
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <RoomBackToArena />

          <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-[#00c9a7]">{eyebrow}</p>
          <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.06em] text-[#f7efe0] sm:text-6xl">
            {name}
          </h1>

          <section className={`mt-6 rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${accent} p-6 sm:p-8`}>
            <p className="text-sm leading-7 text-[#d8deef]">{description}</p>
            <p className="mt-4 inline-flex rounded-full border border-[#00c9a7]/30 bg-[#00c9a7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00c9a7]">
              $0 Cost · Open Preview
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
