import express from "express";

import {
  createAlert,
  getAlerts,
  resolveAlert,
} from "../controllers/alerts.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createAlert);

router.get("/", getAlerts);

router.patch(
  "/:id/resolve",
  resolveAlert
);

export default router;