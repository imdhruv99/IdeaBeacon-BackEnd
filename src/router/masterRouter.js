import express from "express";
import authRouter from "../modules/auth/routes.js";

const router = express.Router();

// idea routes
// router.use("/idea/v1/", ideaRoutes);
router.use("/auth/v1", authRouter);

// Health route
router.get("/health-check/liveness", async (req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };
    res.json({ message: "Welcome to ideaBeacon application.", healthcheck });
});

export default router;