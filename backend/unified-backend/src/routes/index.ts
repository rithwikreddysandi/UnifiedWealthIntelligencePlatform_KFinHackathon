import express from "express";

import authRoutes from "./auth.routes.js";
import investorRoutes from "./investors.route.js";
import propertyRoutes from "./properties.routes.js";
import portfolioRoutes from "./portfolio.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import alertsRoutes from "./alerts.routes.js";
import serviceProxyRoutes from "./serviceProxy.routes.js";

import serviceHealthRoutes from "./serviceHealth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/investors", investorRoutes);

router.use("/properties", propertyRoutes);

router.use("/portfolio", portfolioRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/alerts", alertsRoutes);

router.use(serviceProxyRoutes);

router.use("/service-health", serviceHealthRoutes);

export default router;
