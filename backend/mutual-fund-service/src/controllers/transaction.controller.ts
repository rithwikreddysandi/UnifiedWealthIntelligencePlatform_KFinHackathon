import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as transactionService
  from "../services/transaction.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";



export const createTransaction =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const transaction =
        await transactionService
          .createTransaction(
            req.body
          );

      return successResponse(
        res,
        "Transaction created successfully",
        transaction,
        201
      );

    } catch (error) {

      next(error);
    }
  };





export const getAllTransactions =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const transactions =
        await transactionService
          .getAllTransactions();

      return successResponse(
        res,
        "Transactions fetched successfully",
        transactions
      );

    } catch (error) {

      next(error);
    }
  };





export const getTransactionById =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const { id } = req.params;

      const transaction =
        await transactionService
          .getTransactionById(id as string);

      if (!transaction) {

        return errorResponse(
          res,
          "Transaction not found",
          404
        );
      }

      return successResponse(
        res,
        "Transaction fetched successfully",
        transaction
      );

    } catch (error) {

      next(error);
    }
  };





export const getInvestorTransactions =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const { investorId } =
        req.params;

      const transactions =
        await transactionService
          .getInvestorTransactions(
            investorId as string
          );

      return successResponse(
        res,
        "Investor transactions fetched successfully",
        transactions
      );

    } catch (error) {

      next(error);
    }
  };





export const updateTransaction =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const { id } = req.params;

      const updatedTransaction =
        await transactionService
          .updateTransaction(
            id as string,
            req.body
          );

      return successResponse(
        res,
        "Transaction updated successfully",
        updatedTransaction
      );

    } catch (error) {

      next(error);
    }
  };





export const deleteTransaction =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const { id } = req.params;

      const deletedTransaction =
        await transactionService
          .deleteTransaction(id as string);

      return successResponse(
        res,
        "Transaction deleted successfully",
        deletedTransaction
      );

    } catch (error) {

      next(error);
    }
  };





export const getPendingTransactions =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const transactions =
        await transactionService
          .getPendingTransactions();

      return successResponse(
        res,
        "Pending transactions fetched successfully",
        transactions
      );

    } catch (error) {

      next(error);
    }
  };





export const getFailedTransactions =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const transactions =
        await transactionService
          .getFailedTransactions();

      return successResponse(
        res,
        "Failed transactions fetched successfully",
        transactions
      );

    } catch (error) {

      next(error);
    }
  };