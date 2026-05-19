import {
  body,
} from "express-validator";



export const createFundValidator = [

  body("fund_code")
    .notEmpty()
    .withMessage(
      "Fund code is required"
    )
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage(
      "Fund code must be between 3 and 20 characters"
    ),

  body("fund_name")
    .notEmpty()
    .withMessage(
      "Fund name is required"
    )
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage(
      "Fund name is invalid"
    ),

  body("amc_name")
    .notEmpty()
    .withMessage(
      "AMC name is required"
    ),

  body("category")
    .notEmpty()
    .withMessage(
      "Category is required"
    ),

  body("risk_level")
    .notEmpty()
    .withMessage(
      "Risk level is required"
    )
    .isIn([
      "LOW",
      "MEDIUM",
      "HIGH",
      "VERY_HIGH",
    ])
    .withMessage(
      "Invalid risk level"
    ),

  body("current_nav")
    .notEmpty()
    .withMessage(
      "Current NAV is required"
    )
    .isFloat({
      gt: 0,
    })
    .withMessage(
      "NAV must be greater than 0"
    ),
];





export const updateFundValidator = [

  body("fund_name")
    .optional()
    .isLength({
      min: 3,
      max: 255,
    })
    .withMessage(
      "Invalid fund name"
    ),

  body("amc_name")
    .optional()
    .isString()
    .withMessage(
      "AMC name must be string"
    ),

  body("category")
    .optional()
    .isString()
    .withMessage(
      "Category must be string"
    ),

  body("risk_level")
    .optional()
    .isIn([
      "LOW",
      "MEDIUM",
      "HIGH",
      "VERY_HIGH",
    ])
    .withMessage(
      "Invalid risk level"
    ),

  body("current_nav")
    .optional()
    .isFloat({
      gt: 0,
    })
    .withMessage(
      "NAV must be greater than 0"
    ),
];