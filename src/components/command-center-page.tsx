"use client";

import { useEffect } from "react";
import { CommandCenterUkRoomArchive } from "@/components/command-center-uk-room-archive";
import { CommandCenterFirebaseInfrastructure } from "@/components/command-center-firebase-infrastructure";
import { ArenaMasterKeyPanel } from "@/components/arena-master-key-panel";
import { ArenaRegistryAdminPanel } from "@/components/arena-registry-admin-panel";
import { SiteFooter } from "@/components/site-footer";
import { RoomBackToArena } from "@/components/room-back-to-arena";

const COMMAND_CENTER_ROOM_BG = "#06080f";

export function CommandCenterPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;

    html.style.backgroundColor = COMMAND_CENTER_ROOM_BG;
    body.style.backgroundColor = COMMAND_CENTER_ROOM_BG;

    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <div className="command-center-room-shell" style={{ backgroundColor: COMMAND_CENTER_ROOM_BG }}>
        <div
          className="command-center-room-bg"
          style={{ backgroundImage: "url(/command-center-room-bg.png)" }}
          aria-hidden="true"
        />
        <div className="command-center-room-scrim" aria-hidden="true" />

        <main className="command-center-room-content min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <RoomBackToArena />

            <p className="mt-6 text-xs font-black uppercase tracking-[0.28em] text-[#00c9a7]">Owner only</p>
            <h1 className="mt-2 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.06em] text-[#f7efe0] sm:text-6xl">
              Command Center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c5cfe8]">
              Private operator panel — not linked on the public fan site unless you enable it locally.
            </p>

            <article className="command-center-room-panel mt-6 rounded-2xl border border-[#00f5ff]/28 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00f5ff]">Isolation · owner only</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#d8deef]">
                <li>
                  <strong className="text-[#f7efe0]">Fan website</strong> — rooms, gifts, dropship, and signup run
                  normally when{" "}
                  <code className="text-[#f7e7aa]">NEXT_PUBLIC_COMMAND_CENTER_ENABLED=false</code> (default).
                </li>
                <li>
                  <strong className="text-[#f7efe0]">Your view</strong> — set the flag{" "}
                  <code className="text-[#f7e7aa]">true</code> in{" "}
                  <code className="text-[#f7e7aa]">.env.local</code> only · nav link + this route appear on your machine.
                </li>
                <li>
                  <strong className="text-[#f7efe0]">Stored data</strong> — registry reads from{" "}
                  <code className="text-[#f7e7aa]">.data/</code> (gitignored · not in deliverable zip). Master Key
                  preview is browser-only and does not write shared arena-engine state.
                </li>
                <li>
                  <strong className="text-[#f7efe0]">Master Key</strong> — unlock / bypass gates only while Command
                  Center is enabled · lock before sharing or deploying the public build.
                </li>
              </ul>
            </article>

            <section className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="command-center-room-panel rounded-2xl border border-[#f5c842]/25 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5c842]">Arena lounges</p>
                <p className="mt-3 text-sm leading-7 text-[#d8deef]">
                  The Elders Table, Pair League, Comedy Fest, Football Lads, International SUITE (UK rooms inside), and
                  Island HUB each run independently. Fans enter from the arena nav — not room to room.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-[#8fa3bf]">
                  <li>The Elders Table</li>
                  <li>Pair League</li>
                  <li>Comedy Fest</li>
                  <li>Football Lads</li>
                  <li>International SUITE · 🇬🇧 UK</li>
                  <li>Island HUB</li>
                </ul>
              </article>

              <article className="command-center-room-panel rounded-2xl border border-[#00c9a7]/25 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00c9a7]">Operator status</p>
                <p className="mt-3 text-sm leading-7 text-[#d8deef]">
                  12 front slots · 12 waiting back slots · 12-hour rotation preview. Production keys and live writes stay
                  off until you connect them.
                </p>
                <p className="mt-4 inline-flex rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f5c842]">
                  Owner view active
                </p>
              </article>
            </section>

            <ArenaMasterKeyPanel />

            <ArenaRegistryAdminPanel />

            <CommandCenterUkRoomArchive />

            <CommandCenterFirebaseInfrastructure />
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
