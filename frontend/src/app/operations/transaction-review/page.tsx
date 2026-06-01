"use client";

import { useEffect, useState } from "react";

import {
  getEquityWorkspace,
  getMutualFundWorkspace,
} from "@/services/market.service";

export default function TransactionReviewPage() {
  const [equityTxns, setEquityTxns] = useState<any[]>([]);

  const [fundTxns, setFundTxns] = useState<any[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const equity = await getEquityWorkspace();

    const mutual = await getMutualFundWorkspace();

    setEquityTxns(equity.transactions || []);

    setFundTxns(mutual.transactions || []);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Transaction Review</h1>

        <p className="mt-2 text-[var(--muted)]">
          Equity and Mutual Fund transaction oversight
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h2 className="text-2xl font-black mb-4">Equity Transactions</h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {equityTxns.map((txn) => (
              <tr key={txn.id}>
                <td className="p-3">{txn.transaction_type}</td>

                <td className="p-3">{txn.quantity}</td>

                <td className="p-3">₹{txn.price}</td>

                <td className="p-3">{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h2 className="text-2xl font-black mb-4">Mutual Fund Transactions</h2>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">NAV</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {fundTxns.map((txn) => (
              <tr key={txn.id}>
                <td className="p-3">{txn.transaction_type}</td>

                <td className="p-3">₹{txn.amount}</td>

                <td className="p-3">{txn.nav}</td>

                <td className="p-3">{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
