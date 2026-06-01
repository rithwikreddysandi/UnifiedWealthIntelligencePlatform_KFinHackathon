import { Request, Response } from "express";

import { validationResult } from "express-validator";

import {
  buyStockService,
  sellStockService,
  getTransactionsByInvestorService,
} from "../services/transactions.service";

export const buyStockController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const transaction = await buyStockService(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//SEll Controller

export const sellStockController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const transaction = await sellStockService(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Investor Transactions Controller

export const getTransactionsByInvestorController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { investorId } = req.params;

    const transactions = await getTransactionsByInvestorService(
      String(investorId),
    );

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
