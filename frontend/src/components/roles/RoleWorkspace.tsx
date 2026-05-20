"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import RoleGuard from "@/components/auth/RoleGuard";
import {
  ROLES,
  RoleName,
  roleIconToneClasses,
  roleToneClasses,
  roleWorkflows,
} from "@/config/roles";
import {
  fetchPlatformOverview,
} from "@/services/platform.service";

interface Props {
  roleName: RoleName;
}

export default function RoleWorkspace({
  roleName,
}: Props) {

  const role =
    ROLES.find(
      (item) => item.name === roleName
    )!;

  const Icon =
    role.icon;

  const [overview, setOverview] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadOverview =
      async () => {

        try {
          const response =
            await fetchPlatformOverview();

          setOverview(response);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    loadOverview();

  }, []);

  const workflows =
    roleWorkflows[roleName];

  const metrics =
    useMemo(() => {

      const byKey =
        overview?.byKey || {};

      const endpointScore =
        `${overview?.healthy || 0}/${overview?.total || 0}`;

      const common = {
        ADMIN: [
          ["Investors", byKey.investors?.count || 0, "From /investors"],
          ["API Coverage", endpointScore, "Readable backend endpoints"],
          ["Alerts", byKey.alerts?.count || 0, "From /alerts"],
          ["Services", byKey.serviceHealth?.count || 0, "From /service-health"],
        ],
        ADVISOR: [
          ["Investors", byKey.investors?.count || 0, "Accessible investor book"],
          ["Portfolio Records", byKey.portfolio?.count || 0, "Portfolio summary payload"],
          ["Equity Holdings", byKey.equityHoldings?.count || 0, "From equity service"],
          ["Fund Holdings", byKey.fundHoldings?.count || 0, "From mutual fund service"],
        ],
        AUDITOR: [
          ["Unified Alerts", byKey.alerts?.count || 0, "Operational risk trail"],
          ["MF Alerts", byKey.mfAlerts?.count || 0, "Mutual fund alert repository"],
          ["Endpoint Failures", overview?.failed || 0, "Unauthorized or unavailable APIs"],
          ["Endpoint Health", endpointScore, "Live frontend API coverage"],
        ],
        OPERATIONS: [
          ["Service Records", byKey.serviceHealth?.count || 0, "Health table rows"],
          ["Market Orders", byKey.equityOrders?.count || 0, "Equity order queue"],
          ["Mandates", byKey.mandates?.count || 0, "MF mandate workflow"],
          ["Bank Accounts", byKey.bankAccounts?.count || 0, "Bank account workflow"],
        ],
        INVESTOR: [
          ["Portfolio", byKey.portfolio?.count || 0, "Current investor summary"],
          ["Properties", byKey.investorProperties?.count || 0, "Real estate records"],
          ["Equity Trades", byKey.equityTransactions?.count || 0, "Investor equity transactions"],
          ["SIPs", byKey.investorSips?.count || 0, "Investor SIP accounts"],
        ],
        RELATIONSHIP_MANAGER: [
          ["Investors", byKey.investors?.count || 0, "Relationship universe"],
          ["Alerts", byKey.alerts?.count || 0, "Open engagement signals"],
          ["Properties", byKey.properties?.count || 0, "Client asset records"],
          ["API Coverage", endpointScore, "Cross-service visibility"],
        ],
      };

      return common[roleName];
    }, [overview, roleName]);

  return (
    <RoleGuard
      allowedRoles={[
        roleName,
        "ADMIN",
      ]}
    >
      <div className="space-y-8">
        <section
          className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            bg-gradient-to-br
            p-7
            shadow-[var(--shadow)]
            ${roleToneClasses[role.accent]}
          `}
        >
          <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-current opacity-10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${roleIconToneClasses[role.accent]}`}
                >
                  <Icon className="text-2xl" />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] opacity-80">
                    {role.name}
                  </p>

                  <h1 className="mt-1 text-4xl font-black tracking-tight">
                    {role.title}
                  </h1>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-[var(--muted)]">
                {role.description}. This workspace is shaped around the database modules and unified backend service boundaries.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link
                href="/dashboard"
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/60 px-5 py-4 font-bold text-[var(--foreground)] hover:border-blue-500"
              >
                Dashboard
              </Link>

              <Link
                href="/monitoring"
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/60 px-5 py-4 font-bold text-[var(--foreground)] hover:border-blue-500"
              >
                Monitoring
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {(loading ? [
                ["Loading", "...", "Retrieving backend data"],
                ["Loading", "...", "Retrieving backend data"],
                ["Loading", "...", "Retrieving backend data"],
                ["Loading", "...", "Retrieving backend data"],
              ] : metrics).map(([label, value, note], index) => (
            <div
              key={`${label}-${index}`}
              className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-[var(--muted)]">
                {label}
              </p>

              <p className="mt-3 text-3xl font-black tracking-tight">
                {value}
              </p>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {note}
              </p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-6 shadow-sm xl:col-span-2">
            <h2 className="text-2xl font-black">
              Workflow Focus
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4">
              {workflows.map((workflow, index) => (
                <div
                  key={workflow}
                  className="flex gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/50 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-6 text-[var(--muted)]">
                    {workflow}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-6 shadow-sm">
            <h2 className="text-2xl font-black">
              API Status
            </h2>

            <div className="mt-6 space-y-3">
              {(overview?.endpoints || [])
                .slice(0, 8)
                .map((endpoint: any) => (
                  <div
                    key={endpoint.key}
                    className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/50 px-4 py-3 text-sm"
                  >
                    <span className="font-bold">
                      {endpoint.label}
                    </span>

                    <span
                      className={
                        endpoint.ok
                          ? "text-emerald-500"
                          : "text-amber-500"
                      }
                    >
                      {endpoint.status}
                    </span>
                  </div>
                ))}

              <Link
                href="/api-coverage"
                className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/50 px-4 py-3 text-sm font-bold hover:border-blue-500"
              >
                View all backend APIs
                <span className="text-[var(--muted)]">
                  Open
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-6 shadow-sm">
          <h2 className="text-2xl font-black">
            Available Modules
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["Portfolio", "/portfolio"],
              ["Equities", "/equities"],
              ["Mutual Funds", "/mutual-funds"],
              ["Properties", "/properties"],
              ["Alerts", "/alerts"],
              ["API Coverage", "/api-coverage"],
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
        </section>
      </div>
    </RoleGuard>
  );
}
