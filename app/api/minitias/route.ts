import { NextResponse } from "next/server";
import { MINITIAS } from "@/lib/config/minitias";

export async function GET() {
  return NextResponse.json({
    minitias: MINITIAS,
    total: MINITIAS.length,
    active: MINITIAS.filter((m) => m.status === "active").length,
  });
}
