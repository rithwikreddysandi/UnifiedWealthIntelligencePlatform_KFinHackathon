import { Router } from "express";

import * as mandateController from "../controllers/mandate.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { validationMiddleware } from "../middlewares/validation.middleware.js";

import {
  createMandateValidator,
  updateMandateValidator,
} from "../validators/mandate.validator.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createMandateValidator,
  validationMiddleware,
  mandateController.createMandate,
);

router.get("/", authMiddleware, mandateController.getAllMandates);

router.get("/:id", authMiddleware, mandateController.getMandateById);

router.get(
  "/investor/:investorId",
  authMiddleware,
  mandateController.getInvestorMandates,
);

router.put(
  "/:id",
  authMiddleware,
  updateMandateValidator,
  validationMiddleware,
  mandateController.updateMandate,
);

router.delete("/:id", authMiddleware, mandateController.deleteMandate);

router.patch("/approve/:id", authMiddleware, mandateController.approveMandate);

router.patch("/reject/:id", authMiddleware, mandateController.rejectMandate);

router.get(
  "/status/approved",
  authMiddleware,
  mandateController.getApprovedMandates,
);

router.get(
  "/status/expired",
  authMiddleware,
  mandateController.getExpiredMandates,
);

export default router;
