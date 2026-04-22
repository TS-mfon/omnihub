import { cn } from "@/lib/utils";
import type { MinitiaConfig } from "@/lib/config/minitias";

interface ChainBadgeProps {
  minitia: MinitiaConfig;
  size?: "sm" | "md" | "lg";
  showVmType?: boolean;
}

export function ChainBadge({
  minitia,
  size = "sm",
  showVmType = false,
}: ChainBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  const iconSizes = {
    sm: "w-4 h-4 text-[8px]",
    md: "w-5 h-5 text-[10px]",
    lg: "w-6 h-6 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        sizeClasses[size]
      )}
      style={{
        backgroundColor: `${minitia.color}10`,
        borderColor: `${minitia.color}30`,
        color: minitia.color,
      }}
    >
      <span
        className={cn(
          "rounded-full flex items-center justify-center text-white font-bold flex-shrink-0",
          iconSizes[size]
        )}
        style={{ backgroundColor: minitia.color }}
      >
        {minitia.icon}
      </span>
      {minitia.name}
      {showVmType && (
        <span className="opacity-60 text-[10px]">({minitia.vmType})</span>
      )}
    </span>
  );
}
