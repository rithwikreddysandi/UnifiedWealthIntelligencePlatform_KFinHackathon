import { Router } from "express";

import {
  createDividendController,
  getDividendsByInvestorController,
} from "../controllers/dividends.controller";

import {
  createDividendValidator,
} from "../validators/dividends.validation";

const router = Router();

router.post(
  "/",
  createDividendValidator,
  createDividendController
);

router.get(
  "/:investorId",
  getDividendsByInvestorController
);

export default router;