import { Router }
  from "express";

import * as fundController
  from "../controllers/fund.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  validationMiddleware,
} from "../middlewares/validation.middleware.js";

import {
  createFundValidator,
  updateFundValidator,
} from "../validators/fund.validator.js";



const router = Router();



// CREATE FUND
router.post(
  "/",
  authMiddleware,
  createFundValidator,
  validationMiddleware,
  fundController.createFund
);



// GET ALL FUNDS
router.get(
  "/",
  authMiddleware,
  fundController.getAllFunds
);



// GET FUND BY ID
router.get(
  "/:id",
  authMiddleware,
  fundController.getFundById
);



// UPDATE FUND
router.put(
  "/:id",
  authMiddleware,
  updateFundValidator,
  validationMiddleware,
  fundController.updateFund
);



// DELETE FUND
router.delete(
  "/:id",
  authMiddleware,
  fundController.deleteFund
);



export default router;