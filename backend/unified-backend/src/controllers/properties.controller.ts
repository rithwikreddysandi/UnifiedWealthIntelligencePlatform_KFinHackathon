import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createPropertyService,
  getAllPropertiesService,
  getInvestorPropertiesService,
  updatePropertyService,
  deletePropertyService,
} from "../services/properties.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property =
      await createPropertyService(
        req.body
      );

    return successResponse(
      res,
      "Property created successfully",
      property,
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getAllProperties =
  async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const properties =
        await getAllPropertiesService();

      return successResponse(
        res,
        "Properties fetched successfully",
        properties
      );
    } catch (error) {
      next(error);
    }
  };

export const getInvestorProperties =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const properties =
        await getInvestorPropertiesService(
          String(req.params.investorId)
        );

      return successResponse(
        res,
        "Investor properties fetched successfully",
        properties
      );
    } catch (error) {
      next(error);
    }
  };

export const updateProperty =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const property =
        await updatePropertyService(
          String(req.params.id),
          req.body
        );

      if (!property) {
        return errorResponse(
          res,
          "Property not found",
          404
        );
      }

      return successResponse(
        res,
        "Property updated successfully",
        property
      );
    } catch (error) {
      next(error);
    }
  };

export const deleteProperty =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await deletePropertyService(
        String(req.params.id)
      );

      return successResponse(
        res,
        "Property deleted successfully"
      );
    } catch (error) {
      next(error);
    }
};