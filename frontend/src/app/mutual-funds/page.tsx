"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaPlus,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaPiggyBank,
  FaUniversity,
} from "react-icons/fa";
import toast from "react-hot-toast";

import DataPanel from "@/components/market/DataPanel";
import MetricTile from "@/components/market/MetricTile";
import {
  createFundTransaction,
  createSip,
  getMutualFundWorkspace,
} from "@/services/market.service";

const currency = (value: unknown) => {

  const amount =
    Number(value || 0);

  return `INR ${amount.toLocaleString("en-IN")}`;
};

const numberValue = (value: unknown) =>
  Number(value || 0).toLocaleString("en-IN");

export default function MutualFundsPage() {

  const [data, setData] =
    useState({
      funds: [] as any[],
      holdings: [] as any[],
      sips: [] as any[],
      transactions: [] as any[],
    });

  const [loading, setLoading] =
    useState(true);
  const [showTransactionModal, setShowTransactionModal] =
    useState(false);
  const [showSipModal, setShowSipModal] =
    useState(false);
  const [submitting, setSubmitting] =
    useState(false);
  const [transactionForm, setTransactionForm] =
    useState({
      fund_id: "",
      transaction_type:
        "PURCHASE" as "PURCHASE" | "REDEEM",
      amount: "",
    });
  const [sipForm, setSipForm] =
    useState({
      fund_id: "",
      sip_amount: "",
      frequency:
        "MONTHLY" as
          | "DAILY"
          | "WEEKLY"
          | "MONTHLY"
          | "QUARTERLY",
      start_date:
        new Date()
          .toISOString()
          .slice(0, 10),
    });

  useEffect(() => {

    fetchWorkspace();

  }, []);

  const fetchWorkspace =
    async () => {

      try {

        const response =
          await getMutualFundWorkspace();

        setData(response);

        const firstFund =
          response.funds?.[0];

        if (firstFund?.id) {
          setTransactionForm((current) => ({
            ...current,
            fund_id:
              current.fund_id || firstFund.id,
          }));

          setSipForm((current) => ({
            ...current,
            fund_id:
              current.fund_id || firstFund.id,
          }));
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
  };

  const handleCreateTransaction =
    async (event: React.FormEvent) => {

      event.preventDefault();

      if (!transactionForm.fund_id) {
        toast.error("Select a fund");
        return;
      }

      try {
        setSubmitting(true);

        const response =
          await createFundTransaction({
            fund_id:
              transactionForm.fund_id,
            transaction_type:
              transactionForm.transaction_type,
            amount:
              Number(transactionForm.amount),
          });

        if (!response.success) {
          toast.error(
            response.message ||
              "Fund transaction failed"
          );
          return;
        }

        toast.success(
          "Fund transaction created"
        );
        setShowTransactionModal(false);
        setTransactionForm((current) => ({
          ...current,
          amount: "",
        }));
        fetchWorkspace();
      } catch (error) {
        toast.error("Fund transaction failed");
      } finally {
        setSubmitting(false);
      }
  };

  const handleCreateSip =
    async (event: React.FormEvent) => {

      event.preventDefault();

      if (!sipForm.fund_id) {
        toast.error("Select a fund");
        return;
      }

      try {
        setSubmitting(true);

        const response =
          await createSip({
            fund_id:
              sipForm.fund_id,
            sip_amount:
              Number(sipForm.sip_amount),
            frequency:
              sipForm.frequency,
            start_date:
              sipForm.start_date,
          });

        if (!response.success) {
          toast.error(
            response.message ||
              "SIP creation failed"
          );
          return;
        }

        toast.success("SIP added");
        setShowSipModal(false);
        setSipForm((current) => ({
          ...current,
          sip_amount: "",
        }));
        fetchWorkspace();
      } catch (error) {
        toast.error("SIP creation failed");
      } finally {
        setSubmitting(false);
      }
  };

  const totals =
    useMemo(() => {

      const invested =
        data.holdings.reduce(
          (sum, item) =>
            sum + Number(item.invested_amount || 0),
          0
        );

      const current =
        data.holdings.reduce(
          (sum, item) =>
            sum + Number(item.current_value || 0),
          0
        );

      return {
        invested,
        current,
        profitLoss: current - invested,
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
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
            Mutual Fund Service
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Mutual Fund Desk
          </h1>

          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Funds, investor holdings, SIP schedules, and fund transactions via the unified backend.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() =>
              setShowTransactionModal(true)
            }
            className="btn-primary gap-3 px-5 py-4"
          >
            <FaPlus />
            Create Fund Transaction
          </button>

          <button
            type="button"
            onClick={() =>
              setShowSipModal(true)
            }
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/80 px-5 py-4 font-black hover:border-emerald-500"
          >
            Add SIP
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricTile
          title="Funds"
          value={numberValue(data.funds.length)}
          icon={FaUniversity}
          tone="bg-cyan-600"
        />

        <MetricTile
          title="Current Value"
          value={currency(totals.current)}
          icon={FaPiggyBank}
          tone="bg-emerald-600"
        />

        <MetricTile
          title="Active SIPs"
          value={numberValue(data.sips.length)}
          icon={FaCalendarAlt}
          tone="bg-indigo-600"
        />

        <MetricTile
          title="Fund P/L"
          value={currency(totals.profitLoss)}
          icon={FaFileInvoiceDollar}
          tone={totals.profitLoss >= 0 ? "bg-teal-600" : "bg-rose-600"}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <DataPanel
          title="Fund Master"
          subtitle="Available schemes and current NAV."
        >
          <div className="max-h-[440px] overflow-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="sticky top-0 bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Fund</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">NAV</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--card-border)]">
                {data.funds.map((fund) => (
                  <tr key={fund.id || fund.fund_code} className="hover:bg-slate-500/5">
                    <td className="px-4 py-4 font-bold">{fund.fund_code}</td>
                    <td className="px-4 py-4">{fund.fund_name}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{fund.category || fund.risk_level || "Unassigned"}</td>
                    <td className="px-4 py-4 font-semibold">{currency(fund.current_nav)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataPanel>

        <div className="space-y-6 xl:col-span-2">
          <DataPanel
            title="Investor Fund Holdings"
            subtitle="Current value, average NAV, and realized position view."
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
                        {holding.fund_name || holding.fund_id}
                      </h3>

                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {numberValue(holding.units)} units at NAV {numberValue(holding.average_nav)}
                      </p>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${Number(holding.profit_loss || 0) >= 0 ? "bg-emerald-500/15 text-emerald-500" : "bg-rose-500/15 text-rose-500"}`}>
                      {currency(holding.profit_loss)}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--card-border)] pt-4 text-sm">
                    <div>
                      <p className="text-[var(--muted)]">Invested</p>
                      <p className="mt-1 font-bold">{currency(holding.invested_amount)}</p>
                    </div>

                    <div>
                      <p className="text-[var(--muted)]">Current</p>
                      <p className="mt-1 font-bold">{currency(holding.current_value)}</p>
                    </div>
                  </div>
                </article>
              ))}

              {data.holdings.length === 0 && (
                <p className="rounded-xl border border-dashed border-[var(--card-border)] p-5 text-sm text-[var(--muted)]">
                  No mutual fund holdings found for the active investor.
                </p>
              )}
            </div>
          </DataPanel>

          <DataPanel
            title="SIPs and Transactions"
            subtitle="Recurring investments and recent fund activity."
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                {data.sips.slice(0, 5).map((sip) => (
                  <div key={sip.id} className="rounded-xl bg-[var(--background)]/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{currency(sip.sip_amount)}</span>
                      <span className="text-xs font-bold text-emerald-500">{sip.status}</span>
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {sip.frequency} from {sip.start_date || "scheduled"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {data.transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="rounded-xl bg-[var(--background)]/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{transaction.transaction_type || "FUND TXN"}</span>
                      <span className="text-xs font-bold text-[var(--muted)]">{transaction.status}</span>
                    </div>

                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {currency(transaction.amount)} at NAV {numberValue(transaction.nav)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DataPanel>
        </div>
      </div>

      {showTransactionModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <form
            onSubmit={handleCreateTransaction}
            className="w-full max-w-xl rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">
                  Create Fund Transaction
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Select a fund from fund master and create a purchase or redemption.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowTransactionModal(false)
                }
                className="rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-500/10"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-[var(--muted)]">
                  Fund
                </span>
                <select
                  value={transactionForm.fund_id}
                  onChange={(event) =>
                    setTransactionForm({
                      ...transactionForm,
                      fund_id: event.target.value,
                    })
                  }
                  className="input-shell mt-2 px-4 py-3"
                  required
                >
                  {data.funds.map((fund) => (
                    <option
                      key={fund.id}
                      value={fund.id}
                    >
                      {fund.fund_name} ({fund.fund_code})
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Type
                  </span>
                  <select
                    value={
                      transactionForm.transaction_type
                    }
                    onChange={(event) =>
                      setTransactionForm({
                        ...transactionForm,
                        transaction_type:
                          event.target.value as
                            | "PURCHASE"
                            | "REDEEM",
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                  >
                    <option value="PURCHASE">
                      PURCHASE
                    </option>
                    <option value="REDEEM">
                      REDEEM
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Amount
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={transactionForm.amount}
                    onChange={(event) =>
                      setTransactionForm({
                        ...transactionForm,
                        amount: event.target.value,
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                    required
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-6 w-full px-5 py-4 disabled:opacity-60"
            >
              {submitting
                ? "Submitting..."
                : "Create Transaction"}
            </button>
          </form>
        </div>
      )}

      {showSipModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
          <form
            onSubmit={handleCreateSip}
            className="w-full max-w-xl rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">
                  Add SIP
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Create a systematic investment plan using a fund from the master list.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowSipModal(false)
                }
                className="rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-500/10"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-[var(--muted)]">
                  Fund
                </span>
                <select
                  value={sipForm.fund_id}
                  onChange={(event) =>
                    setSipForm({
                      ...sipForm,
                      fund_id: event.target.value,
                    })
                  }
                  className="input-shell mt-2 px-4 py-3"
                  required
                >
                  {data.funds.map((fund) => (
                    <option
                      key={fund.id}
                      value={fund.id}
                    >
                      {fund.fund_name} ({fund.fund_code})
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    SIP Amount
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={sipForm.sip_amount}
                    onChange={(event) =>
                      setSipForm({
                        ...sipForm,
                        sip_amount:
                          event.target.value,
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Frequency
                  </span>
                  <select
                    value={sipForm.frequency}
                    onChange={(event) =>
                      setSipForm({
                        ...sipForm,
                        frequency:
                          event.target.value as
                            | "DAILY"
                            | "WEEKLY"
                            | "MONTHLY"
                            | "QUARTERLY",
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                  >
                    <option value="DAILY">DAILY</option>
                    <option value="WEEKLY">WEEKLY</option>
                    <option value="MONTHLY">MONTHLY</option>
                    <option value="QUARTERLY">
                      QUARTERLY
                    </option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-bold text-[var(--muted)]">
                  Start Date
                </span>
                <input
                  type="date"
                  value={sipForm.start_date}
                  onChange={(event) =>
                    setSipForm({
                      ...sipForm,
                      start_date:
                        event.target.value,
                    })
                  }
                  className="input-shell mt-2 px-4 py-3"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-6 w-full px-5 py-4 disabled:opacity-60"
            >
              {submitting
                ? "Submitting..."
                : "Add SIP"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
