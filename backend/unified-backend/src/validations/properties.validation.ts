import { body } from "express-validator";

export const createPropertyValidation = [
  body("investor_id")
    .notEmpty()
    .withMessage("Investor ID is required"),

  body("property_name")
    .notEmpty()
    .withMessage("Property name is required"),

  body("location")
    .notEmpty()
    .withMessage("Location is required"),

  body("purchase_price")
    .optional()
    .isNumeric(),

  body("current_valuation")
    .optional()
    .isNumeric(),

  body("ownership_percentage")
    .optional()
    .isNumeric(),
];

export const updatePropertyValidation = [
  body("property_name")
    .optional()
    .isString(),

  body("current_valuation")
    .optional()
    .isNumeric(),

  body("rental_income")
    .optional()
    .isNumeric(),
];