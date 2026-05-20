import { body } from "express-validator";

export const createFundValidator = [
  body("fund_code")
    .notEmpty()
    .withMessage("Fund code is required")
    .isLength({
      min: 3,
      max: 50,
    })
    .withMessage("Fund code must be between 3 and 50 characters"),

  body("fund_name")
    .notEmpty()
    .withMessage("Fund name is required")
    .isLength({
      min: 3,
      max: 200,
    })
    .withMessage("Fund name is invalid"),

  body("amc_name")
    .optional({
      values: "falsy",
    })
    .isLength({
      max: 150,
    })
    .withMessage("AMC name is invalid"),

  body("category")
    .optional({
      values: "falsy",
    })
    .isLength({
      max: 100,
    })
    .withMessage("Category is invalid"),

  body("risk_level")
    .optional({
      values: "falsy",
    })
    .isLength({
      max: 50,
    })
    .withMessage("Invalid risk level"),

  body("current_nav")
    .optional({
      values: "falsy",
    })
    .isFloat({
      min: 0,
    })
    .withMessage("NAV must be 0 or greater"),
];

export const updateFundValidator = [
  body("fund_name")
    .optional()
    .isLength({
      min: 3,
      max: 200,
    })
    .withMessage("Invalid fund name"),

  body("amc_name")
    .optional({
      values: "falsy",
    })
    .isLength({
      max: 150,
    })
    .withMessage("AMC name is invalid"),

  body("category")
    .optional({
      values: "falsy",
    })
    .isLength({
      max: 100,
    })
    .withMessage("Category is invalid"),

  body("risk_level")
    .optional({
      values: "falsy",
    })
    .isLength({
      max: 50,
    })
    .withMessage("Invalid risk level"),

  body("current_nav")
    .optional({
      values: "falsy",
    })
    .isFloat({
      min: 0,
    })
    .withMessage("NAV must be 0 or greater"),
];
