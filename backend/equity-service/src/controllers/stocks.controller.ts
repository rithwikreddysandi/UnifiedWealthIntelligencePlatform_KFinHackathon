import { Request, Response } from "express";
import { getAllStocksService } from "../services/stocks.service";

export const getAllStocksController = async (req: Request, res: Response) => {
  try {
    const data = await getAllStocksService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

import { validationResult } from "express-validator";
import { createStockService } from "../services/stocks.service";

export const createStockController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const stock = await createStockService(req.body);

    res.status(201).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
