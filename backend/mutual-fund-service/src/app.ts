import express from "express";

import cors from "cors";

import helmet from "helmet";

import dotenv from "dotenv";

import routes from "./routes/index.js";

import { connectDB } from "./config/db.js";

import devRoute from "./routes/dev.routes.js";

import { loggerMiddleware } from "./middlewares/logger.middleware.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

import { rateLimiterMiddleware } from "./middlewares/rateLimiter.middleware.js";

import { startSipExecutionJob } from "./jobs/sipExecution.job.js";

import { startFailedSipDetectorJob } from "./jobs/failedSipDetector.job.js";

import { startNavSyncJob } from "./jobs/navSync.job.js";

import { startAlertProcessorJob } from "./jobs/alertProcessor.job.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(rateLimiterMiddleware);

app.use(loggerMiddleware);

app.use("/api/v1", routes);

app.use("/dev", devRoute);

app.use(errorMiddleware);

connectDB();

startSipExecutionJob();

startFailedSipDetectorJob();

startNavSyncJob();

startAlertProcessorJob();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Mutual Fund Service Running On Port ${PORT}`);
});

export default app;
