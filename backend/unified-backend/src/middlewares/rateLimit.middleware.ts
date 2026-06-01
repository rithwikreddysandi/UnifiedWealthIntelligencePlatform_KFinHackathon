import rateLimit from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10000,

  message: {
    success: false,

    message: "Too many requests",
  },
});
