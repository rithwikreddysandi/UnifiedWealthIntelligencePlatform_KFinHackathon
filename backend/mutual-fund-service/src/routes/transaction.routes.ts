import { Router }
  from "express";

import * as transactionController
  from "../controllers/transaction.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  validationMiddleware,
} from "../middlewares/validation.middleware.js";

import {
  createTransactionValidator,
  updateTransactionValidator,
} from "../validators/transaction.validator.js";



const router = Router();



// CREATE TRANSACTION
router.post(
  "/",
  authMiddleware,
  createTransactionValidator,
  validationMiddleware,
  transactionController.createTransaction
);



// GET ALL TRANSACTIONS
router.get(
  "/",
  authMiddleware,
  transactionController.getAllTransactions
);



// GET TRANSACTION BY ID
router.get(
  "/:id",
  authMiddleware,
  transactionController.getTransactionById
);



// GET INVESTOR TRANSACTIONS
router.get(
  "/investor/:investorId",
  authMiddleware,
  transactionController.getInvestorTransactions
);



// UPDATE TRANSACTION
router.put(
  "/:id",
  authMiddleware,
  updateTransactionValidator,
  validationMiddleware,
  transactionController.updateTransaction
);



// DELETE TRANSACTION
router.delete(
  "/:id",
  authMiddleware,
  transactionController.deleteTransaction
);



// GET PENDING TRANSACTIONS
router.get(
  "/status/pending",
  authMiddleware,
  transactionController.getPendingTransactions
);



// GET FAILED TRANSACTIONS
router.get(
  "/status/failed",
  authMiddleware,
  transactionController.getFailedTransactions
);



export default router;