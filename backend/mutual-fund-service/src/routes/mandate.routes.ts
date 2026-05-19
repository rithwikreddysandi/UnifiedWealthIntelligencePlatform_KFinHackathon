import { Router }
  from "express";

import * as mandateController
  from "../controllers/mandate.controller.js";

import {
  authMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  validationMiddleware,
} from "../middlewares/validation.middleware.js";

import {
  createMandateValidator,
  updateMandateValidator,
} from "../validators/mandate.validator.js";



const router = Router();



// CREATE MANDATE
router.post(
  "/",
  authMiddleware,
  createMandateValidator,
  validationMiddleware,
  mandateController.createMandate
);



// GET ALL MANDATES
router.get(
  "/",
  authMiddleware,
  mandateController.getAllMandates
);



// GET MANDATE BY ID
router.get(
  "/:id",
  authMiddleware,
  mandateController.getMandateById
);



// GET INVESTOR MANDATES
router.get(
  "/investor/:investorId",
  authMiddleware,
  mandateController.getInvestorMandates
);



// UPDATE MANDATE
router.put(
  "/:id",
  authMiddleware,
  updateMandateValidator,
  validationMiddleware,
  mandateController.updateMandate
);



// DELETE MANDATE
router.delete(
  "/:id",
  authMiddleware,
  mandateController.deleteMandate
);



// APPROVE MANDATE
router.patch(
  "/approve/:id",
  authMiddleware,
  mandateController.approveMandate
);



// REJECT MANDATE
router.patch(
  "/reject/:id",
  authMiddleware,
  mandateController.rejectMandate
);



// GET APPROVED MANDATES
router.get(
  "/status/approved",
  authMiddleware,
  mandateController.getApprovedMandates
);



// GET EXPIRED MANDATES
router.get(
  "/status/expired",
  authMiddleware,
  mandateController.getExpiredMandates
);



export default router;