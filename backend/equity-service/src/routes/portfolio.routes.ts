import { Router } from "express";

import {
  createPortfolioSnapshotController,
  getPortfolioSnapshotsController,
} from "../controllers/portfolio.controller";

const router = Router();

router.post("/", createPortfolioSnapshotController);

router.get("/:investorId", getPortfolioSnapshotsController);

export default router;
