"use client";

import { BridgeForm } from "@/components/bridge/BridgeForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getMockBridgeHistory } from "@/lib/initia/bridge";
import { formatToken } from "@/lib/utils";

export default function BridgePage() {
  const history = getMockBridgeHistory();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">Bridge</h1>
        <p className="text-sm text-surface-500 mt-1">
          Transfer assets between Minitias via OPinit bridge
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BridgeForm />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {history.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 bg-surface-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-surface-900">
                      {formatToken(tx.amount)} {tx.token}
                    </p>
                    <p className="text-xs text-surface-500">
                      {tx.sourceChain} -&gt; {tx.destChain}
                    </p>
                  </div>
                  <Badge
                    variant={
                      tx.status === "completed"
                        ? "success"
                        : tx.status === "confirming"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bridge Info</CardTitle>
            </CardHeader>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-surface-500">Protocol</span>
                <span className="text-surface-900 font-medium">OPinit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Avg. time</span>
                <span className="text-surface-900 font-medium">~15s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Fee</span>
                <span className="text-surface-900 font-medium">0.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-500">Security</span>
                <Badge variant="success">Enshrined</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
