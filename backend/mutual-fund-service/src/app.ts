import express from "express";

import cors from "cors";

import helmet from "helmet";

import dotenv from "dotenv";



import routes
  from "./routes/index.js";



import {
  connectDB,
} from "./config/db.js";

import devRoute from './routes/dev.routes.js'

import {
  loggerMiddleware,
} from "./middlewares/logger.middleware.js";

import {
  errorMiddleware,
} from "./middlewares/error.middleware.js";

import {
  rateLimiterMiddleware,
} from "./middlewares/rateLimiter.middleware.js";



import {
  startSipExecutionJob,
} from "./jobs/sipExecution.job.js";

import {
  startFailedSipDetectorJob,
} from "./jobs/failedSipDetector.job.js";

import {
  startNavSyncJob,
} from "./jobs/navSync.job.js";

import {
  startAlertProcessorJob,
} from "./jobs/alertProcessor.job.js";



dotenv.config();



const app = express();





/*
|--------------------------------------------------------------------------
| CORE MIDDLEWARES
|--------------------------------------------------------------------------
*/

app.use(
  cors()
);

app.use(
  helmet()
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


/*
|--------------------------------------------------------------------------
| CUSTOM MIDDLEWARES
|--------------------------------------------------------------------------
*/

app.use(
  rateLimiterMiddleware
);

app.use(
  loggerMiddleware
);





/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use(
  "/api/v1",
  routes
);



app.use('/dev', devRoute);

/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use(
  errorMiddleware
);





/*
|--------------------------------------------------------------------------
| DATABASE CONNECTION
|--------------------------------------------------------------------------
*/

connectDB();





/*
|--------------------------------------------------------------------------
| START BACKGROUND JOBS
|--------------------------------------------------------------------------
*/

startSipExecutionJob();

startFailedSipDetectorJob();

startNavSyncJob();

startAlertProcessorJob();





/*
|--------------------------------------------------------------------------
| SERVER
|--------------------------------------------------------------------------
*/

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Mutual Fund Service Running On Port ${PORT}`
    );
  }
);



export default app;