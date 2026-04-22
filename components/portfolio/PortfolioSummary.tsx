"use client";

import { Card } from "@/components/ui/Card";
import { formatUSD, formatPercent } from "@/lib/utils";

interface PortfolioSummaryProps {
  totalValue: number;
  change24h: number;
  change24hPercent: number;
  chainCount: number;
  tokenCount: number;
}

export function PortfolioSummary({
  totalValue,
  change24h,
  change24hPercent,
  chainCount,
  tokenCount,
}: PortfolioSummaryProps) {
  const isPositive = change24hPercent >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card variant="elevated" className="md:col-span-1">
        <p className="text-sm text-surface-500 mb-1">Total Portfolio Value</p>
        <p className="text-3xl font-bold text-surface-900">
          {formatUSD(totalValue)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {formatPercent(change24hPercent)}
          </span>
          <span className="text-sm text-surface-500">
            ({isPositive ? "+" : ""}
            {formatUSD(change24h)}) 24h
          </span>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-surface-500 mb-1">Active Minitias</p>
        <p className="text-3xl font-bold text-surface-900">{chainCount}</p>
        <p className="text-sm text-surface-500 mt-2">
          Chains with balances
        </p>
      </Card>

      <Card>
        <p className="text-sm text-surface-500 mb-1">Unique Tokens</p>
        <p className="text-3xl font-bold text-surface-900">{tokenCount}</p>
        <p className="text-sm text-surface-500 mt-2">
          Across all Minitias
        </p>
      </Card>
    </div>
  );
}
