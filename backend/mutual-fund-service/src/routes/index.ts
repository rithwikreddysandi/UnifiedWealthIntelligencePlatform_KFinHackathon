import { Router }
  from "express";

import fundRoutes
  from "./fund.routes.js";

import sipRoutes
  from "./sip.routes.js";

import transactionRoutes
  from "./transaction.routes.js";

import holdingRoutes
  from "./holding.routes.js";

import mandateRoutes
  from "./mandate.routes.js";

import bankAccountRoutes
  from "./bankAccount.routes.js";

import navRoutes
  from "./nav.routes.js";

import alertRoutes
  from "./alert.routes.js";



const router = Router();



// HEALTH CHECK
router.get(
  "/health",
  (req, res) => {

    return res.status(200).json({
      success: true,
      message:
        "Mutual Fund Service Running",
    });
  }
);



// MODULE ROUTES
router.use(
  "/funds",
  fundRoutes
);

router.use(
  "/sips",
  sipRoutes
);

router.use(
  "/transactions",
  transactionRoutes
);

router.use(
  "/holdings",
  holdingRoutes
);

router.use(
  "/mandates",
  mandateRoutes
);

router.use(
  "/bank-accounts",
  bankAccountRoutes
);

router.use(
  "/nav",
  navRoutes
);

router.use(
  "/alerts",
  alertRoutes
);



export default router;