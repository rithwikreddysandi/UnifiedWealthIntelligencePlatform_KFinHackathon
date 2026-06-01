import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";

import { loggerMiddleware } from "./middlewares/logger.middleware.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

import { rateLimitMiddleware } from "./middlewares/rateLimit.middleware.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(rateLimitMiddleware);

app.use(loggerMiddleware);

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,

    message: "Unified Backend Running",
  });
});

app.use(errorMiddleware);

export default app;
