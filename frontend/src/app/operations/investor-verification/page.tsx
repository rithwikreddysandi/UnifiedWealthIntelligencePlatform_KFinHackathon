"use client";

import { useEffect, useState } from "react";

import { apiGet } from "@/services/apiClient";

export default function InvestorVerificationPage() {
  const [investors, setInvestors] = useState<any[]>([]);

  useEffect(() => {
    loadInvestors();
  }, []);

  const loadInvestors = async () => {
    const response = await apiGet("/investors");

    if (response.ok) {
      setInvestors(response.data || []);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Investor Verification</h1>

        <p className="mt-2 text-[var(--muted)]">
          Verify KYC and investor onboarding
        </p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="p-5">Investor</th>

              <th className="p-5">PAN</th>

              <th className="p-5">Risk Profile</th>

              <th className="p-5">Status</th>

              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {investors.map((investor, index) => (
              <tr
                key={investor.investor_id ??
                    investor.email??
                    investor.id??
                    index
                }
                className="border-b border-[var(--card-border)]"
              >
                <td className="p-5">{investor.full_name}</td>

                <td className="p-5">{investor.pan_number}</td>

                <td className="p-5">{investor.risk_profile}</td>

                <td className="p-5">{investor.status}</td>

                <td className="p-5 flex gap-2">
                  <button className="px-3 py-1 rounded bg-green-600 text-white">
                    Verify
                  </button>

                  <button className="px-3 py-1 rounded bg-red-600 text-white">
                    Reject
                  </button>

                  <button className="px-3 py-1 rounded bg-yellow-500 text-white">
                    Escalate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
