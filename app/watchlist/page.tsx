"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatUSD, shortenAddress } from "@/lib/utils";

interface WatchedWallet {
  address: string;
  label: string;
  totalValue: number;
  chains: number;
  lastActive: string;
}

const MOCK_WATCHLIST: WatchedWallet[] = [
  {
    address: "init1whale8f7k2m9n0p1q2r3s4t5u6v7w8x9y0z",
    label: "Whale Wallet",
    totalValue: 2_450_000,
    chains: 5,
    lastActive: "2m ago",
  },
  {
    address: "init1defi3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o",
    label: "DeFi Power User",
    totalValue: 890_000,
    chains: 4,
    lastActive: "15m ago",
  },
  {
    address: "init1trader9z8y7x6w5v4u3t2s1r0q9p8o7n6m",
    label: "Active Trader",
    totalValue: 125_000,
    chains: 3,
    lastActive: "1h ago",
  },
];

export default function WatchlistPage() {
  const [wallets, setWallets] = useState<WatchedWallet[]>(MOCK_WATCHLIST);
  const [newAddress, setNewAddress] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const handleAdd = () => {
    if (!newAddress) return;
    setWallets([
      ...wallets,
      {
        address: newAddress,
        label: newLabel || "Unnamed",
        totalValue: 0,
        chains: 0,
        lastActive: "Never",
      },
    ]);
    setNewAddress("");
    setNewLabel("");
  };

  const handleRemove = (address: string) => {
    setWallets(wallets.filter((w) => w.address !== address));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Watchlist</h1>
        <p className="text-sm text-surface-500 mt-1">
          Monitor any wallet address across all Minitias
        </p>
      </div>

      {/* Add wallet form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Wallet</CardTitle>
        </CardHeader>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="init1..."
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <Input
              placeholder="Label (optional)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} disabled={!newAddress}>
            Add
          </Button>
        </div>
      </Card>

      {/* Watched wallets */}
      <Card padding="none">
        <div className="p-5 pb-0">
          <CardHeader>
            <CardTitle>Watched Wallets</CardTitle>
            <span className="text-sm text-surface-500">
              {wallets.length} wallets
            </span>
          </CardHeader>
        </div>

        <div className="divide-y divide-surface-100">
          {wallets.map((wallet) => (
            <div
              key={wallet.address}
              className="flex items-center justify-between px-5 py-4 hover:bg-surface-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-initia-400 to-initia-600 flex items-center justify-center text-white text-sm font-bold">
                  {wallet.label[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900">
                    {wallet.label}
                  </p>
                  <p className="text-xs font-mono text-surface-500">
                    {shortenAddress(wallet.address)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-surface-900">
                    {formatUSD(wallet.totalValue)}
                  </p>
                  <p className="text-xs text-surface-500">
                    {wallet.chains} chains
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <Badge variant="info" size="sm">
                    {wallet.lastActive}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(wallet.address)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {wallets.length === 0 && (
            <div className="px-5 py-12 text-center text-surface-500">
              <p className="text-sm">No wallets in your watchlist.</p>
              <p className="text-xs mt-1">
                Add an address above to start monitoring.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
