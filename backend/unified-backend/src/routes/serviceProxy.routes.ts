import express from "express";

import { createServiceProxy } from "../middlewares/serviceProxy.middleware.js";

const router = express.Router();

router.use(
  "/equity",
  createServiceProxy({
    envKey: "EQUITY_SERVICE_URL",
    fallbackUrl: "http://localhost:5001",
    servicePathPrefix: "/api",
  }),
);

router.use(
  "/mutual-funds",
  createServiceProxy({
    envKey: "MF_SERVICE_URL",
    fallbackUrl: "http://localhost:5002",
    servicePathPrefix: "/api/v1",
  }),
);

export default router;
