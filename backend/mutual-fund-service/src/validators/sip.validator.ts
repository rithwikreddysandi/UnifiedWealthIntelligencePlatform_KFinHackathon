import { body } from "express-validator";

export const createSipValidator = [
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

  body("sip_amount")
    .notEmpty()
    .withMessage("SIP amount is required")
    .isFloat({
      gt: 0,
    })
    .withMessage("SIP amount must be greater than 0"),

  body("frequency")
    .notEmpty()
    .withMessage("Frequency is required")
    .isIn(["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"])
    .withMessage("Invalid SIP frequency"),

  body("start_date")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Invalid start date"),
];

export const updateSipValidator = [
  body("sip_amount")
    .optional()
    .isFloat({
      gt: 0,
    })
    .withMessage("SIP amount must be greater than 0"),

  body("frequency")
    .optional()
    .isIn(["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"])
    .withMessage("Invalid SIP frequency"),

  body("status")
    .optional()
    .isIn(["ACTIVE", "PAUSED", "CANCELLED"])
    .withMessage("Invalid SIP status"),

  body("next_installment_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid next installment date"),
];
