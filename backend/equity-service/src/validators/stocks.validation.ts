import { body } from "express-validator";

export const createStockValidator = [
  body("symbol").notEmpty().withMessage("Symbol is required"),

  body("company_name").notEmpty().withMessage("Company name is required"),
];
