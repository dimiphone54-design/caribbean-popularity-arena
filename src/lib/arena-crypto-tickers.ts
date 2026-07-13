export type ArenaCryptoTicker = {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  priceUsd: number;
  change24h: number;
};

/** Nav crypto strip · seed prices when live feed is unavailable */
export const ARENA_CRYPTO_TICKER_SEED: ArenaCryptoTicker[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", icon: "₿", priceUsd: 68420, change24h: 1.8 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", icon: "Ξ", priceUsd: 3520, change24h: 2.4 },
  { id: "solana", symbol: "SOL", name: "Solana", icon: "◎", priceUsd: 178.5, change24h: -0.6 },
  { id: "ripple", symbol: "XRP", name: "XRP", icon: "✕", priceUsd: 0.62, change24h: 0.9 },
  { id: "cardano", symbol: "ADA", name: "Cardano", icon: "₳", priceUsd: 0.48, change24h: -1.2 },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", icon: "Ð", priceUsd: 0.14, change24h: 3.1 },
  { id: "tether", symbol: "USDT", name: "Tether", icon: "₮", priceUsd: 1.0, change24h: 0.01 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", icon: "◆", priceUsd: 612, change24h: 0.7 },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", icon: "🔺", priceUsd: 36.2, change24h: -0.4 },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", icon: "⬡", priceUsd: 15.8, change24h: 1.5 },
  { id: "polkadot", symbol: "DOT", name: "Polkadot", icon: "●", priceUsd: 7.4, change24h: -0.8 },
  { id: "litecoin", symbol: "LTC", name: "Litecoin", icon: "Ł", priceUsd: 84.3, change24h: 0.5 }
];

const COINGECKO_IDS = ARENA_CRYPTO_TICKER_SEED.map((coin) => coin.id).join(",");

const ICON_BY_ID = Object.fromEntries(ARENA_CRYPTO_TICKER_SEED.map((coin) => [coin.id, coin.icon])) as Record<
  string,
  string
>;

type CoinGeckoMarketRow = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
};

export function formatCryptoPrice(priceUsd: number) {
  if (priceUsd >= 1000) return `$${priceUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (priceUsd >= 1) return `$${priceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${priceUsd.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`;
}

export function formatCryptoChange(change24h: number) {
  const sign = change24h >= 0 ? "+" : "";
  return `${sign}${change24h.toFixed(2)}%`;
}

export async function fetchArenaCryptoTickers(): Promise<ArenaCryptoTicker[]> {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINGECKO_IDS}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
    );
    if (!res.ok) return ARENA_CRYPTO_TICKER_SEED;

    const rows = (await res.json()) as CoinGeckoMarketRow[];
    if (!Array.isArray(rows) || rows.length === 0) return ARENA_CRYPTO_TICKER_SEED;

    return rows.map((row) => ({
      id: row.id,
      symbol: row.symbol.toUpperCase(),
      name: row.name,
      icon: ICON_BY_ID[row.id] ?? "◈",
      priceUsd: row.current_price,
      change24h: row.price_change_percentage_24h ?? 0
    }));
  } catch {
    return ARENA_CRYPTO_TICKER_SEED;
  }
}