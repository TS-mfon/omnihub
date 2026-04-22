"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBridgeQuote } from "@/lib/initia/queries";

export function useBridgeQuote(
  sourceChain: string,
  destChain: string,
  token: string,
  amount: number
) {
  return useQuery({
    queryKey: ["bridgeQuote", sourceChain, destChain, token, amount],
    queryFn: () => fetchBridgeQuote(sourceChain, destChain, token, amount),
    enabled: !!sourceChain && !!destChain && !!token && amount > 0,
    staleTime: 10000,
  });
}
