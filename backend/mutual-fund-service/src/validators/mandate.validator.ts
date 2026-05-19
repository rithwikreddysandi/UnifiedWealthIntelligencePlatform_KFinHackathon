import { body } from "express-validator";

export const createMandateValidator = [
  body("investor_id")
    .notEmpty()
    .withMessage("Investor ID is required")
    .isUUID()
    .withMessage("Invalid investor ID"),

  body("bank_account_id")
    .notEmpty()
    .withMessage("Bank account ID is required")
    .isUUID()
    .withMessage("Invalid bank account ID"),

  body("mandate_reference")
    .notEmpty()
    .withMessage("Mandate reference is required")
    .isLength({
      min: 5,
      max: 100,
    })
    .withMessage("Invalid mandate reference"),

  body("maximum_amount")
    .notEmpty()
    .withMessage("Maximum amount is required")
    .isFloat({
      gt: 0,
    })
    .withMessage("Maximum amount must be greater than 0"),

  body("expiry_date").optional().isISO8601().withMessage("Invalid expiry date"),
];

export const updateMandateValidator = [
  body("maximum_amount")
    .optional()
    .isFloat({
      gt: 0,
    })
    .withMessage("Maximum amount must be greater than 0"),

  body("status")
    .optional()
    .isIn(["PENDING", "APPROVED", "REJECTED", "EXPIRED"])
    .withMessage("Invalid mandate status"),

  body("expiry_date").optional().isISO8601().withMessage("Invalid expiry date"),
];
