import { body } from "express-validator";

export const createDividendValidator = [

  body("investor_id")
    .notEmpty()
    .withMessage("Investor ID is required"),

  body("stock_id")
    .notEmpty()
    .withMessage("Stock ID is required"),

  body("dividend_amount")
    .isNumeric()
    .withMessage("Dividend amount must be numeric"),

  body("dividend_date")
    .notEmpty()
    .withMessage("Dividend date is required"),
];