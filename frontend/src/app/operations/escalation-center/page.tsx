"use client";

import { useEffect, useState } from "react";
import { getAlerts } from "@/services/alert.service";

export default function EscalationCenterPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    const response = await getAlerts();
    setAlerts(response.data || []);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Escalation Center</h1>

        <p className="mt-2 text-[var(--muted)]">
          Review escalated investor and transaction issues
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="glass-card rounded-3xl p-6">
            <div className="flex justify-between">
              <h3 className="font-black text-xl">{alert.title}</h3>

              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">
                {alert.severity}
              </span>
            </div>

            <p className="mt-4 text-[var(--muted)]">{alert.message}</p>

            <div className="mt-5">
              Status:
              <span className="ml-2 font-bold">{alert.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
