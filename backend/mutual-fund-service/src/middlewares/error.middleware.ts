import { Request, Response, NextFunction } from "express";

import { errorResponse } from "../utils/response.js";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR:", error);

  if (error.code) {
    if (error.code === "23505") {
      return errorResponse(res, "Duplicate entry found", 409, error.message);
    }

    if (error.code === "23503") {
      return errorResponse(res, "Invalid reference data", 400, error.message);
    }

    if (error.code === "23502") {
      return errorResponse(res, "Required field missing", 400, error.message);
    }
  }

  if (error.message) {
    return errorResponse(
      res,
      error.message,
      400,
      process.env.NODE_ENV === "development" ? error.stack : null,
    );
  }

  return errorResponse(
    res,
    "Internal server error",
    500,
    process.env.NODE_ENV === "development" ? error : null,
  );
};
