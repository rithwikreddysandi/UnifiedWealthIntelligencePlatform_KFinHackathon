import * as holdingRepository
  from "../repositories/holding.repository.js";

import * as fundRepository
  from "../repositories/fund.repository.js";

import { redis }
  from "../config/redis.js";

import {
  CACHE_EXPIRY,
  CACHE_KEYS,
} from "../utils/constants.js";

import {
  calculateCurrentValue,
  calculateProfitLoss,
  calculateReturnPercentage,
} from "../utils/calculation.js";

import {
  CreateInvestorHoldingDTO,
  UpdateInvestorHoldingDTO,
} from "../models/investorHolding.model.js";



export const createHolding =
  async (
    payload: CreateInvestorHoldingDTO
  ) => {

    const existingHolding =
      await holdingRepository
        .getHoldingByInvestorAndFund(
          payload.investor_id,
          payload.fund_id
        );

    if (existingHolding) {
      throw new Error(
        "Holding already exists"
      );
    }

    const holding =
      await holdingRepository
        .createHolding(payload);

    // clear cache
    await redis.del(
      `${CACHE_KEYS.INVESTOR_HOLDINGS}:${payload.investor_id}`
    );

    return holding;
  };





export const getHoldingById =
  async (id: string) => {

    return await holdingRepository
      .getHoldingById(id);
  };





export const getInvestorHoldings =
  async (
    investorId: string
  ) => {

    const cacheKey =
      `${CACHE_KEYS.INVESTOR_HOLDINGS}:${investorId}`;

    // check cache
    const cachedHoldings =
      await redis.get(cacheKey);

    if (cachedHoldings) {
      return JSON.parse(
        cachedHoldings
      );
    }

    const holdings =
      await holdingRepository
        .getInvestorHoldings(
          investorId
        );

    // update current values
    const updatedHoldings =
      await Promise.all(
        holdings.map(
          async (holding: any) => {

            const fund =
              await fundRepository
                .getFundById(
                  holding.fund_id
                );

            const currentNav =
              Number(
                fund.current_nav
              );

            const currentValue =
              calculateCurrentValue(
                Number(
                  holding.units
                ),
                currentNav
              );

            const profitLoss =
              calculateProfitLoss(
                Number(
                  holding.invested_amount
                ),
                currentValue
              );

            const returnPercentage =
              calculateReturnPercentage(
                Number(
                  holding.invested_amount
                ),
                currentValue
              );

            return {
              ...holding,
              current_nav:
                currentNav,
              current_value:
                currentValue,
              profit_loss:
                profitLoss,
              return_percentage:
                returnPercentage,
            };
          }
        )
      );

    // cache result
    await redis.set(
      cacheKey,
      JSON.stringify(
        updatedHoldings
      ),
      "EX",
      CACHE_EXPIRY.MEDIUM
    );

    return updatedHoldings;
  };





export const updateHolding =
  async (
    id: string,
    payload: UpdateInvestorHoldingDTO
  ) => {

    const existingHolding =
      await holdingRepository
        .getHoldingById(id);

    if (!existingHolding) {
      throw new Error(
        "Holding not found"
      );
    }

    const updatedHolding =
      await holdingRepository
        .updateHolding(
          id,
          payload
        );

    // clear cache
    await redis.del(
      `${CACHE_KEYS.INVESTOR_HOLDINGS}:${existingHolding.investor_id}`
    );

    return updatedHolding;
  };





export const deleteHolding =
  async (id: string) => {

    const existingHolding =
      await holdingRepository
        .getHoldingById(id);

    if (!existingHolding) {
      throw new Error(
        "Holding not found"
      );
    }

    const deletedHolding =
      await holdingRepository
        .deleteHolding(id);

    // clear cache
    await redis.del(
      `${CACHE_KEYS.INVESTOR_HOLDINGS}:${existingHolding.investor_id}`
    );

    return deletedHolding;
  };





export const getInvestorPortfolioSummary =
  async (
    investorId: string
  ) => {

    const holdings =
      await holdingRepository
        .getInvestorHoldings(
          investorId
        );

    let totalInvestment = 0;

    let totalCurrentValue = 0;

    let totalProfitLoss = 0;

    for (const holding of holdings) {

      const fund =
        await fundRepository
          .getFundById(
            holding.fund_id
          );

      const currentNav =
        Number(
          fund.current_nav
        );

      const currentValue =
        calculateCurrentValue(
          Number(
            holding.units
          ),
          currentNav
        );

      const profitLoss =
        calculateProfitLoss(
          Number(
            holding.invested_amount
          ),
          currentValue
        );

      totalInvestment += Number(
        holding.invested_amount
      );

      totalCurrentValue +=
        currentValue;

      totalProfitLoss +=
        profitLoss;
    }

    const totalReturnPercentage =
      calculateReturnPercentage(
        totalInvestment,
        totalCurrentValue
      );

    return {
      investor_id: investorId,
      total_invested_amount:
        totalInvestment,
      total_current_value:
        totalCurrentValue,
      total_profit_loss:
        totalProfitLoss,
      total_return_percentage:
        totalReturnPercentage,
    };
  };