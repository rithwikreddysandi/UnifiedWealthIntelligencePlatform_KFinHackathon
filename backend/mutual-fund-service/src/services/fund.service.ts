import * as fundRepository from "../repositories/fund.repository.js";

import { redis } from "../config/redis.js";

import {
  CACHE_EXPIRY,
  CACHE_KEYS,
} from "../utils/constants.js";

import {
  CreateMutualFundDTO,
  UpdateMutualFundDTO,
} from "../models/mutualFund.model.js";



export const createFund = async (
  payload: CreateMutualFundDTO
) => {

  // check duplicate fund code
  const existingFund =
    await fundRepository.getFundByCode(
      payload.fund_code
    );

  if (existingFund) {
    throw new Error(
      "Fund code already exists"
    );
  }

  const fund =
    await fundRepository.createFund(
      payload
    );

  // clear cache
  await redis.del(
    CACHE_KEYS.ALL_FUNDS
  );

  return fund;
};





export const getAllFunds =
  async () => {

    // check cache
    const cachedFunds =
      await redis.get(
        CACHE_KEYS.ALL_FUNDS
      );

    if (cachedFunds) {
      return JSON.parse(cachedFunds);
    }

    const funds =
      await fundRepository.getAllFunds();

    // cache result
    await redis.set(
      CACHE_KEYS.ALL_FUNDS,
      JSON.stringify(funds),
      "EX",
      CACHE_EXPIRY.MEDIUM
    );

    return funds;
  };





export const getFundById =
  async (id: string) => {

    const cacheKey =
      `${CACHE_KEYS.FUND_BY_ID}:${id}`;

    // check cache
    const cachedFund =
      await redis.get(cacheKey);

    if (cachedFund) {
      return JSON.parse(cachedFund);
    }

    const fund =
      await fundRepository.getFundById(id);

    if (!fund) {
      return null;
    }

    // cache result
    await redis.set(
      cacheKey,
      JSON.stringify(fund),
      "EX",
      CACHE_EXPIRY.MEDIUM
    );

    return fund;
  };





export const updateFund =
  async (
    id: string,
    payload: UpdateMutualFundDTO
  ) => {

    const existingFund =
      await fundRepository.getFundById(id);

    if (!existingFund) {
      throw new Error(
        "Fund not found"
      );
    }

    const updatedFund =
      await fundRepository.updateFund(
        id,
        payload
      );

    // clear cache
    await redis.del(
      CACHE_KEYS.ALL_FUNDS
    );

    await redis.del(
      `${CACHE_KEYS.FUND_BY_ID}:${id}`
    );

    return updatedFund;
  };





export const deleteFund =
  async (id: string) => {

    const existingFund =
      await fundRepository.getFundById(id);

    if (!existingFund) {
      throw new Error(
        "Fund not found"
      );
    }

    const deletedFund =
      await fundRepository.deleteFund(id);

    // clear cache
    await redis.del(
      CACHE_KEYS.ALL_FUNDS
    );

    await redis.del(
      `${CACHE_KEYS.FUND_BY_ID}:${id}`
    );

    return deletedFund;
  };