import { body } from "express-validator";

export const createTransactionValidator = [
  body("investor_id")
    .notEmpty()
    .withMessage("Investor ID is required")
    .isUUID()
    .withMessage("Invalid investor ID"),

  body("fund_id")
    .notEmpty()
    .withMessage("Fund ID is required")
    .isUUID()
    .withMessage("Invalid fund ID"),

  body("transaction_type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["PURCHASE", "REDEEM"])
    .withMessage("Invalid transaction type"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({
      gt: 0,
    })
    .withMessage("Amount must be greater than 0"),
];

export const updateTransactionValidator = [
  body("status")
    .optional()
    .isIn(["PENDING", "SUCCESS", "FAILED"])
    .withMessage("Invalid transaction status"),

  body("units")
    .optional()
    .isFloat({
      gt: 0,
    })
    .withMessage("Units must be greater than 0"),

  body("nav")
    .optional()
    .isFloat({
      gt: 0,
    })
    .withMessage("NAV must be greater than 0"),
];
