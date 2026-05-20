import { Router } from "express";

import * as fundController from "../controllers/fund.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

import {
  createFundValidator,
  updateFundValidator,
} from "../validators/fund.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  createFundValidator,
  validationMiddleware,
  fundController.createFund,
);


router.get("/", authMiddleware, fundController.getAllFunds);

router.get("/investor/:investorId", authMiddleware, fundController.getFundsByInvestor);

router.get("/:id", authMiddleware, fundController.getFundById);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  updateFundValidator,
  validationMiddleware,
  fundController.updateFund,
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(["ADMIN"]),
  fundController.deleteFund,
);

export default router;
