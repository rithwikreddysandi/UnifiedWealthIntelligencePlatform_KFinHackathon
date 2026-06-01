import { Request, Response, NextFunction } from "express";

export const authorize = (allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,

        message: "Forbidden",
      });
    }

    next();
  };
};
