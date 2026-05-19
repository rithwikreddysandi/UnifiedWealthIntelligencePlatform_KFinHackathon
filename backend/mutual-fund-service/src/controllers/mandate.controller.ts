import { Request, Response, NextFunction } from "express";

import * as mandateService from "../services/mandate.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createMandate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mandate = await mandateService.createMandate(req.body);

    return successResponse(res, "Mandate created successfully", mandate, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllMandates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mandates = await mandateService.getAllMandates();

    return successResponse(res, "Mandates fetched successfully", mandates);
  } catch (error) {
    next(error);
  }
};

export const getMandateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const mandate = await mandateService.getMandateById(id);

    if (!mandate) {
      return errorResponse(res, "Mandate not found", 404);
    }

    return successResponse(res, "Mandate fetched successfully", mandate);
  } catch (error) {
    next(error);
  }
};

export const getInvestorMandates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const investorId = req.params.investorId as string;

    const mandates = await mandateService.getInvestorMandates(investorId);

    return successResponse(
      res,
      "Investor mandates fetched successfully",
      mandates,
    );
  } catch (error) {
    next(error);
  }
};

export const updateMandate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const updatedMandate = await mandateService.updateMandate(id, req.body);

    return successResponse(res, "Mandate updated successfully", updatedMandate);
  } catch (error) {
    next(error);
  }
};

export const deleteMandate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const deletedMandate = await mandateService.deleteMandate(id);

    return successResponse(res, "Mandate deleted successfully", deletedMandate);
  } catch (error) {
    next(error);
  }
};

export const approveMandate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const mandate = await mandateService.approveMandate(id);

    return successResponse(res, "Mandate approved successfully", mandate);
  } catch (error) {
    next(error);
  }
};

export const rejectMandate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const mandate = await mandateService.rejectMandate(id);

    return successResponse(res, "Mandate rejected successfully", mandate);
  } catch (error) {
    next(error);
  }
};

export const getApprovedMandates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mandates = await mandateService.getApprovedMandates();

    return successResponse(
      res,
      "Approved mandates fetched successfully",
      mandates,
    );
  } catch (error) {
    next(error);
  }
};

export const getExpiredMandates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mandates = await mandateService.getExpiredMandates();

    return successResponse(
      res,
      "Expired mandates fetched successfully",
      mandates,
    );
  } catch (error) {
    next(error);
  }
};
