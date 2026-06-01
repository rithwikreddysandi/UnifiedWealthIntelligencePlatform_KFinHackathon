import { Request, Response, NextFunction } from "express";

import { logger } from "../config/logger.js";

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error({
    message: error.message,
    stack: error.stack,
  });

  return res.status(500).json({
    success: false,

    message: error.message || "Internal Server Error",
  });
};
