import { Router } from "express";

import {
  createOrderController,
  getOrdersByInvestorController,
} from "../controllers/orders.controller";

import {
  createOrderValidator,
} from "../validators/orders.validation";

const router = Router();

router.post(
  "/",
  createOrderValidator,
  createOrderController
);

router.get(
  "/:investorId",
  getOrdersByInvestorController
);

export default router;