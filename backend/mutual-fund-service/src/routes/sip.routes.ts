import { Router } from "express";

import * as sipController from "../controllers/sip.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

import {
  createSipValidator,
  updateSipValidator,
} from "../validators/sip.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createSipValidator,
  validationMiddleware,
  sipController.createSip,
);

router.get("/", authMiddleware, sipController.getAllSips);

router.get("/:id", authMiddleware, sipController.getSipById);

router.get(
  "/investor/:investorId",
  authMiddleware,
  sipController.getInvestorSips,
);

router.put(
  "/:id",
  authMiddleware,
  updateSipValidator,
  validationMiddleware,
  sipController.updateSip,
);

router.delete("/:id", authMiddleware, sipController.deleteSip);

router.post("/execute/:id", authMiddleware, sipController.executeSip);

router.get(
  "/transactions/:sipId",
  authMiddleware,
  sipController.getSipTransactions,
);

router.get(
  "/failed/transactions",
  authMiddleware,
  sipController.getFailedSipTransactions,
);

export default router;
