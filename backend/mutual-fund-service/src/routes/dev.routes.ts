import { Router }
  from "express";

import jwt from "jsonwebtoken";

import {
  successResponse,
} from "../utils/response.js";



const router = Router();


router.get(
  "/gettoken",
  async (req, res) => {

    const token =
      jwt.sign(
        {
          id:
            "dev-user-id",

          email:
            "dev@test.com",

          role:
            "ADMIN",
        },

        process.env.JWT_SECRET!,

        {
          expiresIn:
            "7d",
        }
      );

    return successResponse(
      res,
      "Development token generated",
      {
        token,
      }
    );
  }
);



export default router;