import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sourceChain, destChain, token, amount, sender } = body;

    if (!sourceChain || !destChain || !token || !amount || !sender) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: sourceChain, destChain, token, amount, sender",
        },
        { status: 400 }
      );
    }

    // Mock bridge execution
    const txHash = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;

    return NextResponse.json({
      success: true,
      txHash,
      status: "pending",
      estimatedTime: 15,
      sourceChain,
      destChain,
      token,
      amount,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to execute bridge transaction" },
      { status: 500 }
    );
  }
}
