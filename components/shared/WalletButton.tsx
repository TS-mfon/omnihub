"use client";

import { Button } from "@/components/ui/Button";
import { useWallet } from "@/hooks/useWallet";
import { shortenAddress } from "@/lib/utils";

export function WalletButton() {
  const { address, isConnected, isConnecting, connect, disconnect } =
    useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-50 rounded-lg border border-surface-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-mono text-surface-700">
            {shortenAddress(address)}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={connect} isLoading={isConnecting} size="md">
      Connect Wallet
    </Button>
  );
}
