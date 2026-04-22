"use client";

import { cn } from "@/lib/utils";
import { getActiveMinitias, type MinitiaConfig } from "@/lib/config/minitias";

interface MinitiaSelectorProps {
  label: string;
  selected: MinitiaConfig | null;
  onChange: (minitia: MinitiaConfig) => void;
  exclude?: string;
}

export function MinitiaSelector({
  label,
  selected,
  onChange,
  exclude,
}: MinitiaSelectorProps) {
  const minitias = getActiveMinitias().filter((m) => m.id !== exclude);

  return (
    <div>
      <label className="block text-sm font-medium text-surface-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {minitias.map((minitia) => (
          <button
            key={minitia.id}
            onClick={() => onChange(minitia)}
            className={cn(
              "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all",
              selected?.id === minitia.id
                ? "border-2 shadow-sm"
                : "border-surface-200 hover:border-surface-300 hover:bg-surface-50"
            )}
            style={
              selected?.id === minitia.id
                ? {
                    borderColor: minitia.color,
                    backgroundColor: `${minitia.color}08`,
                  }
                : undefined
            }
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ backgroundColor: minitia.color }}
            >
              {minitia.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-surface-900 truncate">
                {minitia.name}
              </p>
              <p className="text-[10px] text-surface-500">{minitia.vmType}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
