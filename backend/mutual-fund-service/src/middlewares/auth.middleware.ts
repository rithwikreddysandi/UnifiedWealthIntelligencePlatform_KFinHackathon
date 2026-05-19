import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import {
  errorResponse,
} from "../utils/response.js";



export interface AuthRequest
  extends Request {

  user?: any;
}





export const authMiddleware =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const authHeader =
        req.headers.authorization;

      if (!authHeader) {

        return errorResponse(
          res,
          "Authorization token missing",
          401
        );
      }

      // Bearer token
      const token =
        authHeader.split(" ")[1];

      if (!token) {

        return errorResponse(
          res,
          "Invalid authorization format",
          401
        );
      }

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET!
        );

      req.user = decoded;

      next();

    } catch (error) {

      return errorResponse(
        res,
        "Unauthorized access",
        401,
        error
      );
    }
  };