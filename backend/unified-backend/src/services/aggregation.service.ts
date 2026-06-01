import { getEquityHoldings } from "../integrations/equity/equity.client.js";

import {
  getMutualFunds,
  getSIPs,
} from "../integrations/mutualFunds/mf.client.js";

import { pool } from "../config/db.js";

export const aggregatePortfolio = async (
  investorId: string,
  authHeader?: string,
) => {
  try {
    // =========================
    // FETCH ALL SERVICES
    // =========================

    const [equityResult, mutualFundResult, sipResult] =
      await Promise.allSettled([
        getEquityHoldings(investorId, authHeader),

        getMutualFunds(investorId, authHeader),

        getSIPs(investorId, authHeader),
      ]);

    // =========================
    // SAFE EQUITY RESPONSE
    // =========================

    const equityResponse =
      equityResult.status === "fulfilled"
        ? equityResult.value
        : {
            success: false,
            data: [],
          };

    // =========================
    // SAFE MF RESPONSE
    // =========================

    const mutualFundResponse =
      mutualFundResult.status === "fulfilled"
        ? mutualFundResult.value
        : {
            success: false,
            data: [],
          };

    // =========================
    // SAFE SIP RESPONSE
    // =========================

    const sipResponse =
      sipResult.status === "fulfilled"
        ? sipResult.value
        : {
            success: false,
            data: [],
          };

    // =========================
    // SAFE ARRAY EXTRACTION
    // =========================

    const equities = Array.isArray(equityResponse?.data)
      ? equityResponse.data
      : [];

    const mutualFunds = Array.isArray(mutualFundResponse?.data)
      ? mutualFundResponse.data
      : [];

    const sips = Array.isArray(sipResponse?.data) ? sipResponse.data : [];

    // =========================
    // FETCH PROPERTIES
    // =========================

    let properties: any[] = [];

    try {
      const propertyResult = await pool.query(
        `
            SELECT *
            FROM properties
            WHERE investor_id = $1
            `,
        [investorId],
      );

      properties = Array.isArray(propertyResult.rows)
        ? propertyResult.rows
        : [];
    } catch (error) {
      console.log("Property Fetch Error:", error);

      properties = [];
    }

    // =========================
    // DEBUG LOGS
    // =========================

    console.log("Equities:", equities);

    console.log("Mutual Funds:", mutualFunds);

    console.log("SIPs:", sips);

    console.log("Properties:", properties);

    // =========================
    // CALCULATIONS
    // =========================

    const equityValue = equities.reduce(
      (sum: number, item: any) => sum + Number(item.current_value || 0),
      0,
    );

    const mutualFundValue = mutualFunds.reduce(
      (sum: number, item: any) => sum + Number(item.current_value || 0),
      0,
    );

    const propertyValue = properties.reduce(
      (sum: number, item: any) => sum + Number(item.current_valuation || 0),
      0,
    );

    const totalWealth = equityValue + mutualFundValue + propertyValue;

    // =========================
    // FINAL RESPONSE
    // =========================

    return {
      success: true,

      total_wealth: totalWealth,

      asset_allocation: {
        equities: equityValue,

        mutual_funds: mutualFundValue,

        real_estate: propertyValue,
      },

      service_status: {
        equity: equityResult.status === "fulfilled" ? "UP" : "DOWN",

        mutual_funds: mutualFundResult.status === "fulfilled" ? "UP" : "DOWN",

        sip_service: sipResult.status === "fulfilled" ? "UP" : "DOWN",
      },

      equities,

      mutual_funds: mutualFunds,

      sips,

      properties,
    };
  } catch (error) {
    console.log("Aggregation Error:", error);

    return {
      success: false,

      total_wealth: 0,

      asset_allocation: {
        equities: 0,
        mutual_funds: 0,
        real_estate: 0,
      },

      service_status: {
        equity: "DOWN",
        mutual_funds: "DOWN",
        sip_service: "DOWN",
      },

      equities: [],

      mutual_funds: [],

      sips: [],

      properties: [],

      message: "Portfolio aggregation failed",
    };
  }
};
