import { body } from "express-validator";

export const updateInvestorValidation = [
  body("full_name")
    .optional()
    .notEmpty(),

  body("phone")
    .optional()
    .isLength({ min: 10 }),

  body("risk_profile")
    .optional()
    .isString(),
];