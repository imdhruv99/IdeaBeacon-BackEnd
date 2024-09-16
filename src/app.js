import express from "express";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import cors from "cors";
import router from "./router/masterRouter.js";
import morgan from "morgan";
import { initializeRoles } from "./config/appConfig.js";

const app = express();
app.use(cors());

// Connect Database
connectDB()
  .then(async () => {
    logger.info("Database and collections initialization complete");
    try {
      await initializeRoles();
      logger.info("Roles initialization complete");
    } catch (error) {
      logger.error(`Pre-configuration error: ${error.message}`);
      process.exit(1);
    }
  })
  .catch((error) => {
    logger.error(`Initialization error: ${error.message}`);
    process.exit(1);
  });

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/ideabeacon", router);

export default app;