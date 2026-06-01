import { Router } from "express";

import {
  getAllStocksController,
  createStockController,
} from "../controllers/stocks.controller";

import { createStockValidator } from "../validators/stocks.validation";

const router = Router();

router.get("/", getAllStocksController);

router.post("/", createStockValidator, createStockController);

export default router;
