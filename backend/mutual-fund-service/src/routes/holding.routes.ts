import { Router }
  from "express";

import * as holdingController
  from "../controllers/holding.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";



const router = Router();



// CREATE HOLDING
router.post(
  "/",
  authMiddleware,
  holdingController.createHolding
);



// GET HOLDING BY ID
router.get(
  "/:id",
  authMiddleware,
  holdingController.getHoldingById
);



// GET INVESTOR HOLDINGS
router.get(
  "/investor/:investorId",
  authMiddleware,
  holdingController.getInvestorHoldings
);



// UPDATE HOLDING
router.put(
  "/:id",
  authMiddleware,
  holdingController.updateHolding
);



// DELETE HOLDING
router.delete(
  "/:id",
  authMiddleware,
  holdingController.deleteHolding
);



// GET PORTFOLIO SUMMARY
router.get(
  "/portfolio/summary/:investorId",
  authMiddleware,
  holdingController.getInvestorPortfolioSummary
);



export default router;