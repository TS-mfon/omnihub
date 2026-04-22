import { NextResponse } from "next/server";
import { getMockSwapQuote } from "@/lib/initia/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tokenIn, tokenOut, amountIn, minitia } = body;

    if (!tokenIn || !tokenOut || !amountIn || !minitia) {
      return NextResponse.json(
        {
          error: "Missing required fields: tokenIn, tokenOut, amountIn, minitia",
        },
        { status: 400 }
      );
    }

    const quote = getMockSwapQuote(tokenIn, tokenOut, amountIn, minitia);
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch swap route" },
      { status: 500 }
    );
  }
}
