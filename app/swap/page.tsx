"use client";

import { SwapInterface } from "@/components/swap/SwapInterface";

export default function SwapPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">Swap</h1>
        <p className="text-sm text-surface-500 mt-1">
          Swap tokens across Initia Minitias
        </p>
      </div>

      <SwapInterface />
    </div>
  );
}
