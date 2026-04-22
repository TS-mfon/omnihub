"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchYieldPositions } from "@/lib/initia/queries";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatUSD, formatPercent } from "@/lib/utils";

export default function YieldPage() {
  const { data: positions, isLoading } = useQuery({
    queryKey: ["yieldPositions"],
    queryFn: fetchYieldPositions,
  });

  const totalDeposited =
    positions?.reduce((sum, p) => sum + p.deposited, 0) ?? 0;
  const totalCurrent =
    positions?.reduce((sum, p) => sum + p.currentValue, 0) ?? 0;
  const totalRewards =
    positions?.reduce((sum, p) => sum + p.rewards, 0) ?? 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Yield</h1>
        <p className="text-sm text-surface-500 mt-1">
          Track your DeFi positions across all Minitias
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="elevated">
          <p className="text-sm text-surface-500 mb-1">Total Deposited</p>
          <p className="text-2xl font-bold text-surface-900">
            {formatUSD(totalDeposited)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-surface-500 mb-1">Current Value</p>
          <p className="text-2xl font-bold text-surface-900">
            {formatUSD(totalCurrent)}
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            {formatPercent(
              totalDeposited > 0
                ? ((totalCurrent - totalDeposited) / totalDeposited) * 100
                : 0
            )}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-surface-500 mb-1">Total Rewards</p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatUSD(totalRewards)}
          </p>
        </Card>
      </div>

      {/* Positions */}
      {isLoading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-initia-600 border-t-transparent rounded-full" />
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className="p-5 pb-0">
            <CardHeader>
              <CardTitle>Active Positions</CardTitle>
              <span className="text-sm text-surface-500">
                {positions?.length ?? 0} positions
              </span>
            </CardHeader>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    Protocol
                  </th>
                  <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    Chain
                  </th>
                  <th className="text-left text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    Type
                  </th>
                  <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    Deposited
                  </th>
                  <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    Current
                  </th>
                  <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    APY
                  </th>
                  <th className="text-right text-xs font-medium text-surface-500 uppercase tracking-wider px-5 py-3">
                    Rewards
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {positions?.map((pos) => (
                  <tr key={pos.id} className="hover:bg-surface-50">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-surface-900">
                          {pos.protocol}
                        </p>
                        <p className="text-xs text-surface-500">
                          {pos.tokens.join(" / ")}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: `${pos.minitiaColor}10`,
                          borderColor: `${pos.minitiaColor}30`,
                          color: pos.minitiaColor,
                        }}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: pos.minitiaColor }}
                        />
                        {pos.minitia}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge>{pos.type}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-surface-900">
                      {formatUSD(pos.deposited)}
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-medium text-surface-900">
                      {formatUSD(pos.currentValue)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-semibold text-emerald-600">
                        {pos.apy.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div>
                        <p className="text-sm font-medium text-emerald-600">
                          {formatUSD(pos.rewards)}
                        </p>
                        <p className="text-xs text-surface-500">
                          {pos.rewardToken}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
