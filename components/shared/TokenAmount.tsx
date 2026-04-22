import { formatToken, formatUSD } from "@/lib/utils";
import { getToken } from "@/lib/config/tokens";

interface TokenAmountProps {
  symbol: string;
  amount: number;
  showUSD?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TokenAmount({
  symbol,
  amount,
  showUSD = true,
  showIcon = true,
  size = "md",
}: TokenAmountProps) {
  const token = getToken(symbol);
  if (!token) return null;

  const valueUSD = amount * token.priceUSD;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
          style={{ backgroundColor: token.color }}
        >
          {token.icon}
        </div>
      )}
      <div>
        <p className={`font-medium text-surface-900 ${sizeClasses[size]}`}>
          {formatToken(amount)} {symbol}
        </p>
        {showUSD && (
          <p className="text-xs text-surface-500">{formatUSD(valueUSD)}</p>
        )}
      </div>
    </div>
  );
}
