import { validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

import { errorResponse } from "../utils/response.js";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, "Validation failed", 400, errors.array());
  }

  next();
};
