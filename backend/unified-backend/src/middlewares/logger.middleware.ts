import { Request, Response, NextFunction } from "express";

import { logger } from "../config/logger.js";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info({
    method: req.method,

    url: req.originalUrl,

    ip: req.ip,
  });

  next();
};