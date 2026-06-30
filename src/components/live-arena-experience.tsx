"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/**
 * LiveArenaExperience — rebuilt from scratch.
 *
 * This replaces the old slot/gift mechanic entirely. There is no per-person
 * numbered slot, no "entry" to an individual, and no gift-for-access flow.
 *
 * What this is instead: a country-organized livestream directory. Any
 * verified creator (18+, any gender) can go live to show off local
 * activities, comedy, cooking, music, culture — real content. Viewers tip
 * creators for their content via PayPal. Each creator also has a storefront
 * link for their own products.
 *
 * Swap the mock data below for real Firestore reads once your backend
 * collections are in place. See the comment above `creators` for the
 * expected shape.
 */

type IslandTab = {
  code: string;
  label: string;
  flag: string;
};

const islandTabs: IslandTab[] = [
  { code: "all", label: "All Islands", flag: "🌴" },
  { code: "tt", label: "Trinidad & Tobago", flag: "🇹🇹" },
  { code: "jm", label: "Jamaica", flag: "🇯🇲" },
  { code: "bb", label: "Barbados", flag: "🇧🇧" },
  { code: "gy", label: "Guyana", flag: "🇬🇾" },
  { code: "lc", label: "St. Lucia", flag: "🇱🇨" },
  { code: "gd", label: "Grenada", flag: "🇬🇩" },
  { code: "vc", label: "St. Vincent", flag: "🇻🇨" },
  { code: "ag", label: "Antigua", flag: "🇦🇬" },
  { code: "dm", label: "Dominica", flag: "🇩🇲" },
  { code: "kn", label: "St. Kitts", flag: "🇰🇳" },
  { code: "bz", label: "Belize", flag: "🇧🇿" },
  { code: "sr", label: "Suriname", flag: "🇸🇷" }
];

/**
 * Firestore shape (suggested):
 * creators/{creatorId}
 *   displayName: string
 *   islandCode: string
 *   category: "music" | "comedy" | "food" | "culture" | "sports" | "art" | "lifestyle"
 *   isLive: boolean
 *   viewerCount: number
 *   totalTipsUsd: number
 *   storefrontUrl: string | null
 *   avatarColor: string  // fallback gradient while no photo is set
 */
type Creator = {
  id: string;
  displayName: string;
  islandCode: string;
  category: string;
  categoryIcon: string;
  isLive: boolean;
  viewerCount: number;
  totalTipsUsd: number;
  hasStorefront: boolean;
  avatarGradient: string;
};

const creators: Creator[] = [
  { id: "c1", displayName: "DJ Crucial", islandCode: "tt", category: "Music", categoryIcon: "🎵", isLive: true, viewerCount: 842, totalTipsUsd: 412, hasStorefront: true, avatarGradient: "linear-gradient(160deg,#1a0f3d,#2d1665)" },
  { id: "c2", displayName: "Marcus Cookin'", islandCode: "jm", category: "Food", categoryIcon: "🍽️", isLive: true, viewerCount: 631, totalTipsUsd: 298, hasStorefront: true, avatarGradient: "linear-gradient(160deg,#0a2010,#1a5020)" },
  { id: "c3", displayName: "Soca Sherry", islandCode: "bb", category: "Music", categoryIcon: "🎵", isLive: true, viewerCount: 1204, totalTipsUsd: 587, hasStorefront: false, avatarGradient: "linear-gradient(160deg,#2e0a0a,#6b1515)" },
  { id: "c4", displayName: "Comedy Kwame", islandCode: "gy", category: "Comedy", categoryIcon: "😂", isLive: false, viewerCount: 0, totalTipsUsd: 156, hasStorefront: false, avatarGradient: "linear-gradient(160deg,#0a1e2e,#103050)" },
  { id: "c5", displayName: "Island Stitches", islandCode: "lc", category: "Craft", categoryIcon: "🧵", isLive: true, viewerCount: 318, totalTipsUsd: 204, hasStorefront: true, avatarGradient: "linear-gradient(160deg,#1a0e2e,#3d1a60)" },
  { id: "c6", displayName: "Carnival Chronicles", islandCode: "gd", category: "Culture", categoryIcon: "🎭", isLive: true, viewerCount: 455, totalTipsUsd: 167, hasStorefront: false, avatarGradient: "linear-gradient(160deg,#0e2010,#1e4020)" },
  { id: "c7", displayName: "Reef Runner", islandCode: "vc", category: "Sports", categoryIcon: "🤿", isLive: false, viewerCount: 0, totalTipsUsd: 89, hasStorefront: true, avatarGradient: "linear-gradient(160deg,#1e1a0a,#4a3a10)" },
  { id: "c8", displayName: "Bashment Beats", islandCode: "ag", category: "Music", categoryIcon: "🎵", isLive: true, viewerCount: 276, totalTipsUsd: 132, hasStorefront: false, avatarGradient: "linear-gradient(160deg,#10101e,#252050)" },
  { id: "c9", displayName: "Pepper Sauce Pam", islandCode: "dm", category: "Food", categoryIcon: "🍽️", isLive: true, viewerCount: 198, totalTipsUsd: 94, hasStorefront: true, avatarGradient: "linear-gradient(160deg,#0a1a10,#104020)" },
  { id: "c10", displayName: "Steel and Strings", islandCode: "kn", category: "Music", categoryIcon: "🎵", isLive: false, viewerCount: 0, totalTipsUsd: 71, hasStorefront: false, avatarGradient: "linear-gradient(160deg,#1a100a,#402510)" },
  { id: "c11", displayName: "Garifuna Grooves", islandCode: "bz", category: "Culture", categoryIcon: "🎭", isLive: true, viewerCount: 142, totalTipsUsd: 58, hasStorefront: true, avatarGradient: "linear-gradient(160deg,#0a0e1a,#151a35)" },
  { id: "c12", displayName: "Riverside Sessions", islandCode: "sr", category: "Music", categoryIcon: "🎵", isLive: false, viewerCount: 0, totalTipsUsd: 41, hasStorefront: false, avatarGradient: "linear-gradient(160deg,#10180a,#253510)" }
];

const tipAmounts = [3, 5, 10, 25];

type ToastState = { message: string; tone?: "default" | "warning" };

export function LiveArenaExperience() {
  const [activeIsland, setActiveIsland] = useState("all");
  const [tipTarget, setTipTarget] = useState<Creator | null>(null);
  const [selectedTip, setSelectedTip] = useState<number>(tipAmounts[0]);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleCreators = useMemo(() => {
    if (activeIsland === "all") return creators;
    return creators.filter((creator) => creator.islandCode === activeIsland);
  }, [activeIsland]);

  const liveCount = useMemo(() => creators.filter((creator) => creator.isLive).length, []);

  const openTipModal = (creator: Creator) => {
    setSelectedTip(tipAmounts[0]);
    setTipTarget(creator);
  };

  const confirmTip = () => {
    if (!tipTarget) return;
    setToast({ message: `Tip of $${selectedTip} sent to ${tipTarget.displayName} — thank you!` });
    setTipTarget(null);
  };

  return (
    <section id="home" className="arena-live relative isolate min-h-screen overflow-hidden bg-[#0a0e1f] text-[#f0edf8]">
      <nav className="fixed inset-x-0 top-0 z-50 flex h-[58px] items-center justify-between border-b border-white/[0.07] bg-[#0a0e1f]/95 px-4 backdrop-blur-xl sm:px-7">
        <Link href="#home" className="flex items-center gap-2 text-lg font-bold sm:text-xl">
          <span className="text-[#f5c842]">Caribbean</span>
          <span>Popularity</span>
          <span className="ml-1 rounded bg-[#f5c842] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#0a0e1f]">
            Arena
          </span>
        </Link>
        <div className="flex items-center gap-2.5">
          <Link
            href="#apply"
            className="hidden rounded-lg border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b8c9e1] transition hover:border-[#f5c842]/40 sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="#apply"
            className="rounded-lg bg-[#f5c842] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#0a0e1f] transition hover:opacity-90"
          >
            Become a creator — free
          </Link>
        </div>
      </nav>

      <div className="fixed inset-x-0 top-[58px] z-40 flex overflow-x-auto border-b-2 border-[#e8a800] bg-[#0d1225]">
        <div className="flex min-w-max">
          {islandTabs.map((island) => (
            <button
              key={island.code}
              type="button"
              onClick={() => setActiveIsland(island.code)}
              className={`flex h-[44px] items-center gap-2 border-r border-white/[0.07] px-5 text-xs font-bold uppercase tracking-wide transition ${
                activeIsland === island.code
                  ? "bg-[#f5c842]/10 text-[#f5c842]"
                  : "text-[#7a82a8] hover:bg-white/[0.04] hover:text-[#f0edf8]"
              }`}
            >
              <span className="text-lg">{island.flag}</span>
              {island.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-[104px]">
        <div className="mx-auto max-w-6xl px-5 pt-7">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-['Bebas_Neue',sans-serif] text-[32px] tracking-wide text-[#f5c842] sm:text-[36px]">
                Live now across the Caribbean
              </h1>
              <p className="mt-1 text-sm text-[#7a82a8]">
                {liveCount} creators streaming · tip what you want · shop what they make
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 py-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visibleCreators.map((creator) => (
              <article
                key={creator.id}
                className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#111830] transition hover:-translate-y-1 hover:border-[#f5c842]/30"
              >
                <div className="relative h-[150px]" style={{ background: creator.avatarGradient }}>
                  <span className="absolute left-2 top-2 rounded bg-[#0a0e1f]/70 px-1.5 py-0.5 text-base">
                    {islandTabs.find((i) => i.code === creator.islandCode)?.flag}
                  </span>
                  {creator.isLive ? (
                    <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-[#e83030] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      Live
                    </span>
                  ) : (
                    <span className="absolute right-2 top-2 rounded-full bg-[#161d36] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#7a82a8]">
                      Offline
                    </span>
                  )}
                  {creator.isLive ? (
                    <span className="absolute bottom-2 left-2 rounded bg-[#0a0e1f]/70 px-1.5 py-0.5 text-[10px] font-bold text-[#f0edf8]">
                      {creator.viewerCount.toLocaleString()} watching
                    </span>
                  ) : null}
                </div>
                <div className="p-2.5">
                  <p className="truncate text-sm font-bold">{creator.displayName}</p>
                  <p className="mt-0.5 text-xs text-[#7a82a8]">
                    {creator.categoryIcon} {creator.category} · {islandTabs.find((i) => i.code === creator.islandCode)?.label}
                  </p>
                  <p className="mt-2 text-xs font-bold text-[#f5c842]">
                    ${creator.totalTipsUsd.toLocaleString()} tipped this week
                  </p>
                </div>
                <div className="flex gap-1.5 p-2.5 pt-0">
                  <button
                    type="button"
                    onClick={() => openTipModal(creator)}
                    className="flex-1 rounded-md bg-[#f5c842]/15 py-1.5 text-xs font-bold text-[#f5c842] transition hover:bg-[#f5c842]/25"
                  >
                    💛 Tip
                  </button>
                  {creator.hasStorefront ? (
                    <Link
                      href={`/shop/${creator.id}`}
                      className="flex-1 rounded-md border border-white/10 py-1.5 text-center text-xs font-bold text-[#b8c9e1] transition hover:border-white/25"
                    >
                      Shop
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          {visibleCreators.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#7a82a8]">
              No creators from this island yet — be the first to apply.
            </p>
          ) : null}
        </div>
      </div>

      {tipTarget ? (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-lg"
          onClick={() => setTipTarget(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#0d1225] p-7 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setTipTarget(null)}
              className="absolute right-4 top-3 text-xl text-[#7a82a8] hover:text-[#f0edf8]"
              aria-label="Close tip dialog"
            >
              ×
            </button>
            <div className="mb-1 text-4xl">💛</div>
            <h2 className="font-['Bebas_Neue',sans-serif] text-2xl tracking-wide text-[#f5c842]">
              Send a tip
            </h2>
            <p className="mt-1 text-sm text-[#7a82a8]">
              Support {tipTarget.displayName}&apos;s content directly.
            </p>

            <div className="my-5 grid grid-cols-4 gap-2">
              {tipAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedTip(amount)}
                  className={`rounded-lg border py-2.5 text-sm font-bold transition ${
                    selectedTip === amount
                      ? "border-[#f5c842]/60 bg-[#f5c842]/10 text-[#f5c842]"
                      : "border-white/10 text-[#b8c9e1] hover:border-white/25"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={confirmTip}
              className="w-full rounded-xl bg-[#f5c842] px-4 py-3 text-sm font-extrabold text-[#0a0e1f] transition hover:opacity-90"
            >
              Tip ${selectedTip} with PayPal
            </button>
            <p className="mt-3 text-[11px] leading-relaxed text-[#7a82a8]">
              Tips support creator content and are processed securely through PayPal.
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={`fixed bottom-7 left-1/2 z-[95] -translate-x-1/2 rounded-xl border border-[#f5c842]/30 bg-[#0a0e1f]/95 px-6 py-3 text-sm font-bold text-[#f5c842] shadow-lg backdrop-blur-xl transition-transform duration-300 ${
          toast ? "translate-y-0" : "translate-y-24"
        }`}
      >
        {toast?.message ?? ""}
      </div>
    </section>
  );
}
