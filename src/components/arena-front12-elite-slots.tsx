"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties, type MouseEvent } from "react";

import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";
import { ArenaSlotWomanSignupModal } from "@/components/arena-slot-woman-signup-modal";
import { CountryLocalClock } from "@/components/country-local-clock";
import { useArenaSlotOccupancies } from "@/components/use-arena-slot-occupancies";
import type { ArenaCreatorSlot } from "@/lib/arena-experience";
import { getArenaCountrySlotMeta } from "@/lib/arena-country-slot-meta";
import { getArenaEliteSlotTheme } from "@/lib/arena-elite-slot-themes";
import {
  getOccupiedArenaSlotCountdownLabel,
  formatArenaSlotCountdown
} from "@/lib/arena-slot-countdown";
import {
  getArenaSlotOccupancyRemainingSeconds,
  type ArenaSlotOccupancy
} from "@/lib/arena-slot-occupancy";
import { ArenaSlotsCinematicPanel } from "@/components/arena-slots-cinematic-panel";
import { isArenaSlotFrozenForUi } from "@/lib/arena-slot-sign-in-access";
import { masterKeyEnterSlotRoom } from "@/lib/arena-master-key";
import {
  getInternationalSuitePrimaryRoomHref,
  internationalSuiteCountries
} from "@/lib/international-suite";
import { useArenaMasterKeyActive } from "@/components/use-arena-master-key-active";
import { isPublicDropshipVisible } from "@/lib/real-money";
import {
  ArenaSlotDropshipTab,
  DROPSHIP_ROOM_FALLBACK_BY_ISLAND_CODE,
  DROPSHIP_TAB_HASH_BY_ISLAND_CODE
} from "@/components/arena-slot-dropship-tab";
import {
  ArenaSlotFashionTab,
  FASHION_ROOM_FALLBACK_BY_ISLAND_CODE,
  FASHION_TAB_HASH_BY_ISLAND_CODE
} from "@/components/arena-slot-fashion-tab";
import {
  ArenaSlotFoodTab,
  FOOD_ROOM_FALLBACK_BY_ISLAND_CODE,
  FOOD_TAB_HASH_BY_ISLAND_CODE
} from "@/components/arena-slot-food-tab";
import {
  ArenaSlotGamesTab,
  GAMES_ROOM_FALLBACK_BY_ISLAND_CODE,
  GAMES_TAB_HASH_BY_ISLAND_CODE
} from "@/components/arena-slot-games-tab";
import {
  ArenaSlotStudyHubTab,
  STUDY_HUB_ROOM_FALLBACK_BY_ISLAND_CODE,
  STUDY_HUB_TAB_HASH_BY_ISLAND_CODE
} from "@/components/arena-slot-study-hub-tab";
import { ArenaSlotAiPowerhouseTab } from "@/components/arena-slot-ai-powerhouse-tab";
import {
  filterArenaFront12Slots,
  isArenaFront12VisibleSlot,
  withArenaFront12DisplayRanks
} from "@/lib/arena-front12-slot-order";
import { getArenaSlotTabWelcome } from "@/lib/arena-slot-country-welcome";
import { getArenaSlotDisplayLabels, getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";

const ROOM_SLUG_BY_ISLAND_CODE: Record<string, string> = {
  TT: "trinidad-room",
  CO: "colombia-room",
  EC: "ecuador-room",
  JP: "japan-room",
  CN: "china-room",
  UK: "uk-flag-cotswolds",
  ES: "spain-room",
};

export const formatPendingSlotLabel = (_rank: number) => "FREEDOM";

export const formatFrozenSlotLabel = (_rank: number) => "FREEDOM";

export const formatReadySlotLabel = (_rank: number) => "FREEDOM";

export type ArenaFront12SlotState = ArenaCreatorSlot & {
  hasVoted?: boolean;
  displayRank?: number;
};

type ArenaFront12EliteSlotsProps = {
  slots: ArenaFront12SlotState[];
  slotTick: number;
  freeEntryAmountUsd: string;
  onVote: (slotId: number) => void;
  onFireUp: (slotId: number, event: MouseEvent<HTMLButtonElement>) => void;
  onMensEntry: (slotId: number, event: MouseEvent<HTMLButtonElement>) => void;
  onCardTilt: (event: MouseEvent<HTMLElement>) => void;
  onCardTiltReset: (event: MouseEvent<HTMLElement>) => void;
  onSlotNotice?: (message: string, tone?: "gold" | "warning") => void;
};

type CountryGirlSlotCardProps = {
  slot: ArenaFront12SlotState;
  occupancy: ArenaSlotOccupancy | null;
  freeEntryAmountUsd: string;
  onVote: (slotId: number) => void;
  onFireUp: (slotId: number, event: MouseEvent<HTMLButtonElement>) => void;
  onMensEntry: (slotId: number, event: MouseEvent<HTMLButtonElement>) => void;
  onCardTilt: (event: MouseEvent<HTMLElement>) => void;
  onCardTiltReset: (event: MouseEvent<HTMLElement>) => void;
  onGirlSignIn: (slot: ArenaFront12SlotState) => void;
  onSlotNotice?: (message: string, tone?: "gold" | "warning") => void;
};

function CountryGirlSlotCard({
  slot,
  occupancy,
  freeEntryAmountUsd: _freeEntryAmountUsd,
  onVote,
  onFireUp,
  onMensEntry,
  onCardTilt: _onCardTilt,
  onCardTiltReset: _onCardTiltReset,
  onGirlSignIn,
  onSlotNotice
}: CountryGirlSlotCardProps) {
  const router = useRouter();
  const masterKeyActive = useArenaMasterKeyActive();
  const theme = getArenaEliteSlotTheme(slot);
  const countryMeta = getArenaCountrySlotMeta(slot);
  const hasOccupancy = Boolean(occupancy);
  const isVisible = isArenaFront12VisibleSlot(slot.islandCode);
  const isActive = hasOccupancy || isVisible;
  const isFrozen = !hasOccupancy && !isVisible && isArenaSlotFrozenForUi(slot.islandCode, masterKeyActive);
  const isSignInOpen = !isActive && !isFrozen;
  const remainingSeconds = occupancy
    ? getArenaSlotOccupancyRemainingSeconds(occupancy)
    : 0;
  const slotCountdownLabel = isActive
    ? getOccupiedArenaSlotCountdownLabel(remainingSeconds)
    : formatArenaSlotCountdown(3 * 60 * 60);
  const slotRank = slot.displayRank ?? slot.rank;
  const suiteCountry = internationalSuiteCountries.find((entry) => entry.islandCode === slot.islandCode);
  const dropshipTabHash = DROPSHIP_TAB_HASH_BY_ISLAND_CODE[slot.islandCode] ?? null;
  const primaryRoomHref =
    (suiteCountry && getInternationalSuitePrimaryRoomHref(suiteCountry)) ||
    DROPSHIP_ROOM_FALLBACK_BY_ISLAND_CODE[slot.islandCode] ||
    null;
  const dropshipRoomHref =
    dropshipTabHash && primaryRoomHref ? `${primaryRoomHref}#${dropshipTabHash}` : null;
  const gamesTabHash = GAMES_TAB_HASH_BY_ISLAND_CODE[slot.islandCode] ?? null;
  const gamesPrimaryRoomHref =
    (suiteCountry && getInternationalSuitePrimaryRoomHref(suiteCountry)) ||
    GAMES_ROOM_FALLBACK_BY_ISLAND_CODE[slot.islandCode] ||
    null;
  const gamesRoomHref =
    gamesTabHash && gamesPrimaryRoomHref ? `${gamesPrimaryRoomHref}#${gamesTabHash}` : null;
  const fashionTabHash = FASHION_TAB_HASH_BY_ISLAND_CODE[slot.islandCode] ?? null;
  const fashionPrimaryRoomHref =
    (suiteCountry && getInternationalSuitePrimaryRoomHref(suiteCountry)) ||
    FASHION_ROOM_FALLBACK_BY_ISLAND_CODE[slot.islandCode] ||
    null;
  const fashionRoomHref =
    fashionTabHash && fashionPrimaryRoomHref ? `${fashionPrimaryRoomHref}#${fashionTabHash}` : null;
  const foodTabHash = FOOD_TAB_HASH_BY_ISLAND_CODE[slot.islandCode] ?? null;
  const foodPrimaryRoomHref =
    (suiteCountry && getInternationalSuitePrimaryRoomHref(suiteCountry)) ||
    FOOD_ROOM_FALLBACK_BY_ISLAND_CODE[slot.islandCode] ||
    null;
  const foodRoomHref =
    foodTabHash && foodPrimaryRoomHref ? `${foodPrimaryRoomHref}#${foodTabHash}` : null;
  const studyHubTabHash = STUDY_HUB_TAB_HASH_BY_ISLAND_CODE[slot.islandCode] ?? null;
  const studyHubPrimaryRoomHref =
    (suiteCountry && getInternationalSuitePrimaryRoomHref(suiteCountry)) ||
    STUDY_HUB_ROOM_FALLBACK_BY_ISLAND_CODE[slot.islandCode] ||
    null;
  const studyHubRoomHref =
    studyHubTabHash && studyHubPrimaryRoomHref ? `${studyHubPrimaryRoomHref}#${studyHubTabHash}` : null;
  const tabWelcome = getArenaSlotTabWelcome(slot.islandCode);
  const displayLabels = getArenaSlotDisplayLabels(slot.islandCode, {
    country: slot.country,
    capital: countryMeta.capital,
    languageLabel: countryMeta.languageLabel
  });
  const tabLabels = getArenaSlotTabLabels(slot.islandCode);

  const openGirlSignIn = () => {
    if (isActive) return;
    if (isFrozen && !masterKeyActive) return;
    onGirlSignIn(slot);
  };

  const handleMasterKeyEnter = async () => {
    const path = await masterKeyEnterSlotRoom(slot);
    onSlotNotice?.(`🔑 Master key · entering ${slot.country} room`, "gold");
    router.push(path);
  };

  const cardStyle = {
    "--ai-slot-accent": theme.accent,
    "--ai-slot-accent-soft": theme.accentSoft,
    "--ai-slot-glow": theme.glow,
    "--ai-slot-jackpot-delay": `${(slotRank - 1) * 0.09}s`
  } as CSSProperties;

  return (
    <article
      style={cardStyle}
      onClick={() => {
        if (masterKeyActive && !isActive) {
          void handleMasterKeyEnter();
          return;
        }
        if (isFrozen) return;
        if (isActive) {
          onVote(slot.id);
          return;
        }
        openGirlSignIn();
      }}
      onKeyDown={(event) => {
        if (isFrozen || isActive || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        openGirlSignIn();
      }}
      tabIndex={isSignInOpen ? 0 : undefined}
      role={isSignInOpen ? "button" : undefined}

      className={`ai-real-slot ai-real-slot-dense${slot.islandCode === "UK" ? " ai-real-slot-uk" : ""} ${isFrozen ? "ai-real-slot-pending ai-real-slot-frozen cfa-slot-frozen-surface" : !isActive ? "ai-real-slot-pending ai-real-slot-pending-clickable" : ""} ${slotRank <= 3 && isActive ? "ai-real-slot-top" : ""} ${slot.isOnFire && isActive && slot.islandCode !== "CO" ? "ai-real-slot-fire" : ""}`}
      aria-label={
        isActive
          ? `${displayLabels.country} · FREEDOM · live`
          : isFrozen
            ? `${displayLabels.country} · FREEDOM · frozen`
            : `${displayLabels.country} · FREEDOM`
      }
      aria-disabled={isFrozen ? true : undefined}
    >
      <header className={`ai-real-slot-nation${isFrozen ? " ai-real-slot-nation-frozen" : ""}`}>
        <div className="ai-real-slot-nation-row">
          <span className="ai-real-slot-flag" aria-hidden="true">
            {slot.flag}
          </span>
          <span className="ai-real-slot-country">{displayLabels.country}</span>
          <span className="ai-real-slot-code">{slot.islandCode}</span>
          {isActive ? (
            <span className="ai-real-slot-live">
              <span className="ai-real-slot-live-dot" aria-hidden="true" />
              {displayLabels.liveBadge}
            </span>
          ) : !isFrozen ? (
            <span className="ai-real-slot-pending-badge">{displayLabels.pendingBadge}</span>
          ) : null}
        </div>
        <div className="ai-real-slot-nation-row ai-real-slot-nation-row-local">
          <CountryLocalClock
            capital={displayLabels.capital}
            timeZone={countryMeta.timeZone}
            tzAbbrev={countryMeta.tzAbbrev}
            locale={displayLabels.clockLocale}
            className="ai-real-slot-local-clock"
          />
          {displayLabels.languageLabel ? (
            <span className="ai-real-slot-language-pill">{displayLabels.languageLabel}</span>
          ) : null}
        </div>
      </header>

      <div className={`ai-real-slot-broadcast${isFrozen ? " ai-real-slot-broadcast-frozen" : ""}`}>
        {isFrozen ? <ArenaSlotIceFrostOverlay hideStamp /> : null}
        {isActive ? (
          <>
            <div className="ai-real-slot-scan" aria-hidden="true" />
            <div className="ai-real-slot-vignette" aria-hidden="true" />
          </>
        ) : (
          <div
            className={`ai-real-slot-pending-stage${isFrozen ? " ai-real-slot-pending-stage-frozen" : ""}${slot.islandCode === "UK" ? " ai-real-slot-pending-stage-uk" : ""}`}
            aria-hidden="true"
          >
            {isFrozen ? <span className="ai-real-slot-frozen-flake" aria-hidden="true">❄</span> : null}
            <span
              className={`ai-real-slot-pending-icon${isFrozen ? " ai-real-slot-pending-icon-frozen" : ""}${slot.islandCode === "UK" ? " ai-real-slot-pending-icon-uk" : ""}`}
              aria-hidden="true"
            >
              {slot.flag}
            </span>
            {isFrozen ? (
              <>
                <p className="ai-real-slot-pending-title ai-real-slot-pending-title-frozen">
                  FREEDOM
                </p>
                <p className="ai-real-slot-pending-sub">FREEDOM</p>
              </>
            ) : null}
          </div>
        )}

        <div className="ai-real-slot-broadcast-top">
          <span className={`ai-real-slot-rank${slotRank <= 3 ? ` ai-real-slot-rank-${slotRank}` : ""}`}>
            #{slotRank}
          </span>
          {!isActive ? (
            <span className={`ai-real-slot-tier${isFrozen ? " ai-real-slot-tier-frozen" : ""}`}>
              FREEDOM
            </span>
          ) : null}
          <time
            className={`ai-real-slot-timer ${isActive ? "" : isFrozen ? "ai-real-slot-timer-frozen" : "ai-real-slot-timer-pending"}`}
            dateTime={isActive ? `PT${remainingSeconds}S` : "PT3H"}
          >
            {isActive ? slotCountdownLabel : isFrozen ? "LOCKED" : "3:00:00"}
          </time>
        </div>

        {isActive ? (
          <span className="ai-real-slot-on-cam">
            {slot.flag} {displayLabels.capital}
          </span>
        ) : null}

        {slot.isOnFire && isActive && slot.islandCode !== "CO" ? (
          <span className="ai-real-slot-fire-badge">FREEDOM</span>
        ) : null}

        {isActive ? (
          <p className="ai-real-slot-scene">FREEDOM</p>
        ) : isFrozen ? (
          <p className="ai-real-slot-scene ai-real-slot-scene-frozen">FREEDOM</p>
        ) : null}
      </div>

      <div className={`ai-real-slot-info${isFrozen ? " ai-real-slot-info-frozen" : ""}`}>
        {isActive ? (
          <>
            <div className="ai-real-slot-info-head">
              <h3 className="ai-real-slot-name">{slot.country}</h3>
              <p className="ai-real-slot-welcome-line">
                {tabWelcome ?? `Welcome to ${slot.country} — ${slot.category}`}
              </p>
            </div>
            <blockquote className="ai-real-slot-quote">&ldquo;{slot.quote}&rdquo;</blockquote>

            <div className="ai-real-slot-actions">
              {ROOM_SLUG_BY_ISLAND_CODE[slot.islandCode] && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(`/rooms/${ROOM_SLUG_BY_ISLAND_CODE[slot.islandCode]}`);
                  }}
                  className="ai-real-slot-btn-enter"
                >
                  ENTER
                </button>
              )}
            </div>
          </>
        ) : isFrozen ? (
          <div className="ai-real-slot-info-head">
            <h3 className="ai-real-slot-name ai-real-slot-name-frozen">{slot.country}</h3>
            <p className="ai-real-slot-welcome-line">
              {tabWelcome ?? `Welcome to ${slot.country} — ${slot.category}`}
            </p>
          </div>
        ) : (
          <div className="ai-real-slot-info-head">
            <h3 className="ai-real-slot-name">{slot.country}</h3>
            <p className="ai-real-slot-welcome-line">
              {tabWelcome ?? `Welcome to ${slot.country} — ${slot.category}`}
            </p>
          </div>
        )}
        {isActive ? null : isFrozen ? (
          <div className="ai-real-slot-frozen-foot">
            <p className="ai-real-slot-meta ai-real-slot-meta-frozen">FREEDOM</p>
            <div className="ai-real-slot-actions">
              {masterKeyActive ? (
                <button
                  type="button"
                  className="ai-real-slot-btn-sign-in"
                  onClick={(event) => {
                    event.stopPropagation();
                    void handleMasterKeyEnter();
                  }}
                >
                  FREEDOM
                </button>
              ) : (
                <button type="button" className="ai-real-slot-btn-frozen" disabled>
                  FREEDOM
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="ai-real-slot-actions">
            <button
              type="button"
              className="ai-real-slot-btn-sign-in"
              onClick={(event) => {
                event.stopPropagation();
                if (masterKeyActive) {
                  void handleMasterKeyEnter();
                  return;
                }
                openGirlSignIn();
              }}
            >
              FREEDOM
            </button>
          </div>
        )}

        {(() => {
          const roomSlug = ROOM_SLUG_BY_ISLAND_CODE[slot.islandCode];
          const roomBase = roomSlug ? `/rooms/${roomSlug}` : null;
          const hasTabs = dropshipRoomHref || gamesRoomHref || fashionRoomHref || foodRoomHref || studyHubRoomHref || roomBase;
          if (!hasTabs) return null;
          return (
            <div className="ai-real-slot-dropship-foot">
              <div className="ai-real-slot-slot-tabs">
                {dropshipRoomHref && isPublicDropshipVisible() ? (
                  <ArenaSlotDropshipTab mode="link" roomHref={dropshipRoomHref} label={tabLabels.dropshipping} />
                ) : null}
                {gamesRoomHref ? (
                  <ArenaSlotGamesTab mode="link" roomHref={gamesRoomHref} label={tabLabels.games} />
                ) : roomBase ? (
                  <ArenaSlotGamesTab mode="link" roomHref={roomBase} label={tabLabels.games} />
                ) : null}
                {fashionRoomHref ? (
                  <ArenaSlotFashionTab mode="link" roomHref={fashionRoomHref} label={tabLabels.fashion} />
                ) : roomBase ? (
                  <ArenaSlotFashionTab mode="link" roomHref={roomBase} label={tabLabels.fashion} />
                ) : null}
                {foodRoomHref ? (
                  <ArenaSlotFoodTab mode="link" roomHref={foodRoomHref} label={tabLabels.food} />
                ) : roomBase ? (
                  <ArenaSlotFoodTab mode="link" roomHref={roomBase} label={tabLabels.food} />
                ) : null}
                {studyHubRoomHref ? (
                  <ArenaSlotStudyHubTab mode="link" roomHref={studyHubRoomHref} label={tabLabels.studyHub} />
                ) : roomBase ? (
                  <ArenaSlotStudyHubTab mode="link" roomHref={roomBase} label={tabLabels.studyHub} />
                ) : null}
                <ArenaSlotAiPowerhouseTab mode="link" label={tabLabels.aiPowerhouse} />
              </div>
              {tabWelcome ? (
                <p className="ai-real-slot-tab-welcome">
                  <span className="ai-real-slot-tab-welcome-mark" aria-hidden="true">
                    {slot.flag}
                  </span>
                  {tabWelcome}
              </p>
            ) : null}
          </div>
          );
        })()}
      </div>
    </article>
  );
}

export function ArenaFront12EliteSlots({
  slots,
  slotTick,
  freeEntryAmountUsd,
  onVote,
  onFireUp,
  onMensEntry,
  onCardTilt,
  onCardTiltReset,
  onSlotNotice
}: ArenaFront12EliteSlotsProps) {
  const masterKeyActive = useArenaMasterKeyActive();
  const occupancies = useArenaSlotOccupancies(slotTick);
  const [joinSlot, setJoinSlot] = useState<ArenaFront12SlotState | null>(null);
  const [girlSignInSlot, setGirlSignInSlot] = useState<ArenaFront12SlotState | null>(null);
  const visibleSlots = withArenaFront12DisplayRanks(
    filterArenaFront12Slots(
      slots.filter((slot) => {
        const isActive = Boolean(occupancies[slot.id]);
        if (isActive) return true;
        if (isArenaFront12VisibleSlot(slot.islandCode)) return true;
        return !isArenaSlotFrozenForUi(slot.islandCode, masterKeyActive);
      })
    )
  );

  return (
    <>
      <section className="ai-real-slot-section" aria-label="FREEDOM">
      <div className="ai-real-slot-section-head">
        <ArenaSlotsCinematicPanel />
      </div>

      <div className="ai-real-slot-grid [perspective:1400px]">
        {visibleSlots.map((slot) => (
          <CountryGirlSlotCard
            key={slot.id}
            slot={slot}
            occupancy={occupancies[slot.id] ?? null}
            freeEntryAmountUsd={freeEntryAmountUsd}
            onVote={onVote}
            onFireUp={onFireUp}
            onMensEntry={onMensEntry}
            onCardTilt={onCardTilt}
            onCardTiltReset={onCardTiltReset}
            onGirlSignIn={(slot) => {
              if (masterKeyActive) return;
              if (!isArenaSlotFrozenForUi(slot.islandCode, masterKeyActive)) setJoinSlot(slot);
            }}
            onSlotNotice={onSlotNotice}
          />
        ))}
      </div>
    </section>



      {girlSignInSlot ? (
        <ArenaSlotWomanSignupModal
          slot={girlSignInSlot}
          onClose={() => setGirlSignInSlot(null)}
          onSignedIn={(message) => {
            onSlotNotice?.(message, "gold");
            setGirlSignInSlot(null);
          }}
        />
      ) : null}
    </>
  );
}
