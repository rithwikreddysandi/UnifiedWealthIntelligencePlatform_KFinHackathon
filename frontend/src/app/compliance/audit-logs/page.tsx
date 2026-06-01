"use client";

import { useEffect, useState } from "react";

import { fetchApiCoverage } from "@/services/platform.service";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const response = await fetchApiCoverage();

    setLogs(response);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Audit Logs</h1>

        <p className="mt-2 text-[var(--muted)]">
          Endpoint activity and backend audit visibility
        </p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4">Module</th>
              <th className="p-4">API</th>
              <th className="p-4">Status</th>
              <th className="p-4">Records</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.key}>
                <td className="p-4">{log.module}</td>

                <td className="p-4">{log.label}</td>

                <td className="p-4">{log.status}</td>

                <td className="p-4">{log.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
