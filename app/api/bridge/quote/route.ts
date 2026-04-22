import { NextResponse } from "next/server";
import { getMockBridgeQuote } from "@/lib/initia/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sourceChain, destChain, token, amount } = body;

    if (!sourceChain || !destChain || !token || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: sourceChain, destChain, token, amount" },
        { status: 400 }
      );
    }

    const quote = getMockBridgeQuote(sourceChain, destChain, token, amount);
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bridge quote" },
      { status: 500 }
    );
  }
}
