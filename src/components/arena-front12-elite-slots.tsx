"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties, type MouseEvent } from "react";
import { ArenaJoinSignupModal } from "@/components/arena-join-signup-modal";
import { ArenaSlotTrendingTopics } from "@/components/arena-slot-trending-topics";
import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";
import { ArenaSlotWomanSignupModal } from "@/components/arena-slot-woman-signup-modal";
import { CountryLocalClock } from "@/components/country-local-clock";
import { useArenaSlotOccupancies } from "@/components/use-arena-slot-occupancies";
import type { ArenaCreatorSlot } from "@/lib/arena-experience";
import { formatArenaGiftAmount } from "@/lib/arena-gifts";
import { getArenaCountrySlotMeta } from "@/lib/arena-country-slot-meta";
import { getArenaEliteSlotTheme } from "@/lib/arena-elite-slot-themes";
import { getArenaSlotPhotosForCountry } from "@/lib/arena-slot-real-people";
import {
  getOccupiedArenaSlotCountdownLabel,
  formatArenaSlotCountdown
} from "@/lib/arena-slot-countdown";
import {
  getArenaSlotOccupancyRemainingSeconds,
  type ArenaSlotOccupancy
} from "@/lib/arena-slot-occupancy";
import { ArenaSlotsCinematicPanel } from "@/components/arena-slots-cinematic-panel";
import {
  arenaSlotSignInFrozenShortCopy,
  arenaSlotSignInOpenLabel,
  isArenaSlotFrozenForUi
} from "@/lib/arena-slot-sign-in-access";
import { masterKeyEnterSlotRoom } from "@/lib/arena-master-key";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import {
  getInternationalSuitePrimaryRoomHref,
  getInternationalSuiteRoomHref,
  internationalSuiteCountries
} from "@/lib/international-suite";
import { useArenaMasterKeyActive } from "@/components/use-arena-master-key-active";
import {
  ArenaSlotDropshipTab,
  DROPSHIP_ROOM_FALLBACK_BY_ISLAND_CODE,
  DROPSHIP_TAB_HASH_BY_ISLAND_CODE
} from "@/components/arena-slot-dropship-tab";
import { withArenaFront12DisplayRanks } from "@/lib/arena-front12-slot-order";
import { resolveArenaSlotLiveDisplayName } from "@/lib/arena-slot-live-display";

export const formatPendingSlotLabel = (rank: number) => `SLOT ${rank} - available`;

export const formatFrozenSlotLabel = (rank: number) => `SLOT ${rank} - frozen`;

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

const formatVotes = (votes: number) => votes.toLocaleString("en-US");

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
  freeEntryAmountUsd,
  onVote,
  onFireUp,
  onMensEntry,
  onCardTilt,
  onCardTiltReset,
  onGirlSignIn,
  onSlotNotice
}: CountryGirlSlotCardProps) {
  const router = useRouter();
  const masterKeyActive = useArenaMasterKeyActive();
  const theme = getArenaEliteSlotTheme(slot);
  const countryMeta = getArenaCountrySlotMeta(slot);
  const photos = getArenaSlotPhotosForCountry(slot.islandCode);
  const [photoSrc, setPhotoSrc] = useState(() => photos.local);
  const isActive = Boolean(occupancy);
  const isFrozen = !isActive && isArenaSlotFrozenForUi(slot.islandCode, masterKeyActive);
  const isSignInOpen = !isActive && !isFrozen;
  const remainingSeconds = occupancy
    ? getArenaSlotOccupancyRemainingSeconds(occupancy)
    : 0;
  const slotCountdownLabel = isActive
    ? getOccupiedArenaSlotCountdownLabel(remainingSeconds)
    : formatArenaSlotCountdown(3 * 60 * 60);
  const slotRank = slot.displayRank ?? slot.rank;
  const displayName = isActive
    ? resolveArenaSlotLiveDisplayName(slot.id, occupancy!)
    : isFrozen
      ? formatFrozenSlotLabel(slotRank)
      : slot.name;
  const suiteCountry = internationalSuiteCountries.find((entry) => entry.islandCode === slot.islandCode);
  const openRooms = suiteCountry?.rooms.filter((room) => room.status === "open") ?? [];
  const dropshipProducts = suiteCountry
    ? getAllDropshipProductsForCountry(suiteCountry.id).slice(0, 3)
    : [];
  const signInStatus = isFrozen ? "Frozen" : "Open";
  const dropshipTabHash = DROPSHIP_TAB_HASH_BY_ISLAND_CODE[slot.islandCode] ?? null;
  const primaryRoomHref =
    (suiteCountry && getInternationalSuitePrimaryRoomHref(suiteCountry)) ||
    DROPSHIP_ROOM_FALLBACK_BY_ISLAND_CODE[slot.islandCode] ||
    null;
  const dropshipRoomHref =
    dropshipTabHash && primaryRoomHref ? `${primaryRoomHref}#${dropshipTabHash}` : null;

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

      className={`ai-real-slot ai-real-slot-dense${slot.islandCode === "UK" ? " ai-real-slot-uk" : ""} ${isFrozen ? "ai-real-slot-pending ai-real-slot-frozen cfa-slot-frozen-surface" : !isActive ? "ai-real-slot-pending ai-real-slot-pending-clickable" : ""} ${slotRank <= 3 && isActive ? "ai-real-slot-top" : ""} ${slot.isOnFire && isActive ? "ai-real-slot-fire" : ""}`}
      aria-label={
        isActive
          ? `${slot.country} · ${displayName}${countryMeta.languageLabel ? ` · ${countryMeta.languageLabel}` : ""} · live`
          : isFrozen
            ? `${slot.country} · ${formatFrozenSlotLabel(slotRank)} · frozen`
            : `${slot.country} · girl sign-in`
      }
      aria-disabled={isFrozen ? true : undefined}
    >
      <header className={`ai-real-slot-nation${isFrozen ? " ai-real-slot-nation-frozen" : ""}`}>
        <div className="ai-real-slot-nation-row">
          <span className="ai-real-slot-flag" aria-hidden="true">
            {slot.flag}
          </span>
          <span className="ai-real-slot-country">{slot.country}</span>
          <span className="ai-real-slot-code">{slot.islandCode}</span>
          {isActive ? (
            <span className="ai-real-slot-live">
              <span className="ai-real-slot-live-dot" aria-hidden="true" />
              LIVE
            </span>
          ) : !isFrozen ? (
            <span className="ai-real-slot-pending-badge">Pending</span>
          ) : null}
        </div>
        <div className="ai-real-slot-nation-row ai-real-slot-nation-row-local">
          <CountryLocalClock
            capital={countryMeta.capital}
            timeZone={countryMeta.timeZone}
            tzAbbrev={countryMeta.tzAbbrev}
            className="ai-real-slot-local-clock"
          />
          {countryMeta.languageLabel ? (
            <span className="ai-real-slot-language-pill">{countryMeta.languageLabel}</span>
          ) : null}
        </div>
      </header>

      <div className={`ai-real-slot-broadcast${isFrozen ? " ai-real-slot-broadcast-frozen" : ""}`}>
        {isFrozen ? <ArenaSlotIceFrostOverlay hideStamp /> : null}
        {isActive ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt={`${displayName} · ${slot.country}${countryMeta.languageLabel ? ` · ${countryMeta.languageLabel}` : ""}`}
              className="ai-real-slot-photo"
              loading={slotRank <= 4 ? "eager" : "lazy"}
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => {
                setPhotoSrc((current) => (current === photos.url ? current : photos.url));
              }}
            />
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
                  {formatFrozenSlotLabel(slotRank)}
                </p>
                <p className="ai-real-slot-pending-sub">
                  Sign-in closed · {arenaSlotSignInOpenLabel} only
                </p>
              </>
            ) : null}
          </div>
        )}

        <div className="ai-real-slot-broadcast-top">
          <span className={`ai-real-slot-rank${slotRank <= 3 ? ` ai-real-slot-rank-${slotRank}` : ""}`}>
            #{slotRank}
          </span>
          <span className={`ai-real-slot-tier${isFrozen ? " ai-real-slot-tier-frozen" : ""}`}>
            {isActive ? `${theme.tier} · Elite Creative` : isFrozen ? "Frozen · sign-in closed" : "Awaiting sign-in"}
          </span>
          <time
            className={`ai-real-slot-timer ${isActive ? "" : isFrozen ? "ai-real-slot-timer-frozen" : "ai-real-slot-timer-pending"}`}
            dateTime={isActive ? `PT${remainingSeconds}S` : "PT3H"}
          >
            {isActive ? slotCountdownLabel : isFrozen ? "LOCKED" : "3:00:00"}
          </time>
        </div>

        {isActive ? (
          <span className="ai-real-slot-on-cam">
            {slot.flag} {countryMeta.capital}
          </span>
        ) : null}

        {slot.isOnFire && isActive ? <span className="ai-real-slot-fire-badge">🔥 ON FIRE</span> : null}

        {isActive ? (
          <p className="ai-real-slot-scene">{theme.scene}</p>
        ) : isFrozen ? (
          <p className="ai-real-slot-scene ai-real-slot-scene-frozen">{slot.country} · frozen · no sign-in</p>
        ) : null}
      </div>

      <div className={`ai-real-slot-info${isFrozen ? " ai-real-slot-info-frozen" : ""}`}>
        {isActive ? (
          <>
            <div className="ai-real-slot-info-head">
              <h3 className="ai-real-slot-name">{displayName}</h3>
              <p className="ai-real-slot-meta ai-real-slot-meta-inline">
                {slot.categoryIcon} {slot.category} · {slot.country} · Live · 3h slot
                {slot.language ? (
                  <>
                    {" "}
                    · <span className="ai-real-slot-lang-label">Lang</span> {slot.language}
                  </>
                ) : null}
              </p>
            </div>
            {slot.islandCode !== "CO" ? (
              <ArenaSlotTrendingTopics islandCode={slot.islandCode} country={slot.country} compact />
            ) : null}
            <blockquote className="ai-real-slot-quote">“{slot.quote}”</blockquote>

            <div className="ai-real-slot-stats-band">
              <div className="ai-real-slot-metrics">
                <span className="ai-real-slot-votes">
                  <span className="ai-real-slot-votes-label">LIVE</span>
                  {formatVotes(slot.votes)} votes
                </span>
                <span className={slot.trendTone === "down" ? "ai-real-slot-trend-down" : "ai-real-slot-trend-up"}>
                  {slot.trend}
                </span>
              </div>
              <div className="ai-real-slot-progress" aria-hidden="true">
                <span style={{ width: `${slot.progress}%` }} />
              </div>
            </div>

            <div className="ai-real-slot-actions">
              <button
                type="button"
                className={`ai-real-slot-btn-vote ${slot.hasVoted ? "ai-real-slot-btn-vote-done" : ""}`}
              >
                {slot.hasVoted ? "✓ Voted" : "⚡ Vote"}
              </button>
              <button type="button" onClick={(event) => onMensEntry(slot.id, event)} className="ai-real-slot-btn-like">
                ♡ {formatArenaGiftAmount(freeEntryAmountUsd)}
              </button>
              <button
                type="button"
                onClick={(event) => onFireUp(slot.id, event)}
                className="ai-real-slot-btn-fire"
                aria-label={`Fire up ${displayName}`}
              >
                🔥
              </button>
            </div>
          </>
        ) : isFrozen ? (
          <h3 className="ai-real-slot-name ai-real-slot-name-frozen">{displayName}</h3>
        ) : null}
        {isActive ? null : isFrozen ? (
          <div className="ai-real-slot-frozen-foot">
            <p className="ai-real-slot-meta ai-real-slot-meta-frozen">
              {masterKeyActive
                ? "Master key active · owner bypass · enter room"
                : `Girl sign-in open · ${arenaSlotSignInOpenLabel} only`}
            </p>
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
                  🔑 Enter {slot.country} room · master key
                </button>
              ) : (
                <button type="button" className="ai-real-slot-btn-frozen" disabled>
                  ❄ {arenaSlotSignInFrozenShortCopy}
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
              {masterKeyActive
                ? `🔑 Enter ${slot.country} room · master key`
                : `Girl sign-in · ${slot.country}`}
            </button>
          </div>
        )}

        {dropshipRoomHref ? (
          <div className="ai-real-slot-dropship-foot">
            <ArenaSlotDropshipTab mode="link" roomHref={dropshipRoomHref} />
            {slot.islandCode === "CO" ? (
              <ArenaSlotTrendingTopics islandCode={slot.islandCode} country={slot.country} compact />
            ) : null}
          </div>
        ) : (
          <section className="ai-real-slot-country-panel" aria-label={`${slot.country} dropshipping`}>
            <div className="ai-real-slot-country-panel-tab" aria-hidden="true">
              Dropshipping
            </div>
            <div className="ai-real-slot-country-panel-body">
              <div className="ai-real-slot-country-panel-grid">
                <p>
                  <span>Country</span> {slot.flag} {slot.country}
                </p>
                <p>
                  <span>Code</span> {slot.islandCode}
                </p>
                <p>
                  <span>Capital</span> {countryMeta.capital}
                </p>
                <p>
                  <span>Time zone</span> {countryMeta.tzAbbrev}
                </p>
                <p>
                  <span>Sign-in</span> {signInStatus}
                </p>
                <p>
                  <span>Category</span> {slot.category}
                </p>
              </div>

              {suiteCountry ? (
                <div className="ai-real-slot-country-panel-suite">
                  <p className="ai-real-slot-country-panel-line">
                    <span className="ai-real-slot-country-panel-label">Suite</span>
                    {suiteCountry.region} · {suiteCountry.tagline}
                  </p>
                  <p className="ai-real-slot-country-panel-line">
                    <span className="ai-real-slot-country-panel-label">Rooms</span>
                    {openRooms.length > 0
                      ? openRooms.map((room) => `${room.roomLabel} · ${getInternationalSuiteRoomHref(room)}`).join(" · ")
                      : "No open room lane listed."}
                  </p>
                  <p className="ai-real-slot-country-panel-line">
                    <span className="ai-real-slot-country-panel-label">Dropship</span>
                    {dropshipProducts.length > 0
                      ? dropshipProducts.map((product) => `${product.name} · ${product.shipsFrom}`).join(" · ")
                      : "No dropship products listed yet."}
                  </p>
                </div>
              ) : (
                <p className="ai-real-slot-country-panel-line">Suite profile not found for this country yet.</p>
              )}
            </div>
          </section>
        )}
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
    slots.filter((slot) => {
      const isActive = Boolean(occupancies[slot.id]);
      if (isActive) return true;
      return !isArenaSlotFrozenForUi(slot.islandCode, masterKeyActive);
    })
  );

  return (
    <>
      <section className="ai-real-slot-section" aria-label="Open slots · pending until girl sign-in">
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

      {joinSlot ? (
        <ArenaJoinSignupModal
          open
          slotRank={joinSlot.rank}
          countryLabel={`${joinSlot.flag} ${joinSlot.country}`}
          onClose={() => setJoinSlot(null)}
          onJoined={() => {
            const slot = joinSlot;
            setJoinSlot(null);
            setGirlSignInSlot(slot);
          }}
        />
      ) : null}

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
