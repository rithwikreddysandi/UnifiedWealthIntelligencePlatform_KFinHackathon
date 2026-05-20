"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FaWallet,
  FaChartPie,
  FaBuilding,
  FaMoneyBillWave,
} from "react-icons/fa";

import StatCard from "@/components/dashboard/StatCard";

import AssetAllocationChart from "@/components/dashboard/AssetAllocationChart";

import ServiceHealth from "@/components/dashboard/ServiceHealth";

import AlertsPanel from "@/components/dashboard/AlertsPanel";

import SearchBar from "@/components/dashboard/SearchBar";

import WealthTrendChart from "@/components/dashboard/WealthTrendChart";

import RecentTransactions from "@/components/dashboard/RecentTransactions";

import Skeleton from "@/components/ui/Skeleton";

import PageWrapper from "@/components/ui/PageWrapper";

import {
  getDashboardData,
} from "@/services/dashboard.service";

import {
  getAlerts,
  getServiceHealth,
} from "@/services/alert.service";

export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [alerts, setAlerts] =
    useState<any[]>([]);

  const [services, setServices] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        // FETCH ALL DATA IN PARALLEL

        const [
          dashboardResponse,
          alertsResponse,
          servicesResponse,
        ] = await Promise.all([
          getDashboardData(),
          getAlerts(),
          getServiceHealth(),
        ]);

        console.log("Dashboard:",dashboardResponse);

        console.log("Alerts:", alertsResponse);

        console.log("Services:",servicesResponse);

        // HANDLE DASHBOARD RESPONSE

        const dashboardData =
  dashboardResponse?.data ||
  dashboardResponse;

console.log(
  "FINAL DASHBOARD:",
  dashboardData
);

setDashboard(
  dashboardData
);

        // HANDLE ALERTS

        setAlerts(
          alertsResponse.data ||
          alertsResponse ||
          []
        );

        // HANDLE SERVICES

        setServices(
  Array.isArray(
    servicesResponse?.data
  )
    ? servicesResponse.data
    : Array.isArray(
        servicesResponse
      )
    ? servicesResponse
    : []
);

      } catch (error) {

        console.log(
          "Dashboard Error:",
          error
        );

      } finally {

        setLoading(false);
      }
  };

  // LOADING STATE

  if (loading) {

    return (
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />

      </div>
    );
  }

  // NO DATA STATE

  if (!dashboard) {

    return (
      <div
        className="
          min-h-[60vh]
          flex
          items-center
          justify-center
        "
      >

        <div className="text-center">

          <h2 className="text-3xl font-black">

            No Dashboard Data

          </h2>

          <p className="text-[var(--muted)] mt-3">

            Backend response is empty.

          </p>

        </div>

      </div>
    );
  }

  return (
    <PageWrapper>

      <div className="space-y-8">

        {/* HEADER */}

        <div>

          <h1 className="text-4xl font-black">

            Wealth Dashboard

          </h1>

          <p className="text-[var(--muted)] mt-3">

            Unified operational wealth overview

          </p>

        </div>

        {/* SEARCH */}

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* DEBUG */}

        <div
          className="
            glass-card
            rounded-3xl
            p-5
            overflow-auto
            text-sm
          "
        >
          

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          <StatCard
            title="Total Wealth"
            value={`₹${dashboard?.total_wealth || 0}`}
            icon={FaWallet}
            color="bg-blue-600"
          />

          <StatCard
            title="Equities"
            value={`₹${dashboard?.asset_allocation?.equities || 0}`}
            icon={FaChartPie}
            color="bg-green-600"
          />

          <StatCard
            title="Mutual Funds"
            value={`₹${dashboard?.asset_allocation?.mutual_funds || 0}`}
            icon={FaMoneyBillWave}
            color="bg-purple-600"
          />

          <StatCard
            title="Real Estate"
            value={`₹${dashboard?.asset_allocation?.real_estate || 0}`}
            icon={FaBuilding}
            color="bg-orange-600"
          />

        </div>

        {/* CHART + SERVICE */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-8
          "
        >

          {/* PIE CHART */}

          <div className="xl:col-span-2">

            <AssetAllocationChart
              equities={
                dashboard?.asset_allocation?.equities || 0
              }
              mutualFunds={
                dashboard?.asset_allocation?.mutual_funds || 0
              }
              realEstate={
                dashboard?.asset_allocation?.real_estate || 0
              }
            />

          </div>

          {/* SERVICE HEALTH */}

          <ServiceHealth
  services={
    Array.isArray(services)
      ? services.map(
          (service: any) => ({
            name:
              service.service_name ||
              service.name ||
              "Unknown Service",

            status:
              service.status ===
              "HEALTHY"
                ? "UP"
                : service.status ||
                  "DOWN",
          })
        )
      : []
  }
/>

        </div>

        {/* TREND + TRANSACTIONS */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-8
          "
        >

          <div className="xl:col-span-2">

            <WealthTrendChart />

          </div>

          <RecentTransactions />

        </div>

        {/* ALERTS */}

        <AlertsPanel
  alerts={
    Array.isArray(alerts)
      ? alerts.map(
          (alert: any) => ({
            title:
              alert.message ||
              alert.title ||
              alert.alert_type ||
              "Alert",

            severity:
              alert.severity ||
              "MEDIUM",
          })
        )
      : []
  }
/>

      </div>

    </PageWrapper>
  );
}