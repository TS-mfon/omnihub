import { NextResponse } from "next/server";
import { getMockPortfolio } from "@/lib/initia/client";

export async function GET(
  _request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const portfolio = getMockPortfolio();
    return NextResponse.json({
      address: params.address,
      ...portfolio,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}
