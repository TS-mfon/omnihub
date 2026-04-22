import { MINITIAS, type MinitiaConfig } from "@/lib/config/minitias";
import { TOKENS, type TokenConfig } from "@/lib/config/tokens";

export interface Balance {
  token: TokenConfig;
  amount: number;
  valueUSD: number;
  minitia: MinitiaConfig;
}

export interface PortfolioData {
  totalValueUSD: number;
  change24h: number;
  change24hPercent: number;
  balances: Balance[];
  allocationByChain: { name: string; value: number; color: string }[];
  allocationByToken: { name: string; value: number; color: string }[];
}

export interface BridgeQuote {
  sourceChain: string;
  destChain: string;
  token: string;
  amount: number;
  estimatedReceive: number;
  fee: number;
  feeUSD: number;
  estimatedTime: number;
  route: string[];
}

export interface SwapQuote {
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOut: number;
  priceImpact: number;
  fee: number;
  route: string[];
  minitia: string;
}

// Mock balances for demo
const MOCK_BALANCES: Record<string, Record<string, number>> = {
  "initia-l1": {
    INIT: 15420.5,
    USDC: 8750.0,
    ETH: 2.34,
    TIA: 520.0,
    ATOM: 180.5,
  },
  minimove: {
    INIT: 5200.0,
    USDC: 3100.0,
    ETH: 0.85,
    MOVE: 12000.0,
  },
  minievm: {
    INIT: 8900.0,
    USDC: 12500.0,
    ETH: 4.2,
    WBTC: 0.15,
    DAI: 2200.0,
  },
  miniwasm: {
    INIT: 3400.0,
    USDC: 1800.0,
    ATOM: 250.0,
    OSMO: 3200.0,
  },
  tucana: {
    INIT: 6700.0,
    USDC: 9800.0,
    ETH: 1.5,
    TIA: 800.0,
  },
  blackwing: {
    INIT: 2100.0,
    USDC: 15000.0,
    ETH: 3.0,
    BTC: 0.08,
  },
  noon: {
    INIT: 1200.0,
    USDC: 500.0,
  },
};

export function getMockPortfolio(): PortfolioData {
  const balances: Balance[] = [];
  const chainAllocation: Record<string, { value: number; color: string }> = {};
  const tokenAllocation: Record<string, { value: number; color: string }> = {};

  for (const minitia of MINITIAS) {
    const chainBalances = MOCK_BALANCES[minitia.id];
    if (!chainBalances) continue;

    let chainTotal = 0;

    for (const [symbol, amount] of Object.entries(chainBalances)) {
      const token = TOKENS[symbol];
      if (!token) continue;

      const valueUSD = amount * token.priceUSD;
      chainTotal += valueUSD;

      balances.push({
        token,
        amount,
        valueUSD,
        minitia,
      });

      if (!tokenAllocation[symbol]) {
        tokenAllocation[symbol] = { value: 0, color: token.color };
      }
      tokenAllocation[symbol].value += valueUSD;
    }

    chainAllocation[minitia.name] = { value: chainTotal, color: minitia.color };
  }

  const totalValueUSD = balances.reduce((sum, b) => sum + b.valueUSD, 0);
  const change24h = totalValueUSD * 0.0234;

  return {
    totalValueUSD,
    change24h,
    change24hPercent: 2.34,
    balances: balances.sort((a, b) => b.valueUSD - a.valueUSD),
    allocationByChain: Object.entries(chainAllocation).map(([name, data]) => ({
      name,
      value: data.value,
      color: data.color,
    })),
    allocationByToken: Object.entries(tokenAllocation)
      .map(([name, data]) => ({
        name,
        value: data.value,
        color: data.color,
      }))
      .sort((a, b) => b.value - a.value),
  };
}

export function getMockBridgeQuote(
  sourceChain: string,
  destChain: string,
  token: string,
  amount: number
): BridgeQuote {
  const fee = amount * 0.001;
  const tokenConfig = TOKENS[token];
  return {
    sourceChain,
    destChain,
    token,
    amount,
    estimatedReceive: amount - fee,
    fee,
    feeUSD: fee * (tokenConfig?.priceUSD ?? 0),
    estimatedTime: 15,
    route: [sourceChain, "initia-l1", destChain].filter(
      (c, i, arr) => arr.indexOf(c) === i
    ),
  };
}

export function getMockSwapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  minitia: string
): SwapQuote {
  const priceIn = TOKENS[tokenIn]?.priceUSD ?? 1;
  const priceOut = TOKENS[tokenOut]?.priceUSD ?? 1;
  const rate = priceIn / priceOut;
  const fee = 0.003;
  const amountOut = amountIn * rate * (1 - fee);

  return {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    priceImpact: 0.12,
    fee,
    route: [tokenIn, tokenOut],
    minitia,
  };
}
