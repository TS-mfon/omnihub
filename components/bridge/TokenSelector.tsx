"use client";

import { cn } from "@/lib/utils";
import { TOKENS, type TokenConfig } from "@/lib/config/tokens";

interface TokenSelectorProps {
  label: string;
  selected: TokenConfig | null;
  onChange: (token: TokenConfig) => void;
  availableTokens?: string[];
}

export function TokenSelector({
  label,
  selected,
  onChange,
  availableTokens,
}: TokenSelectorProps) {
  const tokens = availableTokens
    ? availableTokens.map((s) => TOKENS[s]).filter(Boolean)
    : Object.values(TOKENS);

  return (
    <div>
      <label className="block text-sm font-medium text-surface-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {tokens.map((token) => (
          <button
            key={token.symbol}
            onClick={() => onChange(token)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
              selected?.symbol === token.symbol
                ? "border-2 shadow-sm"
                : "border-surface-200 hover:border-surface-300 hover:bg-surface-50"
            )}
            style={
              selected?.symbol === token.symbol
                ? {
                    borderColor: token.color,
                    backgroundColor: `${token.color}10`,
                  }
                : undefined
            }
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ backgroundColor: token.color }}
            >
              {token.icon}
            </div>
            <span className="text-sm font-medium text-surface-900">
              {token.symbol}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
