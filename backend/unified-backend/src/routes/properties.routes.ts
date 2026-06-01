import express from "express";

import {
  createProperty,
  getAllProperties,
  getInvestorProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/properties.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { authorize } from "../middlewares/rbac.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
  createPropertyValidation,
  updatePropertyValidation,
} from "../validations/properties.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",

  authorize(["ADMIN", "OPERATIONS", "ADVISOR", "INVESTOR"]),

  createPropertyValidation,

  validate,

  createProperty,
);

router.get(
  "/",

  authorize(["ADMIN", "OPERATIONS", "ADVISOR"]),

  getAllProperties,
);

router.get(
  "/investor/:investorId",

  getInvestorProperties,
);

router.put(
  "/:id",

  updatePropertyValidation,

  validate,

  updateProperty,
);

router.delete(
  "/:id",

  authorize(["ADMIN"]),

  deleteProperty,
);

export default router;
