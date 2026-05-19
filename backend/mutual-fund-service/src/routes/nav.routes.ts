import { Router }
  from "express";

import * as navController
  from "../controllers/nav.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";



const router = Router();



// CREATE NAV HISTORY
router.post(
  "/",
  authMiddleware,
  navController.createNavHistory
);



// GET NAV HISTORY BY ID
router.get(
  "/:id",
  authMiddleware,
  navController.getNavHistoryById
);



// GET FUND NAV HISTORY
router.get(
  "/fund/:fundId",
  authMiddleware,
  navController.getFundNavHistory
);



// GET LATEST NAV
router.get(
  "/latest/:fundId",
  authMiddleware,
  navController.getLatestNav
);



// GET ALL LATEST NAVS
router.get(
  "/latest/all",
  authMiddleware,
  navController.getLatestNavs
);



// UPDATE NAV HISTORY
router.put(
  "/:id",
  authMiddleware,
  navController.updateNavHistory
);



// DELETE NAV HISTORY
router.delete(
  "/:id",
  authMiddleware,
  navController.deleteNavHistory
);



export default router;