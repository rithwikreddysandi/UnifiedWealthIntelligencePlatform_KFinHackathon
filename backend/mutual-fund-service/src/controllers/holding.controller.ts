import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as holdingService
  from "../services/holding.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";



export const createHolding =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const holding =
        await holdingService
          .createHolding(
            req.body
          );

      return successResponse(
        res,
        "Holding created successfully",
        holding,
        201
      );

    } catch (error) {

      next(error);
    }
  };





export const getHoldingById =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const holding =
        await holdingService
          .getHoldingById(id);

      if (!holding) {

        return errorResponse(
          res,
          "Holding not found",
          404
        );
      }

      return successResponse(
        res,
        "Holding fetched successfully",
        holding
      );

    } catch (error) {

      next(error);
    }
  };





export const getInvestorHoldings =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const investorId =
        req.params.investorId as string;

      const holdings =
        await holdingService
          .getInvestorHoldings(
            investorId
          );

      return successResponse(
        res,
        "Investor holdings fetched successfully",
        holdings
      );

    } catch (error) {

      next(error);
    }
  };





export const updateHolding =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const updatedHolding =
        await holdingService
          .updateHolding(
            id,
            req.body
          );

      return successResponse(
        res,
        "Holding updated successfully",
        updatedHolding
      );

    } catch (error) {

      next(error);
    }
  };





export const deleteHolding =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const deletedHolding =
        await holdingService
          .deleteHolding(id);

      return successResponse(
        res,
        "Holding deleted successfully",
        deletedHolding
      );

    } catch (error) {

      next(error);
    }
  };





export const getInvestorPortfolioSummary =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const investorId =
        req.params.investorId as string;

      const summary =
        await holdingService
          .getInvestorPortfolioSummary(
            investorId
          );

      return successResponse(
        res,
        "Portfolio summary fetched successfully",
        summary
      );

    } catch (error) {

      next(error);
    }
  };