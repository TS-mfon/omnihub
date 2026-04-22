export interface MinitiaConfig {
  id: string;
  name: string;
  description: string;
  vmType: "MoveVM" | "EVM" | "WasmVM";
  chainId: string;
  rpcUrl: string;
  restUrl: string;
  explorerUrl: string;
  color: string;
  icon: string;
  tvl: number;
  status: "active" | "upcoming" | "maintenance";
  nativeToken: string;
  supportedTokens: string[];
}

export const MINITIAS: MinitiaConfig[] = [
  {
    id: "initia-l1",
    name: "Initia L1",
    description: "The main Initia Layer 1 chain - the orchestration layer for the entire ecosystem",
    vmType: "MoveVM",
    chainId: "initiation-2",
    rpcUrl: "https://rpc.initia.tech",
    restUrl: "https://rest.initia.tech",
    explorerUrl: "https://scan.initia.tech",
    color: "#4263eb",
    icon: "L1",
    tvl: 245_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC", "ETH", "TIA", "ATOM"],
  },
  {
    id: "minimove",
    name: "MiniMove",
    description: "MoveVM-based Minitia optimized for DeFi applications with high throughput",
    vmType: "MoveVM",
    chainId: "minimove-2",
    rpcUrl: "https://rpc.minimove.initia.tech",
    restUrl: "https://rest.minimove.initia.tech",
    explorerUrl: "https://scan.initia.tech/minimove",
    color: "#7c3aed",
    icon: "MM",
    tvl: 89_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC", "ETH", "MOVE"],
  },
  {
    id: "minievm",
    name: "MiniEVM",
    description: "EVM-compatible Minitia enabling Solidity smart contracts on Initia",
    vmType: "EVM",
    chainId: "minievm-2",
    rpcUrl: "https://rpc.minievm.initia.tech",
    restUrl: "https://rest.minievm.initia.tech",
    explorerUrl: "https://scan.initia.tech/minievm",
    color: "#059669",
    icon: "ME",
    tvl: 156_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC", "ETH", "WBTC", "DAI"],
  },
  {
    id: "miniwasm",
    name: "MiniWasm",
    description: "CosmWasm-powered Minitia for Rust-based smart contracts",
    vmType: "WasmVM",
    chainId: "miniwasm-2",
    rpcUrl: "https://rpc.miniwasm.initia.tech",
    restUrl: "https://rest.miniwasm.initia.tech",
    explorerUrl: "https://scan.initia.tech/miniwasm",
    color: "#dc2626",
    icon: "MW",
    tvl: 67_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC", "ATOM", "OSMO"],
  },
  {
    id: "tucana",
    name: "Tucana",
    description: "Institutional-grade DEX Minitia with advanced order types and deep liquidity",
    vmType: "MoveVM",
    chainId: "tucana-1",
    rpcUrl: "https://rpc.tucana.initia.tech",
    restUrl: "https://rest.tucana.initia.tech",
    explorerUrl: "https://scan.initia.tech/tucana",
    color: "#ea580c",
    icon: "TU",
    tvl: 112_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC", "ETH", "TIA"],
  },
  {
    id: "blackwing",
    name: "Blackwing",
    description: "Derivatives and perpetuals trading Minitia with cross-margin support",
    vmType: "EVM",
    chainId: "blackwing-1",
    rpcUrl: "https://rpc.blackwing.initia.tech",
    restUrl: "https://rest.blackwing.initia.tech",
    explorerUrl: "https://scan.initia.tech/blackwing",
    color: "#1e293b",
    icon: "BW",
    tvl: 78_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC", "ETH", "BTC"],
  },
  {
    id: "noon",
    name: "Noon",
    description: "NFT and gaming focused Minitia with low-latency finality",
    vmType: "WasmVM",
    chainId: "noon-1",
    rpcUrl: "https://rpc.noon.initia.tech",
    restUrl: "https://rest.noon.initia.tech",
    explorerUrl: "https://scan.initia.tech/noon",
    color: "#0ea5e9",
    icon: "NO",
    tvl: 34_000_000,
    status: "active",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC"],
  },
  {
    id: "civitia",
    name: "Civitia",
    description: "Social-fi and governance Minitia for community-driven applications",
    vmType: "MoveVM",
    chainId: "civitia-1",
    rpcUrl: "https://rpc.civitia.initia.tech",
    restUrl: "https://rest.civitia.initia.tech",
    explorerUrl: "https://scan.initia.tech/civitia",
    color: "#d946ef",
    icon: "CV",
    tvl: 0,
    status: "upcoming",
    nativeToken: "INIT",
    supportedTokens: ["INIT", "USDC"],
  },
];

export function getMinitiaById(id: string): MinitiaConfig | undefined {
  return MINITIAS.find((m) => m.id === id);
}

export function getActiveMinitias(): MinitiaConfig[] {
  return MINITIAS.filter((m) => m.status === "active");
}
