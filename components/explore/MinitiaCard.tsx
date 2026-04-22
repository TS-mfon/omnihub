import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatUSD } from "@/lib/utils";
import type { MinitiaConfig } from "@/lib/config/minitias";

interface MinitiaCardProps {
  minitia: MinitiaConfig;
}

export function MinitiaCard({ minitia }: MinitiaCardProps) {
  const statusVariant = {
    active: "success" as const,
    upcoming: "warning" as const,
    maintenance: "danger" as const,
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: minitia.color }}
        >
          {minitia.icon}
        </div>
        <Badge variant={statusVariant[minitia.status]} size="sm">
          {minitia.status}
        </Badge>
      </div>

      <h3 className="text-base font-semibold text-surface-900 mb-1 group-hover:text-initia-600 transition-colors">
        {minitia.name}
      </h3>
      <p className="text-xs text-surface-500 mb-4 line-clamp-2">
        {minitia.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-surface-100">
        <div>
          <p className="text-xs text-surface-500">TVL</p>
          <p className="text-sm font-semibold text-surface-900">
            {minitia.tvl > 0 ? formatUSD(minitia.tvl) : "TBD"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-surface-500">VM Type</p>
          <Badge size="sm">{minitia.vmType}</Badge>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {minitia.supportedTokens.slice(0, 4).map((token) => (
          <span
            key={token}
            className="text-[10px] px-1.5 py-0.5 bg-surface-100 text-surface-600 rounded"
          >
            {token}
          </span>
        ))}
        {minitia.supportedTokens.length > 4 && (
          <span className="text-[10px] px-1.5 py-0.5 bg-surface-100 text-surface-600 rounded">
            +{minitia.supportedTokens.length - 4}
          </span>
        )}
      </div>
    </Card>
  );
}
