"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ChainBadge } from "@/components/shared/ChainBadge";
import { formatUSD, formatToken, formatPercent } from "@/lib/utils";
import type { Balance } from "@/lib/initia/client";

interface AssetTableProps {
  balances: Balance[];
  limit?: number;
}

export function AssetTable({ balances, limit }: AssetTableProps) {
  const displayed = limit ? balances.slice(0, limit) : balances;

  return (
    <Card padding="none">
      <div className="p-5 pb-0">
        <CardHeader>
          <CardTitle>Assets</CardTitle>
          <span className="text-sm text-surface-500">
            {balances.length} positions
          </span>
        </CardHeader>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                Token
              </th>
              <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                Chain
              </th>
              <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                Balance
              </th>
              <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                Value
              </th>
              <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                24h
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {displayed.map((balance, i) => (
              <tr
                key={`${balance.minitia.id}-${balance.token.symbol}-${i}`}
                className="hover:bg-surface-50 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: balance.token.color }}
                    >
                      {balance.token.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-900">
                        {balance.token.symbol}
                      </p>
                      <p className="text-xs text-surface-500">
                        {balance.token.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <ChainBadge minitia={balance.minitia} />
                </td>
                <td className="px-5 py-3 text-right">
                  <p className="text-sm font-medium text-surface-900">
                    {formatToken(balance.amount)}
                  </p>
                </td>
                <td className="px-5 py-3 text-right">
                  <p className="text-sm font-medium text-surface-900">
                    {formatUSD(balance.valueUSD)}
                  </p>
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={`text-sm font-medium ${
                      balance.token.change24h >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatPercent(balance.token.change24h)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
