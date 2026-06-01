import { Request, Response, NextFunction } from "express";

import { checkServiceHealth } from "../services/serviceHealth.service.js";

import { successResponse } from "../utils/response.js";

export const getServiceHealth = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const health = await checkServiceHealth();

    return successResponse(res, "Service health fetched", health);
  } catch (error) {
    next(error);
  }
};
