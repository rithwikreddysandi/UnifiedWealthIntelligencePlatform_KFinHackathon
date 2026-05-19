import { Router } from "express";

import * as alertController from "../controllers/alert.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, alertController.createAlert);

router.get("/", authMiddleware, alertController.getAllAlerts);

router.get("/:id", authMiddleware, alertController.getAlertById);

router.get(
  "/investor/:investorId",
  authMiddleware,
  alertController.getInvestorAlerts,
);

router.put("/:id", authMiddleware, alertController.updateAlert);

router.delete("/:id", authMiddleware, alertController.deleteAlert);

router.get("/status/open", authMiddleware, alertController.getOpenAlerts);

router.get(
  "/status/critical",
  authMiddleware,
  alertController.getCriticalAlerts,
);

router.patch("/resolve/:id", authMiddleware, alertController.resolveAlert);

router.patch("/dismiss/:id", authMiddleware, alertController.dismissAlert);

export default router;
