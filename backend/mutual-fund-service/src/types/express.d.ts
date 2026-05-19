import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string | any;

      requestId?: string;

      startTime?: number;
    }
  }
}

export {};
