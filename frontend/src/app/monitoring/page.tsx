"use client";

import {
  useEffect,
  useState,
} from "react";

import ServiceCard from "@/components/alerts/ServiceCard";

import {
  getServiceHealth,
} from "@/services/alert.service";

export default function MonitoringPage() {

  const [services, setServices] =
    useState<any[]>([]);

  useEffect(() => {

    fetchServices();

  }, []);

  const fetchServices =
    async () => {

      try {

        const response =
          await getServiceHealth();

        setServices(
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

          Service Monitoring

        </h1>

        <p className="text-[var(--muted)] mt-3">

          Distributed backend infrastructure monitoring

        </p>

      </div>

      {/* SERVICES */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {services.map(
          (service, index) => (

            <ServiceCard
              key={index}
              service={service}
            />
          )
        )}

      </div>

    </div>
  );
}