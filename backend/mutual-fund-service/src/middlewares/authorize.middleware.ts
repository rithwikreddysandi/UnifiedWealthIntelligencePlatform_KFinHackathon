import {
  Response,
  NextFunction,
} from "express";

import {
  AuthRequest,
} from "./auth.middleware.js";

import {
  errorResponse,
} from "../utils/response.js";

export const authorizeRoles =
  (roles: string[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const role =
      req.user?.role;

    if (!role || !roles.includes(role)) {
      return errorResponse(
        res,
        "Forbidden: insufficient role access",
        403,
      );
    }

    return next();
  };
