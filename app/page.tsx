"use client";

import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { AllocationChart } from "@/components/portfolio/AllocationChart";
import { AssetTable } from "@/components/portfolio/AssetTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMockPortfolio } from "@/lib/initia/client";
import { getActiveMinitias } from "@/lib/config/minitias";
import { formatUSD } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const portfolio = getMockPortfolio();
  const minitias = getActiveMinitias();

  const uniqueChains = new Set(portfolio.balances.map((b) => b.minitia.id)).size;
  const uniqueTokens = new Set(portfolio.balances.map((b) => b.token.symbol)).size;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-sm text-surface-500 mt-1">
          Your portfolio overview across all Initia Minitias
        </p>
      </div>

      {/* Portfolio summary cards */}
      <PortfolioSummary
        totalValue={portfolio.totalValueUSD}
        change24h={portfolio.change24h}
        change24hPercent={portfolio.change24hPercent}
        chainCount={uniqueChains}
        tokenCount={uniqueTokens}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AllocationChart
          title="Allocation by Chain"
          data={portfolio.allocationByChain}
        />
        <AllocationChart
          title="Allocation by Token"
          data={portfolio.allocationByToken}
        />
      </div>

      {/* Active Minitias quick view */}
      <Card>
        <CardHeader>
          <CardTitle>Active Minitias</CardTitle>
          <Link href="/explore">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {minitias.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-surface-200 hover:bg-surface-50 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: m.color }}
              >
                {m.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-surface-900 truncate">
                  {m.name}
                </p>
                <p className="text-xs text-surface-500">
                  {formatUSD(m.tvl)} TVL
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/bridge">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-initia-50 flex items-center justify-center text-initia-600 group-hover:bg-initia-100 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900">Bridge</p>
                <p className="text-xs text-surface-500">Transfer between Minitias</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/swap">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.182" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900">Swap</p>
                <p className="text-xs text-surface-500">Exchange tokens</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/yield">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-900">Yield</p>
                <p className="text-xs text-surface-500">Track DeFi positions</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Top assets table */}
      <AssetTable balances={portfolio.balances} limit={10} />
    </div>
  );
}
