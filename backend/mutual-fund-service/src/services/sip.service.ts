import * as sipRepository from "../repositories/sip.repository.js";

import * as mandateRepository from "../repositories/mandate.repository.js";

import * as holdingRepository from "../repositories/holding.repository.js";

import * as fundRepository from "../repositories/fund.repository.js";

import * as transactionRepository from "../repositories/transaction.repository.js";

import { redis } from "../config/redis.js";

import { CACHE_EXPIRY, CACHE_KEYS } from "../utils/constants.js";

import {
  calculateUnits,
  calculateCurrentValue,
  calculateProfitLoss,
  getNextSipDate,
} from "../utils/calculation.js";

import {
  CreateSipAccountDTO,
  UpdateSipAccountDTO,
} from "../models/sipAccount.model.js";

import {
  CreateSipTransactionDTO,
  UpdateSipTransactionDTO,
} from "../models/sipTransaction.model.js";

import { OrderStatus, MfTransactionType } from "../utils/enums.js";

export const createSip = async (payload: CreateSipAccountDTO) => {
  const validMandate = await mandateRepository.validateMandate(
    payload.investor_id,
    payload.sip_amount,
  );

  if (!validMandate) {
    throw new Error("No valid approved mandate found");
  }

  const sip = await sipRepository.createSip(payload);

  return sip;
};

export const getAllSips = async () => {
  return await sipRepository.getAllSips();
};

export const getSipById = async (id: string) => {
  return await sipRepository.getSipById(id);
};

export const getInvestorSips = async (investorId: string) => {
  return await sipRepository.getInvestorSips(investorId);
};

export const updateSip = async (id: string, payload: UpdateSipAccountDTO) => {
  const existingSip = await sipRepository.getSipById(id);

  if (!existingSip) {
    throw new Error("SIP not found");
  }

  return await sipRepository.updateSip(id, payload);
};

export const deleteSip = async (id: string) => {
  const existingSip = await sipRepository.getSipById(id);

  if (!existingSip) {
    throw new Error("SIP not found");
  }

  return await sipRepository.deleteSip(id);
};

export const createSipTransaction = async (
  payload: CreateSipTransactionDTO,
) => {
  return await sipRepository.createSipTransaction(payload);
};

export const getSipTransactions = async (sipId: string) => {
  return await sipRepository.getSipTransactions(sipId);
};

export const updateSipTransaction = async (
  id: string,
  payload: UpdateSipTransactionDTO,
) => {
  return await sipRepository.updateSipTransaction(id, payload);
};

export const executeSip = async (sipId: string) => {
  const sip = await sipRepository.getSipById(sipId);

  if (!sip) {
    throw new Error("SIP not found");
  }

  const validMandate = await mandateRepository.validateMandate(
    sip.investor_id,
    sip.sip_amount,
  );

  if (!validMandate) {
    await sipRepository.createSipTransaction({
      sip_id: sip.id,
      amount: sip.sip_amount,
      transaction_status: OrderStatus.FAILED,
      failure_reason: "Mandate validation failed",
    });

    throw new Error("Mandate validation failed");
  }

  const fund = await fundRepository.getFundById(sip.fund_id);

  if (!fund) {
    throw new Error("Fund not found");
  }

  const nav = Number(fund.current_nav);

  const units = calculateUnits(sip.sip_amount, nav);

  const sipTransaction = await sipRepository.createSipTransaction({
    sip_id: sip.id,
    amount: sip.sip_amount,
    nav,
    units_allocated: units,
    debit_date: new Date(),
    transaction_status: OrderStatus.SUCCESS,
  });

  await transactionRepository.createTransaction({
    investor_id: sip.investor_id,
    fund_id: sip.fund_id,
    transaction_type: MfTransactionType.PURCHASE,
    amount: sip.sip_amount,
    units,
    nav,
  });

  const existingHolding = await holdingRepository.getHoldingByInvestorAndFund(
    sip.investor_id,
    sip.fund_id,
  );

  if (existingHolding) {
    const updatedUnits = Number(existingHolding.units) + Number(units);

    const updatedInvestment =
      Number(existingHolding.invested_amount) + Number(sip.sip_amount);

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

    const profitLoss = calculateProfitLoss(sip.sip_amount, currentValue);

    await holdingRepository.createHolding({
      investor_id: sip.investor_id,
      fund_id: sip.fund_id,
      units,
      average_nav: nav,
      invested_amount: sip.sip_amount,
      current_value: currentValue,
      profit_loss: profitLoss,
    });
  }

  const nextSipDate = getNextSipDate(new Date(), sip.frequency);

  await sipRepository.updateSip(sip.id, {
    next_installment_date: nextSipDate,
  });

  await redis.del(`${CACHE_KEYS.INVESTOR_HOLDINGS}:${sip.investor_id}`);

  return sipTransaction;
};

export const getFailedSipTransactions = async () => {
  return await sipRepository.getFailedSipTransactions();
};
