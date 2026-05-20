"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlug,
  FaTimesCircle,
} from "react-icons/fa";

import {
  ACTION_ENDPOINTS,
  ApiEndpointResult,
  fetchApiCoverage,
} from "@/services/platform.service";

const statusTone = (
  endpoint: ApiEndpointResult
) => {

  if (endpoint.ok) {
    return "bg-emerald-500/15 text-emerald-500";
  }

  if (endpoint.status === "SKIPPED") {
    return "bg-amber-500/15 text-amber-500";
  }

  return "bg-rose-500/15 text-rose-500";
};

export default function ApiCoveragePage() {

  const [endpoints, setEndpoints] =
    useState<ApiEndpointResult[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadEndpoints =
      async () => {

        try {
          const response =
            await fetchApiCoverage();

          setEndpoints(response);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    loadEndpoints();

  }, []);

  const summary =
    useMemo(() => {

      const healthy =
        endpoints.filter((item) => item.ok)
          .length;

      const skipped =
        endpoints.filter(
          (item) =>
            item.status === "SKIPPED"
        ).length;

      return {
        healthy,
        skipped,
        failed:
          endpoints.length - healthy - skipped,
      };
    }, [endpoints]);

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-7 shadow-[var(--shadow)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-500">
              Unified API Map
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Backend API Coverage
            </h1>

            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              Every readable frontend endpoint is routed through the unified backend base URL, including proxied equity and mutual fund service APIs.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <FaPlug className="text-2xl" />
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5">
          <FaCheckCircle className="text-2xl text-emerald-500" />
          <p className="mt-4 text-3xl font-black">
            {summary.healthy}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Successful endpoints
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5">
          <FaExclamationTriangle className="text-2xl text-amber-500" />
          <p className="mt-4 text-3xl font-black">
            {summary.skipped}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Waiting for investor context
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5">
          <FaTimesCircle className="text-2xl text-rose-500" />
          <p className="mt-4 text-3xl font-black">
            {summary.failed}
          </p>
          <p className="text-sm text-[var(--muted)]">
            Unauthorized or unavailable
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-black">
            Safe Read APIs
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            These endpoints are called live to populate frontend counts and status.
          </p>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="text-xs uppercase text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Module</th>
                <th className="px-4 py-3">API</th>
                <th className="px-4 py-3">Path</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Records</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--card-border)]">
              {(loading ? [] : endpoints).map((endpoint) => (
                <tr
                  key={endpoint.key}
                  className="hover:bg-slate-500/5"
                >
                  <td className="px-4 py-4 font-bold">
                    {endpoint.module}
                  </td>
                  <td className="px-4 py-4">
                    {endpoint.label}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-[var(--muted)]">
                    {endpoint.path}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(endpoint)}`}>
                      {endpoint.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-black">
                    {endpoint.count}
                  </td>
                  <td className="px-4 py-4 text-[var(--muted)]">
                    {endpoint.message}
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-[var(--muted)]"
                  >
                    Loading backend API coverage...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/80 p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-black">
            Mutating Backend Actions
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            These APIs are represented for workflow coverage but are not auto-called because they create, update, approve, reject, execute, or delete records.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {ACTION_ENDPOINTS.map((endpoint) => (
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

              <p className="mt-2 text-xs font-semibold text-[var(--muted)]">
                {endpoint.module}
              </p>

              <p className="mt-3 break-all font-mono text-xs text-[var(--muted)]">
                {endpoint.path}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
