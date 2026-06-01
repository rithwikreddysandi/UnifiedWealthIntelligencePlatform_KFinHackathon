import { Request, Response, NextFunction } from "express";

import {
  createAlertService,
  getAlertsService,
  resolveAlertService,
} from "../services/alerts.service.js";

import { successResponse } from "../utils/response.js";

export const createAlert = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const alert = await createAlertService(req.body);

    return successResponse(res, "Alert created successfully", alert, 201);
  } catch (error) {
    next(error);
  }
};

export const getAlerts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const alerts = await getAlertsService();

    return successResponse(res, "Alerts fetched successfully", alerts);
  } catch (error) {
    next(error);
  }
};

export const resolveAlert = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const alert = await resolveAlertService(String(req.params.id));

    return successResponse(res, "Alert resolved successfully", alert);
  } catch (error) {
    next(error);
  }
};
