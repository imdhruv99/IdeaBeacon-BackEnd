import { Router } from "express";
import {
    createDemoDayController,
    getAllDemoDaysController,
    getCurrentDemoDayController,
    getDemoDayByIdController,
    updateDemoDayController,
    deleteDemoDayController,
} from "./controller.js";
import {
    validateCreateDemoDay,
    validateDemoDayID,
    validateUpdateDemoDay,
} from "./middleware.js";

const demoDayRouter = Router();

// Create Demo Day
const createDemoDay = [validateCreateDemoDay, createDemoDayController];
demoDayRouter.post("/create-demo-day", createDemoDay);

// Get All Demo Days
const getAllDemoDays = [getAllDemoDaysController];
demoDayRouter.get("/get-all-demo-day", getAllDemoDays);

// Get Current Demo Day
const getCurrentDemoDay = [getCurrentDemoDayController];
demoDayRouter.get("/get-current-demo-day", getCurrentDemoDay);

// Get Demo Day By ID
const getDemoDayById = [validateDemoDayID, getDemoDayByIdController];
demoDayRouter.get("/get-demo-day/:id", getDemoDayById);

// Update Demo Day
const updateDemoDay = [validateUpdateDemoDay, updateDemoDayController];
demoDayRouter.put("/update-demo-day/:id", updateDemoDay);

// Delete Demo Day
const deleteDemoDay = [validateDemoDayID, deleteDemoDayController];
demoDayRouter.delete("/delete-demo-day/:id", deleteDemoDay);

export default demoDayRouter;
