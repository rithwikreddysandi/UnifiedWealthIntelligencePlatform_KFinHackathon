import { Request, Response, NextFunction } from "express";

import * as sipService from "../services/sip.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createSip = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sip = await sipService.createSip(req.body);

    return successResponse(res, "SIP created successfully", sip, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllSips = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sips = await sipService.getAllSips();

    return successResponse(res, "SIPs fetched successfully", sips);
  } catch (error) {
    next(error);
  }
};

export const getSipById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const sip = await sipService.getSipById(id as string);

    if (!sip) {
      return errorResponse(res, "SIP not found", 404);
    }

    return successResponse(res, "SIP fetched successfully", sip);
  } catch (error) {
    next(error);
  }
};

export const getInvestorSips = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { investorId } = req.params;

    const sips = await sipService.getInvestorSips(investorId as string);

    return successResponse(res, "Investor SIPs fetched successfully", sips);
  } catch (error) {
    next(error);
  }
};

export const updateSip = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const updatedSip = await sipService.updateSip(id as string, req.body);

    return successResponse(res, "SIP updated successfully", updatedSip);
  } catch (error) {
    next(error);
  }
};

export const deleteSip = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const deletedSip = await sipService.deleteSip(id as string);

    return successResponse(res, "SIP deleted successfully", deletedSip);
  } catch (error) {
    next(error);
  }
};

export const executeSip = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await sipService.executeSip(id as string);

    return successResponse(res, "SIP executed successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getSipTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sipId } = req.params;

    const transactions = await sipService.getSipTransactions(sipId as string);

    return successResponse(
      res,
      "SIP transactions fetched successfully",
      transactions,
    );
  } catch (error) {
    next(error);
  }
};

export const getFailedSipTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const failedTransactions = await sipService.getFailedSipTransactions();

    return successResponse(
      res,
      "Failed SIP transactions fetched successfully",
      failedTransactions,
    );
  } catch (error) {
    next(error);
  }
};
