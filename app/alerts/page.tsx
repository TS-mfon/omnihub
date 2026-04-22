"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatUSD } from "@/lib/utils";
import { TOKENS } from "@/lib/config/tokens";

interface Alert {
  id: string;
  type: "price_above" | "price_below" | "balance_change";
  token: string;
  threshold: number;
  currentValue: number;
  active: boolean;
  triggered: boolean;
}

const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    type: "price_above",
    token: "INIT",
    threshold: 2.0,
    currentValue: 1.85,
    active: true,
    triggered: false,
  },
  {
    id: "2",
    type: "price_below",
    token: "ETH",
    threshold: 3000,
    currentValue: 3245.67,
    active: true,
    triggered: false,
  },
  {
    id: "3",
    type: "price_above",
    token: "TIA",
    threshold: 8.0,
    currentValue: 8.92,
    active: true,
    triggered: true,
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [selectedToken, setSelectedToken] = useState("INIT");
  const [alertType, setAlertType] = useState<"price_above" | "price_below">(
    "price_above"
  );
  const [threshold, setThreshold] = useState("");

  const handleAdd = () => {
    if (!threshold) return;
    const newAlert: Alert = {
      id: String(Date.now()),
      type: alertType,
      token: selectedToken,
      threshold: parseFloat(threshold),
      currentValue: TOKENS[selectedToken]?.priceUSD ?? 0,
      active: true,
      triggered: false,
    };
    setAlerts([...alerts, newAlert]);
    setThreshold("");
  };

  const handleRemove = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleToggle = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Alerts</h1>
        <p className="text-sm text-surface-500 mt-1">
          Set price and balance alerts for your tokens
        </p>
      </div>

      {/* Create alert */}
      <Card>
        <CardHeader>
          <CardTitle>Create Alert</CardTitle>
        </CardHeader>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="px-3 py-2 rounded-lg border border-surface-300 bg-white text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-initia-500"
          >
            {Object.keys(TOKENS).map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol} - {TOKENS[symbol].name}
              </option>
            ))}
          </select>
          <select
            value={alertType}
            onChange={(e) =>
              setAlertType(e.target.value as "price_above" | "price_below")
            }
            className="px-3 py-2 rounded-lg border border-surface-300 bg-white text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-initia-500"
          >
            <option value="price_above">Price above</option>
            <option value="price_below">Price below</option>
          </select>
          <div className="sm:w-40">
            <Input
              type="number"
              placeholder="Price USD"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} disabled={!threshold}>
            Create
          </Button>
        </div>
        {selectedToken && (
          <p className="text-xs text-surface-500 mt-2">
            Current price: {formatUSD(TOKENS[selectedToken]?.priceUSD ?? 0)}
          </p>
        )}
      </Card>

      {/* Active alerts */}
      <Card padding="none">
        <div className="p-5 pb-0">
          <CardHeader>
            <CardTitle>Your Alerts</CardTitle>
            <span className="text-sm text-surface-500">
              {alerts.filter((a) => a.active).length} active
            </span>
          </CardHeader>
        </div>

        <div className="divide-y divide-surface-100">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between px-5 py-4 hover:bg-surface-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{
                    backgroundColor:
                      TOKENS[alert.token]?.color ?? "#6b7280",
                  }}
                >
                  {TOKENS[alert.token]?.icon ?? "?"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-surface-900">
                      {alert.token}{" "}
                      {alert.type === "price_above" ? "above" : "below"}{" "}
                      {formatUSD(alert.threshold)}
                    </p>
                    {alert.triggered && (
                      <Badge variant="success" size="sm">
                        Triggered
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-surface-500">
                    Current: {formatUSD(alert.currentValue)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={alert.active ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleToggle(alert.id)}
                >
                  {alert.active ? "Pause" : "Resume"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(alert.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          {alerts.length === 0 && (
            <div className="px-5 py-12 text-center text-surface-500">
              <p className="text-sm">No alerts configured.</p>
              <p className="text-xs mt-1">
                Create an alert above to get notified.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
