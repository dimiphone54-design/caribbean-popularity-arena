"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArenaGiftCardFields } from "@/components/arena-gift-card-fields";
import { useRoomLocale } from "@/components/room-locale-provider";
import {
  clearCountryLiveGiftPending,
  saveCountryLiveGiftPending
} from "@/lib/country-live-gift-checkout";
import {
  countryRoomLiveAccessUsd,
  countryRoomLiveSessionHours,
  unlockCountryRoomAccess
} from "@/lib/country-room-access";
import { formatArenaGiftAmount } from "@/lib/arena-gifts";
import {
  buildArenaGiftCardMeta,
  emptyArenaGiftCardInput,
  validateArenaGiftCard,
  type ArenaGiftCardInput
} from "@/lib/arena-gift-card";
import { redirectArenaGiftCheckout, submitArenaGiftCheckout } from "@/lib/arena-gift-checkout-submit";
import { formatCountryLiveGiftAmount } from "@/lib/country-live-gift-amount";
import { readMemberUsername } from "@/lib/member-username-storage";
import {
  getCountryGateButtonSuffix,
  getCountryGateEnterLiveTitle,
  getCountryGateFootnote,
  getCountryGatePriceLine,
  getCountryGateRoomScrollHint,
  getCountryLiveGiftActivityTag
} from "@/lib/country-live-gift-activity-copy";
import {
  getCountryLiveGiftPanelButtonLabel,
  getCountryLiveGiftButtonCopy,
  getCountryLiveGiftGateLabels,
  getCountryLiveGiftLegalFooter
} from "@/lib/country-live-gift-gate-copy";
import { navigateIntlSuiteLink } from "@/lib/intl-suite-navigate";
import { internationalSuiteBuiltRoomCountryIds } from "@/lib/international-suite";
import { isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { CountryLiveGiftDashboardGate } from "@/components/country-live-gift-dashboard-gate";
import { refreshDropshipFxRates } from "@/lib/dropship-fx";

function useCountryLiveGiftAmountLabel(countryId: string) {
  const [amountLabel, setAmountLabel] = useState(() => formatCountryLiveGiftAmount(countryId));

  useEffect(() => {
    setAmountLabel(formatCountryLiveGiftAmount(countryId));
    void refreshDropshipFxRates().then(() => {
      setAmountLabel(formatCountryLiveGiftAmount(countryId));
    });
  }, [countryId]);

  return amountLabel;
}

type CountryLiveGiftCheckoutPanelProps = {
  countryId: string;
  countryName: string;
  flag: string;
  roomSlug: string;
  /** gate = room overlay · intl = country card row · romantic = Colombia pink gate */
  variant?: "gate" | "intl" | "romantic";
  onUnlocked?: () => void;
  hideHeader?: boolean;
};

export function CountryLiveGiftCheckoutPanel({
  countryId,
  countryName,
  flag,
  roomSlug,
  variant = "gate",
  onUnlocked,
  hideHeader = false
}: CountryLiveGiftCheckoutPanelProps) {
  const romantic = variant === "romantic";
  const intl = variant === "intl";
  const romanticEcuador = romantic && countryId === "ecuador";
  const { t } = useRoomLocale();
  const romanticCopy = t.colombia;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [card, setCard] = useState<ArenaGiftCardInput>(emptyArenaGiftCardInput);
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof ArenaGiftCardInput, string>>>({});

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const validation = validateArenaGiftCard(card);
    setCardErrors(validation.errors);
    if (!validation.valid) {
      setError(countryId === "ecuador" ? "Completa los datos de la tarjeta." : "Enter valid card details.");
      return;
    }

    const cardMeta = buildArenaGiftCardMeta(card);
    if (!cardMeta) {
      setError(countryId === "ecuador" ? "Tarjeta inválida." : "Invalid card details.");
      return;
    }

    if (isArenaMasterKeyActive()) {
      unlockCountryRoomAccess(roomSlug);
      clearCountryLiveGiftPending();
      setSuccess(`🔑 Master key · ${countryName} live unlocked · all rooms open`);
      onUnlocked?.();
      return;
    }

    setSubmitting(true);

    const savedName = readMemberUsername();
    const name = savedName.length >= 2 ? savedName : "Arena Guest";
    const mail = `guest+${countryId}@caribbeanfreedomarena.app`;

    try {
      const payload = await submitArenaGiftCheckout({
        endpoint: "/api/payments/country-live-gift/checkout",
        cardMeta,
        payload: {
          displayName: name,
          email: mail,
          countryId,
          countryName,
          roomSlug
        }
      });

      saveCountryLiveGiftPending({ roomSlug, countryId, countryName });

      if (redirectArenaGiftCheckout(payload)) {
        return;
      }

      unlockCountryRoomAccess(roomSlug);
      clearCountryLiveGiftPending();
      setSuccess(
        payload.message ??
          `${formatArenaGiftAmount(countryRoomLiveAccessUsd)} gift applied · ${countryRoomLiveSessionHours}h ${t.gateLiveUnlocked}.`
      );
      onUnlocked?.();
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error ? checkoutError.message : "Network error — try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const activityTag = getCountryLiveGiftActivityTag(countryId);
  const enterLiveTitle = getCountryGateEnterLiveTitle(countryId, t.gateEnterLive);
  const giftButtonSuffix = getCountryGateButtonSuffix(countryId, t.gateButtonSuffix);
  const gateLabels = getCountryLiveGiftGateLabels(countryId);
  const roomScrollHint = getCountryGateRoomScrollHint(
    countryId,
    "Scroll for dropship · gift unlocks live games & talk-show below."
  );
  const gateFootnote = getCountryGateFootnote(countryId, t.gateDefaultFootnote);
  const amountLabel = useCountryLiveGiftAmountLabel(countryId);
  const gatePriceLine =
    countryId === "ecuador"
      ? `${amountLabel} · ${countryRoomLiveSessionHours}h · ${getCountryGatePriceLine(countryId, t.gateActivityPrice)}`
      : `${amountLabel} · ${countryRoomLiveSessionHours}h · ${t.gateActivityPrice}`;

  const buttonCopy = getCountryLiveGiftButtonCopy(countryId, {
    amountLabel,
    sessionHours: countryRoomLiveSessionHours,
    activitySuffix: giftButtonSuffix,
    sendGiftLabel: gateLabels.sendGift,
    openingLabel: t.gateOpening,
    compact: intl
  });
  const legalFooter = getCountryLiveGiftLegalFooter(countryId);
  const activeBuiltRoom = (internationalSuiteBuiltRoomCountryIds as readonly string[]).includes(countryId);
  const activeBuiltGiftPanel = activeBuiltRoom && !romantic;
  const activeBuiltGateHero = activeBuiltGiftPanel && variant === "gate";

  const actions = (
    <form
      className={
        intl
          ? `a2030-intl-country-live-gift-actions${activeBuiltGiftPanel ? " a2030-intl-country-live-gift-actions--liquid-glass" : ""}`
          : `country-live-gift-one-click-actions${activeBuiltGateHero ? " country-live-gift-one-click-actions--liquid-glass" : ""}`
      }
      data-country-id={countryId}
      onSubmit={(event) => void handleCheckout(event)}
    >
      {error ? <p className="country-live-gift-error">{error}</p> : null}
      {success ? <p className="country-live-gift-success">{success}</p> : null}

      <ArenaGiftCardFields
        countryId={countryId}
        compact={intl && !romantic}
        disabled={submitting}
        value={card}
        errors={cardErrors}
        onChange={setCard}
        styleVariant={activeBuiltGiftPanel ? "liquid-glass" : "default"}
      />

      <button
        type="submit"
        disabled={submitting}
        className={
          romantic
            ? "colombia-romantic-access-btn w-full disabled:cursor-wait disabled:opacity-70"
            : `a2030-intl-country-gift-btn a2030-intl-country-gift-btn--structured${
                activeBuiltGiftPanel ? " a2030-intl-country-gift-btn--liquid-glass" : ""
              }`
        }
      >
        {submitting ? (
          <span className="a2030-intl-country-gift-btn-row a2030-intl-country-gift-btn-row--primary">
            <span className="a2030-intl-country-gift-btn-text">{buttonCopy.submitting}</span>
          </span>
        ) : romanticEcuador ? (
          <>Pagar regalo · {amountLabel}</>
        ) : romantic ? (
          <span className="colombia-romantic-gift-btn-copy">
            {getCountryLiveGiftPanelButtonLabel({
              amountLabel,
              sessionHours: countryRoomLiveSessionHours,
              activitySuffix: giftButtonSuffix
            })}
          </span>
        ) : activeBuiltRoom && (variant === "gate" || variant === "intl") ? (
          <span className="a2030-intl-country-gift-btn-copy">
            <span className="a2030-intl-country-gift-btn-row a2030-intl-country-gift-btn-row--primary">
              <span className="a2030-intl-country-gift-btn-text">🎁 {buttonCopy.primary}</span>
            </span>
          </span>
        ) : (
          <span className="a2030-intl-country-gift-btn-copy">
            <span className="a2030-intl-country-gift-btn-row a2030-intl-country-gift-btn-row--primary">
              <span className="a2030-intl-country-gift-btn-text">
                {countryId === "ecuador" ? "Pagar regalo" : "Pay gift"} · {amountLabel}
              </span>
            </span>
          </span>
        )}
      </button>
      <p className="country-live-gift-legal-note">{legalFooter.disclosureNote}</p>
      <Link
        href="/legal"
        className={intl ? "a2030-intl-country-live-gift-legal" : "country-live-gift-legal-link"}
      >
        {legalFooter.linkLabel}
      </Link>
    </form>
  );

  if (intl || hideHeader) {
    return (
      <div
        className={
          hideHeader
            ? "country-live-gift-checkout-standalone country-live-gift-checkout-standalone--compact"
            : undefined
        }
        data-country-id={countryId}
      >
        {actions}
      </div>
    );
  }

  if (variant === "gate" && !romantic) {
    return (
      <CountryLiveGiftDashboardGate
        countryId={countryId}
        countryName={countryName}
        flag={flag}
        activityTag={activityTag}
        enterTitle={enterLiveTitle}
        roomScrollHint={roomScrollHint}
        priceLine={gatePriceLine}
        footnote={gateFootnote}
        actions={actions}
      />
    );
  }

  const cardClass = romantic
    ? "colombia-romantic-access-card a2030-fire-touch-panel mx-auto w-full max-w-lg rounded-2xl px-6 py-8 text-center"
    : "country-live-gift-panel";

  return (
    <div className={cardClass} data-country-id={countryId}>
      {romanticEcuador ? (
        <>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fecdd3]">
            {flag} {countryName} · {activityTag}
          </p>
          <h2 className="colombia-romantic-title mt-3 text-2xl font-black sm:text-3xl">
            🎁 {buttonCopy.primary}
          </h2>
          {buttonCopy.detail ? (
            <p className="mt-3 text-sm font-bold leading-6 text-[#fda4af]/90">{buttonCopy.detail}</p>
          ) : null}
        </>
      ) : (
        <>
          <header className="colombia-romantic-gift-head">
            <p className={romantic ? "colombia-romantic-gift-kicker" : "country-live-gift-kicker"}>
              {romantic ? (
                <span className="colombia-romantic-gift-kicker-inner">
                  <span className="colombia-romantic-gift-kicker-flag" aria-hidden="true">
                    {flag}
                  </span>
                  <span>{countryName}</span>
                </span>
              ) : (
                <>
                  {flag} {countryName} · {activityTag}
                </>
              )}
            </p>
            <h2 className={romantic ? "colombia-romantic-title mt-3 text-3xl font-black" : "country-live-gift-title"}>
              {romantic ? romanticCopy.gateTitle : enterLiveTitle}
            </h2>
          </header>
          {!romantic ? (
            <p className="country-live-gift-price">
              {`${amountLabel} · ${countryRoomLiveSessionHours}h · ${t.gateActivityPrice}`}
            </p>
          ) : null}
        </>
      )}

      <div className="mt-5">{actions}</div>

      {!romantic ? (
        <p className="country-live-gift-foot">{t.gateDefaultFootnote}</p>
      ) : null}
    </div>
  );
}

/** Compact signup on International SUITE country cards */
export function CountryLiveGiftSignupPanel({
  countryId,
  countryName,
  flag,
  roomSlug,
  tagline,
  region,
  onHeadActivate,
  onNavigate
}: {
  countryId: string;
  countryName: string;
  flag: string;
  roomSlug: string;
  tagline?: string;
  region?: string;
  onHeadActivate?: (target: HTMLElement) => void;
  onNavigate?: () => void;
}) {
  const { t } = useRoomLocale();
  const router = useRouter();
  const roomHref = roomSlug.includes("intl-lane") ? "/rooms/international-suite" : `/rooms/${roomSlug}`;
  const activityTag = getCountryLiveGiftActivityTag(countryId);
  const enterLiveTitle = getCountryGateEnterLiveTitle(countryId, t.gateEnterLive);
  const intlAmountLabel = useCountryLiveGiftAmountLabel(countryId);

  return (
    <div className="a2030-intl-country-live-gift" data-country-id={countryId}>
      <div
        className={`a2030-intl-country-live-gift-head${onHeadActivate ? " a2030-intl-country-head-built cursor-pointer" : ""}`}
        {...(onHeadActivate
          ? {
              role: "button" as const,
              tabIndex: 0,
              onClick: (event: React.MouseEvent<HTMLElement>) => onHeadActivate(event.currentTarget),
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onHeadActivate(event.currentTarget);
                }
              }
            }
          : {})}
      >
        <span className="a2030-intl-country-live-gift-flag" aria-hidden="true">{flag}</span>
        <div className="min-w-0 flex-1">
          <p className="a2030-intl-country-live-gift-kicker">
            {countryName} · {activityTag}
          </p>
          <p className="a2030-intl-country-live-gift-title">{enterLiveTitle}</p>
          <p className="a2030-intl-country-live-gift-price">
            {intlAmountLabel} · {countryRoomLiveSessionHours}h · {t.gateActivityPrice}
          </p>
          {tagline || region ? (
            <p className="a2030-intl-country-live-gift-meta">
              {tagline ? <span className="a2030-intl-country-live-gift-tagline">{tagline}</span> : null}
              {tagline && region ? <span className="a2030-intl-country-live-gift-meta-sep"> · </span> : null}
              {region ? <span className="a2030-intl-country-live-gift-region">{region}</span> : null}
            </p>
          ) : null}
        </div>
      </div>

      <CountryLiveGiftCheckoutPanel
        countryId={countryId}
        countryName={countryName}
        flag={flag}
        roomSlug={roomSlug}
        variant="intl"
      />

      <Link
        href={roomHref}
        onClick={(event) => {
          if (!onNavigate) return;
          event.preventDefault();
          navigateIntlSuiteLink(router, roomHref, onNavigate);
        }}
        className="a2030-intl-country-live-gift-room-link"
      >
        Enter {countryName} room · games & activities →
      </Link>
    </div>
  );
}
