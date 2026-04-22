"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TokenSelector } from "@/components/bridge/TokenSelector";
import { Badge } from "@/components/ui/Badge";
import { useQuery } from "@tanstack/react-query";
import { fetchSwapQuote } from "@/lib/initia/queries";
import { formatToken, formatUSD, formatPercent } from "@/lib/utils";
import { TOKENS, type TokenConfig } from "@/lib/config/tokens";
import { getActiveMinitias, type MinitiaConfig } from "@/lib/config/minitias";

export function SwapInterface() {
  const [tokenIn, setTokenIn] = useState<TokenConfig | null>(TOKENS.INIT ?? null);
  const [tokenOut, setTokenOut] = useState<TokenConfig | null>(TOKENS.USDC ?? null);
  const [amountIn, setAmountIn] = useState("");
  const [selectedMinitia, setSelectedMinitia] = useState<MinitiaConfig>(
    getActiveMinitias()[0]
  );

  const parsedAmount = parseFloat(amountIn) || 0;

  const { data: quote, isLoading } = useQuery({
    queryKey: [
      "swapQuote",
      tokenIn?.symbol,
      tokenOut?.symbol,
      parsedAmount,
      selectedMinitia.id,
    ],
    queryFn: () =>
      fetchSwapQuote(
        tokenIn!.symbol,
        tokenOut!.symbol,
        parsedAmount,
        selectedMinitia.id
      ),
    enabled: !!tokenIn && !!tokenOut && parsedAmount > 0,
    staleTime: 10000,
  });

  const handleSwapTokens = () => {
    const tempIn = tokenIn;
    setTokenIn(tokenOut);
    setTokenOut(tempIn);
    setAmountIn("");
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Minitia selection */}
      <Card>
        <p className="text-sm font-medium text-surface-700 mb-2">
          Swap on
        </p>
        <div className="flex flex-wrap gap-2">
          {getActiveMinitias().map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMinitia(m)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                selectedMinitia.id === m.id
                  ? "border-2 shadow-sm"
                  : "border-surface-200 hover:bg-surface-50"
              }`}
              style={
                selectedMinitia.id === m.id
                  ? {
                      borderColor: m.color,
                      backgroundColor: `${m.color}10`,
                      color: m.color,
                    }
                  : undefined
              }
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                style={{ backgroundColor: m.color }}
              >
                {m.icon}
              </span>
              {m.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Swap form */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Swap</CardTitle>
          <Badge variant="info">{selectedMinitia.vmType}</Badge>
        </CardHeader>

        <div className="space-y-4">
          {/* From token */}
          <div className="bg-surface-50 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-surface-500">You pay</span>
              {tokenIn && (
                <span className="text-xs text-surface-500">
                  {formatUSD(parsedAmount * tokenIn.priceUSD)}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="0.00"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                className="flex-1 bg-transparent text-2xl font-medium text-surface-900 placeholder:text-surface-300 focus:outline-none min-w-0"
              />
              {tokenIn && (
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-surface-200 hover:bg-surface-50 transition-colors flex-shrink-0"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ backgroundColor: tokenIn.color }}
                  >
                    {tokenIn.icon}
                  </div>
                  <span className="text-sm font-medium">{tokenIn.symbol}</span>
                </button>
              )}
            </div>
          </div>

          {/* Swap direction button */}
          <div className="flex justify-center -my-1">
            <button
              onClick={handleSwapTokens}
              className="p-2 rounded-full border border-surface-200 bg-white hover:bg-surface-50 transition-colors shadow-sm z-10"
            >
              <svg
                className="w-4 h-4 text-surface-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
          </div>

          {/* To token */}
          <div className="bg-surface-50 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-surface-500">You receive</span>
              {quote && tokenOut && (
                <span className="text-xs text-surface-500">
                  {formatUSD(quote.amountOut * tokenOut.priceUSD)}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <div className="flex-1 text-2xl font-medium text-surface-900 min-w-0">
                {quote ? formatToken(quote.amountOut) : "0.00"}
              </div>
              {tokenOut && (
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-surface-200 hover:bg-surface-50 transition-colors flex-shrink-0"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ backgroundColor: tokenOut.color }}
                  >
                    {tokenOut.icon}
                  </div>
                  <span className="text-sm font-medium">{tokenOut.symbol}</span>
                </button>
              )}
            </div>
          </div>

          {/* Token selectors */}
          <div className="grid grid-cols-2 gap-4">
            <TokenSelector
              label="From token"
              selected={tokenIn}
              onChange={setTokenIn}
              availableTokens={selectedMinitia.supportedTokens}
            />
            <TokenSelector
              label="To token"
              selected={tokenOut}
              onChange={setTokenOut}
              availableTokens={selectedMinitia.supportedTokens}
            />
          </div>
        </div>
      </Card>

      {/* Quote details */}
      {quote && parsedAmount > 0 && (
        <Card>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-surface-500">Rate</span>
              <span className="text-surface-900">
                1 {tokenIn?.symbol} ={" "}
                {formatToken(quote.amountOut / quote.amountIn)}{" "}
                {tokenOut?.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Price impact</span>
              <span className="text-surface-900">
                {formatPercent(-quote.priceImpact)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Swap fee</span>
              <span className="text-surface-900">
                {(quote.fee * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-surface-500">Route</span>
              <span className="text-surface-900">
                {quote.route.join(" -> ")}
              </span>
            </div>
          </div>
        </Card>
      )}

      <Button
        size="lg"
        className="w-full"
        disabled={!tokenIn || !tokenOut || parsedAmount <= 0}
        isLoading={isLoading}
      >
        {!tokenIn || !tokenOut
          ? "Select tokens"
          : parsedAmount <= 0
          ? "Enter amount"
          : "Swap"}
      </Button>
    </div>
  );
}
