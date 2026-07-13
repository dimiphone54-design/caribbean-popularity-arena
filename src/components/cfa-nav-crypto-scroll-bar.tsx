"use client";

import { useEffect, useState } from "react";
import {
  ARENA_CRYPTO_TICKER_SEED,
  fetchArenaCryptoTickers,
  formatCryptoChange,
  formatCryptoPrice,
  type ArenaCryptoTicker
} from "@/lib/arena-crypto-tickers";

export function CfaNavCryptoScrollBar() {
  const [tickers, setTickers] = useState<ArenaCryptoTicker[]>(ARENA_CRYPTO_TICKER_SEED);
  const slideItems = [...tickers, ...tickers];

  useEffect(() => {
    let active = true;

    const load = async () => {
      const next = await fetchArenaCryptoTickers();
      if (active) setTickers(next);
    };

    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 60_000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="a2030-crypto-bar fixed inset-x-0 z-40 flex overflow-hidden" aria-label="Crypto market strip">
      <div
        className="a2030-crypto-bar-track flex min-w-max hover:[animation-play-state:paused]"
        style={{ animation: "tick 50s linear infinite" }}
      >
        {slideItems.map((coin, index) => {
          const up = coin.change24h >= 0;

          return (
            <div
              key={`${coin.id}-${index}`}
              className="a2030-crypto-bar-item relative flex h-[40px] items-center gap-2 border-r border-[#00f5ff]/12 px-5 text-xs font-bold uppercase tracking-wide text-[#9fb4d8]"
              title={`${coin.name} · ${formatCryptoPrice(coin.priceUsd)} · ${formatCryptoChange(coin.change24h)}`}
            >
              <span className="a2030-crypto-bar-icon text-base" aria-hidden="true">
                {coin.icon}
              </span>
              <span className="a2030-crypto-bar-symbol text-[#e8f7ff]">{coin.symbol}</span>
              <span className="a2030-crypto-bar-price tabular-nums text-[#b8ff3c]">
                {formatCryptoPrice(coin.priceUsd)}
              </span>
              <span
                className={`a2030-crypto-bar-change tabular-nums text-[10px] font-black ${up ? "text-[#4ade80]" : "text-[#fb7185]"}`}
              >
                {formatCryptoChange(coin.change24h)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}