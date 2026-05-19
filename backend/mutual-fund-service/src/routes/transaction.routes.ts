import { Router } from "express";

import * as transactionController from "../controllers/transaction.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

import {
  createTransactionValidator,
  updateTransactionValidator,
} from "../validators/transaction.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createTransactionValidator,
  validationMiddleware,
  transactionController.createTransaction,
);

router.get("/", authMiddleware, transactionController.getAllTransactions);

router.get("/:id", authMiddleware, transactionController.getTransactionById);

router.get(
  "/investor/:investorId",
  authMiddleware,
  transactionController.getInvestorTransactions,
);

router.put(
  "/:id",
  authMiddleware,
  updateTransactionValidator,
  validationMiddleware,
  transactionController.updateTransaction,
);

router.delete("/:id", authMiddleware, transactionController.deleteTransaction);

router.get(
  "/status/pending",
  authMiddleware,
  transactionController.getPendingTransactions,
);

router.get(
  "/status/failed",
  authMiddleware,
  transactionController.getFailedTransactions,
);

export default router;
