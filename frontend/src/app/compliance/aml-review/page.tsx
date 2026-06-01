"use client";

import { useEffect, useState } from "react";

import { apiGet } from "@/services/apiClient";

export default function AMLReviewPage() {
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

  const highRisk = investors.filter(
    (i) => i.risk_profile === "HIGH" || i.risk_profile === "VERY_HIGH",
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">AML Review</h1>

        <p className="mt-2 text-[var(--muted)]">
          High risk investors requiring compliance review
        </p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4">Investor</th>

              <th className="p-4">PAN</th>

              <th className="p-4">Risk</th>

              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {highRisk.map((investor) => (
              <tr key={investor.investor_id}>
                <td className="p-4">{investor.full_name}</td>

                <td className="p-4">{investor.pan_number}</td>

                <td className="p-4">{investor.risk_profile}</td>

                <td className="p-4">{investor.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
