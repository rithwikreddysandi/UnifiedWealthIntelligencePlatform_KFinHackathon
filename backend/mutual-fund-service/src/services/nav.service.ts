import * as navRepository from "../repositories/nav.repository.js";

import * as fundRepository from "../repositories/fund.repository.js";

import { redis } from "../config/redis.js";

import { CACHE_EXPIRY, CACHE_KEYS } from "../utils/constants.js";

import {
  CreateNavHistoryDTO,
  UpdateNavHistoryDTO,
} from "../models/navHistory.model.js";

export const createNavHistory = async (payload: CreateNavHistoryDTO) => {
  const fund = await fundRepository.getFundById(payload.fund_id);

  if (!fund) {
    throw new Error("Fund not found");
  }

  const existingNav = await navRepository.getNavByDate(
    payload.fund_id,
    payload.nav_date,
  );

  if (existingNav) {
    throw new Error("NAV already exists for this date");
  }

  const navHistory = await navRepository.createNavHistory(payload);

  await fundRepository.updateFund(payload.fund_id, {
    current_nav: payload.nav,
  });

  await redis.del(CACHE_KEYS.NAV_HISTORY);

  await redis.del(`${CACHE_KEYS.FUND_BY_ID}:${payload.fund_id}`);

  return navHistory;
};

export const getNavHistoryById = async (id: string) => {
  return await navRepository.getNavHistoryById(id);
};

export const getFundNavHistory = async (fundId: string) => {
  const cacheKey = `${CACHE_KEYS.NAV_HISTORY}:${fundId}`;

  const cachedNavHistory = await redis.get(cacheKey);

  if (cachedNavHistory) {
    return JSON.parse(cachedNavHistory);
  }

  const navHistory = await navRepository.getFundNavHistory(fundId);

  await redis.set(
    cacheKey,
    JSON.stringify(navHistory),
    "EX",
    CACHE_EXPIRY.MEDIUM,
  );

  return navHistory;
};

export const getLatestNav = async (fundId: string) => {
  return await navRepository.getLatestNav(fundId);
};

export const updateNavHistory = async (
  id: string,
  payload: UpdateNavHistoryDTO,
) => {
  const existingNav = await navRepository.getNavHistoryById(id);

  if (!existingNav) {
    throw new Error("NAV history not found");
  }

  const updatedNav = await navRepository.updateNavHistory(id, payload);

  if (payload.nav) {
    await fundRepository.updateFund(existingNav.fund_id, {
      current_nav: payload.nav,
    });
  }

  await redis.del(CACHE_KEYS.NAV_HISTORY);

  await redis.del(`${CACHE_KEYS.NAV_HISTORY}:${existingNav.fund_id}`);

  await redis.del(`${CACHE_KEYS.FUND_BY_ID}:${existingNav.fund_id}`);

  return updatedNav;
};

export const deleteNavHistory = async (id: string) => {
  const existingNav = await navRepository.getNavHistoryById(id);

  if (!existingNav) {
    throw new Error("NAV history not found");
  }

  const deletedNav = await navRepository.deleteNavHistory(id);

  await redis.del(CACHE_KEYS.NAV_HISTORY);

  await redis.del(`${CACHE_KEYS.NAV_HISTORY}:${existingNav.fund_id}`);

  await redis.del(`${CACHE_KEYS.FUND_BY_ID}:${existingNav.fund_id}`);

  return deletedNav;
};

export const getNavByDate = async (fundId: string, navDate: Date) => {
  return await navRepository.getNavByDate(fundId, navDate);
};

export const getLatestNavs = async () => {
  const cacheKey = `${CACHE_KEYS.NAV_HISTORY}:LATEST`;

  const cachedNavs = await redis.get(cacheKey);

  if (cachedNavs) {
    return JSON.parse(cachedNavs);
  }

  const latestNavs = await navRepository.getLatestNavs();

  await redis.set(
    cacheKey,
    JSON.stringify(latestNavs),
    "EX",
    CACHE_EXPIRY.SHORT,
  );

  return latestNavs;
};
