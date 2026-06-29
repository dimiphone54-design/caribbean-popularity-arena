"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DropshipBuyButton } from "@/components/dropshipping/dropship-buy-button";
import { JapanRoomDropshipCreatorSignupPanel } from "@/components/japan-room-dropship-creator-signup-panel";
import { formatDropshipPrice } from "@/lib/dropshipping";
import { getDropshipMarketCopy, getDropshipProductDisplay } from "@/lib/dropship-market-copy";
import {
  getJapanDropshipCreatorShowcaseProducts,
  getJapanFront12CreatorSlot,
  japanDropshipCreatorSlotMeta
} from "@/lib/japan-room-dropship-creator";
import {
  ARENA_SLOT_OCCUPANCY_EVENT,
  getArenaSlotOccupancyRemainingSeconds,
  isArenaSlotOccupancyActive,
  readArenaSlotOccupancies,
  type ArenaSlotOccupancy
} from "@/lib/arena-slot-occupancy";
import { getOccupiedArenaSlotCountdownLabel } from "@/lib/arena-slot-countdown";

/** Japan room · 1 live slot under gift panel · women creators · dropship showcase */
export function JapanRoomDropshipCreatorSlot() {
  const meta = japanDropshipCreatorSlotMeta;
  const slot = useMemo(() => getJapanFront12CreatorSlot(), []);
  const products = useMemo(() => getJapanDropshipCreatorShowcaseProducts(), []);
  const copy = getDropshipMarketCopy("japan");
  const featured = products[0];
  const featuredDisplay = featured ? getDropshipProductDisplay(featured, "japan") : null;

  const [occupancy, setOccupancy] = useState<ArenaSlotOccupancy | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [entryNotice, setEntryNotice] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const live = readArenaSlotOccupancies()[meta.slotId] ?? null;
      setOccupancy(live && isArenaSlotOccupancyActive(live) ? live : null);
      setRemainingSeconds(live ? getArenaSlotOccupancyRemainingSeconds(live) : 0);
    };

    sync();
    const timer = window.setInterval(sync, 1000);
    window.addEventListener(ARENA_SLOT_OCCUPANCY_EVENT, sync);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(ARENA_SLOT_OCCUPANCY_EVENT, sync);
    };
  }, [meta.slotId]);

  const isLive = Boolean(occupancy);
  const creatorName = isLive ? occupancy!.displayName : meta.defaultCreatorName;
  const countdownLabel = isLive ? getOccupiedArenaSlotCountdownLabel(remainingSeconds) : null;

  return (
    <section
      id="japan-dropship-creator-slot"
      className="japan-dropship-creator-slot country-room-section w-full"
      aria-label="Japan dropship live slot · women creators only"
    >
      <header className="japan-dropship-creator-slot-head">
        <p className="japan-dropship-creator-slot-kicker">女性クリエイター · LIVE SLOT · 1</p>
        <h2 className="japan-dropship-creator-slot-title">🇯🇵 Dropship creator live</h2>
        <p className="japan-dropship-creator-slot-sub">
          Women creators only · show your Japan lane products · market ships direct
        </p>
        <span className="japan-dropship-creator-slot-badge">Women creators only</span>
      </header>

      <article className="japan-dropship-creator-slot-live">
        <div className="japan-dropship-creator-slot-stage">
          <div
            className="japan-dropship-creator-slot-photo"
            style={{ backgroundImage: `url('${meta.livePreviewImage}')` }}
            role="img"
            aria-label={`${creatorName} · Japan dropship live showcase`}
          />
          <span className="japan-dropship-creator-slot-stage-glass" aria-hidden="true" />
          {isLive ? (
            <span className="japan-dropship-creator-slot-live-pill">
              <span className="japan-dropship-creator-slot-live-dot" aria-hidden="true" />
              LIVE · {meta.viewers.toLocaleString()} watching
            </span>
          ) : (
            <span className="japan-dropship-creator-slot-open-pill">Slot open · apply below</span>
          )}
        </div>

        <div className="japan-dropship-creator-slot-body">
          <p className="japan-dropship-creator-slot-host">
            <span className="japan-dropship-creator-slot-host-name">{creatorName}</span>
            <span className="japan-dropship-creator-slot-host-meta">
              {isLive ? meta.defaultCreatorHandle : "Front 12 · SLOT 12 · Japan"}
            </span>
          </p>
          <p className="japan-dropship-creator-slot-lane">
            {isLive
              ? "Showing dropship picks · lifestyle · matcha · street fashion"
              : "Claim this lane · dropshipping · show products on live"}
          </p>
          {countdownLabel ? (
            <p className="japan-dropship-creator-slot-countdown">{countdownLabel} live left</p>
          ) : null}
          {entryNotice ? <p className="japan-dropship-creator-slot-entered">{entryNotice}</p> : null}

          <ul className="japan-dropship-creator-slot-products" role="list">
            {products.map((product) => {
              const display = getDropshipProductDisplay(product, "japan");
              return (
                <li key={product.id} className="japan-dropship-creator-slot-product" role="listitem">
                  <div
                    className="japan-dropship-creator-slot-product-thumb"
                    style={{ backgroundImage: `url('${product.imageUrl}')` }}
                    aria-hidden="true"
                  />
                  <div className="japan-dropship-creator-slot-product-copy">
                    <p className="japan-dropship-creator-slot-product-name">{display.name ?? display.category}</p>
                    <p className="japan-dropship-creator-slot-product-price">
                      {formatDropshipPrice(product.price, product.currency, "japan")}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="japan-dropship-creator-slot-actions">
            <Link href="#dropship-market" className="japan-dropship-creator-slot-shop-link">
              Shop Japan dropship lane →
            </Link>
            {featured && featuredDisplay ? (
              <DropshipBuyButton product={featured} countryName="Japan" compact />
            ) : null}
          </div>

          {!isLive ? (
            <JapanRoomDropshipCreatorSignupPanel
              slot={slot}
              onEntered={(name) => {
                setEntryNotice(`${name} is live · SLOT 12 · showing Japan dropship picks`);
              }}
            />
          ) : null}

          <p className="japan-dropship-creator-slot-foot">
            {copy.marketOnlyBadge} · {copy.shipsFrom} Japan suppliers · creator shows · fan buys below
          </p>
        </div>
      </article>
    </section>
  );
}
