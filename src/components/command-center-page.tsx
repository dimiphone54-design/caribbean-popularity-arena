"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { RoomBackToArena } from "@/components/room-back-to-arena";
import { MatrixPanelAccordion, type MatrixPanelRoom } from "@/components/matrix-panel-accordion";
import { CommandCenterEcuadorStudyHub } from "@/components/command-center-ecuador-study-hub";
import { CommandCenterDropshipLanes } from "@/components/command-center-dropship-lanes";
import { CommandCenterGiftOps } from "@/components/command-center-gift-ops";
import { CommandCenterPaypalMerchant } from "@/components/command-center-paypal-merchant";
import { CommandCenterPlatformVault } from "@/components/command-center-platform-vault";
import { CommandCenterUkDropship } from "@/components/command-center-uk-dropship";
import { CommandCenterFreezeComingSoon } from "@/components/command-center-freeze-coming-soon";
import { CommandCenterLanguageDetect } from "@/components/command-center-language-detect";
import { ArenaLoungeScrollPanel } from "@/components/arena-lounge-scroll-panel";
import { FREEZE_COMING_SOON_TITLE } from "@/lib/freeze-coming-soon";
import {
  ARENA_MASTER_KEY_EVENT,
  isArenaMasterKeyActive,
  setArenaMasterKeyActive
} from "@/lib/arena-master-key";
import { dispatchArenaWelcomeEnter } from "@/lib/member-username-storage";
import { getDropshipFxRates, refreshDropshipFxRates } from "@/lib/dropship-fx";
import { DIRECT_DROPSHIP_TEMPLATE } from "@/lib/dropship-lane-template";
import { getLiveCountryRateConfig } from "@/lib/live-slot-market-rates";
import { firebaseCollections } from "@/lib/firebase/schema";

const COMMAND_CENTER_ROOM_BG = "#06080f";

/** Built country rooms · used inside each Matrix cell */
const CC_ROOM = {
  colombia: { flag: "🇨🇴", name: "Colombia Room", href: "/rooms/colombia-room", note: "Live · ES-CO" },
  ecuador: { flag: "🇪🇨", name: "Ecuador Room", href: "/rooms/ecuador-room", note: "Live · ES-EC" },
  spain: { flag: "🇪🇸", name: "Spain Room", href: "/rooms/spain-room", note: "Live · ES" },
  uk: { flag: "🇬🇧", name: "UK Cotswolds", href: "/rooms/uk-flag-cotswolds", note: "Study · football" },
  japan: { flag: "🇯🇵", name: "Japan Room", href: "/rooms/japan-room", note: "Gacha · sports" },
  china: { flag: "🇨🇳", name: "China Room", href: "/rooms/china-room", note: "Wushu · dropship" },
  trinidad: { flag: "🇹🇹", name: "Trinidad Room", href: "/rooms/trinidad-room", note: "Caribbean" },
  ai: { flag: "🤖", name: "AI Powerhouse", href: "/rooms/ai-powerhouse-room", note: "Global AI" },
  home: { flag: "🏠", name: "Arena Home", href: "/#home", note: "Front 12 slots" }
} as const satisfies Record<string, MatrixPanelRoom>;

const CC_ACTIVE_ROOMS: MatrixPanelRoom[] = [
  CC_ROOM.colombia,
  CC_ROOM.ecuador,
  CC_ROOM.spain,
  CC_ROOM.uk,
  CC_ROOM.japan,
  CC_ROOM.china,
  CC_ROOM.trinidad,
  CC_ROOM.ai
];

function MasterKeyUnlockFooter() {
  const [active, setActive] = useState(false);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(() => setActive(isArenaMasterKeyActive()), []);

  useEffect(() => {
    sync();
    window.addEventListener(ARENA_MASTER_KEY_EVENT, sync);
    return () => window.removeEventListener(ARENA_MASTER_KEY_EVENT, sync);
  }, [sync]);

  async function unlock() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/arena-master-key/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key })
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Key rejected");
        return;
      }
      setArenaMasterKeyActive(true);
      window.sessionStorage.setItem("cfa_arena_master_key_value", key.trim());
      setActive(true);
      setKey("");
      dispatchArenaWelcomeEnter();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function lock() {
    window.sessionStorage.removeItem("cfa_arena_master_key_value");
    setArenaMasterKeyActive(false);
    setActive(false);
  }

  if (active) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300">
          Active
        </span>
        <button
          type="button"
          onClick={lock}
          className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#eef6ff]"
        >
          Lock
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Owner key"
          className="min-w-0 flex-1 rounded-lg border border-[#b8ff3c]/25 bg-[#0b1020] px-2.5 py-1.5 text-[11px] text-[#f7efe0] outline-none placeholder:text-[#5f6b88]"
          autoComplete="off"
        />
        <button
          type="button"
          disabled={loading || key.trim().length < 4}
          onClick={() => void unlock()}
          className="rounded-lg border border-[#b8ff3c]/40 bg-[#b8ff3c]/10 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#b8ff3c] disabled:opacity-50"
        >
          {loading ? "…" : "Unlock"}
        </button>
      </div>
      {error ? <p className="text-[10px] font-semibold text-[#fda4af]">{error}</p> : null}
    </div>
  );
}

function DropshipFxFooter() {
  const [status, setStatus] = useState("SYNC");
  const [cny, setCny] = useState<string>("—");
  const [gbp, setGbp] = useState<string>("—");

  useEffect(() => {
    let active = true;
    void (async () => {
      const result = await refreshDropshipFxRates();
      if (!active) return;
      if (result.source === "live") setStatus("LIVE");
      else if (result.source === "cache") setStatus("CACHE");
      else setStatus("LOCAL");
      const rates = result.rates ?? getDropshipFxRates();
      setCny(rates?.CNY != null ? rates.CNY.toFixed(2) : "—");
      setGbp(rates?.GBP != null ? rates.GBP.toFixed(4) : "—");
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <p className="text-[10px] font-semibold text-[#8fa3bf]">
      Now: <span className="text-[#f5c842]">{status} FX</span> · USD→CNY {cny} · USD→GBP {gbp}
    </p>
  );
}

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

  const [ukRates, setUkRates] = useState<ReturnType<typeof getLiveCountryRateConfig> | null>(null);
  const [collections, setCollections] = useState("");

  useEffect(() => {
    setUkRates(getLiveCountryRateConfig("uk"));
    setCollections(Object.keys(firebaseCollections).slice(0, 4).join(" · "));
  }, []);

  return (
    <>
      <div className="command-center-room-shell" style={{ backgroundColor: "transparent" }}>
        <div
          className="command-center-room-bg"
          style={{ backgroundImage: "url(/command-center-room-bg.png)" }}
          aria-hidden="true"
        />
        <div className="command-center-room-scrim" aria-hidden="true" />

        <main className="command-center-room-content min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <RoomBackToArena />

            <div className="mt-4 pl-2">
              <h1 className="font-['Bebas_Neue',sans-serif] text-3xl tracking-[0.06em] text-[#f7efe0] sm:text-4xl">
                Command Center
              </h1>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00c9a7]">Owner only</p>
            </div>

            <div className="mt-4">
              <MatrixPanelAccordion
                panels={[
                  {
                    char: "00",
                    emoji: "❄️",
                    title: FREEZE_COMING_SOON_TITLE,
                    tone: "text-[#f5c842]",
                    border: "border-[#c9a84c]/50",
                    variant: "gold",
                    numberOnly: true,
                    items: [
                      { label: "What", body: "All public real-money + dropship freezes in one place — every country detailed below." },
                      { label: "Public", body: "Payments · gifts · vote unlocks · boosts · dropship panels/purchases · membership pay OFF." },
                      { label: "Still on", body: "Browse · live rooms · chat · free UI · visual vote (no charge)." },
                      { label: "Private", body: "PayPal keys stay in .env.local · owner tools only in Command Center." }
                    ],
                    rooms: CC_ACTIVE_ROOMS
                  },
                  {
                    char: "01",
                    emoji: "🌍",
                    title: "AI Language Detect",
                    tone: "text-[#00c9a7]",
                    border: "border-[#00c9a7]/40",
                    numberOnly: true,
                    items: [
                      { label: "System", body: "Auto-detects browser language on every visitor · saved on device." },
                      { label: "Sign-in", body: "Language pill shows in Member Sign In panel · flag + label + status." },
                      { label: "Rooms", body: "Language picker available in country rooms · manual override option." },
                      { label: "Data", body: "No server storage · browser-only · respects privacy." }
                    ],
                    rooms: [
                      CC_ROOM.colombia,
                      CC_ROOM.ecuador,
                      CC_ROOM.spain,
                      CC_ROOM.uk,
                      CC_ROOM.japan,
                      CC_ROOM.china,
                      CC_ROOM.home
                    ],
                    footer: <CommandCenterLanguageDetect />
                  },
                  {
                    char: "02",
                    emoji: "🔒",
                    title: "Isolation",
                    tone: "text-[#00f5ff]",
                    border: "border-[#00f5ff]/40",
                    numberOnly: true,
                    items: [
                      { label: "Fan site", body: "rooms, gifts, dropship, signup run normal when freeze flags are off." },
                      { label: "Your view", body: "flag true in .env.local only." },
                      { label: "Data", body: "registry reads .data/ (gitignored)." },
                      { label: "Master Key", body: "bypass gates while enabled." }
                    ],
                    rooms: CC_ACTIVE_ROOMS
                  },
                  {
                    char: "03",
                    emoji: "📚",
                    title: "UK Study Hub",
                    tone: "text-[#fbbf24]",
                    border: "border-[#fbbf24]/40",
                    numberOnly: true,
                    items: [
                      { label: "Campus", body: "London Study Hub lane on Cotswolds room." },
                      { label: "Tracks", body: "GCSE · A-Level · university prep." },
                      { label: "Teachers", body: "creator tutor live slots · free apply." },
                      { label: "Remote", body: "desk + English conversation circle." }
                    ],
                    rooms: [CC_ROOM.uk, CC_ROOM.japan, CC_ROOM.china, CC_ROOM.colombia, CC_ROOM.ecuador]
                  },
                  {
                    char: "04",
                    emoji: "⚽",
                    title: "UK Football Predictions",
                    tone: "text-[#b8ff3c]",
                    border: "border-[#b8ff3c]/40",
                    numberOnly: true,
                    items: [
                      { label: "Public panel", body: "UK Football Prediction Arena · PL · FA Cup · UCL · climb board." },
                      { label: "Earn lanes", body: "correct picks · weekly USD prizes · battles · creator gifts." },
                      { label: "Fee (internal)", body: "15% platform service fee on paid battles & prize pools — hide from fan copy." },
                      { label: "Route", body: "/rooms/uk-flag-cotswolds · football hub stack." }
                    ],
                    rooms: [CC_ROOM.uk, CC_ROOM.colombia, CC_ROOM.ecuador, CC_ROOM.spain, CC_ROOM.japan],
                    footer: (
                      <Link href="/rooms/uk-flag-cotswolds" className="text-[10px] font-black uppercase tracking-[0.12em] text-[#b8ff3c] hover:underline">
                        Open UK football room →
                      </Link>
                    )
                  },
                  {
                    char: "05",
                    emoji: "🏦",
                    title: "Platform Vault",
                    tone: "text-[#f5c842]",
                    border: "border-[#f5c842]/40",
                    numberOnly: true,
                    items: [
                      { label: "Public freeze", body: "Real-money is OFF on the public site. Vault stays owner-visible here only." },
                      { label: "London 🇬🇧", body: "Dropship + makeup gifts/votes/boosts → vault ledger when re-enabled." },
                      { label: "Japan 🇯🇵 · China 🇨🇳 · Ecuador 🇪🇨", body: "Dropship buys → same vault · pending collection (when unfrozen)." },
                      { label: "Re-open later", body: "NEXT_PUBLIC_REAL_MONEY_ENABLED=true · PLATFORM_CHECKOUT_MODE=paypal (keys already stored)." }
                    ],
                    rooms: [CC_ROOM.uk, CC_ROOM.japan, CC_ROOM.china, CC_ROOM.ecuador, CC_ROOM.colombia, CC_ROOM.spain],
                    footer: <CommandCenterPlatformVault />
                  },
                  {
                    char: "06",
                    emoji: "💳",
                    title: "PayPal Private",
                    tone: "text-[#0070ba]",
                    border: "border-[#0070ba]/40",
                    numberOnly: true,
                    items: [
                      { label: "Not lost", body: "Client ID + Secret stay in private .env.local. Public rooms cannot charge while frozen." },
                      { label: "Merchant", body: "Caribbean Freedom Arena PayPal — every country room settles here when live." },
                      { label: "London 🇬🇧", body: "Dropship tech/auto · makeup gifts · vote · boosts (frozen publicly)." },
                      { label: "Japan 🇯🇵 · China 🇨🇳 · Ecuador 🇪🇨", body: "Dropship · gifts · memberships → same merchant when unfrozen." },
                      { label: "Payouts", body: "Customer → platform merchant. Creators/suppliers paid later (70/30 gifts, etc.)." }
                    ],
                    rooms: CC_ACTIVE_ROOMS,
                    footer: <CommandCenterPaypalMerchant />
                  },
                  {
                    char: "07",
                    emoji: "🇬🇧",
                    title: "UK Dropship",
                    tone: "text-[#d7b46a]",
                    border: "border-[#d7b46a]/40",
                    numberOnly: true,
                    items: [
                      { label: "Public room", body: "5 featured SKUs · tech $29 · auto $35 · travel $42 · smart $38 · fan $27 · no fee %." },
                      { label: "Fee (internal)", body: "15% service fee · ~85% supplier payout." },
                      { label: "Flow", body: "Customer pays Arena → platform cut → pay UK supplier." },
                      { label: "Notes", body: "no inventory · fast UK suppliers · optional monthly vendor listing." }
                    ],
                    rooms: [CC_ROOM.uk, CC_ROOM.japan, CC_ROOM.china, CC_ROOM.ecuador, CC_ROOM.colombia, CC_ROOM.spain],
                    footer: <CommandCenterUkDropship />
                  },
                  {
                    char: "08",
                    emoji: "🎰",
                    title: "Japan Gacha Monetization",
                    tone: "text-[#ff4466]",
                    border: "border-[#ff4466]/40",
                    numberOnly: true,
                    items: [
                      {
                        label: "Public room",
                        body: "Blind Box · Capsule Toys · pull costs · earn lanes — no fee %."
                      },
                      {
                        label: "Platform fee",
                        body: "20–25% on coin purchases and every gacha pull."
                      },
                      {
                        label: "Creator share",
                        body: "75–80% of revenue from their blind boxes."
                      },
                      {
                        label: "Extra lanes",
                        body: "Coin packages · premium machines (higher rare odds) · live gifts."
                      },
                      {
                        label: "Hide rule",
                        body: "exact fee / payout splits stay here only."
                      }
                    ],
                    rooms: [CC_ROOM.japan, CC_ROOM.china, CC_ROOM.uk, CC_ROOM.home],
                    footer: (
                      <Link
                        href="/rooms/japan-room"
                        className="text-[10px] font-black uppercase tracking-[0.12em] text-[#ff4466] hover:underline"
                      >
                        Open Japan Gacha room →
                      </Link>
                    )
                  },
                  {
                    char: "09",
                    emoji: "⚡",
                    title: "Operator Status",
                    tone: "text-[#00c9a7]",
                    border: "border-[#00c9a7]/40",
                    numberOnly: true,
                    items: [
                      { label: "Slots", body: "12 front · 12 back · 12hr rotation." },
                      { label: "Production keys", body: "off until Firebase / payments connected." },
                      { label: "Owner view", body: "active when Command Center flag is true." },
                      { label: "Route", body: "/command-center · not linked on public nav." }
                    ],
                    rooms: [CC_ROOM.home, ...CC_ACTIVE_ROOMS]
                  },
                  {
                    char: "10",
                    emoji: "🏟️",
                    title: "Japan Sports Arena",
                    tone: "text-[#fbbf24]",
                    border: "border-[#fbbf24]/40",
                    numberOnly: true,
                    items: [
                      {
                        label: "Public panel",
                        body: "Japan Sports Arena · trends · predictions · community — no fee %."
                      },
                      {
                        label: "Prediction games",
                        body: "15–20% platform fee on paid match prediction entries."
                      },
                      {
                        label: "Sports merch",
                        body: "15% platform fee on jerseys, equipment, gadgets."
                      },
                      {
                        label: "Other lanes",
                        body: "Watch parties · coaching · creator battles · live gifts."
                      },
                      {
                        label: "Hide rule",
                        body: "exact fee splits stay here only."
                      }
                    ],
                    rooms: [CC_ROOM.japan, CC_ROOM.uk, CC_ROOM.colombia, CC_ROOM.ecuador, CC_ROOM.spain],
                    footer: (
                      <Link
                        href="/rooms/japan-room"
                        className="text-[10px] font-black uppercase tracking-[0.12em] text-[#fbbf24] hover:underline"
                      >
                        Open Japan Sports room →
                      </Link>
                    )
                  },
                  {
                    char: "11",
                    emoji: "💱",
                    title: "Dropship FX",
                    tone: "text-[#f5c842]",
                    border: "border-[#f5c842]/40",
                    numberOnly: true,
                    items: [
                      { label: "LIVE FX", body: "fresh rates from open.er-api.com." },
                      { label: "CACHE FX", body: "browser session rates · up to ~6 hours." },
                      { label: "LOCAL FX", body: "fallback when API is down." },
                      { label: "Purpose", body: "display-only currency for dropship lanes." }
                    ],
                    rooms: [
                      CC_ROOM.japan,
                      CC_ROOM.china,
                      CC_ROOM.uk,
                      CC_ROOM.ecuador,
                      CC_ROOM.colombia,
                      CC_ROOM.spain
                    ],
                    footer: <DropshipFxFooter />
                  },
                  {
                    char: "12",
                    emoji: "🔑",
                    title: "Master Key",
                    tone: "text-[#b8ff3c]",
                    border: "border-[#b8ff3c]/40",
                    numberOnly: true,
                    items: [
                      { label: "Bypass", body: "signup + gift gates while unlocked." },
                      { label: "Rooms", body: "1-click enter Front 12 country rooms." },
                      { label: "Storage", body: "session only · not sent to fans." },
                      { label: "Secret", body: "ARENA_MASTER_KEY in .env.local only." }
                    ],
                    rooms: [CC_ROOM.home, ...CC_ACTIVE_ROOMS],
                    footer: <MasterKeyUnlockFooter />
                  },
                  {
                    char: "13",
                    emoji: "📋",
                    title: "Registry Admin",
                    tone: "text-[#ff2bd6]",
                    border: "border-[#ff2bd6]/40",
                    numberOnly: true,
                    items: [
                      { label: "Members", body: "member registry in .data/." },
                      { label: "Creators", body: "women creator applications + lanes." },
                      { label: "Access", body: "owner APIs only when Command Center on." },
                      { label: "Privacy", body: "gitignored · not in public zip." }
                    ],
                    rooms: [CC_ROOM.home, ...CC_ACTIVE_ROOMS]
                  },
                  {
                    char: "14",
                    emoji: "📁",
                    title: "UK Room Archive",
                    tone: "text-[#00f5ff]",
                    border: "border-[#00f5ff]/40",
                    numberOnly: true,
                    items: [
                      { label: "Public UK", body: "Freedom Gateway · football · dropship only." },
                      { label: "Archive", body: "park slides · movie · member lanes · owner only." },
                      { label: "Lock", body: "needs Master Key to open full database." },
                      { label: "Path", body: "kept off public Cotswolds room clutter." }
                    ],
                    rooms: [CC_ROOM.uk, CC_ROOM.home, CC_ROOM.trinidad]
                  },
                  {
                    char: "15",
                    emoji: "🔥",
                    title: "Firebase Infra",
                    tone: "text-[#00c9a7]",
                    border: "border-[#00c9a7]/40",
                    numberOnly: true,
                    items: [
                      { label: "Env", body: "copy .env.example → .env.local · NEXT_PUBLIC_FIREBASE_*." },
                      { label: "Auth", body: "client helpers wait until public config exists." },
                      {
                        label: "Collections",
                        body: collections || "Loading…"
                      },
                      { label: "Pipeline", body: "votes → scores → leaderboard · rules-first." }
                    ],
                    rooms: [CC_ROOM.home, ...CC_ACTIVE_ROOMS]
                  },
                  {
                    char: "16",
                    emoji: "🇨🇳",
                    title: "China Study Hub",
                    tone: "text-[#fbbf24]",
                    border: "border-[#fbbf24]/40",
                    numberOnly: true,
                    items: [
                      { label: "Campus", body: "Shanghai digital campus on China Room." },
                      { label: "Classes", body: "paid Mandarin · culture · cooking · tea." },
                      { label: "Creators", body: "teacher accounts · free + premium tools." },
                      { label: "Revenue", body: "tickets · certificates · memberships · sponsors." }
                    ],
                    rooms: [CC_ROOM.china, CC_ROOM.japan, CC_ROOM.uk, CC_ROOM.colombia, CC_ROOM.ecuador],
                    footer: (
                      <Link
                        href="/rooms/china-room"
                        className="text-[10px] font-black uppercase tracking-[0.12em] text-[#fbbf24] hover:underline"
                      >
                        Open China Room →
                      </Link>
                    )
                  },
                  {
                    char: "17",
                    emoji: "🇪🇨",
                    title: "Ecuador Dropship (Command Center)",
                    tone: "text-[#f5c842]",
                    border: "border-[#f5c842]/40",
                    numberOnly: true,
                    items: [
                      { label: "Public", body: "Hidden on Ecuador room while freeze is on." },
                      { label: "Lane", body: "Direct Dropship · owner tools here only." },
                      { label: "Fee", body: "15% platform service fee (internal)." },
                      { label: "Hubs", body: "Quito · Guayaquil ship direct." },
                      {
                        label: "Products",
                        body: "Tech $29 · Auto $35 · Ceviche $27 · Andes $31 · Carnival $22."
                      }
                    ],
                    rooms: [CC_ROOM.ecuador, CC_ROOM.colombia, CC_ROOM.japan, CC_ROOM.china, CC_ROOM.uk],
                    footer: (
                      <p className="text-[10px] font-semibold text-[#9fb4d4]">
                        Public room panel hidden · full dropship lanes list is above in this Command Center.
                      </p>
                    )
                  },
                  {
                    char: "18",
                    emoji: "🎓",
                    title: "Ecuador Study",
                    tone: "text-[#fcd116]",
                    border: "border-[#fcd116]/40",
                    numberOnly: true,
                    items: [
                      {
                        label: "Public room",
                        body: "teachers · live rooms · free sessions only — no fee % on fan page."
                      },
                      {
                        label: "Tutoring cut",
                        body: "15–20% platform fee on every paid lesson."
                      },
                      {
                        label: "Teacher sub",
                        body: "monthly listing fee to teach in the hub."
                      },
                      {
                        label: "Student premium",
                        body: "locked rooms · recordings · materials · $5–10 / month."
                      },
                      {
                        label: "Group classes",
                        body: "commission on ticketed live classes & workshops."
                      },
                      {
                        label: "Hide rule",
                        body: "payout splits · commissions · business model stay here only."
                      }
                    ],
                    rooms: [CC_ROOM.ecuador, CC_ROOM.colombia, CC_ROOM.uk, CC_ROOM.china, CC_ROOM.japan],
                    footer: <CommandCenterEcuadorStudyHub />
                  },
                  {
                    char: "19",
                    emoji: "🎰",
                    title: "Lounges",
                    tone: "text-[#00f5ff]",
                    border: "border-[#00f5ff]/40",
                    numberOnly: true,
                    items: [
                      { label: "Status", body: "All lounge rooms frozen · command center only." },
                      { label: "Elders Table", body: "Jamaica ×3 · Caribbean Freedom Arena" },
                      { label: "Comedy Fest", body: "Laugh belly full · 10 games · live" },
                      { label: "Pair League", body: "His flag beside hers · pick your match" },
                      { label: "Fashion Month", body: "Runway glam · street couture · live looks" },
                      { label: "Island Hub", body: "Central holo-lounge · island flags" },
                      {
                        label: "International Suite",
                        body: "🇬🇧 · 🇨🇳 · 🇯🇵 · 🇨🇴 · 🇪🇨 · 🇹🇹 · 🇯🇲 · 🇻🇪 · 🇹🇳 · 🇬🇾"
                      }
                    ],
                    rooms: [CC_ROOM.home, ...CC_ACTIVE_ROOMS],
                    footer: (
                      <div className="overflow-hidden rounded-xl border border-[#00f5ff]/20 bg-[#060a14]/80 p-3">
                        <ArenaLoungeScrollPanel variant="hero" />
                      </div>
                    )
                  },
                  {
                    char: "20",
                    emoji: "🌍",
                    title: "Direct Dropship",
                    tone: "text-[#f5c842]",
                    border: "border-[#f5c842]/40",
                    numberOnly: true,
                    items: [
                      {
                        label: "Template",
                        body: `${DIRECT_DROPSHIP_TEMPLATE.laneType} · every country.`
                      },
                      {
                        label: "Fee (internal)",
                        body: `${DIRECT_DROPSHIP_TEMPLATE.feeLabel} · hide from all public rooms.`
                      },
                      { label: "Payment", body: DIRECT_DROPSHIP_TEMPLATE.payment },
                      {
                        label: "Delivery",
                        body: `${DIRECT_DROPSHIP_TEMPLATE.domesticDelivery} domestic · ${DIRECT_DROPSHIP_TEMPLATE.internationalDelivery}.`
                      },
                      {
                        label: "Public copy",
                        body: "browse · pay · supplier ships · track — no fee % on fan UI."
                      },
                      {
                        label: "Inventory",
                        body: "none on Arena · supplier ships direct · tracking by email."
                      },
                      {
                        label: FREEZE_COMING_SOON_TITLE,
                        body: "Public dropship purchases OFF · full freeze catalog in this panel below."
                      }
                    ],
                    rooms: [
                      CC_ROOM.uk,
                      CC_ROOM.japan,
                      CC_ROOM.china,
                      CC_ROOM.ecuador,
                      CC_ROOM.colombia,
                      CC_ROOM.spain
                    ],
                    footer: (
                      <div className="space-y-4">
                        <CommandCenterDropshipLanes />
                        <div className="rounded-xl border border-[#c9a84c]/45 bg-[#f5c842]/8 p-2.5 sm:p-3">
                          <p className="mb-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#f5c842]">
                            ❄️ {FREEZE_COMING_SOON_TITLE}
                          </p>
                          <CommandCenterFreezeComingSoon />
                        </div>
                      </div>
                    )
                  },
                  {
                    char: "21",
                    emoji: "💰",
                    title: "Gift Earnings",
                    tone: "text-[#d7b46a]",
                    border: "border-[#d7b46a]/40",
                    numberOnly: true,
                    items: [
                      {
                        label: "Public rule",
                        body: "gift buttons may show price · no platform-cut % · no past £ boards."
                      },
                      {
                        label: "UK makeup",
                        body: "tournament names public · exact past earnings internal."
                      },
                      {
                        label: "UK makeup earnings live",
                        body: "Platform Earnings · vote £3–£5 · gifts 30/70 · premium boosts — Command Center only."
                      },
                      {
                        label: "UK games money",
                        body: "public: free entry + how hosts earn · CC: tip cuts · votes · VIP · boosts · sponsors."
                      },
                      {
                        label: "Teachers UK/JP",
                        body: "gift labels public · teacher/platform split internal."
                      },
                      {
                        label: "Market rates",
                        body: ukRates
                          ? `${ukRates.slotLabel} + all country rate cards below (owner only).`
                          : "Loading…"
                      },
                      {
                        label: FREEZE_COMING_SOON_TITLE,
                        body: "Public gifts / votes / boosts money OFF · full freeze catalog in this panel below."
                      }
                    ],
                    rooms: [CC_ROOM.uk, CC_ROOM.japan, CC_ROOM.china, CC_ROOM.colombia, CC_ROOM.ecuador, CC_ROOM.spain],
                    footer: (
                      <div className="space-y-4">
                        <CommandCenterGiftOps />
                        <div className="rounded-xl border border-[#c9a84c]/45 bg-[#f5c842]/8 p-2.5 sm:p-3">
                          <p className="mb-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#f5c842]">
                            ❄️ {FREEZE_COMING_SOON_TITLE}
                          </p>
                          <CommandCenterFreezeComingSoon />
                        </div>
                      </div>
                    )
                  }
                ]}
              />
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
