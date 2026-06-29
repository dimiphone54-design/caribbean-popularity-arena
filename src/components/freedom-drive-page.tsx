"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FreedomDriveSimulatorLazy } from "@/components/freedom-drive/freedom-drive-simulator-lazy";
import { SiteFooter } from "@/components/site-footer";

const PAGE_BG = "#040810";

/** Freedom Drive Simulator · full arena page · UK Freedom Drive Arena */
export function FreedomDrivePage() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;

    html.style.backgroundColor = PAGE_BG;
    body.style.backgroundColor = PAGE_BG;

    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <main
        className="arena-2030 fd-page relative min-h-dvh overflow-hidden"
        style={{ backgroundColor: PAGE_BG }}
      >
        <div className="fd-page-backdrop" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-32 pt-24 sm:px-6 sm:pt-28">
          <nav className="fd-page-nav mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/#home"
              className="a2030-micro rounded-lg border border-[#00f5ff]/25 bg-[#00f5ff]/8 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#00f5ff] transition hover:border-[#00f5ff]/45"
            >
              ← Caribbean Freedom Arena
            </Link>
            <Link
              href="/rooms/uk-flag-cotswolds"
              className="a2030-micro rounded-lg border border-[#b8ff3c]/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b8ff3c] transition hover:border-[#b8ff3c]/45"
            >
              🇬🇧 UK Cotswolds room
            </Link>
          </nav>

          <FreedomDriveSimulatorLazy
            expanded={expanded}
            onToggleExpand={() => setExpanded((open) => !open)}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
