import express from "express";

import {
  getAllInvestors,
  getInvestorById,
  updateInvestor,
  deleteInvestor,
} from "../controllers/investors.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { authorize } from "../middlewares/rbac.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { updateInvestorValidation } from "../validations/investors.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/",
  authorize([
    "ADMIN",
    "OPERATIONS",
  ]),
  getAllInvestors
);

router.get(
  "/:id",
  getInvestorById
);

router.put(
  "/:id",

  updateInvestorValidation,

  validate,

  updateInvestor
);

router.delete(
  "/:id",

  authorize(["ADMIN"]),

  deleteInvestor
);

export default router;