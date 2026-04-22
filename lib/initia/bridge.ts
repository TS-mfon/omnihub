import { getMinitiaById, type MinitiaConfig } from "@/lib/config/minitias";
import { getToken, type TokenConfig } from "@/lib/config/tokens";

export interface BridgeRoute {
  id: string;
  source: MinitiaConfig;
  destination: MinitiaConfig;
  token: TokenConfig;
  estimatedTime: number;
  fee: number;
  available: boolean;
}

export interface BridgeTransaction {
  id: string;
  sourceChain: string;
  destChain: string;
  token: string;
  amount: number;
  status: "pending" | "confirming" | "completed" | "failed";
  txHash: string;
  timestamp: number;
}

const BRIDGE_ROUTES: [string, string][] = [
  ["initia-l1", "minimove"],
  ["initia-l1", "minievm"],
  ["initia-l1", "miniwasm"],
  ["initia-l1", "tucana"],
  ["initia-l1", "blackwing"],
  ["initia-l1", "noon"],
  ["minimove", "minievm"],
  ["minimove", "miniwasm"],
  ["minievm", "miniwasm"],
  ["tucana", "minievm"],
  ["blackwing", "minievm"],
];

export function getAvailableRoutes(
  sourceId: string,
  destId: string
): boolean {
  return BRIDGE_ROUTES.some(
    ([a, b]) =>
      (a === sourceId && b === destId) || (b === sourceId && a === destId)
  );
}

export function getBridgeRoutes(
  sourceId: string,
  tokenSymbol: string
): BridgeRoute[] {
  const source = getMinitiaById(sourceId);
  const token = getToken(tokenSymbol);
  if (!source || !token) return [];

  return BRIDGE_ROUTES.filter(
    ([a, b]) => a === sourceId || b === sourceId
  ).map(([a, b]) => {
    const destId = a === sourceId ? b : a;
    const dest = getMinitiaById(destId)!;
    return {
      id: `${sourceId}-${destId}-${tokenSymbol}`,
      source,
      destination: dest,
      token,
      estimatedTime: a === "initia-l1" || b === "initia-l1" ? 15 : 30,
      fee: 0.001,
      available: dest.supportedTokens.includes(tokenSymbol),
    };
  });
}

export function getMockBridgeHistory(): BridgeTransaction[] {
  return [
    {
      id: "1",
      sourceChain: "Initia L1",
      destChain: "MiniEVM",
      token: "USDC",
      amount: 5000,
      status: "completed",
      txHash: "0xabc123...def456",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      sourceChain: "MiniMove",
      destChain: "Initia L1",
      token: "INIT",
      amount: 1200,
      status: "completed",
      txHash: "0x789abc...123def",
      timestamp: Date.now() - 7200000,
    },
    {
      id: "3",
      sourceChain: "Initia L1",
      destChain: "Tucana",
      token: "ETH",
      amount: 0.5,
      status: "confirming",
      txHash: "0xdef789...abc123",
      timestamp: Date.now() - 300000,
    },
  ];
}
