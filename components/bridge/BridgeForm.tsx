"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MinitiaSelector } from "./MinitiaSelector";
import { TokenSelector } from "./TokenSelector";
import { useBridgeQuote } from "@/hooks/useBridge";
import { formatUSD, formatToken } from "@/lib/utils";
import type { MinitiaConfig } from "@/lib/config/minitias";
import type { TokenConfig } from "@/lib/config/tokens";

export function BridgeForm() {
  const [source, setSource] = useState<MinitiaConfig | null>(null);
  const [destination, setDestination] = useState<MinitiaConfig | null>(null);
  const [token, setToken] = useState<TokenConfig | null>(null);
  const [amount, setAmount] = useState("");

  const parsedAmount = parseFloat(amount) || 0;

  const { data: quote, isLoading: quoteLoading } = useBridgeQuote(
    source?.id ?? "",
    destination?.id ?? "",
    token?.symbol ?? "",
    parsedAmount
  );

  const handleSwapDirection = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const canBridge =
    source && destination && token && parsedAmount > 0 && quote;

  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Bridge Assets</CardTitle>
        </CardHeader>

        <div className="space-y-6">
          <MinitiaSelector
            label="From"
            selected={source}
            onChange={setSource}
            exclude={destination?.id}
          />

          <div className="flex justify-center">
            <button
              onClick={handleSwapDirection}
              className="p-2 rounded-full border border-surface-200 hover:bg-surface-50 transition-colors"
            >
              <svg
                className="w-5 h-5 text-surface-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
          </div>

          <MinitiaSelector
            label="To"
            selected={destination}
            onChange={setDestination}
            exclude={source?.id}
          />

          <TokenSelector
            label="Token"
            selected={token}
            onChange={setToken}
            availableTokens={source?.supportedTokens}
          />

          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText={
              token
                ? `Price: ${formatUSD(token.priceUSD)} per ${token.symbol}`
                : undefined
            }
          />
        </div>
      </Card>

      {quote && parsedAmount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bridge Quote</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">You send</span>
              <span className="font-medium text-surface-900">
                {formatToken(quote.amount)} {quote.token}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">You receive</span>
              <span className="font-medium text-emerald-600">
                {formatToken(quote.estimatedReceive)} {quote.token}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Bridge fee</span>
              <span className="text-surface-700">
                {formatToken(quote.fee)} {quote.token} ({formatUSD(quote.feeUSD)}
                )
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Est. time</span>
              <span className="text-surface-700">~{quote.estimatedTime}s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-surface-500">Route</span>
              <span className="text-surface-700">
                {quote.route.join(" -> ")}
              </span>
            </div>
          </div>
        </Card>
      )}

      <Button
        size="lg"
        className="w-full"
        disabled={!canBridge}
        isLoading={quoteLoading}
      >
        {!source
          ? "Select source chain"
          : !destination
          ? "Select destination chain"
          : !token
          ? "Select token"
          : parsedAmount <= 0
          ? "Enter amount"
          : "Bridge"}
      </Button>
    </div>
  );
}
