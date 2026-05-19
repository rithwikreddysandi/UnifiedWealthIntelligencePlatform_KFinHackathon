import { Router }
  from "express";

import * as sipController
  from "../controllers/sip.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  validationMiddleware,
} from "../middlewares/validation.middleware.js";

import {
  createSipValidator,
  updateSipValidator,
} from "../validators/sip.validator.js";



const router = Router();



// CREATE SIP
router.post(
  "/",
  authMiddleware,
  createSipValidator,
  validationMiddleware,
  sipController.createSip
);



// GET ALL SIPS
router.get(
  "/",
  authMiddleware,
  sipController.getAllSips
);



// GET SIP BY ID
router.get(
  "/:id",
  authMiddleware,
  sipController.getSipById
);



// GET INVESTOR SIPS
router.get(
  "/investor/:investorId",
  authMiddleware,
  sipController.getInvestorSips
);



// UPDATE SIP
router.put(
  "/:id",
  authMiddleware,
  updateSipValidator,
  validationMiddleware,
  sipController.updateSip
);



// DELETE SIP
router.delete(
  "/:id",
  authMiddleware,
  sipController.deleteSip
);



// EXECUTE SIP
router.post(
  "/execute/:id",
  authMiddleware,
  sipController.executeSip
);



// GET SIP TRANSACTIONS
router.get(
  "/transactions/:sipId",
  authMiddleware,
  sipController.getSipTransactions
);



// GET FAILED SIP TRANSACTIONS
router.get(
  "/failed/transactions",
  authMiddleware,
  sipController.getFailedSipTransactions
);



export default router;