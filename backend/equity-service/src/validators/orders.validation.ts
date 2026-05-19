import { body } from "express-validator";

export const createOrderValidator = [

  body("investor_id")
    .notEmpty()
    .withMessage("Investor ID is required"),

  body("stock_id")
    .notEmpty()
    .withMessage("Stock ID is required"),

  body("order_type")
    .notEmpty()
    .withMessage("Order type is required"),

  body("quantity")
    .isNumeric()
    .withMessage("Quantity must be numeric"),
];