import { Router } from "express";

import * as bankAccountController from "../controllers/bankAccount.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

import {
  createBankAccountValidator,
  updateBankAccountValidator,
} from "../validators/bankAccount.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createBankAccountValidator,
  validationMiddleware,
  bankAccountController.createBankAccount,
);

router.get("/", authMiddleware, bankAccountController.getAllBankAccounts);

router.get("/:id", authMiddleware, bankAccountController.getBankAccountById);

router.get(
  "/investor/:investorId",
  authMiddleware,
  bankAccountController.getInvestorBankAccounts,
);

router.put(
  "/:id",
  authMiddleware,
  updateBankAccountValidator,
  validationMiddleware,
  bankAccountController.updateBankAccount,
);

router.delete("/:id", authMiddleware, bankAccountController.deleteBankAccount);

router.patch(
  "/approve/:id",
  authMiddleware,
  bankAccountController.approveBankAccount,
);

router.patch(
  "/reject/:id",
  authMiddleware,
  bankAccountController.rejectBankAccount,
);

export default router;
