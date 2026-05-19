import { Request, Response } from "express";

import {
  getHoldingsByInvestorService,
} from "../services/holdings.service";

export const getHoldingsByInvestorController =
async (
  req: Request,
  res: Response
) => {

  try {

    const { investorId } = req.params;

    const holdings =
      await getHoldingsByInvestorService(
        String(investorId)
      );

    res.status(200).json({
      success: true,
      data: holdings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};