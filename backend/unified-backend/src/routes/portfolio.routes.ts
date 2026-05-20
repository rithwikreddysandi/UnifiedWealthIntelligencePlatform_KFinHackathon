import express from "express";

import { getPortfolio } from "../controllers/portfolio.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/:investorId",
  getPortfolio
);

export default router;