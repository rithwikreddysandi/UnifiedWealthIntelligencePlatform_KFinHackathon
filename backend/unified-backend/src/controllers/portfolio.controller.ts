import { Request, Response, NextFunction } from "express";

import { getPortfolioService } from "../services/portfolio.service.js";

import { successResponse } from "../utils/response.js";
import { getAuthorizationHeader } from "../integrations/serviceHttp.client.js";

export const getPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const portfolio = await getPortfolioService(
      String(req.params.investorId),
      req.headers.authorization,
    );

    return successResponse(res, "Portfolio fetched successfully", portfolio);
  } catch (error) {
    next(error);
  }
};
