import { Request, Response, NextFunction } from "express";

import crypto from "crypto";

import { errorResponse } from "../utils/response.js";

export const hmacMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const signature = req.headers["x-signature"] as string;

    if (!signature) {
      return errorResponse(res, "HMAC signature missing", 401);
    }

    const secret = process.env.HMAC_SECRET!;

    const payload = JSON.stringify(req.body);

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (generatedSignature !== signature) {
      return errorResponse(res, "Invalid HMAC signature", 401);
    }

    next();
  } catch (error) {
    return errorResponse(res, "HMAC verification failed", 500, error);
  }
};
