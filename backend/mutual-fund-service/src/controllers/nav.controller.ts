import { Request, Response, NextFunction } from "express";

import * as navService from "../services/nav.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const createNavHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nav = await navService.createNavHistory(req.body);

    return successResponse(res, "NAV history created successfully", nav, 201);
  } catch (error) {
    next(error);
  }
};

export const getNavHistoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const nav = await navService.getNavHistoryById(id);

    if (!nav) {
      return errorResponse(res, "NAV history not found", 404);
    }

    return successResponse(res, "NAV history fetched successfully", nav);
  } catch (error) {
    next(error);
  }
};

export const getFundNavHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fundId = req.params.fundId as string;

    const navHistory = await navService.getFundNavHistory(fundId);

    return successResponse(
      res,
      "Fund NAV history fetched successfully",
      navHistory,
    );
  } catch (error) {
    next(error);
  }
};

export const getLatestNav = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fundId = req.params.fundId as string;

    const nav = await navService.getLatestNav(fundId);

    return successResponse(res, "Latest NAV fetched successfully", nav);
  } catch (error) {
    next(error);
  }
};

export const updateNavHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const updatedNav = await navService.updateNavHistory(id, req.body);

    return successResponse(res, "NAV history updated successfully", updatedNav);
  } catch (error) {
    next(error);
  }
};

export const deleteNavHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const deletedNav = await navService.deleteNavHistory(id);

    return successResponse(res, "NAV history deleted successfully", deletedNav);
  } catch (error) {
    next(error);
  }
};

export const getLatestNavs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const navs = await navService.getLatestNavs();

    return successResponse(res, "Latest NAVs fetched successfully", navs);
  } catch (error) {
    next(error);
  }
};
