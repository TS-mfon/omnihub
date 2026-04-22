"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/lib/initia/queries";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatUSD, formatToken } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  bridge: "Bridge",
  swap: "Swap",
  send: "Send",
  receive: "Receive",
  stake: "Stake",
  unstake: "Unstake",
};

export default function ActivityPage() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivity,
  });

  function formatTime(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Activity</h1>
        <p className="text-sm text-surface-500 mt-1">
          Transaction history across all Minitias
        </p>
      </div>

      {isLoading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-initia-600 border-t-transparent rounded-full" />
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className="p-5 pb-0">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <span className="text-sm text-surface-500">
                {activities?.length ?? 0} transactions
              </span>
            </CardHeader>
          </div>

          <div className="divide-y divide-surface-100">
            {activities?.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-surface-50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: activity.minitiaColor }}
                  >
                    {activity.type === "bridge"
                      ? "BR"
                      : activity.type === "swap"
                      ? "SW"
                      : activity.type === "send"
                      ? "SD"
                      : activity.type === "receive"
                      ? "RC"
                      : activity.type === "stake"
                      ? "ST"
                      : "US"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-surface-900">
                        {TYPE_LABELS[activity.type]}
                      </p>
                      <Badge
                        variant={
                          activity.status === "completed"
                            ? "success"
                            : activity.status === "pending"
                            ? "warning"
                            : "danger"
                        }
                        size="sm"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-surface-500">
                      {activity.minitia}
                      {activity.details ? ` - ${activity.details}` : ""}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-surface-900">
                    {formatToken(activity.amount)} {activity.token}
                  </p>
                  <p className="text-xs text-surface-500">
                    {formatUSD(activity.valueUSD)} - {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
