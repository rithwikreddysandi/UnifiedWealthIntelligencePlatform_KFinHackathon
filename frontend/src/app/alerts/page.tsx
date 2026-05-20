"use client";

import {
  useEffect,
  useState,
} from "react";

import AlertCard from "@/components/alerts/AlertCard";

import {
  getAlerts,
} from "@/services/alert.service";

export default function AlertsPage() {

  const [alerts, setAlerts] =
    useState<any[]>([]);

  useEffect(() => {

    fetchAlerts();

  }, []);

  const fetchAlerts =
    async () => {

      try {

        const response =
          await getAlerts();

        setAlerts(
          response.data || []
        );

      } catch (error) {

        console.log(error);
      }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black">

          Operational Alerts

        </h1>

        <p className="text-[var(--muted)] mt-3">

          Monitor operational activities and risk events

        </p>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {alerts.map(
          (alert) => (

            <AlertCard
              key={alert.id}
              alert={alert}
            />
          )
        )}

      </div>

    </div>
  );
}