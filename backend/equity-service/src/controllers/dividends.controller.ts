import { Request, Response } from "express";

import { validationResult } from "express-validator";

import {
  createDividendService,
  getDividendsByInvestorService,
} from "../services/dividends.service";

export const createDividendController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const dividend = await createDividendService(req.body);

    res.status(201).json({
      success: true,
      data: dividend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getDividendsByInvestorController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { investorId } = req.params;

    const dividends = await getDividendsByInvestorService(String(investorId));

    res.status(200).json({
      success: true,
      data: dividends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
