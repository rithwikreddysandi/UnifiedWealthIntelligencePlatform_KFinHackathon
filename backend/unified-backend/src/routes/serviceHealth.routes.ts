import express from "express";

import { getServiceHealth } from "../controllers/serviceHealth.controller.js";

const router = express.Router();

router.get("/", getServiceHealth);

export default router;
