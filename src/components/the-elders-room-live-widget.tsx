"use client";

import { useCallback, useEffect, useState } from "react";
import { ArenaGiftCardFields } from "@/components/arena-gift-card-fields";
import { TheEldersRoomLiveMovie } from "@/components/the-elders-room-live-movie";
import { arenaGiftCopy } from "@/lib/arena-gifts";
import {
  buildArenaGiftCardMeta,
  emptyArenaGiftCardInput,
  validateArenaGiftCard,
  type ArenaGiftCardInput
} from "@/lib/arena-gift-card";
import { redirectArenaGiftCheckout, submitArenaGiftCheckout } from "@/lib/arena-gift-checkout-submit";
import { eldersTableGiftLegal } from "@/lib/elders-table-gift-legal";
import { eldersRoomMovieMeta } from "@/lib/elders-room-live-movie";
import { eldersRoomMeta } from "@/lib/the-elders-room";
import { isArenaMasterKeyActive } from "@/lib/arena-master-key";

const MOVIE_CLIP_ID = "uk-pl-real-life-movie";

export function TheEldersRoomLiveWidget() {
  const [checkingOut, setCheckingOut] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [card, setCard] = useState<ArenaGiftCardInput>(emptyArenaGiftCardInput);
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof ArenaGiftCardInput, string>>>({});

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleUnlock = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isArenaMasterKeyActive()) {
        setNotice("🔑 Master key · Elders Room unlocked");
        return;
      }

      const validation = validateArenaGiftCard(card);
      setCardErrors(validation.errors);
      if (!validation.valid) {
        setNotice("Enter valid card details.");
        return;
      }

      const cardMeta = buildArenaGiftCardMeta(card);
      if (!cardMeta) {
        setNotice("Enter valid card details.");
        return;
      }

      setCheckingOut(true);

      try {
        const payload = await submitArenaGiftCheckout({
          endpoint: "/api/payments/elders-room/checkout",
          cardMeta,
          payload: { clipId: MOVIE_CLIP_ID }
        });

        if (!payload.ok) {
          setNotice(arenaGiftCopy.giftUnavailable);
          return;
        }

        if (redirectArenaGiftCheckout(payload)) {
          return;
        }

        setNotice(payload.message ?? arenaGiftCopy.giftQueued);
      } catch {
        setNotice(arenaGiftCopy.giftNetworkError);
      } finally {
        setCheckingOut(false);
      }
    },
    [card]
  );

  return (
    <aside className="elders-room-live-widget pointer-events-auto" aria-label="The Elders Room live movie">
      <div className="elders-room-live-widget-head">
        <span className="elders-room-live-badge">
          <span className="elders-room-live-badge-dot" aria-hidden="true" />
          Live
        </span>
        <p className="elders-room-live-widget-title">{eldersRoomMeta.name}</p>
        <p className="elders-room-live-widget-tier">
          Level {eldersRoomMeta.level} · {eldersRoomMeta.currencyLabel}
        </p>
      </div>

      <div className="elders-room-live-clip elders-room-live-clip-movie">
        <TheEldersRoomLiveMovie />
        <span className="elders-room-live-clip-tag">● LIVE · 10 in showcase</span>
        <span className="elders-room-live-clip-game">Showcase</span>
      </div>

      <p className="elders-room-live-headline">{eldersRoomMovieMeta.subtitle}</p>
      <p className="elders-room-live-detail">{eldersTableGiftLegal.widgetDetail}</p>

      <p className="elders-room-live-match">
        <span aria-hidden="true">🇬🇧</span> 6 UK girls
        <span className="elders-room-live-match-arrow" aria-hidden="true">
          ×
        </span>
        <span aria-hidden="true">🇵🇱</span> 4 Poland · 18–29
      </p>

      <p className="elders-room-live-legal">{eldersTableGiftLegal.widgetDisclaimer}</p>

      <form className="elders-room-live-checkout" onSubmit={(event) => void handleUnlock(event)}>
        <div className="arena-gift-card-cta-head">
          <p className="a2030-intl-country-gift-btn-row a2030-intl-country-gift-btn-row--primary">
            <span className="a2030-intl-country-gift-btn-text">
              🎁 {eldersTableGiftLegal.giftButtonLabel(eldersRoomMeta.currencyLabel)}
            </span>
          </p>
        </div>

        <ArenaGiftCardFields
          compact
          disabled={checkingOut}
          value={card}
          errors={cardErrors}
          onChange={setCard}
        />

        <button type="submit" className="elders-room-live-unlock" disabled={checkingOut}>
          {checkingOut
            ? arenaGiftCopy.openingGift
            : `Pay gift · ${eldersRoomMeta.currencyLabel}`}
        </button>
      </form>

      {notice ? <p className="elders-room-live-notice">{notice}</p> : null}
    </aside>
  );
}
