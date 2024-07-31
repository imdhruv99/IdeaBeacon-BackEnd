import express from "express";

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

export default router;