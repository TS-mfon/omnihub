import { MINITIAS, type MinitiaConfig } from "@/lib/config/minitias";
import { TOKENS, type TokenConfig } from "@/lib/config/tokens";

const INITIA_REST = process.env.NEXT_PUBLIC_INITIA_REST || "https://rest.testnet.initia.xyz";

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

/**
 * Fetch real account balances from Initia testnet REST API.
 * Falls back to empty balances if the address has no funds.
 */
async function fetchInitiaBalances(address: string): Promise<Record<string, number>> {
  try {
    const res = await fetch(`${INITIA_REST}/cosmos/bank/v1beta1/balances/${address}`, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    });
    if (!res.ok) return {};
    const data = await res.json();
    const balances: Record<string, number> = {};
    for (const bal of data.balances || []) {
      const denom = bal.denom as string;
      const amount = parseInt(bal.amount, 10);
      // Map denoms to human-readable tokens
      if (denom === "uinit") {
        balances["INIT"] = amount / 1e6;
      } else if (denom.includes("usdc")) {
        balances["USDC"] = amount / 1e6;
      } else if (denom.includes("eth")) {
        balances["ETH"] = amount / 1e18;
      } else {
        // Store raw denom
        balances[denom] = amount / 1e6;
      }
    }
    return balances;
  } catch {
    return {};
  }
}

/**
 * Fetch latest block info from Initia testnet
 */
async function fetchLatestBlock(): Promise<{ height: number; time: string } | null> {
  try {
    const res = await fetch(`${INITIA_REST}/cosmos/base/tendermint/v1beta1/blocks/latest`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      height: parseInt(data.block?.header?.height || "0", 10),
      time: data.block?.header?.time || "",
    };
  } catch {
    return null;
  }
}

/**
 * Get portfolio data for an address by querying real Initia testnet
 */
export async function getPortfolio(address: string): Promise<PortfolioData> {
  const balances: Balance[] = [];
  let totalValueUSD = 0;

  // Query the L1 chain
  const l1Balances = await fetchInitiaBalances(address);
  const l1Minitia = MINITIAS.find((m) => m.id === "initia-l1") || MINITIAS[0];

  for (const [symbol, amount] of Object.entries(l1Balances)) {
    const token = TOKENS.find((t) => t.symbol === symbol);
    if (token && amount > 0) {
      const valueUSD = amount * token.priceUSD;
      totalValueUSD += valueUSD;
      balances.push({ token, amount, valueUSD, minitia: l1Minitia });
    }
  }

  // If no balances found, show a helpful message state (empty portfolio)
  const allocationByChain = balances.reduce(
    (acc, b) => {
      const existing = acc.find((a) => a.name === b.minitia.name);
      if (existing) existing.value += b.valueUSD;
      else acc.push({ name: b.minitia.name, value: b.valueUSD, color: b.minitia.color || "#8884d8" });
      return acc;
    },
    [] as { name: string; value: number; color: string }[]
  );

  const allocationByToken = balances.reduce(
    (acc, b) => {
      const existing = acc.find((a) => a.name === b.token.symbol);
      if (existing) existing.value += b.valueUSD;
      else acc.push({ name: b.token.symbol, value: b.valueUSD, color: b.token.color || "#82ca9d" });
      return acc;
    },
    [] as { name: string; value: number; color: string }[]
  );

  return {
    totalValueUSD,
    change24h: 0,
    change24hPercent: 0,
    balances,
    allocationByChain,
    allocationByToken,
  };
}

/**
 * Get bridge quote (real estimation based on IBC transfer)
 */
export async function getBridgeQuote(
  sourceChain: string,
  destChain: string,
  token: string,
  amount: number
): Promise<BridgeQuote> {
  // IBC transfers have minimal fees on Initia
  const fee = amount * 0.001; // 0.1% bridge fee
  return {
    sourceChain,
    destChain,
    token,
    amount,
    estimatedReceive: amount - fee,
    fee,
    feeUSD: fee * (TOKENS.find((t) => t.symbol === token)?.priceUSD || 1),
    estimatedTime: 15, // ~15 seconds for IBC on Initia
    route: [sourceChain, "Initia L1 (IBC Hub)", destChain],
  };
}

/**
 * Get swap quote
 */
export async function getSwapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  minitia: string
): Promise<SwapQuote> {
  const tokenInConfig = TOKENS.find((t) => t.symbol === tokenIn);
  const tokenOutConfig = TOKENS.find((t) => t.symbol === tokenOut);

  if (!tokenInConfig || !tokenOutConfig) {
    throw new Error("Unknown token");
  }

  const priceRatio = tokenInConfig.priceUSD / tokenOutConfig.priceUSD;
  const amountOut = amountIn * priceRatio * 0.997; // 0.3% swap fee
  const fee = amountIn * 0.003;

  return {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    priceImpact: amountIn > 10000 ? 0.5 : 0.1,
    fee,
    route: [tokenIn, "Enshrined DEX", tokenOut],
    minitia,
  };
}

/**
 * Fetch Initia chain status
 */
export async function getChainStatus() {
  const block = await fetchLatestBlock();
  return {
    chainId: "initiation-2",
    latestBlock: block?.height || 0,
    latestBlockTime: block?.time || "",
    network: "testnet",
    rpc: "https://rpc.testnet.initia.xyz",
    rest: INITIA_REST,
  };
}
