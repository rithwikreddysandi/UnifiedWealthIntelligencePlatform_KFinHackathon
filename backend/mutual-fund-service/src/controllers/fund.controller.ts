import { Request, Response, NextFunction } from "express";

import * as fundService from "../services/fund.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createFund = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fund = await fundService.createFund(req.body);

    return successResponse(res, "Fund created successfully", fund, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllFunds = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const funds = await fundService.getAllFunds();

    return successResponse(res, "Funds fetched successfully", funds);
  } catch (error) {
    next(error);
  }
};

export const getFundById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const fund = await fundService.getFundById(id as string);

    if (!fund) {
      return errorResponse(res, "Fund not found", 404);
    }

    return successResponse(res, "Fund fetched successfully", fund);
  } catch (error) {
    next(error);
  }
};

export const getFundsByInvestor = async (req: Request,res: Response,next: NextFunction,) => {
    try {

      const {
        investorId,
      } = req.params;

      const funds =
        await fundService.getFundsByInvestor(
          String(investorId)
        );

      return successResponse(
        res,
        "Investor funds fetched successfully",
        funds
      );

    } catch (error) {

      next(error);
    }
};

export const updateFund = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const updatedFund = await fundService.updateFund(id as string, req.body);

    return successResponse(res, "Fund updated successfully", updatedFund);
  } catch (error) {
    next(error);
  }
};

export const deleteFund = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const deletedFund = await fundService.deleteFund(id as string);

    return successResponse(res, "Fund deleted successfully", deletedFund);
  } catch (error) {
    next(error);
  }
};
