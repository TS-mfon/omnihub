"use client";

import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { AllocationChart } from "@/components/portfolio/AllocationChart";
import { AssetTable } from "@/components/portfolio/AssetTable";
import { getMockPortfolio } from "@/lib/initia/client";

export default function PortfolioPage() {
  const portfolio = getMockPortfolio();

  const uniqueChains = new Set(portfolio.balances.map((b) => b.minitia.id)).size;
  const uniqueTokens = new Set(portfolio.balances.map((b) => b.token.symbol)).size;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Portfolio</h1>
        <p className="text-sm text-surface-500 mt-1">
          Detailed view of your balances across all Minitias
        </p>
      </div>

      <PortfolioSummary
        totalValue={portfolio.totalValueUSD}
        change24h={portfolio.change24h}
        change24hPercent={portfolio.change24hPercent}
        chainCount={uniqueChains}
        tokenCount={uniqueTokens}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AllocationChart
          title="By Chain"
          data={portfolio.allocationByChain}
        />
        <AllocationChart
          title="By Token"
          data={portfolio.allocationByToken}
        />
      </div>

      <AssetTable balances={portfolio.balances} />
    </div>
  );
}
