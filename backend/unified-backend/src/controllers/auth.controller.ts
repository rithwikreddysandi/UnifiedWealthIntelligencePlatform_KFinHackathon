import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import {
  createInvestorAccount,
  findUserByEmail,
  updateLastLogin,
} from "../services/auth.service.js";

import { hashPassword, comparePassword } from "../utils/bcrypt.js";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { storeRefreshToken } from "../services/auth.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone, pan_number, dob, risk_profile } =
      req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return errorResponse(res, "User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const result = await createInvestorAccount({
      full_name,
      email,
      password_hash: hashedPassword,
      phone,
      pan_number,
      dob,
      risk_profile,
    });

    const token = generateAccessToken({
      id: result.user.id,
      role: "INVESTOR",
    });

    return successResponse(
      res,
      "Registration successful",
      {
        token,

        user: {
          id: result.user.id,
          full_name: result.user.full_name,
          email: result.user.email,
          role: "INVESTOR",
        },

        investor: result.investor,
      },
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    await updateLastLogin(user.id);

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role_name,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    await storeRefreshToken(user.id, refreshToken);

    return successResponse(res, "Login successful", {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role_name,
      },

      investor: user.investor_id
        ? {
            investor_id: user.investor_id,

            phone: user.phone,

            pan_number: user.pan_number,

            risk_profile: user.risk_profile,
          }
        : null,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return successResponse(res, "Logout successful");
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refresh_token } = req.body;

    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET!) as any;

    const accessToken = generateAccessToken({
      id: decoded.id,
    });

    return successResponse(res, "Token refreshed", {
      access_token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};
