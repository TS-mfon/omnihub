"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio } from "@/lib/initia/queries";

export function usePortfolio(address: string | null) {
  return useQuery({
    queryKey: ["portfolio", address],
    queryFn: () => fetchPortfolio(address!),
    enabled: !!address,
    staleTime: 30000,
    refetchInterval: 60000,
  });
}
