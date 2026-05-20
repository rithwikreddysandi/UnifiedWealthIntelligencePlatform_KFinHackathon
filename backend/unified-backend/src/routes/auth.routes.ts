import express from "express";

import {
  register,
  login,
  logout,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

import { validate } from "../middlewares/validate.middleware.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
 validate,
  login
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.post(
  "/refresh-token",
  refreshAccessToken
);

export default router;