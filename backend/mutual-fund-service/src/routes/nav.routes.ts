import { Router } from "express";

import * as navController from "../controllers/nav.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, navController.createNavHistory);

router.get("/:id", authMiddleware, navController.getNavHistoryById);

router.get("/fund/:fundId", authMiddleware, navController.getFundNavHistory);

router.get("/latest/:fundId", authMiddleware, navController.getLatestNav);

router.get("/latest/all", authMiddleware, navController.getLatestNavs);

router.put("/:id", authMiddleware, navController.updateNavHistory);

router.delete("/:id", authMiddleware, navController.deleteNavHistory);

export default router;
