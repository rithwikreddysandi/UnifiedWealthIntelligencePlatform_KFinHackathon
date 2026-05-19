import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as apiLogService
  from "../services/apiLog.service.js";



export const loggerMiddleware =
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const startTime =
      Date.now();

    res.on(
      "finish",
      async () => {

        try {

          const responseTime =
            Date.now() -
            startTime;

          const statusCode =
            res.statusCode;

          if (statusCode >= 400) {

            await apiLogService
              .logFailedRequest(
                req.originalUrl,
                req.method,
                statusCode,
                "Request failed",
                responseTime
              );

          } else {

            await apiLogService
              .logSuccessRequest(
                req.originalUrl,
                req.method,
                statusCode,
                responseTime
              );
          }

        } catch (error) {

          console.error(
            "Logger Middleware Error:",
            error
          );
        }
      }
    );

    next();
  };