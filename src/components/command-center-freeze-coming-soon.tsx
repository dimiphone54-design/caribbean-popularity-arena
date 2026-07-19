"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FREEZE_COMING_SOON_TITLE,
  FREEZE_GLOBAL_FLAGS,
  FREEZE_SITEWIDE_ITEMS,
  FREEZE_STILL_LIVE,
  buildFreezeCountryDetails,
  getFreezeReopenSteps,
  type FreezeCountryDetail
} from "@/lib/freeze-coming-soon";
import { ARENA_COMMAND_CENTER_ONLY_ISLAND_CODES } from "@/lib/arena-front12-slot-order";
import {
  PLATFORM_GIFT_CUT_PERCENT,
  TEACHER_GIFT_PAYOUT_PERCENT,
  UK_STUDY_HUB_FREEZE_CATALOG,
  UK_TEACHER_GIFT_TIERS
} from "@/lib/uk-study-hub-teacher-slot";
import { UK_FOOTBALL_PREDICTION_FREEZE_CATALOG } from "@/components/uk-football-prediction-hero";
import {
  MAKEUP_CREATOR_KEEP_PERCENT,
  MAKEUP_LIVE_GIFT_TIERS,
  MAKEUP_PLATFORM_CUT_PERCENT,
  MAKEUP_PREMIUM_BOOSTS,
  MAKEUP_VOTE_ACCESS_TIERS,
  UK_BEST_MAKEUP_FREEZE_CATALOG,
  formatMakeupGbp
} from "@/lib/uk-best-makeup-look";
import { UK_PARK_GAMES_FREEZE_CATALOG, ukParkGamesLane } from "@/lib/uk-park-games-lane";
import {
  ukGamesCcParticipantOps,
  ukGamesCcPlatformStreams,
  ukGamesPublicEarnFootnote,
  ukGamesPublicParticipantEarn
} from "@/lib/uk-games-monetization";
import {
  UK_FOOD_FREEZE_CATALOG,
  getUkFoodDropshipFreezeProducts,
  ukFoodLanes,
  ukFoodScenes
} from "@/components/uk-room-food-tab-panel";
import {
  MAKEUP_TOURNAMENT_SEED,
  UK_TOURNAMENT_FREEZE_CATALOG
} from "@/lib/uk-makeup-live-slot";
import {
  JAPAN_STUDY_HUB_FREEZE_CATALOG,
  JAPAN_TEACHER_GIFT_TIERS,
  PLATFORM_GIFT_CUT_PERCENT as JP_GIFT_CUT,
  TEACHER_GIFT_PAYOUT_PERCENT as JP_GIFT_PAYOUT
} from "@/lib/japan-study-hub-teacher-slot";
import { JAPAN_SPORTS_EARN_LANES_FROZEN } from "@/components/japan-sports-trends-panel";
import { GACHA_COIN_CONFIG } from "@/lib/japan-gacha-data";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import { PLATFORM_PAY_LANES } from "@/lib/platform-paypal";
import { CHINA_STUDY_HUB_FREEZE_CATALOG } from "@/components/china-study-hub-tab-panel";
import {
  CHINA_FOOD_FREEZE_CATALOG,
  getChinaFoodDropshipProducts
} from "@/components/china-room-food-tab-panel";
import { CHINA_GAMING_HUB_FREEZE_NOTES } from "@/components/room-china-gaming-hub";
import { ECUADOR_STUDY_HUB_FREEZE_CATALOG } from "@/components/ecuador-study-hub-tab-panel";
import { ECUADOR_DROPSHIP_FREEZE_CATALOG } from "@/components/command-center-ecuador-dropship";
import {
  COLOMBIA_FOOD_FREEZE_CATALOG,
  getColombiaFoodDropshipProducts
} from "@/components/colombia-room-food-tab-panel";
import { COLOMBIA_STUDY_HUB_FREEZE_CATALOG } from "@/lib/arena-slot-study-hub-lanes";
import { COLOMBIA_GAMING_HUB_FREEZE_NOTES } from "@/components/room-colombia-gaming-hub";
import { MembershipPlans } from "@/components/membership-plans";

type LiveStatus = {
  frozen?: boolean;
  realMoneyEnabled?: boolean;
  publicDropshipVisible?: boolean;
  dropshipPurchaseEnabled?: boolean;
  checkoutMode?: string;
  configured?: boolean;
  secretStored?: boolean;
  mode?: string;
  clientIdPrefix?: string;
};

/**
 * Command Center only · single panel for everything currently frozen
 * Title: FREEZE COMING SOON · detailed per-country inventory
 */
export function CommandCenterFreezeComingSoon() {
  const countries = useMemo(() => buildFreezeCountryDetails(), []);
  const reopen = useMemo(() => getFreezeReopenSteps(), []);
  const [status, setStatus] = useState<LiveStatus | null>(null);
  const [openId, setOpenId] = useState<string | null>(countries[0]?.countryId ?? null);

  useEffect(() => {
    void fetch("/api/payments/paypal/status")
      .then((r) => r.json())
      .then((data) => setStatus(data as LiveStatus))
      .catch(() => setStatus({ frozen: true, configured: false }));
  }, []);

  return (
    <div className="space-y-4 text-left" aria-label={FREEZE_COMING_SOON_TITLE}>
      <header className="rounded-xl border border-amber-400/45 bg-gradient-to-br from-amber-500/15 via-[#1a1206]/90 to-[#0a0c12] px-3 py-3 sm:px-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-200">
          ❄️ {FREEZE_COMING_SOON_TITLE}
        </p>
        <p className="mt-1.5 text-[12px] font-semibold leading-5 text-[#fde68a]">
          Everything frozen on the public site lives here — one owner panel. PayPal keys &amp; dropship
          ops stay private. Fans still browse, live, chat, and use free UI. Poland &amp; Lithuania
          nation slots live here only (removed from main Front 12).
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[9px] font-black uppercase tracking-[0.08em]">
          <StatusPill
            ok={status?.frozen !== false}
            yes="Public money FROZEN"
            no="Public money ON"
          />
          <StatusPill
            ok={status?.publicDropshipVisible !== true}
            yes="Dropship panels HIDDEN"
            no="Dropship panels VISIBLE"
          />
          <StatusPill
            ok={status?.configured === true}
            yes="PayPal keys stored"
            no="PayPal keys missing"
          />
          <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[#c5d4ec]">
            Checkout: {status?.checkoutMode ?? "off"}
          </span>
          <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[#c5d4ec]">
            API: {status?.mode ?? "…"}
          </span>
          {status?.clientIdPrefix ? (
            <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[#c5d4ec]">
              ID {status.clientIdPrefix}
            </span>
          ) : null}
        </div>
      </header>

      {/* Frozen countries · command center only */}
      <section
        className="rounded-xl border border-[#60a5fa]/40 bg-[#071018]/90 px-3 py-3"
        aria-label="Frozen countries command center only"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#93c5fd]">
          🇵🇱 🇱🇹 🇯🇲 🇻🇪 🇹🇳 🇬🇾 · frozen countries · command center only
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#dbeafe]">
          All 6 frozen country lanes — owner catalog only · public room + dropship hidden
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">
          Poland · Lithuania removed from Front 12 + SUITE · Jamaica · Venezuela · Tunisia · Guyana frozen lanes
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(
            [
              {
                id: "poland",
                flag: "🇵🇱",
                name: "Poland",
                city: "Warsaw",
                vibe: "Fashion · Polish style · Central Europe",
                publicRemoved: [
                  "Front 12 nation slot (Zofia · Fashion)",
                  "International SUITE public nav chip",
                  "Homepage country scroll enter"
                ]
              },
              {
                id: "lithuania",
                flag: "🇱🇹",
                name: "Lithuania",
                city: "Vilnius",
                vibe: "Art · Baltic culture · Vilnius lane",
                publicRemoved: [
                  "Front 12 nation slot (Gabija · Art)",
                  "International SUITE public nav chip",
                  "Homepage country scroll enter"
                ]
              },
              {
                id: "jamaica",
                flag: "🇯🇲",
                name: "Jamaica",
                city: "Kingston",
                vibe: "Island lane · reggae culture · Caribbean",
                publicRemoved: [
                  "Dropship public panels hidden",
                  "Purchases frozen",
                  "Suite country card · free room browse if open"
                ]
              },
              {
                id: "venezuela",
                flag: "🇻🇪",
                name: "Venezuela",
                city: "Caracas",
                vibe: "USD-display lane · Caribbean coast · culture",
                publicRemoved: [
                  "Dropship public panels hidden",
                  "Purchases frozen",
                  "Suite country card · free room browse if open"
                ]
              },
              {
                id: "tunisia",
                flag: "🇹🇳",
                name: "Tunisia",
                city: "Tunis",
                vibe: "Maghreb lane · North Africa · Mediterranean",
                publicRemoved: [
                  "Dropship public panels hidden",
                  "Purchases frozen",
                  "Suite country card · free room browse if open"
                ]
              },
              {
                id: "guyana",
                flag: "🇬🇾",
                name: "Guyana",
                city: "Georgetown",
                vibe: "Caribbean South America · rainforest · culture",
                publicRemoved: [
                  "Dropship public panels hidden",
                  "Purchases frozen",
                  "Suite country card · free room browse if open"
                ]
              }
            ] as const
          ).map((nation) => {
            const products = getAllDropshipProductsForCountry(nation.id);
            return (
              <article
                key={nation.id}
                className="rounded-xl border border-white/10 bg-black/35 px-3 py-2.5"
              >
                <p className="text-[12px] font-black text-[#f0f9ff]">
                  {nation.flag} {nation.name}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#93c5fd]">
                  {nation.city} · {nation.vibe}
                </p>
                <p className="mt-2 text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
                  Frozen · public hidden
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
                  {nation.publicRemoved.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {products.length > 0 ? (
                  <>
                    <p className="mt-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
                      Dropship SKUs (frozen · catalog)
                    </p>
                    <ul className="mt-1 space-y-1" role="list">
                      {products.map((p) => (
                        <li
                          key={p.id}
                          className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#60a5fa]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
                          role="listitem"
                        >
                          <span>
                            {p.flag} {p.name}
                          </span>
                          <span className="font-black text-[#93c5fd]">
                            ${p.price} · {p.shipsFrom}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-2 text-[10px] text-[#8fa3bf]">No dropship SKUs listed yet.</p>
                )}
                <p className="mt-2 text-[10px] leading-4 text-[#86efac]/90">
                  Reopen: unfreeze {nation.name} dropship + purchases in Command Center.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-label="Sitewide freezes">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-200/90">
          Sitewide · frozen for all countries
        </p>
        <ul className="mt-2 space-y-2">
          {FREEZE_SITEWIDE_ITEMS.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-amber-400/20 bg-black/30 px-3 py-2 text-[11px] leading-5 text-[#d8deef]"
            >
              <strong className="text-[#fef3c7]">{item.label}</strong>
              <span className="text-[#a8b8d4]"> — {item.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Env flags">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-200/90">
          Private env flags (.env.local only)
        </p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-[#050a14]/90">
          <table className="w-full min-w-[28rem] border-collapse text-left text-[10px]">
            <thead>
              <tr className="border-b border-white/10 text-[#8fa3bf]">
                <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">Flag</th>
                <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">Now</th>
                <th className="px-2.5 py-2 font-black uppercase tracking-[0.08em]">Means</th>
              </tr>
            </thead>
            <tbody>
              {FREEZE_GLOBAL_FLAGS.map((row) => (
                <tr key={row.key} className="border-b border-white/5 last:border-0">
                  <td className="px-2.5 py-1.5 font-mono text-[9px] text-[#67e8f9]">{row.key}</td>
                  <td className="px-2.5 py-1.5 font-black text-amber-200">{row.value}</td>
                  <td className="px-2.5 py-1.5 text-[#c5d4ec]">{row.means}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Still live on public site">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300/90">
          Still live for fans (not frozen)
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {FREEZE_STILL_LIVE.map((line) => (
            <li
              key={line}
              className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-100"
            >
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* UK Study Hub money catalog · removed from public campus · stored here */}
      <section
        className="rounded-xl border border-[#86efac]/35 bg-[#04120a]/90 px-3 py-3"
        aria-label={UK_STUDY_HUB_FREEZE_CATALOG.panelTitle}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#86efac]">
          {UK_STUDY_HUB_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#bbf7d0]">
          {UK_STUDY_HUB_FREEZE_CATALOG.publicStatus} · {UK_STUDY_HUB_FREEZE_CATALOG.room}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_STUDY_HUB_FREEZE_CATALOG.freePublic.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_STUDY_HUB_FREEZE_CATALOG.frozenMoney.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          Student gift tiers (not on public UI) · cut {PLATFORM_GIFT_CUT_PERCENT}% · teacher{" "}
          {TEACHER_GIFT_PAYOUT_PERCENT}%
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {UK_TEACHER_GIFT_TIERS.map((tier) => (
            <li
              key={tier.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#86efac]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {tier.emoji} {tier.label}
                <span className="text-[#8fa3bf]"> · {tier.effect}</span>
              </span>
              <span className="font-black text-[#fbbf24]">
                £{tier.amountGbp} · teacher £{tier.teacherReceivesGbp} · platform £{tier.platformCutGbp}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] leading-4 text-[#94a3b8]">
          {UK_STUDY_HUB_FREEZE_CATALOG.giftTiersNote}
        </p>
        <p className="mt-1 text-[10px] leading-4 text-[#86efac]/90">
          {UK_STUDY_HUB_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* UK Football Prediction money catalog · removed from public hero */}
      <section
        className="rounded-xl border border-[#b8ff3c]/35 bg-[#07140a]/90 px-3 py-3"
        aria-label={UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.panelTitle}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#b8ff3c]">
          {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#d9f99d]">
          {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.publicStatus}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">
          {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.room}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.freePublic.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.frozenMoney.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#f5c842]">
          How You Make Money lanes (not on public UI)
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.moneyLanes.map((lane) => (
            <li
              key={lane.title}
              className="rounded-lg border border-[#b8ff3c]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#e8ffb0]">
                {lane.emoji} {lane.title}
              </span>
              <span className="text-[#9fb4d4]"> — {lane.body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] leading-4 text-[#94a3b8]">
          {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.checkoutNote}
        </p>
        <p className="mt-1 text-[10px] leading-4 text-[#b8ff3c]/90">
          {UK_FOOTBALL_PREDICTION_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* UK Best Makeup Look money catalog · removed from public panel */}
      <section
        className="rounded-xl border border-[#ff2bd6]/40 bg-[#140018]/90 px-3 py-3"
        aria-label={UK_BEST_MAKEUP_FREEZE_CATALOG.panelTitle}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ff2bd6]">
          {UK_BEST_MAKEUP_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fbcfe8]">
          {UK_BEST_MAKEUP_FREEZE_CATALOG.publicStatus}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">
          {UK_BEST_MAKEUP_FREEZE_CATALOG.room}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_BEST_MAKEUP_FREEZE_CATALOG.freePublic.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_BEST_MAKEUP_FREEZE_CATALOG.frozenMoney.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#f9a8d4]">
          Vote unlock tiers (not on public) · {UK_BEST_MAKEUP_FREEZE_CATALOG.voteTiersNote}
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {MAKEUP_VOTE_ACCESS_TIERS.map((tier) => (
            <li
              key={tier.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#ff2bd6]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {tier.label}
                <span className="text-[#8fa3bf]"> · {tier.description}</span>
              </span>
              <span className="font-black text-[#fbcfe8]">{formatMakeupGbp(tier.amountGbp)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          Live gifts · creator {MAKEUP_CREATOR_KEEP_PERCENT}% / platform {MAKEUP_PLATFORM_CUT_PERCENT}%
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {MAKEUP_LIVE_GIFT_TIERS.map((tier) => (
            <li
              key={tier.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#ff2bd6]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {tier.emoji} {tier.label}
              </span>
              <span className="font-black text-[#fbbf24]">{formatMakeupGbp(tier.amountGbp)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[10px] text-[#8fa3bf]">{UK_BEST_MAKEUP_FREEZE_CATALOG.giftTiersNote}</p>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#b8ff3c]">
          Premium boosts (not on public apply form)
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {MAKEUP_PREMIUM_BOOSTS.map((boost) => (
            <li
              key={boost.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#b8ff3c]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {boost.label}
                <span className="text-[#8fa3bf]">
                  {" "}
                  · +{boost.visibilityPoints} vis · {boost.description}
                </span>
              </span>
              <span className="font-black text-[#e8ffc8]">{formatMakeupGbp(boost.amountGbp)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[10px] text-[#8fa3bf]">{UK_BEST_MAKEUP_FREEZE_CATALOG.boostsNote}</p>
        <p className="mt-2 text-[10px] leading-4 text-[#f9a8d4]/90">
          {UK_BEST_MAKEUP_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* UK park games money catalog · removed from public panel */}
      <section
        className="rounded-xl border border-[#b8ff3c]/40 bg-[#06140a]/90 px-3 py-3"
        aria-label={UK_PARK_GAMES_FREEZE_CATALOG.panelTitle}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#b8ff3c]">
          {UK_PARK_GAMES_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#d9f99d]">
          {UK_PARK_GAMES_FREEZE_CATALOG.publicStatus}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">
          {UK_PARK_GAMES_FREEZE_CATALOG.room}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_PARK_GAMES_FREEZE_CATALOG.freePublic.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_PARK_GAMES_FREEZE_CATALOG.frozenMoney.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#f5c842]">
          Per-game monetization (not on public UI)
        </p>
        <ul className="mt-1.5 space-y-1.5" role="list">
          {ukParkGamesLane.map((game) => (
            <li
              key={game.id}
              className="rounded-lg border border-[#b8ff3c]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <p className="font-black text-[#e8ffc8]">
                {game.emoji} {game.rank}. {game.title} · {game.host}
              </p>
              <p className="mt-0.5 text-[#c4b89a]">{game.monetization}</p>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          How participants earn (was public · now frozen catalog)
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {ukGamesPublicParticipantEarn.map((lane) => (
            <li
              key={lane.id}
              className="rounded-lg border border-[#fbbf24]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#fef9c3]">
                {lane.emoji} {lane.title}
              </span>
              <span className="text-[#9fb4d4]"> — {lane.body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[10px] text-[#8fa3bf]">{ukGamesPublicEarnFootnote}</p>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          Platform revenue streams (Command Center ops)
        </p>
        <p className="mt-1 text-[10px] text-[#94a3b8]">
          Entry: {ukGamesCcParticipantOps.entry} · tips cut {ukGamesCcParticipantOps.tipCutMinPercent}–
          {ukGamesCcParticipantOps.tipCutMaxPercent}% · vote fees $
          {ukGamesCcParticipantOps.voteFeeMinUsd}–${ukGamesCcParticipantOps.voteFeeMaxUsd}
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {ukGamesCcPlatformStreams.map((stream) => (
            <li
              key={stream.id}
              className="rounded-lg border border-[#67e8f9]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#a5f3fc]">{stream.stream}</span>
              <span className="text-[#9fb4d4]">
                {" "}
                — {stream.howItWorks} · {stream.potential}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] leading-4 text-[#b8ff3c]/90">
          {UK_PARK_GAMES_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* UK food money catalog */}
      <section
        className="rounded-xl border border-[#fbbf24]/40 bg-[#120f06]/90 px-3 py-3"
        aria-label={UK_FOOD_FREEZE_CATALOG.panelTitle}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#fbbf24]">
          {UK_FOOD_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fde68a]">
          {UK_FOOD_FREEZE_CATALOG.publicStatus}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">{UK_FOOD_FREEZE_CATALOG.room}</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_FOOD_FREEZE_CATALOG.freePublic.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#fde68a]">
              Scenes
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
              {ukFoodScenes.map((s) => (
                <li key={s.id}>{s.label}</li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#fde68a]">
              Lanes
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
              {ukFoodLanes.map((l) => (
                <li key={l.label}>
                  {l.emoji} {l.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_FOOD_FREEZE_CATALOG.frozenMoney.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#b8ff3c]">
              Food kit SKUs (hidden publicly)
            </p>
            <ul className="mt-1.5 space-y-1" role="list">
              {getUkFoodDropshipFreezeProducts().map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#fbbf24]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
                  role="listitem"
                >
                  <span>
                    {p.flag} {p.name}
                    <span className="text-[#8fa3bf]"> · {p.shipsFrom}</span>
                  </span>
                  <span className="font-black text-[#fbbf24]">
                    {p.currency} {p.price}
                  </span>
                </li>
              ))}
            </ul>
            {getUkFoodDropshipFreezeProducts().length === 0 ? (
              <p className="mt-1 text-[10px] text-[#8fa3bf]">No food-category dropship SKUs listed yet.</p>
            ) : null}
          </div>
        </div>
        <p className="mt-2 text-[10px] leading-4 text-[#fde68a]/90">
          {UK_FOOD_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* UK Tournament money catalog */}
      <section
        className="rounded-xl border border-[#d7b46a]/40 bg-[#100c06]/90 px-3 py-3"
        aria-label={UK_TOURNAMENT_FREEZE_CATALOG.panelTitle}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#d7b46a]">
          {UK_TOURNAMENT_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fde68a]">
          {UK_TOURNAMENT_FREEZE_CATALOG.publicStatus}
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">
          {UK_TOURNAMENT_FREEZE_CATALOG.room}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_TOURNAMENT_FREEZE_CATALOG.freePublic.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              {UK_TOURNAMENT_FREEZE_CATALOG.frozenMoney.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          Makeup Live tournament seed · exact past gift £ (not public)
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {MAKEUP_TOURNAMENT_SEED.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#d7b46a]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-semibold text-[#f7efe0]">
                #{entry.rank} {entry.fullName}
                {entry.isChampion ? " · CHAMP" : ""}
                <span className="text-[#8fa3bf]">
                  {" "}
                  · {entry.makeupStyle} · {entry.country}
                </span>
              </span>
              <span className="font-black text-[#fbbf24]">
                £{entry.totalGiftsGbp} · {entry.sessionDate}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] leading-4 text-[#d7b46a]/90">
          {UK_TOURNAMENT_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* Japan room money catalog */}
      <section
        className="rounded-xl border border-[#ff4466]/40 bg-[#140810]/90 px-3 py-3"
        aria-label="Japan room freeze catalog"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ff4466]">
          🇯🇵 Japan room · full campus money freeze
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fecdd3]">
          LIVE free public room · dropship hidden · gift/checkout catalogs below
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">/rooms/japan-room</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Gacha free arena coins · daily bonus · pulls</li>
              <li>Sports trends slideshow · Kendo stage (tap PLAY)</li>
              <li>Study Hub free apply · free go-live</li>
              <li>Anime / J-beauty / food / snacks / fashion browse</li>
              <li>Stationery · Desk Lab culture panels</li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Japan Direct Dropship market panel (hidden)</li>
              <li>Study Hub student gifts ¥ + payout forms</li>
              <li>Sports “How creators earn” paid entry / gifting</li>
              <li>Gacha creator earn + live gifts messaging</li>
              <li>Anime / J-beauty USD prices &amp; checkout</li>
              <li>Membership / gift / dropship PayPal examples</li>
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#ff4466]">
          {JAPAN_STUDY_HUB_FREEZE_CATALOG.panelTitle} · cut {JP_GIFT_CUT}% · teacher {JP_GIFT_PAYOUT}%
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {JAPAN_TEACHER_GIFT_TIERS.map((tier) => (
            <li
              key={tier.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#ff4466]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {tier.emoji} {tier.label}
                <span className="text-[#8fa3bf]"> · {tier.effect}</span>
              </span>
              <span className="font-black text-[#ff4466]">
                ¥{tier.amountYen.toLocaleString("en-US")} · teacher ¥
                {tier.teacherReceivesYen.toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          Sports earn lanes (removed from public)
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {JAPAN_SPORTS_EARN_LANES_FROZEN.map((lane) => (
            <li
              key={lane.title}
              className="rounded-lg border border-[#fbbf24]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#fef9c3]">
                {lane.emoji} {lane.title}
              </span>
              <span className="text-[#9fb4d4]"> — {lane.body}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#34d399]">
          Gacha coin config (free play public · paid earn frozen)
        </p>
        <p className="mt-1 text-[11px] text-[#c5d4ec]">
          Pull {GACHA_COIN_CONFIG.pullCost} · 11-pull {GACHA_COIN_CONFIG.tenPullCost} · daily +
          {GACHA_COIN_CONFIG.dailyBonus} · start balance {GACHA_COIN_CONFIG.initialBalance}
        </p>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          Japan PayPal lane examples
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {(PLATFORM_PAY_LANES.find((l) => l.id === "japan")?.examples ?? []).map((ex) => (
            <li
              key={ex.label}
              className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#67e8f9]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {ex.kind} · {ex.label}
              </span>
              <span className="font-black text-[#67e8f9]">${ex.amountUsd}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#c084fc]">
          Japan dropship SKUs (panel hidden · prices catalog)
        </p>
        <ul className="mt-1.5 max-h-40 space-y-1 overflow-y-auto" role="list">
          {getAllDropshipProductsForCountry("japan")
            .slice(0, 12)
            .map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#c084fc]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
                role="listitem"
              >
                <span>
                  {p.flag} {p.name}
                </span>
                <span className="font-black text-[#e9d5ff]">
                  ${p.price} · {p.shipsFrom}
                </span>
              </li>
            ))}
        </ul>
        <p className="mt-2 text-[10px] leading-4 text-[#ff4466]/90">
          {JAPAN_STUDY_HUB_FREEZE_CATALOG.reopenNote} Dropship: NEXT_PUBLIC_SHOW_DROPSHIP_PANELS=true.
        </p>
      </section>

      {/* China room money catalog */}
      <section
        className="rounded-xl border border-[#fbbf24]/40 bg-[#140a08]/90 px-3 py-3"
        aria-label="China room freeze catalog"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#fbbf24]">
          🇨🇳 China room · Shanghai campus money freeze
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fde68a]">
          LIVE free public room · dropship hidden · paid model below
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">/rooms/china-room</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Wushu Duilian live stage · fashion under it</li>
              <li>Games hub free play · Wushu panels</li>
              <li>Food culture browse (no shop/seller CTAs)</li>
              <li>Study Hub free learn/teach campus</li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Dropship tab + rates + market</li>
              <li>Study Hub paid classes / tickets / memberships</li>
              <li>Food commissions · subscriptions · seller gateway</li>
              <li>Food kit USD prices · shop CTAs</li>
              <li>Gaming hub premium / IAP wording</li>
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          {CHINA_STUDY_HUB_FREEZE_CATALOG.panelTitle}
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {CHINA_STUDY_HUB_FREEZE_CATALOG.campusProgramsPaid.map((p) => (
            <li
              key={p.title}
              className="rounded-lg border border-[#fbbf24]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#fef3c7]">{p.title}</span>
              <span className="text-[#9fb4d4]"> — {p.footer}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-1.5 space-y-1" role="list">
          {CHINA_STUDY_HUB_FREEZE_CATALOG.platformLanes.map((lane) => (
            <li
              key={lane.title}
              className="rounded-lg border border-[#fbbf24]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#fde68a]">{lane.title}</span>
              <span className="text-[#9fb4d4]"> — {lane.body}</span>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[11px] text-[#fde68a]">
          Revenue engine: {CHINA_STUDY_HUB_FREEZE_CATALOG.revenueEngine}
        </p>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#ff8099]">
          {CHINA_FOOD_FREEZE_CATALOG.panelTitle}
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
          {CHINA_FOOD_FREEZE_CATALOG.frozenMoney.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <ul className="mt-1.5 max-h-32 space-y-1 overflow-y-auto" role="list">
          {getChinaFoodDropshipProducts()
            .slice(0, 10)
            .map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#ff8099]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
                role="listitem"
              >
                <span>
                  {p.flag} {p.name}
                </span>
                <span className="font-black text-[#fda4af]">
                  {p.currency} {p.price}
                </span>
              </li>
            ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#c084fc]">
          China PayPal lane examples
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {(PLATFORM_PAY_LANES.find((l) => l.id === "china")?.examples ?? []).map((ex) => (
            <li
              key={ex.label}
              className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#c084fc]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {ex.kind} · {ex.label}
              </span>
              <span className="font-black text-[#e9d5ff]">${ex.amountUsd}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          Gaming hub paid notes
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
          {CHINA_GAMING_HUB_FREEZE_NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <p className="mt-2 text-[10px] leading-4 text-[#fbbf24]/90">
          {CHINA_STUDY_HUB_FREEZE_CATALOG.reopenNote} {CHINA_FOOD_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* Ecuador room money catalog */}
      <section
        className="rounded-xl border border-[#fcd116]/40 bg-[#0a1408]/90 px-3 py-3"
        aria-label="Ecuador room freeze catalog"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#fcd116]">
          🇪🇨 Ecuador room · free campus money freeze
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fef9c3]">
          LIVE free public room · dropship hidden · paid model below
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">/rooms/ecuador-room</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Live slot · flash live</li>
              <li>🎮 Juegos · Dominó · Ecuavoley · The Pit</li>
              <li>Study Hub free campus (under Juegos)</li>
              <li>Fashion culture browse · food photo panels</li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Envío directo / dropship panel + USD checkout</li>
              <li>Study Hub premium seats · tutoring % · teacher fees</li>
              <li>Premium student access $5–10 / month</li>
              <li>Dropship 15% fee · WiPay/Paddle · SKU prices</li>
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fcd116]">
          {ECUADOR_STUDY_HUB_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-0.5 text-[10px] text-[#86efac]">{ECUADOR_STUDY_HUB_FREEZE_CATALOG.publicStatus}</p>
        <ul className="mt-1.5 space-y-1" role="list">
          {ECUADOR_STUDY_HUB_FREEZE_CATALOG.moneyLanes.map((row) => (
            <li
              key={row.label}
              className="rounded-lg border border-[#fcd116]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#fef9c3]">{row.label}</span>
              <span className="text-[#9fb4d4]"> — {row.value}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
          {ECUADOR_STUDY_HUB_FREEZE_CATALOG.payoutNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          {ECUADOR_DROPSHIP_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-0.5 text-[10px] text-[#86efac]">{ECUADOR_DROPSHIP_FREEZE_CATALOG.publicStatus}</p>
        <dl className="mt-1.5 grid gap-1 sm:grid-cols-2">
          {ECUADOR_DROPSHIP_FREEZE_CATALOG.specs.map((row) => (
            <div
              key={row.label}
              className="rounded-lg border border-[#67e8f9]/15 bg-black/30 px-2 py-1.5 text-[11px]"
            >
              <dt className="text-[8px] font-black uppercase tracking-[0.12em] text-[#8fa3bf]">{row.label}</dt>
              <dd className="mt-0.5 font-semibold text-[#e0f2fe]">{row.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-1.5 max-h-36 space-y-1 overflow-y-auto" role="list">
          {ECUADOR_DROPSHIP_FREEZE_CATALOG.featuredProducts.map((p) => (
            <li
              key={p.name}
              className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#fcd116]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>🇪🇨 {p.name}</span>
              <span className="font-black text-[#fde68a]">
                {p.price} · {p.hub}
              </span>
            </li>
          ))}
        </ul>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
          {ECUADOR_DROPSHIP_FREEZE_CATALOG.internalFeeNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#c084fc]">
          Ecuador PayPal lane examples
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {(PLATFORM_PAY_LANES.find((l) => l.id === "ecuador")?.examples ?? []).map((ex) => (
            <li
              key={ex.label}
              className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#c084fc]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {ex.kind} · {ex.label}
              </span>
              <span className="font-black text-[#e9d5ff]">${ex.amountUsd}</span>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-[10px] leading-4 text-[#fcd116]/90">
          {ECUADOR_STUDY_HUB_FREEZE_CATALOG.reopenNote} {ECUADOR_DROPSHIP_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      {/* Colombia room money catalog */}
      <section
        className="rounded-xl border border-[#fb7185]/40 bg-[#14060a]/90 px-3 py-3"
        aria-label="Colombia room freeze catalog"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#fb7185]">
          🇨🇴 Colombia room · free campus money freeze
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#fecdd3]">
          LIVE free public room · dropship hidden · paid model below
        </p>
        <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">/rooms/colombia-room</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Public free (live now)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Romantic live slots · topics · venues</li>
              <li>Games · fashion culture · spotlight</li>
              <li>Food free culture browse (no kit prices)</li>
              <li>Study Hub free campus · Bogotá · Medellín</li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Money frozen (catalog only)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
              <li>Dropship tab + market panel</li>
              <li>Food kits $28 / $35 / $32 USD prices</li>
              <li>Study Hub premium tutoring / monthly access</li>
              <li>Platform checkout on Colombia SKUs</li>
            </ul>
          </div>
        </div>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          {COLOMBIA_FOOD_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-0.5 text-[10px] text-[#86efac]">{COLOMBIA_FOOD_FREEZE_CATALOG.publicStatus}</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
          {COLOMBIA_FOOD_FREEZE_CATALOG.frozenMoney.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <ul className="mt-1.5 max-h-36 space-y-1 overflow-y-auto" role="list">
          {getColombiaFoodDropshipProducts().map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#fb7185]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {p.flag} {p.name}
              </span>
              <span className="font-black text-[#fda4af]">
                {p.currency} {p.price} · {p.shipsFrom}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#67e8f9]">
          {COLOMBIA_STUDY_HUB_FREEZE_CATALOG.panelTitle}
        </p>
        <p className="mt-0.5 text-[10px] text-[#86efac]">{COLOMBIA_STUDY_HUB_FREEZE_CATALOG.publicStatus}</p>
        <ul className="mt-1.5 space-y-1" role="list">
          {COLOMBIA_STUDY_HUB_FREEZE_CATALOG.moneyLanes.map((row) => (
            <li
              key={row.label}
              className="rounded-lg border border-[#67e8f9]/15 bg-black/30 px-2 py-1.5 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span className="font-black text-[#e0f2fe]">{row.label}</span>
              <span className="text-[#9fb4d4]"> — {row.value}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#c084fc]">
          Colombia PayPal lane examples
        </p>
        <ul className="mt-1.5 space-y-1" role="list">
          {(PLATFORM_PAY_LANES.find((l) => l.id === "colombia")?.examples ?? []).map((ex) => (
            <li
              key={ex.label}
              className="flex flex-wrap justify-between gap-2 rounded-lg border border-[#c084fc]/15 bg-black/30 px-2 py-1 text-[11px] text-[#d8deef]"
              role="listitem"
            >
              <span>
                {ex.kind} · {ex.label}
              </span>
              <span className="font-black text-[#e9d5ff]">${ex.amountUsd}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
          Gaming hub paid notes
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-[#c5d4ec]">
          {COLOMBIA_GAMING_HUB_FREEZE_NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <p className="mt-2 text-[10px] leading-4 text-[#fb7185]/90">
          {COLOMBIA_FOOD_FREEZE_CATALOG.reopenNote} {COLOMBIA_STUDY_HUB_FREEZE_CATALOG.reopenNote}
        </p>
      </section>

      <section aria-label="Per country freeze detail">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-200/90">
          Every country · full freeze detail ({countries.length})
        </p>
        <p className="mt-1 text-[10px] text-[#9fb4d4]">
          Tap a country to expand products, pay examples, rooms, and notes.
        </p>
        <div className="mt-2 space-y-2">
          {countries.map((c) => (
            <CountryFreezeCard
              key={c.countryId}
              country={c}
              open={openId === c.countryId}
              onToggle={() => setOpenId((id) => (id === c.countryId ? null : c.countryId))}
            />
          ))}
        </div>
      </section>

      <section
        className="rounded-xl border border-[#0070ba]/30 bg-[#041018]/80 px-3 py-3"
        aria-label="How to unfreeze later"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7dd3fc]">
          When ready · unfreeze (owner only)
        </p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[11px] leading-5 text-[#c5d4ec]">
          {reopen.map((step) => (
            <li key={step}>{step.replace(/^\d+\.\s*/, "")}</li>
          ))}
        </ol>
      </section>

      <section className="mt-6">
        <MembershipPlans />
      </section>
    </div>
  );
}

function StatusPill({ ok, yes, no }: { ok: boolean; yes: string; no: string }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 ${
        ok
          ? "border-amber-400/45 bg-amber-500/15 text-amber-100"
          : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
      }`}
    >
      {ok ? yes : no}
    </span>
  );
}

function CountryFreezeCard({
  country,
  open,
  onToggle
}: {
  country: FreezeCountryDetail;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-amber-400/25 bg-[#0a0e18]/95">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-2 px-3 py-2.5 text-left transition hover:bg-white/[0.03]"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <p className="text-[12px] font-black text-[#f7efe0]">
            {country.flag} {country.countryName}
          </p>
          <p className="mt-0.5 text-[10px] text-[#9fb4d4]">
            {country.region} · hub {country.hubCity} · display {country.currencyCode}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-amber-100">
            Frozen
          </span>
          <span className="text-[10px] text-[#8fa3bf]" aria-hidden="true">
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {open ? (
        <div className="space-y-3 border-t border-white/10 px-3 py-3 text-[11px] leading-5 text-[#d8deef]">
          <div className="flex flex-wrap gap-1.5 text-[9px] font-black uppercase tracking-[0.08em]">
            <Tag label="Dropship UI hidden" on={country.dropshipPanelHidden} />
            <Tag label="Purchases frozen" on={country.purchasesFrozen} />
            <Tag label="Payments frozen" on={country.paymentsFrozen} />
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-amber-200/90">
              Frozen on this country
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[#c5d4ec]">
              {country.frozenFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300/90">
              Still live (public)
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[#c5d4ec]">
              {country.stillLive.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {country.openRooms.length > 0 ? (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#7dd3fc]">
                Open rooms
              </p>
              <p className="mt-1 text-[#c5d4ec]">{country.openRooms.join(" · ")}</p>
              <p className="mt-0.5 font-mono text-[10px] text-[#8fa3bf]">{country.roomHref}</p>
            </div>
          ) : (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#7dd3fc]">Room</p>
              <p className="mt-1 font-mono text-[10px] text-[#8fa3bf]">{country.roomHref}</p>
            </div>
          )}

          {country.payExamples.length > 0 ? (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#f5c842]">
                Pay examples (frozen · not charging)
              </p>
              <ul className="mt-1 space-y-1">
                {country.payExamples.map((ex) => (
                  <li
                    key={`${ex.kind}-${ex.label}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/25 px-2 py-1"
                  >
                    <span>
                      <span className="font-black uppercase tracking-[0.08em] text-[#8fa3bf]">
                        {ex.kind}
                      </span>{" "}
                      {ex.label}
                    </span>
                    <span className="font-black text-[#67e8f9]">${ex.amountUsd}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {country.featuredProducts.length > 0 ? (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#d7b46a]">
                Featured dropship SKUs (public panel hidden)
              </p>
              <ul className="mt-1 space-y-1">
                {country.featuredProducts.map((p) => (
                  <li
                    key={p.name}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/25 px-2 py-1"
                  >
                    <span>
                      {p.name}
                      <span className="text-[#8fa3bf]"> · {p.shipsFrom}</span>
                    </span>
                    <span className="font-semibold text-[#fde68a]">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-[10px] text-[#8fa3bf]">No featured SKUs listed yet for this lane.</p>
          )}

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#c4b5fd]">
              Country notes
            </p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[#c5d4ec]">
              {country.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] leading-4 text-[#8fa3bf]">
            Legal short: {country.legalShort}
          </p>
        </div>
      ) : null}
    </article>
  );
}

function Tag({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 ${
        on
          ? "border-amber-400/40 bg-amber-500/10 text-amber-100"
          : "border-white/15 bg-white/5 text-[#9fb4d4]"
      }`}
    >
      {label}
    </span>
  );
}
