import * as transactionRepository from "../repositories/transaction.repository.js";

import * as fundRepository from "../repositories/fund.repository.js";

import * as holdingRepository from "../repositories/holding.repository.js";

import { redis } from "../config/redis.js";

import { CACHE_KEYS } from "../utils/constants.js";

import {
  calculateUnits,
  calculateCurrentValue,
  calculateProfitLoss,
} from "../utils/calculation.js";

import {
  CreateFundTransactionDTO,
  UpdateFundTransactionDTO,
} from "../models/fundTransaction.model.js";

import { MfTransactionType, OrderStatus } from "../utils/enums.js";

export const createTransaction = async (payload: CreateFundTransactionDTO) => {
  const fund = await fundRepository.getFundById(payload.fund_id);

  if (!fund) {
    throw new Error("Fund not found");
  }

  const nav = Number(fund.current_nav);

  const units = calculateUnits(payload.amount, nav);

  const transaction = await transactionRepository.createTransaction({
    ...payload,
    units,
    nav,
  });

  await transactionRepository.updateTransaction(transaction.id, {
    status: OrderStatus.SUCCESS,
  });

  const existingHolding = await holdingRepository.getHoldingByInvestorAndFund(
    payload.investor_id,
    payload.fund_id,
  );

  if (payload.transaction_type === MfTransactionType.PURCHASE) {
    if (existingHolding) {
      const updatedUnits = Number(existingHolding.units) + Number(units);

      const updatedInvestment =
        Number(existingHolding.invested_amount) + Number(payload.amount);

      const averageNav = updatedInvestment / updatedUnits;

      const currentValue = calculateCurrentValue(updatedUnits, nav);

      const profitLoss = calculateProfitLoss(updatedInvestment, currentValue);

      await holdingRepository.updateHolding(existingHolding.id, {
        units: updatedUnits,
        average_nav: averageNav,
        invested_amount: updatedInvestment,
        current_value: currentValue,
        profit_loss: profitLoss,
      });
    } else {
      const currentValue = calculateCurrentValue(units, nav);

      const profitLoss = calculateProfitLoss(payload.amount, currentValue);

      await holdingRepository.createHolding({
        investor_id: payload.investor_id,
        fund_id: payload.fund_id,
        units,
        average_nav: nav,
        invested_amount: payload.amount,
        current_value: currentValue,
        profit_loss: profitLoss,
      });
    }
  }

  if (payload.transaction_type === MfTransactionType.REDEEM) {
    if (!existingHolding) {
      throw new Error("Holding not found");
    }

    if (Number(existingHolding.units) < Number(units)) {
      throw new Error("Insufficient units");
    }

    const updatedUnits = Number(existingHolding.units) - Number(units);

    const updatedInvestment =
      Number(existingHolding.invested_amount) - Number(payload.amount);

    const currentValue = calculateCurrentValue(updatedUnits, nav);

    const profitLoss = calculateProfitLoss(updatedInvestment, currentValue);

    await holdingRepository.updateHolding(existingHolding.id, {
      units: updatedUnits,
      invested_amount: updatedInvestment,
      current_value: currentValue,
      profit_loss: profitLoss,
    });
  }

  await redis.del(`${CACHE_KEYS.INVESTOR_HOLDINGS}:${payload.investor_id}`);

  return transaction;
};

export const getAllTransactions = async () => {
  return await transactionRepository.getAllTransactions();
};

export const getTransactionById = async (id: string) => {
  return await transactionRepository.getTransactionById(id);
};

export const getInvestorTransactions = async (investorId: string) => {
  return await transactionRepository.getInvestorTransactions(investorId);
};

export const updateTransaction = async (
  id: string,
  payload: UpdateFundTransactionDTO,
) => {
  const existingTransaction =
    await transactionRepository.getTransactionById(id);

  if (!existingTransaction) {
    throw new Error("Transaction not found");
  }

  return await transactionRepository.updateTransaction(id, payload);
};

export const deleteTransaction = async (id: string) => {
  const existingTransaction =
    await transactionRepository.getTransactionById(id);

  if (!existingTransaction) {
    throw new Error("Transaction not found");
  }

  return await transactionRepository.deleteTransaction(id);
};

export const getPendingTransactions = async () => {
  return await transactionRepository.getPendingTransactions();
};

export const getFailedTransactions = async () => {
  return await transactionRepository.getFailedTransactions();
};
