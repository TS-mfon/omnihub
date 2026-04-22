"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMinitias } from "@/lib/initia/queries";

export function useMinitias() {
  return useQuery({
    queryKey: ["minitias"],
    queryFn: fetchMinitias,
    staleTime: 300000,
  });
}
