import { Router }
  from "express";

import * as alertController
  from "../controllers/alert.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";



const router = Router();



// CREATE ALERT
router.post(
  "/",
  authMiddleware,
  alertController.createAlert
);



// GET ALL ALERTS
router.get(
  "/",
  authMiddleware,
  alertController.getAllAlerts
);



// GET ALERT BY ID
router.get(
  "/:id",
  authMiddleware,
  alertController.getAlertById
);



// GET INVESTOR ALERTS
router.get(
  "/investor/:investorId",
  authMiddleware,
  alertController.getInvestorAlerts
);



// UPDATE ALERT
router.put(
  "/:id",
  authMiddleware,
  alertController.updateAlert
);



// DELETE ALERT
router.delete(
  "/:id",
  authMiddleware,
  alertController.deleteAlert
);



// GET OPEN ALERTS
router.get(
  "/status/open",
  authMiddleware,
  alertController.getOpenAlerts
);



// GET CRITICAL ALERTS
router.get(
  "/status/critical",
  authMiddleware,
  alertController.getCriticalAlerts
);



// RESOLVE ALERT
router.patch(
  "/resolve/:id",
  authMiddleware,
  alertController.resolveAlert
);



// DISMISS ALERT
router.patch(
  "/dismiss/:id",
  authMiddleware,
  alertController.dismissAlert
);



export default router;