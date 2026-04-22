"use client";

import { MinitiaGrid } from "@/components/explore/MinitiaGrid";
import { Card } from "@/components/ui/Card";
import { MINITIAS } from "@/lib/config/minitias";
import { formatUSD } from "@/lib/utils";

export default function ExplorePage() {
  const totalTVL = MINITIAS.reduce((sum, m) => sum + m.tvl, 0);
  const activeCount = MINITIAS.filter((m) => m.status === "active").length;
  const vmTypes = new Set(MINITIAS.map((m) => m.vmType)).size;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">
          Explore Minitias
        </h1>
        <p className="text-sm text-surface-500 mt-1">
          Browse all Minitias in the Initia ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-surface-500 mb-1">Total TVL</p>
          <p className="text-2xl font-bold text-surface-900">
            {formatUSD(totalTVL)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-surface-500 mb-1">Active Minitias</p>
          <p className="text-2xl font-bold text-surface-900">{activeCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-surface-500 mb-1">VM Types</p>
          <p className="text-2xl font-bold text-surface-900">{vmTypes}</p>
          <p className="text-xs text-surface-500 mt-1">
            MoveVM, EVM, WasmVM
          </p>
        </Card>
      </div>

      <MinitiaGrid minitias={MINITIAS} />
    </div>
  );
}
