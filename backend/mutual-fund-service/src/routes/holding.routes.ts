import { Router } from "express";

import * as holdingController from "../controllers/holding.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, holdingController.createHolding);

router.get("/:id", authMiddleware, holdingController.getHoldingById);

router.get(
  "/investor/:investorId",
  authMiddleware,
  holdingController.getInvestorHoldings,
);

router.put("/:id", authMiddleware, holdingController.updateHolding);

router.delete("/:id", authMiddleware, holdingController.deleteHolding);

router.get(
  "/portfolio/summary/:investorId",
  authMiddleware,
  holdingController.getInvestorPortfolioSummary,
);

export default router;
