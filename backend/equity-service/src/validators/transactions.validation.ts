import { body } from "express-validator";

export const buyStockValidator = [
  body("investor_id").notEmpty().withMessage("Investor ID is required"),

  body("stock_id").notEmpty().withMessage("Stock ID is required"),

  body("quantity").isNumeric().withMessage("Quantity must be numeric"),

  body("price").isNumeric().withMessage("Price must be numeric"),
];

export const sellStockValidator = [
  body("investor_id").notEmpty().withMessage("Investor ID is required"),

  body("stock_id").notEmpty().withMessage("Stock ID is required"),

  body("quantity").isNumeric().withMessage("Quantity must be numeric"),

  body("price").isNumeric().withMessage("Price must be numeric"),
];
