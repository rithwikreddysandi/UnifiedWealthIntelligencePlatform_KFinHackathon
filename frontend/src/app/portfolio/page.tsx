"use client";

import {
  useEffect,
  useState,
} from "react";

import PageWrapper from "@/components/ui/PageWrapper";

import {
  getDashboardData,
} from "@/services/dashboard.service";

export default function PortfolioPage() {

  const [portfolio, setPortfolio] =
    useState<any>(null);

  const [activeTab, setActiveTab] =
    useState("properties");

  useEffect(() => {

    fetchPortfolio();

  }, []);

  const fetchPortfolio =
    async () => {

      try {

        const response =
          await getDashboardData();

        console.log(
          "PORTFOLIO RESPONSE:",
          response
        );

        setPortfolio(
          response.data || response
        );

      } catch (error) {

        console.log(error);
      }
  };

  if (!portfolio) {

    return (

      <PageWrapper>

        <div
          className="
            flex
            items-center
            justify-center
            h-[70vh]
            text-2xl
            font-bold
          "
        >

          Loading Portfolio...

        </div>

      </PageWrapper>
    );
  }

  // SAFE ARRAYS

  const equities =
    Array.isArray(
      portfolio?.equities
    )
      ? portfolio.equities
      : [];

  const mutualFunds =
    Array.isArray(
      portfolio?.mutual_funds
    )
      ? portfolio.mutual_funds
      : [];

  const sips =
    Array.isArray(
      portfolio?.sips
    )
      ? portfolio.sips
      : [];

  const properties =
    Array.isArray(
      portfolio?.properties
    )
      ? portfolio.properties
      : [];

  return (

    <PageWrapper>

      <div className="space-y-8">

        {/* HEADER */}

        <div
          className="
            glass-card
            rounded-3xl
            p-8
          "
        >

          <p className="text-lg text-[var(--muted)]">

            Total Portfolio Value

          </p>

          <h1 className="text-6xl font-black mt-4">

            ₹
            {Number(
              portfolio?.total_wealth || 0
            ).toLocaleString()}

          </h1>

        </div>

        {/* TABS */}

        <div className="flex flex-wrap gap-4">

          {[
            "equities",
            "mutual_funds",
            "sips",
            "properties",
          ].map((tab) => (

            <button
              key={tab}

              onClick={() =>
                setActiveTab(tab)
              }

              className={`
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition-all

                ${
                  activeTab === tab
                    ? `
                      bg-blue-600
                      text-white
                      shadow-xl
                    `
                    : `
                      bg-[var(--card)]
                      hover:bg-blue-100
                      dark:hover:bg-blue-900
                    `
                }
              `}
            >

              {tab
                .replace("_", " ")
                .toUpperCase()}

            </button>
          ))}

        </div>

        {/* EQUITIES */}

        {activeTab ===
          "equities" && (

          <div className="glass-card rounded-3xl overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[var(--card-border)]">

                  <th className="p-5 text-left">

                    Symbol

                  </th>

                  <th className="p-5 text-left">

                    Company

                  </th>

                  <th className="p-5 text-left">

                    Quantity

                  </th>

                  <th className="p-5 text-left">

                    Current Value

                  </th>

                </tr>

              </thead>

              <tbody>

                {equities.length > 0 ? (

                  equities.map(
                    (
                      stock: any,
                      index: number
                    ) => (

                      <tr
                        key={`${stock.id}-${index}`}
                        className="border-b border-[var(--card-border)]"
                      >

                        <td className="p-5">

                          {stock.symbol}

                        </td>

                        <td className="p-5">

                          {stock.company_name}

                        </td>

                        <td className="p-5">

                          {stock.quantity}

                        </td>

                        <td className="p-5">

                          ₹
                          {Number(
                            stock.current_value
                          ).toLocaleString()}

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="p-10 text-center"
                    >

                      No Equity Holdings

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>
        )}

        {/* MUTUAL FUNDS */}

        {activeTab ===
          "mutual_funds" && (

          <div className="glass-card rounded-3xl overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[var(--card-border)]">

                  <th className="p-5 text-left">

                    Fund Name

                  </th>

                  <th className="p-5 text-left">

                    Units

                  </th>

                  <th className="p-5 text-left">

                    NAV

                  </th>

                  <th className="p-5 text-left">

                    Current Value

                  </th>

                </tr>

              </thead>

              <tbody>

                {mutualFunds.length > 0 ? (

                  mutualFunds.map(
                    (
                      fund: any,
                      index: number
                    ) => (

                      <tr
                        key={`${fund.id}-${index}`}
                        className="border-b border-[var(--card-border)]"
                      >

                        <td className="p-5">

                          {fund.fund_name}

                        </td>

                        <td className="p-5">

                          {fund.units}

                        </td>

                        <td className="p-5">

                          ₹{fund.nav}

                        </td>

                        <td className="p-5">

                          ₹
                          {Number(
                            fund.current_value
                          ).toLocaleString()}

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="p-10 text-center"
                    >

                      No Mutual Funds

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>
        )}

        {/* SIPS */}

        {activeTab ===
          "sips" && (

          <div className="glass-card rounded-3xl overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[var(--card-border)]">

                  <th className="p-5 text-left">

                    Fund

                  </th>

                  <th className="p-5 text-left">

                    Amount

                  </th>

                  <th className="p-5 text-left">

                    Frequency

                  </th>

                  <th className="p-5 text-left">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {sips.length > 0 ? (

                  sips.map(
                    (
                      sip: any,
                      index: number
                    ) => (

                      <tr
                        key={`${sip.id}-${index}`}
                        className="border-b border-[var(--card-border)]"
                      >

                        <td className="p-5">

                          {sip.fund_name}

                        </td>

                        <td className="p-5">

                          ₹
                          {Number(
                            sip.amount || 0
                          ).toLocaleString()}

                        </td>

                        <td className="p-5">

                          {sip.frequency}

                        </td>

                        <td className="p-5">

                          {sip.status}

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="p-10 text-center"
                    >

                      No SIPs Available

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>
        )}

        {/* PROPERTIES */}

        {activeTab ===
          "properties" && (

          <div className="glass-card rounded-3xl overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[var(--card-border)]">

                  <th className="p-5 text-left">

                    Property

                  </th>

                  <th className="p-5 text-left">

                    Type

                  </th>

                  <th className="p-5 text-left">

                    Location

                  </th>

                  <th className="p-5 text-left">

                    Valuation

                  </th>

                </tr>

              </thead>

              <tbody>

                {properties.length > 0 ? (

                  properties.map(
                    (
                      property: any,
                      index: number
                    ) => (

                      <tr
                        key={`${property.id}-${index}`}
                        className="border-b border-[var(--card-border)]"
                      >

                        <td className="p-5">

                          {property.property_name}

                        </td>

                        <td className="p-5">

                          {property.property_type}

                        </td>

                        <td className="p-5">

                          {property.location}

                        </td>

                        <td className="p-5">

                          ₹
                          {Number(
                            property.current_valuation
                          ).toLocaleString()}

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="p-10 text-center"
                    >

                      No Properties Found

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </PageWrapper>
  );
}