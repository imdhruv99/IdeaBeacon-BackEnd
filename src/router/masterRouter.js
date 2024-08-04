import express from "express";

import authRouter from "../modules/auth/routes.js";
import { authenticate } from "../modules/common/middleware.js";
import ideaRouter from "../modules/idea/routes.js";
import stageRouter from "../modules/stage/routes.js";
import categoryRouter from "../modules/category/routes.js";
import functionRouter from "../modules/ideaFunction/routes.js";

const router = express.Router();

// Health route
router.get("/health-check/liveness", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  res.json({ message: "Welcome to ideaBeacon application.", healthcheck });
});
router.use("/auth/v1", authRouter);

// the route above this line does not need authentication to access them
router.use(authenticate);
router.use("/idea/v1/", ideaRouter);
router.use("/stage/v1/", stageRouter);
router.use("/category/v1/", categoryRouter);
router.use("/function/v1/", functionRouter);

export default router;
