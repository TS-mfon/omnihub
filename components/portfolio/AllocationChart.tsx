"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatUSD } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface AllocationData {
  name: string;
  value: number;
  color: string;
}

interface AllocationChartProps {
  title: string;
  data: AllocationData[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload as AllocationData;
  return (
    <div className="bg-white border border-surface-200 rounded-lg shadow-lg px-3 py-2">
      <p className="text-sm font-medium text-surface-900">{item.name}</p>
      <p className="text-sm text-surface-600">{formatUSD(item.value)}</p>
    </div>
  );
}

export function AllocationChart({ title, data }: AllocationChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <div className="flex items-center gap-6">
        <div className="w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2 min-w-0">
          {data.slice(0, 6).map((item) => {
            const percent = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-surface-700 truncate flex-1">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-surface-900 flex-shrink-0">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
