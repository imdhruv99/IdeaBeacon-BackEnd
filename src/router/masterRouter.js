import express from "express";
import authRouter from "../modules/auth/routes.js";
import { authenticate } from "../modules/common/middleware.js";
import ideaRouter from "../modules/idea/routes.js";

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

export default router;
