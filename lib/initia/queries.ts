import {
  getMockPortfolio,
  getMockBridgeQuote,
  getMockSwapQuote,
  type PortfolioData,
  type BridgeQuote,
  type SwapQuote,
} from "./client";
import { MINITIAS, type MinitiaConfig } from "@/lib/config/minitias";
import { TOKENS } from "@/lib/config/tokens";

// Simulated API delay
async function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchPortfolio(address: string): Promise<PortfolioData> {
  await simulateDelay(800);
  return getMockPortfolio();
}

export async function fetchBridgeQuote(
  sourceChain: string,
  destChain: string,
  token: string,
  amount: number
): Promise<BridgeQuote> {
  await simulateDelay(600);
  return getMockBridgeQuote(sourceChain, destChain, token, amount);
}

export async function fetchSwapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  minitia: string
): Promise<SwapQuote> {
  await simulateDelay(400);
  return getMockSwapQuote(tokenIn, tokenOut, amountIn, minitia);
}

export async function fetchMinitias(): Promise<MinitiaConfig[]> {
  await simulateDelay(300);
  return MINITIAS;
}

export async function fetchPrices(): Promise<
  Record<string, { price: number; change24h: number }>
> {
  await simulateDelay(200);
  const prices: Record<string, { price: number; change24h: number }> = {};
  for (const [symbol, token] of Object.entries(TOKENS)) {
    prices[symbol] = {
      price: token.priceUSD,
      change24h: token.change24h,
    };
  }
  return prices;
}

export interface YieldPosition {
  id: string;
  protocol: string;
  minitia: string;
  minitiaColor: string;
  type: "staking" | "lp" | "lending" | "vault";
  tokens: string[];
  deposited: number;
  currentValue: number;
  apy: number;
  rewards: number;
  rewardToken: string;
}

export async function fetchYieldPositions(): Promise<YieldPosition[]> {
  await simulateDelay(600);
  return [
    {
      id: "1",
      protocol: "Initia Staking",
      minitia: "Initia L1",
      minitiaColor: "#4263eb",
      type: "staking",
      tokens: ["INIT"],
      deposited: 25000,
      currentValue: 28520,
      apy: 14.2,
      rewards: 1240,
      rewardToken: "INIT",
    },
    {
      id: "2",
      protocol: "Tucana DEX",
      minitia: "Tucana",
      minitiaColor: "#ea580c",
      type: "lp",
      tokens: ["INIT", "USDC"],
      deposited: 10000,
      currentValue: 10890,
      apy: 32.5,
      rewards: 456,
      rewardToken: "INIT",
    },
    {
      id: "3",
      protocol: "MiniLend",
      minitia: "MiniEVM",
      minitiaColor: "#059669",
      type: "lending",
      tokens: ["USDC"],
      deposited: 15000,
      currentValue: 15340,
      apy: 8.7,
      rewards: 120,
      rewardToken: "USDC",
    },
    {
      id: "4",
      protocol: "MoveVault",
      minitia: "MiniMove",
      minitiaColor: "#7c3aed",
      type: "vault",
      tokens: ["ETH"],
      deposited: 8500,
      currentValue: 9120,
      apy: 5.4,
      rewards: 85,
      rewardToken: "INIT",
    },
    {
      id: "5",
      protocol: "Blackwing Perps",
      minitia: "Blackwing",
      minitiaColor: "#1e293b",
      type: "vault",
      tokens: ["USDC"],
      deposited: 20000,
      currentValue: 21450,
      apy: 18.3,
      rewards: 890,
      rewardToken: "USDC",
    },
  ];
}

export interface ActivityItem {
  id: string;
  type: "bridge" | "swap" | "send" | "receive" | "stake" | "unstake";
  minitia: string;
  minitiaColor: string;
  token: string;
  amount: number;
  valueUSD: number;
  status: "completed" | "pending" | "failed";
  txHash: string;
  timestamp: number;
  details?: string;
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  await simulateDelay(500);
  const now = Date.now();
  return [
    {
      id: "1",
      type: "bridge",
      minitia: "Initia L1 -> MiniEVM",
      minitiaColor: "#4263eb",
      token: "USDC",
      amount: 5000,
      valueUSD: 5000,
      status: "completed",
      txHash: "0xabc...123",
      timestamp: now - 1800000,
      details: "Bridged via OPinit",
    },
    {
      id: "2",
      type: "swap",
      minitia: "Tucana",
      minitiaColor: "#ea580c",
      token: "INIT",
      amount: 1000,
      valueUSD: 1850,
      status: "completed",
      txHash: "0xdef...456",
      timestamp: now - 3600000,
      details: "Swapped INIT for USDC",
    },
    {
      id: "3",
      type: "stake",
      minitia: "Initia L1",
      minitiaColor: "#4263eb",
      token: "INIT",
      amount: 5000,
      valueUSD: 9250,
      status: "completed",
      txHash: "0xghi...789",
      timestamp: now - 7200000,
    },
    {
      id: "4",
      type: "receive",
      minitia: "MiniMove",
      minitiaColor: "#7c3aed",
      token: "MOVE",
      amount: 2500,
      valueUSD: 1625,
      status: "completed",
      txHash: "0xjkl...012",
      timestamp: now - 14400000,
    },
    {
      id: "5",
      type: "bridge",
      minitia: "MiniEVM -> Blackwing",
      minitiaColor: "#059669",
      token: "ETH",
      amount: 1.5,
      valueUSD: 4868.5,
      status: "pending",
      txHash: "0xmno...345",
      timestamp: now - 600000,
    },
    {
      id: "6",
      type: "send",
      minitia: "Initia L1",
      minitiaColor: "#4263eb",
      token: "INIT",
      amount: 200,
      valueUSD: 370,
      status: "completed",
      txHash: "0xpqr...678",
      timestamp: now - 86400000,
    },
  ];
}
