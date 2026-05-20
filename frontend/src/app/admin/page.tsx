"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  FaCrown,
  FaDatabase,
  FaPlus,
  FaShieldAlt,
  FaUniversity,
} from "react-icons/fa";

import RoleGuard from "@/components/auth/RoleGuard";
import DataPanel from "@/components/market/DataPanel";
import MetricTile from "@/components/market/MetricTile";
import {
  createMutualFund,
  getMutualFundWorkspace,
} from "@/services/market.service";
import {
  ACTION_ENDPOINTS,
  fetchPlatformOverview,
} from "@/services/platform.service";

const currency = (value: unknown) => {

  const amount =
    Number(value || 0);

  return `INR ${amount.toLocaleString("en-IN")}`;
};

export default function AdminPage() {

  const [funds, setFunds] =
    useState<any[]>([]);

  const [overview, setOverview] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [showFundModal, setShowFundModal] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [fundForm, setFundForm] =
    useState({
      fund_code: "",
      fund_name: "",
      amc_name: "",
      category: "",
      risk_level:
        "MEDIUM" as
          | "LOW"
          | "MEDIUM"
          | "HIGH"
          | "VERY_HIGH",
      current_nav: "",
    });

  useEffect(() => {

    fetchAdminData();

  }, []);

  const fetchAdminData =
    async () => {

      try {
        const [
          mfWorkspace,
          platformOverview,
        ] = await Promise.all([
          getMutualFundWorkspace(),
          fetchPlatformOverview(),
        ]);

        setFunds(
          mfWorkspace.funds || []
        );

        setOverview(platformOverview);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  };

  const fundStats =
    useMemo(() => {

      const avgNav =
        funds.length
          ? funds.reduce(
              (sum, fund) =>
                sum + Number(fund.current_nav || 0),
              0
            ) / funds.length
          : 0;

      const amcs =
        new Set(
          funds
            .map((fund) => fund.amc_name)
            .filter(Boolean)
        ).size;

      return {
        avgNav,
        amcs,
      };
    }, [funds]);

  const handleCreateFund =
    async (event: React.FormEvent) => {

      event.preventDefault();

      try {
        setSubmitting(true);

        const response =
          await createMutualFund({
            ...fundForm,
            current_nav:
              Number(fundForm.current_nav),
          });

        if (!response.success) {
          toast.error(
            response.message ||
              "Fund creation failed"
          );
          return;
        }

        toast.success(
          "Fund created in fund master"
        );

        setShowFundModal(false);
        setFundForm({
          fund_code: "",
          fund_name: "",
          amc_name: "",
          category: "",
          risk_level: "MEDIUM",
          current_nav: "",
        });

        fetchAdminData();
      } catch (error) {
        toast.error("Fund creation failed");
      } finally {
        setSubmitting(false);
      }
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="space-y-8">
        <header className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/85 p-7 shadow-[var(--shadow)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-500">
                Admin
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight">
                Full System Control
              </h1>

              <p className="mt-3 max-w-3xl text-[var(--muted)]">
                Create records in mutual_funds_master, monitor backend coverage, and access operational controls across unified, equity, and mutual fund services.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFundModal(true)
              }
              className="btn-primary gap-3 px-5 py-4"
            >
              <FaPlus />
              Create Fund
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            title="Fund Master Records"
            value={
              loading ? "..." : funds.length
            }
            icon={FaUniversity}
            tone="bg-blue-600"
          />

          <MetricTile
            title="AMCs"
            value={
              loading ? "..." : fundStats.amcs
            }
            icon={FaDatabase}
            tone="bg-emerald-600"
          />

          <MetricTile
            title="Average NAV"
            value={
              loading
                ? "..."
                : currency(fundStats.avgNav)
            }
            icon={FaCrown}
            tone="bg-amber-600"
          />

          <MetricTile
            title="API Access"
            value={
              overview
                ? `${overview.healthy}/${overview.total}`
                : "..."
            }
            icon={FaShieldAlt}
            tone="bg-cyan-600"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <DataPanel
              title="Fund Master"
              subtitle="Funds created here are persisted in mutual_funds_master through /mutual-funds/funds and become selectable for investor SIPs and transactions."
            >
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead className="sticky top-0 bg-[var(--card)] text-xs uppercase text-[var(--muted)]">
                    <tr>
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Fund</th>
                      <th className="px-4 py-3">AMC</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Risk</th>
                      <th className="px-4 py-3">NAV</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[var(--card-border)]">
                    {funds.map((fund) => (
                      <tr
                        key={fund.id || fund.fund_code}
                        className="hover:bg-slate-500/5"
                      >
                        <td className="px-4 py-4 font-black">
                          {fund.fund_code}
                        </td>
                        <td className="px-4 py-4">
                          {fund.fund_name}
                        </td>
                        <td className="px-4 py-4 text-[var(--muted)]">
                          {fund.amc_name || "Not set"}
                        </td>
                        <td className="px-4 py-4">
                          {fund.category || "Not set"}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black text-blue-500">
                            {fund.risk_level || "NA"}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-black">
                          {currency(fund.current_nav)}
                        </td>
                      </tr>
                    ))}

                    {!loading && funds.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-10 text-center text-[var(--muted)]"
                        >
                          No funds found in fund master.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </DataPanel>
          </div>

          <DataPanel
            title="Admin Controls"
            subtitle="Full access entry points."
          >
            <div className="space-y-3">
              {[
                ["API Coverage", "/api-coverage"],
                ["Service Monitoring", "/monitoring"],
                ["Alerts", "/alerts"],
                ["Equities", "/equities"],
                ["Mutual Funds", "/mutual-funds"],
                ["Properties", "/properties"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/50 px-4 py-3 text-sm font-bold hover:border-blue-500"
                >
                  {label}
                  <span className="text-[var(--muted)]">
                    Open
                  </span>
                </Link>
              ))}
            </div>
          </DataPanel>
        </section>

        <DataPanel
          title="Available Mutating Access"
          subtitle="Admin can control create/update/approve/reject/delete workflows from the unified backend proxy surface."
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {ACTION_ENDPOINTS.slice(0, 24).map((endpoint) => (
              <div
                key={`${endpoint.method}-${endpoint.path}-${endpoint.label}`}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold">
                    {endpoint.label}
                  </span>
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black text-blue-500">
                    {endpoint.method}
                  </span>
                </div>

                <p className="mt-3 break-all font-mono text-xs text-[var(--muted)]">
                  {endpoint.path}
                </p>
              </div>
            ))}
          </div>
        </DataPanel>

        {showFundModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 px-4">
            <form
              onSubmit={handleCreateFund}
              className="w-full max-w-2xl rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">
                    Create Fund Master Record
                  </h2>

                  <p className="mt-2 text-sm text-[var(--muted)]">
                    This creates a fund in mutual_funds_master through the mutual fund service. It does not create fund holdings; investors can later select the fund for SIPs and transactions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowFundModal(false)
                  }
                  className="rounded-xl px-3 py-2 text-sm font-black hover:bg-slate-500/10"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Fund Code
                  </span>
                  <input
                    value={fundForm.fund_code}
                    onChange={(event) =>
                      setFundForm({
                        ...fundForm,
                        fund_code:
                          event.target.value,
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                    required
                    minLength={3}
                    maxLength={50}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Fund Name
                  </span>
                  <input
                    value={fundForm.fund_name}
                    onChange={(event) =>
                      setFundForm({
                        ...fundForm,
                        fund_name:
                          event.target.value,
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                    required
                    minLength={3}
                    maxLength={200}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    AMC Name
                  </span>
                  <input
                    value={fundForm.amc_name}
                    onChange={(event) =>
                      setFundForm({
                        ...fundForm,
                        amc_name:
                          event.target.value,
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                    maxLength={150}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Category
                  </span>
                  <input
                    value={fundForm.category}
                    onChange={(event) =>
                      setFundForm({
                        ...fundForm,
                        category:
                          event.target.value,
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                    maxLength={100}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Risk Level
                  </span>
                  <select
                    value={fundForm.risk_level}
                    onChange={(event) =>
                      setFundForm({
                        ...fundForm,
                        risk_level:
                          event.target.value as
                            | "LOW"
                            | "MEDIUM"
                            | "HIGH"
                            | "VERY_HIGH",
                      })
                    }
                    className="input-shell mt-2 px-4 py-3"
                  >
                    <option value="">
                      Not specified
                    </option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="VERY_HIGH">
                      VERY_HIGH
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-[var(--muted)]">
                    Current NAV
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={fundForm.current_nav}
                    onChange={(event) =>
                      setFundForm({
                        ...fundForm,
                        current_nav:
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
                  ? "Creating..."
                  : "Create Fund"}
              </button>
            </form>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
