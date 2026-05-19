import { Request, Response, NextFunction } from "express";

import * as bankAccountService from "../services/bankAccount.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bankAccount = await bankAccountService.createBankAccount(req.body);

    return successResponse(
      res,
      "Bank account created successfully",
      bankAccount,
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const getAllBankAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accounts = await bankAccountService.getAllBankAccounts();

    return successResponse(res, "Bank accounts fetched successfully", accounts);
  } catch (error) {
    next(error);
  }
};

export const getBankAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const account = await bankAccountService.getBankAccountById(id);

    if (!account) {
      return errorResponse(res, "Bank account not found", 404);
    }

    return successResponse(res, "Bank account fetched successfully", account);
  } catch (error) {
    next(error);
  }
};

export const getInvestorBankAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const investorId = req.params.investorId as string;

    const accounts =
      await bankAccountService.getInvestorBankAccounts(investorId);

    return successResponse(
      res,
      "Investor bank accounts fetched successfully",
      accounts,
    );
  } catch (error) {
    next(error);
  }
};

export const updateBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const updatedAccount = await bankAccountService.updateBankAccount(
      id,
      req.body,
    );

    return successResponse(
      res,
      "Bank account updated successfully",
      updatedAccount,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const deletedAccount = await bankAccountService.deleteBankAccount(id);

    return successResponse(
      res,
      "Bank account deleted successfully",
      deletedAccount,
    );
  } catch (error) {
    next(error);
  }
};

export const approveBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const account = await bankAccountService.approveBankAccount(id);

    return successResponse(res, "Bank account approved successfully", account);
  } catch (error) {
    next(error);
  }
};

export const rejectBankAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const account = await bankAccountService.rejectBankAccount(id);

    return successResponse(res, "Bank account rejected successfully", account);
  } catch (error) {
    next(error);
  }
};
