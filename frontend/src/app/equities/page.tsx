"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaChartLine,
  FaClipboardList,
  FaExchangeAlt,
  FaLayerGroup,
} from "react-icons/fa";

import DataPanel from "@/components/market/DataPanel";
import MetricTile from "@/components/market/MetricTile";
import { getEquityWorkspace } from "@/services/market.service";

const currency = (value: unknown) => {

  const amount =
    Number(value || 0);

  return `INR ${amount.toLocaleString("en-IN")}`;
};

const numberValue = (value: unknown) =>
  Number(value || 0).toLocaleString("en-IN");

export default function EquitiesPage() {

  const [data, setData] =
    useState({
      stocks: [] as any[],
      holdings: [] as any[],
      orders: [] as any[],
      transactions: [] as any[],
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchWorkspace();

  }, []);

  const fetchWorkspace =
    async () => {

      try {

        const response =
          await getEquityWorkspace();

        setData(response);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
  };

  const totals =
    useMemo(() => {

      const holdingValue =
        data.holdings.reduce(
          (sum, item) =>
            sum + Number(item.current_value || 0),
          0
        );

      const profitLoss =
        data.holdings.reduce(
          (sum, item) =>
            sum + Number(item.profit_loss || 0),
          0
        );

      return {
        holdingValue,
        profitLoss,
      };
    }, [data.holdings]);

  if (loading) {

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-slate-500/10"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Equity Service
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Equity Desk
          </h1>

          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Stocks, holdings, orders, and investor transactions routed through the unified backend proxy.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/70 px-5 py-4 text-sm text-[var(--muted)]">
          API path: <span className="font-semibold text-[var(--foreground)]">/api/equity/*</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          title="Listed Stocks"
          value={numberValue(data.stocks.length)}
          icon={FaLayerGroup}
          tone="bg-blue-600"
        />

        <MetricTile
          title="Holdings Value"
          value={currency(totals.holdingValue)}
          icon={FaChartLine}
          tone="bg-emerald-600"
        />

        <MetricTile
          title="Open Orders"
          value={numberValue(data.orders.length)}
          icon={FaClipboardList}
          tone="bg-amber-600"
        />

        <MetricTile
          title="Net P/L"
          value={currency(totals.profitLoss)}
          icon={FaExchangeAlt}
          tone={totals.profitLoss >= 0 ? "bg-teal-600" : "bg-rose-600"}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <DataPanel
          title="Stock Master"
          subtitle="Tradable instruments from stocks_master."
        >
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="sticky top-0 bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Sector</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--card-border)]">
                {data.stocks.map((stock) => (
                  <tr key={stock.id || stock.symbol} className="hover:bg-slate-500/5">
                    <td className="px-4 py-4 font-bold">{stock.symbol}</td>
                    <td className="px-4 py-4">{stock.company_name}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{stock.sector || "Unassigned"}</td>
                    <td className="px-4 py-4 font-semibold">{currency(stock.market_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataPanel>

        <div className="space-y-6 xl:col-span-2">
          <DataPanel
            title="Investor Holdings"
            subtitle="Positions pulled from /equity/holdings/:investorId."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.holdings.map((holding) => (
                <article
                  key={holding.id}
                  className="rounded-xl border border-[var(--card-border)] bg-[var(--background)]/40 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black">
                        {holding.symbol || holding.company_name || holding.stock_id}
                      </h3>

                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Qty {numberValue(holding.quantity)} at {currency(holding.average_buy_price)}
                      </p>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${Number(holding.profit_loss || 0) >= 0 ? "bg-emerald-500/15 text-emerald-500" : "bg-rose-500/15 text-rose-500"}`}>
                      {currency(holding.profit_loss)}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[var(--card-border)] pt-4">
                    <span className="text-sm text-[var(--muted)]">Current value</span>
                    <span className="font-black">{currency(holding.current_value)}</span>
                  </div>
                </article>
              ))}

              {data.holdings.length === 0 && (
                <p className="rounded-xl border border-dashed border-[var(--card-border)] p-5 text-sm text-[var(--muted)]">
                  No equity holdings found for the active investor.
                </p>
              )}
            </div>
          </DataPanel>

          <DataPanel
            title="Orders and Transactions"
            subtitle="Latest order and transaction activity for the investor."
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                {data.orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="rounded-xl bg-[var(--background)]/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{order.order_type || "ORDER"}</span>
                      <span className="text-xs font-bold text-blue-500">{order.status}</span>
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      Qty {numberValue(order.quantity)} limit {currency(order.limit_price)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {data.transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="rounded-xl bg-[var(--background)]/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{transaction.transaction_type || "TRADE"}</span>
                      <span className="text-xs font-bold text-[var(--muted)]">{transaction.status}</span>
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {numberValue(transaction.quantity)} units at {currency(transaction.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DataPanel>
        </div>
      </div>
    </div>
  );
}
