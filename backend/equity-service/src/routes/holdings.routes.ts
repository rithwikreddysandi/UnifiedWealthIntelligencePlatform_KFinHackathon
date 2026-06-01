import { Router } from "express";

import { getHoldingsByInvestorController } from "../controllers/holdings.controller";

const router = Router();

router.get("/:investorId", getHoldingsByInvestorController);

export default router;
