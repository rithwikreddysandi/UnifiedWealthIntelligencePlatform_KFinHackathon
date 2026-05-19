import { Router } from "express";

import * as fundController from "../controllers/fund.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

import {
  createFundValidator,
  updateFundValidator,
} from "../validators/fund.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createFundValidator,
  validationMiddleware,
  fundController.createFund,
);

router.get("/", authMiddleware, fundController.getAllFunds);

router.get("/:id", authMiddleware, fundController.getFundById);

router.put(
  "/:id",
  authMiddleware,
  updateFundValidator,
  validationMiddleware,
  fundController.updateFund,
);

router.delete("/:id", authMiddleware, fundController.deleteFund);

export default router;
