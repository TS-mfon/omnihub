import { NextResponse } from "next/server";
import { TOKENS } from "@/lib/config/tokens";

export async function GET() {
  const prices: Record<
    string,
    { symbol: string; name: string; priceUSD: number; change24h: number }
  > = {};

  for (const [symbol, token] of Object.entries(TOKENS)) {
    prices[symbol] = {
      symbol: token.symbol,
      name: token.name,
      priceUSD: token.priceUSD,
      change24h: token.change24h,
    };
  }

  return NextResponse.json({
    prices,
    updatedAt: new Date().toISOString(),
  });
}
