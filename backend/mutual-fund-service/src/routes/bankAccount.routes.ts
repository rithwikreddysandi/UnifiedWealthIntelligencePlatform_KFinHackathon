import { Router }
  from "express";

import * as bankAccountController
  from "../controllers/bankAccount.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  validationMiddleware,
} from "../middlewares/validation.middleware.js";

import {
  createBankAccountValidator,
  updateBankAccountValidator,
} from "../validators/bankAccount.validator.js";



const router = Router();



// CREATE BANK ACCOUNT
router.post(
  "/",
  authMiddleware,
  createBankAccountValidator,
  validationMiddleware,
  bankAccountController.createBankAccount
);



// GET ALL BANK ACCOUNTS
router.get(
  "/",
  authMiddleware,
  bankAccountController.getAllBankAccounts
);



// GET BANK ACCOUNT BY ID
router.get(
  "/:id",
  authMiddleware,
  bankAccountController.getBankAccountById
);



// GET INVESTOR BANK ACCOUNTS
router.get(
  "/investor/:investorId",
  authMiddleware,
  bankAccountController.getInvestorBankAccounts
);



// UPDATE BANK ACCOUNT
router.put(
  "/:id",
  authMiddleware,
  updateBankAccountValidator,
  validationMiddleware,
  bankAccountController.updateBankAccount
);



// DELETE BANK ACCOUNT
router.delete(
  "/:id",
  authMiddleware,
  bankAccountController.deleteBankAccount
);



// APPROVE BANK ACCOUNT
router.patch(
  "/approve/:id",
  authMiddleware,
  bankAccountController.approveBankAccount
);



// REJECT BANK ACCOUNT
router.patch(
  "/reject/:id",
  authMiddleware,
  bankAccountController.rejectBankAccount
);



export default router;