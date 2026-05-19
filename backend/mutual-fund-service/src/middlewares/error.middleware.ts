import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  errorResponse,
} from "../utils/response.js";



export const errorMiddleware =
  (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    console.error(
      "ERROR:",
      error
    );

    // PostgreSQL errors
    if (error.code) {

      // unique violation
      if (error.code === "23505") {

        return errorResponse(
          res,
          "Duplicate entry found",
          409,
          error.message
        );
      }

      // foreign key violation
      if (error.code === "23503") {

        return errorResponse(
          res,
          "Invalid reference data",
          400,
          error.message
        );
      }

      // not null violation
      if (error.code === "23502") {

        return errorResponse(
          res,
          "Required field missing",
          400,
          error.message
        );
      }
    }

    // custom application errors
    if (error.message) {

      return errorResponse(
        res,
        error.message,
        400,
        process.env.NODE_ENV ===
          "development"
          ? error.stack
          : null
      );
    }

    // unknown server error
    return errorResponse(
      res,
      "Internal server error",
      500,
      process.env.NODE_ENV ===
        "development"
        ? error
        : null
    );
  };