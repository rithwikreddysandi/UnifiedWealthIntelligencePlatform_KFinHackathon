import { Request, Response } from "express";

import { validationResult } from "express-validator";

import {
  createOrderService,
  getOrdersByInvestorService,
} from "../services/orders.service";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const order = await createOrderService(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getOrdersByInvestorController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { investorId } = req.params;

    const orders = await getOrdersByInvestorService(String(investorId));

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
