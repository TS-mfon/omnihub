export interface TokenConfig {
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  color: string;
  priceUSD: number;
  change24h: number;
  coingeckoId?: string;
}

export const TOKENS: Record<string, TokenConfig> = {
  INIT: {
    symbol: "INIT",
    name: "Initia",
    decimals: 6,
    icon: "I",
    color: "#4263eb",
    priceUSD: 1.85,
    change24h: 5.23,
    coingeckoId: "initia",
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    icon: "$",
    color: "#2775ca",
    priceUSD: 1.0,
    change24h: 0.01,
    coingeckoId: "usd-coin",
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    icon: "E",
    color: "#627eea",
    priceUSD: 3245.67,
    change24h: -1.42,
    coingeckoId: "ethereum",
  },
  TIA: {
    symbol: "TIA",
    name: "Celestia",
    decimals: 6,
    icon: "T",
    color: "#7b2bf9",
    priceUSD: 8.92,
    change24h: 3.17,
    coingeckoId: "celestia",
  },
  ATOM: {
    symbol: "ATOM",
    name: "Cosmos Hub",
    decimals: 6,
    icon: "A",
    color: "#2e3148",
    priceUSD: 9.45,
    change24h: -0.83,
    coingeckoId: "cosmos",
  },
  MOVE: {
    symbol: "MOVE",
    name: "Move Token",
    decimals: 8,
    icon: "M",
    color: "#ff6b35",
    priceUSD: 0.65,
    change24h: 12.45,
  },
  OSMO: {
    symbol: "OSMO",
    name: "Osmosis",
    decimals: 6,
    icon: "O",
    color: "#5604e6",
    priceUSD: 0.78,
    change24h: 1.89,
    coingeckoId: "osmosis",
  },
  WBTC: {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 8,
    icon: "B",
    color: "#f7931a",
    priceUSD: 67234.12,
    change24h: 0.56,
    coingeckoId: "wrapped-bitcoin",
  },
  DAI: {
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    icon: "D",
    color: "#f5ac37",
    priceUSD: 1.0,
    change24h: -0.02,
    coingeckoId: "dai",
  },
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    decimals: 8,
    icon: "B",
    color: "#f7931a",
    priceUSD: 67234.12,
    change24h: 0.56,
  },
};

export function getToken(symbol: string): TokenConfig | undefined {
  return TOKENS[symbol];
}

export function getTokenPrice(symbol: string): number {
  return TOKENS[symbol]?.priceUSD ?? 0;
}

export function getAllTokenSymbols(): string[] {
  return Object.keys(TOKENS);
}
