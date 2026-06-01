import { Request, Response, NextFunction } from "express";

import {
  getAllInvestorsService,
  getInvestorByIdService,
  updateInvestorService,
  deleteInvestorService,
} from "../services/investors.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const getAllInvestors = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const investors = await getAllInvestorsService();

    return successResponse(res, "Investors fetched successfully", investors);
  } catch (error) {
    next(error);
  }
};

export const getInvestorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const investor = await getInvestorByIdService(String(req.params.id));

    if (!investor) {
      return errorResponse(res, "Investor not found", 404);
    }

    return successResponse(res, "Investor fetched successfully", investor);
  } catch (error) {
    next(error);
  }
};

export const updateInvestor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const investor = await updateInvestorService(
      String(req.params.id),
      req.body,
    );

    return successResponse(res, "Investor updated successfully", investor);
  } catch (error) {
    next(error);
  }
};

export const deleteInvestor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteInvestorService(String(req.params.id));

    return successResponse(res, "Investor deleted successfully");
  } catch (error) {
    next(error);
  }
};
