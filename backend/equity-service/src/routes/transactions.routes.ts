import { Router } from "express";

import {
  buyStockController,
  sellStockController,
  getTransactionsByInvestorController,
} from "../controllers/transactions.controller";


import {
  buyStockValidator,
  sellStockValidator,
} from "../validators/transactions.validation";

const router = Router();

router.post(
  "/buy",
  buyStockValidator,
  buyStockController
);

router.post(
  "/sell",
  sellStockValidator,
  sellStockController
);

router.get("/:investorId",getTransactionsByInvestorController);


export default router;