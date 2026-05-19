import * as bankAccountRepository from "../repositories/bankAccount.repository.js";

import {
  CreateBankAccountDTO,
  UpdateBankAccountDTO,
} from "../models/bankAccount.model.js";

import { MandateStatus } from "../utils/enums.js";

export const createBankAccount = async (payload: CreateBankAccountDTO) => {
  // validate IFSC
  if (payload.ifsc_code.length < 8) {
    throw new Error("Invalid IFSC code");
  }

  const bankAccount = await bankAccountRepository.createBankAccount(payload);

  return bankAccount;
};

export const getAllBankAccounts = async () => {
  return await bankAccountRepository.getAllBankAccounts();
};

export const getBankAccountById = async (id: string) => {
  return await bankAccountRepository.getBankAccountById(id);
};

export const getInvestorBankAccounts = async (investorId: string) => {
  return await bankAccountRepository.getInvestorBankAccounts(investorId);
};

export const updateBankAccount = async (
  id: string,
  payload: UpdateBankAccountDTO,
) => {
  const existingBankAccount =
    await bankAccountRepository.getBankAccountById(id);

  if (!existingBankAccount) {
    throw new Error("Bank account not found");
  }

  return await bankAccountRepository.updateBankAccount(id, payload);
};

export const deleteBankAccount = async (id: string) => {
  const existingBankAccount =
    await bankAccountRepository.getBankAccountById(id);

  if (!existingBankAccount) {
    throw new Error("Bank account not found");
  }

  return await bankAccountRepository.deleteBankAccount(id);
};

export const approveBankAccount = async (id: string) => {
  const existingBankAccount =
    await bankAccountRepository.getBankAccountById(id);

  if (!existingBankAccount) {
    throw new Error("Bank account not found");
  }

  return await bankAccountRepository.updateBankAccount(id, {
    mandate_status: MandateStatus.APPROVED,
  });
};

export const rejectBankAccount = async (id: string) => {
  const existingBankAccount =
    await bankAccountRepository.getBankAccountById(id);

  if (!existingBankAccount) {
    throw new Error("Bank account not found");
  }

  return await bankAccountRepository.updateBankAccount(id, {
    mandate_status: MandateStatus.REJECTED,
  });
};

export const getApprovedBankAccounts = async () => {
  return await bankAccountRepository.getApprovedBankAccounts();
};

export const getPendingBankAccounts = async () => {
  return await bankAccountRepository.getPendingBankAccounts();
};
