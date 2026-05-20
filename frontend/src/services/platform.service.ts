import {
  apiGet,
  getStoredInvestorId,
} from "./apiClient";

export type ApiEndpoint = {
  key: string;
  label: string;
  module: string;
  path: string;
  needsInvestor?: boolean;
};

export type ApiEndpointResult =
  ApiEndpoint & {
    ok: boolean;
    status: number | "SKIPPED";
    count: number;
    message: string;
    data: any;
  };

export type ApiActionEndpoint = {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  module: string;
  label: string;
  path: string;
};

const investorPath =
  (path: string, investorId: string | null) =>
    path.replace(":investorId", investorId || "");

export const READ_ENDPOINTS: ApiEndpoint[] = [
  {
    key: "serviceHealth",
    label: "Service health",
    module: "Unified Backend",
    path: "/service-health",
  },
  {
    key: "alerts",
    label: "Unified alerts",
    module: "Unified Backend",
    path: "/alerts",
  },
  {
    key: "investors",
    label: "Investors",
    module: "Unified Backend",
    path: "/investors",
  },
  {
    key: "properties",
    label: "All properties",
    module: "Unified Backend",
    path: "/properties",
  },
  {
    key: "investorProperties",
    label: "Investor properties",
    module: "Unified Backend",
    path: "/properties/investor/:investorId",
    needsInvestor: true,
  },
  {
    key: "dashboard",
    label: "Investor dashboard",
    module: "Unified Backend",
    path: "/dashboard/:investorId",
    needsInvestor: true,
  },
  {
    key: "portfolio",
    label: "Portfolio summary",
    module: "Unified Backend",
    path: "/portfolio/:investorId",
    needsInvestor: true,
  },
  {
    key: "equityStocks",
    label: "Stocks master",
    module: "Equity Service",
    path: "/equity/stocks",
  },
  {
    key: "equityHoldings",
    label: "Equity holdings",
    module: "Equity Service",
    path: "/equity/holdings/:investorId",
    needsInvestor: true,
  },
  {
    key: "equityOrders",
    label: "Market orders",
    module: "Equity Service",
    path: "/equity/orders/:investorId",
    needsInvestor: true,
  },
  {
    key: "equityTransactions",
    label: "Equity transactions",
    module: "Equity Service",
    path: "/equity/transactions/:investorId",
    needsInvestor: true,
  },
  {
    key: "equitySnapshots",
    label: "Equity snapshots",
    module: "Equity Service",
    path: "/equity/portfolio-snapshots/:investorId",
    needsInvestor: true,
  },
  {
    key: "dividends",
    label: "Dividends",
    module: "Equity Service",
    path: "/equity/dividends/:investorId",
    needsInvestor: true,
  },
  {
    key: "mfHealth",
    label: "MF health",
    module: "Mutual Fund Service",
    path: "/mutual-funds/health",
  },
  {
    key: "funds",
    label: "Fund master",
    module: "Mutual Fund Service",
    path: "/mutual-funds/funds",
  },
  {
    key: "allSips",
    label: "All SIPs",
    module: "Mutual Fund Service",
    path: "/mutual-funds/sips",
  },
  {
    key: "investorSips",
    label: "Investor SIPs",
    module: "Mutual Fund Service",
    path: "/mutual-funds/sips/investor/:investorId",
    needsInvestor: true,
  },
  {
    key: "allFundTransactions",
    label: "All fund transactions",
    module: "Mutual Fund Service",
    path: "/mutual-funds/transactions",
  },
  {
    key: "investorFundTransactions",
    label: "Investor fund transactions",
    module: "Mutual Fund Service",
    path: "/mutual-funds/transactions/investor/:investorId",
    needsInvestor: true,
  },
  {
    key: "fundHoldings",
    label: "Investor fund holdings",
    module: "Mutual Fund Service",
    path: "/mutual-funds/holdings/investor/:investorId",
    needsInvestor: true,
  },
  {
    key: "mandates",
    label: "Mandates",
    module: "Mutual Fund Service",
    path: "/mutual-funds/mandates",
  },
  {
    key: "investorMandates",
    label: "Investor mandates",
    module: "Mutual Fund Service",
    path: "/mutual-funds/mandates/investor/:investorId",
    needsInvestor: true,
  },
  {
    key: "approvedMandates",
    label: "Approved mandates",
    module: "Mutual Fund Service",
    path: "/mutual-funds/mandates/status/approved",
  },
  {
    key: "expiredMandates",
    label: "Expired mandates",
    module: "Mutual Fund Service",
    path: "/mutual-funds/mandates/status/expired",
  },
  {
    key: "bankAccounts",
    label: "Bank accounts",
    module: "Mutual Fund Service",
    path: "/mutual-funds/bank-accounts",
  },
  {
    key: "investorBankAccounts",
    label: "Investor bank accounts",
    module: "Mutual Fund Service",
    path: "/mutual-funds/bank-accounts/investor/:investorId",
    needsInvestor: true,
  },
  {
    key: "latestNavs",
    label: "Latest NAVs",
    module: "Mutual Fund Service",
    path: "/mutual-funds/nav/latest/all",
  },
  {
    key: "mfAlerts",
    label: "MF alerts",
    module: "Mutual Fund Service",
    path: "/mutual-funds/alerts",
  },
  {
    key: "openMfAlerts",
    label: "Open MF alerts",
    module: "Mutual Fund Service",
    path: "/mutual-funds/alerts/status/open",
  },
  {
    key: "criticalMfAlerts",
    label: "Critical MF alerts",
    module: "Mutual Fund Service",
    path: "/mutual-funds/alerts/status/critical",
  },
];

export const ACTION_ENDPOINTS: ApiActionEndpoint[] = [
  {
    method: "POST",
    module: "Unified Backend",
    label: "Register investor account",
    path: "/auth/register",
  },
  {
    method: "POST",
    module: "Unified Backend",
    label: "Login",
    path: "/auth/login",
  },
  {
    method: "POST",
    module: "Unified Backend",
    label: "Logout",
    path: "/auth/logout",
  },
  {
    method: "POST",
    module: "Unified Backend",
    label: "Refresh token",
    path: "/auth/refresh-token",
  },
  {
    method: "PUT",
    module: "Unified Backend",
    label: "Update investor",
    path: "/investors/:id",
  },
  {
    method: "DELETE",
    module: "Unified Backend",
    label: "Delete investor",
    path: "/investors/:id",
  },
  {
    method: "POST",
    module: "Unified Backend",
    label: "Create property",
    path: "/properties",
  },
  {
    method: "PUT",
    module: "Unified Backend",
    label: "Update property",
    path: "/properties/:id",
  },
  {
    method: "DELETE",
    module: "Unified Backend",
    label: "Delete property",
    path: "/properties/:id",
  },
  {
    method: "POST",
    module: "Unified Backend",
    label: "Create alert",
    path: "/alerts",
  },
  {
    method: "PATCH",
    module: "Unified Backend",
    label: "Resolve alert",
    path: "/alerts/:id/resolve",
  },
  {
    method: "POST",
    module: "Equity Service",
    label: "Create stock",
    path: "/equity/stocks",
  },
  {
    method: "POST",
    module: "Equity Service",
    label: "Buy stock",
    path: "/equity/transactions/buy",
  },
  {
    method: "POST",
    module: "Equity Service",
    label: "Sell stock",
    path: "/equity/transactions/sell",
  },
  {
    method: "POST",
    module: "Equity Service",
    label: "Create market order",
    path: "/equity/orders",
  },
  {
    method: "POST",
    module: "Equity Service",
    label: "Create portfolio snapshot",
    path: "/equity/portfolio-snapshots",
  },
  {
    method: "POST",
    module: "Equity Service",
    label: "Create dividend",
    path: "/equity/dividends",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create fund",
    path: "/mutual-funds/funds",
  },
  {
    method: "PUT",
    module: "Mutual Fund Service",
    label: "Update fund",
    path: "/mutual-funds/funds/:id",
  },
  {
    method: "DELETE",
    module: "Mutual Fund Service",
    label: "Delete fund",
    path: "/mutual-funds/funds/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create SIP",
    path: "/mutual-funds/sips",
  },
  {
    method: "PUT",
    module: "Mutual Fund Service",
    label: "Update SIP",
    path: "/mutual-funds/sips/:id",
  },
  {
    method: "DELETE",
    module: "Mutual Fund Service",
    label: "Delete SIP",
    path: "/mutual-funds/sips/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Execute SIP",
    path: "/mutual-funds/sips/execute/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create fund transaction",
    path: "/mutual-funds/transactions",
  },
  {
    method: "PUT",
    module: "Mutual Fund Service",
    label: "Update fund transaction",
    path: "/mutual-funds/transactions/:id",
  },
  {
    method: "DELETE",
    module: "Mutual Fund Service",
    label: "Delete fund transaction",
    path: "/mutual-funds/transactions/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create holding",
    path: "/mutual-funds/holdings",
  },
  {
    method: "PUT",
    module: "Mutual Fund Service",
    label: "Update holding",
    path: "/mutual-funds/holdings/:id",
  },
  {
    method: "DELETE",
    module: "Mutual Fund Service",
    label: "Delete holding",
    path: "/mutual-funds/holdings/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create mandate",
    path: "/mutual-funds/mandates",
  },
  {
    method: "PATCH",
    module: "Mutual Fund Service",
    label: "Approve mandate",
    path: "/mutual-funds/mandates/approve/:id",
  },
  {
    method: "PATCH",
    module: "Mutual Fund Service",
    label: "Reject mandate",
    path: "/mutual-funds/mandates/reject/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create bank account",
    path: "/mutual-funds/bank-accounts",
  },
  {
    method: "PATCH",
    module: "Mutual Fund Service",
    label: "Approve bank account",
    path: "/mutual-funds/bank-accounts/approve/:id",
  },
  {
    method: "PATCH",
    module: "Mutual Fund Service",
    label: "Reject bank account",
    path: "/mutual-funds/bank-accounts/reject/:id",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create NAV history",
    path: "/mutual-funds/nav",
  },
  {
    method: "POST",
    module: "Mutual Fund Service",
    label: "Create MF alert",
    path: "/mutual-funds/alerts",
  },
  {
    method: "PATCH",
    module: "Mutual Fund Service",
    label: "Resolve MF alert",
    path: "/mutual-funds/alerts/resolve/:id",
  },
  {
    method: "PATCH",
    module: "Mutual Fund Service",
    label: "Dismiss MF alert",
    path: "/mutual-funds/alerts/dismiss/:id",
  },
];

const countRecords = (data: any) => {

  if (Array.isArray(data)) {
    return data.length;
  }

  if (data && typeof data === "object") {
    return Object.keys(data).length;
  }

  return data ? 1 : 0;
};

export const fetchApiCoverage =
  async () => {

    const investorId =
      getStoredInvestorId();

    const results =
      await Promise.all(
        READ_ENDPOINTS.map(async (endpoint) => {

          if (
            endpoint.needsInvestor &&
            !investorId
          ) {
            return {
              ...endpoint,
              ok: false,
              status: "SKIPPED" as const,
              count: 0,
              message:
                "Investor id is not available for this session",
              data: null,
            };
          }

          const path =
            investorPath(
              endpoint.path,
              investorId
            );

          const response =
            await apiGet(path).catch((error) => ({
              ok: false,
              status: 0,
              success: false,
              message:
                error instanceof Error
                  ? error.message
                  : "Request failed",
              data: null,
            }));

          return {
            ...endpoint,
            path,
            ok: response.ok,
            status: response.status,
            count: countRecords(response.data),
            message:
              response.message ||
              (response.ok ? "OK" : "Failed"),
            data: response.data,
          };
        })
      );

    return results;
};

export const fetchPlatformOverview =
  async () => {

    const endpoints =
      await fetchApiCoverage();

    const byKey =
      Object.fromEntries(
        endpoints.map((endpoint) => [
          endpoint.key,
          endpoint,
        ])
      );

    return {
      endpoints,
      byKey,
      healthy:
        endpoints.filter((endpoint) => endpoint.ok)
          .length,
      total:
        endpoints.length,
      failed:
        endpoints.filter(
          (endpoint) =>
            !endpoint.ok &&
            endpoint.status !== "SKIPPED"
        ).length,
      skipped:
        endpoints.filter(
          (endpoint) =>
            endpoint.status === "SKIPPED"
        ).length,
    };
};
