import {
  body,
} from "express-validator";



export const createBankAccountValidator = [

  body("investor_id")
    .notEmpty()
    .withMessage(
      "Investor ID is required"
    )
    .isUUID()
    .withMessage(
      "Invalid investor ID"
    ),

  body("bank_name")
    .notEmpty()
    .withMessage(
      "Bank name is required"
    )
    .isLength({
      min: 2,
      max: 255,
    })
    .withMessage(
      "Invalid bank name"
    ),

  body("account_number_masked")
    .notEmpty()
    .withMessage(
      "Account number is required"
    )
    .isLength({
      min: 4,
      max: 30,
    })
    .withMessage(
      "Invalid account number"
    ),

  body("ifsc_code")
    .notEmpty()
    .withMessage(
      "IFSC code is required"
    )
    .matches(
      /^[A-Z]{4}0[A-Z0-9]{6}$/
    )
    .withMessage(
      "Invalid IFSC code"
    ),
];





export const updateBankAccountValidator = [

  body("bank_name")
    .optional()
    .isLength({
      min: 2,
      max: 255,
    })
    .withMessage(
      "Invalid bank name"
    ),

  body("account_number_masked")
    .optional()
    .isLength({
      min: 4,
      max: 30,
    })
    .withMessage(
      "Invalid account number"
    ),

  body("ifsc_code")
    .optional()
    .matches(
      /^[A-Z]{4}0[A-Z0-9]{6}$/
    )
    .withMessage(
      "Invalid IFSC code"
    ),

  body("mandate_status")
    .optional()
    .isIn([
      "PENDING",
      "APPROVED",
      "REJECTED",
    ])
    .withMessage(
      "Invalid mandate status"
    ),
];