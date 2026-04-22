"use client";

import { useState } from "react";
import { MinitiaCard } from "./MinitiaCard";
import type { MinitiaConfig } from "@/lib/config/minitias";
import { cn } from "@/lib/utils";

interface MinitiaGridProps {
  minitias: MinitiaConfig[];
}

type FilterType = "all" | "MoveVM" | "EVM" | "WasmVM";

export function MinitiaGrid({ minitias }: MinitiaGridProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all"
      ? minitias
      : minitias.filter((m) => m.vmType === filter);

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "MoveVM", label: "MoveVM" },
    { value: "EVM", label: "EVM" },
    { value: "WasmVM", label: "WasmVM" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
              filter === f.value
                ? "bg-initia-50 text-initia-700 border-initia-200"
                : "text-surface-600 border-surface-200 hover:bg-surface-50"
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-surface-500">
          {filtered.length} Minitia{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((minitia) => (
          <MinitiaCard key={minitia.id} minitia={minitia} />
        ))}
      </div>
    </div>
  );
}
