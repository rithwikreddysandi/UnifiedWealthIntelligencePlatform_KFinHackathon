import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as alertService
  from "../services/alert.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";



export const createAlert =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const alert =
        await alertService
          .createAlert(
            req.body
          );

      return successResponse(
        res,
        "Alert created successfully",
        alert,
        201
      );

    } catch (error) {

      next(error);
    }
  };





export const getAllAlerts =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const alerts =
        await alertService
          .getAllAlerts();

      return successResponse(
        res,
        "Alerts fetched successfully",
        alerts
      );

    } catch (error) {

      next(error);
    }
  };





export const getAlertById =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const alert =
        await alertService
          .getAlertById(id);

      if (!alert) {

        return errorResponse(
          res,
          "Alert not found",
          404
        );
      }

      return successResponse(
        res,
        "Alert fetched successfully",
        alert
      );

    } catch (error) {

      next(error);
    }
  };





export const getInvestorAlerts =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const investorId =
        req.params.investorId as string;

      const alerts =
        await alertService
          .getInvestorAlerts(
            investorId
          );

      return successResponse(
        res,
        "Investor alerts fetched successfully",
        alerts
      );

    } catch (error) {

      next(error);
    }
  };





export const updateAlert =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const updatedAlert =
        await alertService
          .updateAlert(
            id,
            req.body
          );

      return successResponse(
        res,
        "Alert updated successfully",
        updatedAlert
      );

    } catch (error) {

      next(error);
    }
  };





export const deleteAlert =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const deletedAlert =
        await alertService
          .deleteAlert(id);

      return successResponse(
        res,
        "Alert deleted successfully",
        deletedAlert
      );

    } catch (error) {

      next(error);
    }
  };





export const getOpenAlerts =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const alerts =
        await alertService
          .getOpenAlerts();

      return successResponse(
        res,
        "Open alerts fetched successfully",
        alerts
      );

    } catch (error) {

      next(error);
    }
  };





export const getCriticalAlerts =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const alerts =
        await alertService
          .getCriticalAlerts();

      return successResponse(
        res,
        "Critical alerts fetched successfully",
        alerts
      );

    } catch (error) {

      next(error);
    }
  };





export const resolveAlert =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const alert =
        await alertService
          .resolveAlert(id);

      return successResponse(
        res,
        "Alert resolved successfully",
        alert
      );

    } catch (error) {

      next(error);
    }
  };





export const dismissAlert =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const id =
        req.params.id as string;

      const alert =
        await alertService
          .dismissAlert(id);

      return successResponse(
        res,
        "Alert dismissed successfully",
        alert
      );

    } catch (error) {

      next(error);
    }
  };