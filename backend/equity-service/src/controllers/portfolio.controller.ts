import { Request, Response }
from "express";

import {
  createPortfolioSnapshotService,
  getPortfolioSnapshotsService,
} from "../services/portfolio.service";

export const createPortfolioSnapshotController =
async (
  req: Request,
  res: Response
) => {

  try {

    const { investor_id } = req.body;

    const snapshot =
      await createPortfolioSnapshotService(
        investor_id
      );

    res.status(201).json({
      success: true,
      data: snapshot,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

export const getPortfolioSnapshotsController =
async (
  req: Request,
  res: Response
) => {

  try {

    const { investorId } = req.params;

    const snapshots =
      await getPortfolioSnapshotsService(
        String(investorId)
      );

    res.status(200).json({
      success: true,
      data: snapshots,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};