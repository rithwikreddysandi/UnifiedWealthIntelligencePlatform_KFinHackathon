import { Request, Response, NextFunction } from "express";

import { getDashboardService } from "../services/dashboard.service.js";

import { successResponse } from "../utils/response.js";
import { getAuthorizationHeader } from "../integrations/serviceHttp.client.js";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dashboard = await getDashboardService(
      String(req.params.investorId),
      req.headers.authorization,
    );

    return successResponse(res, "Dashboard fetched successfully", dashboard);
  } catch (error) {
    next(error);
  }
};
