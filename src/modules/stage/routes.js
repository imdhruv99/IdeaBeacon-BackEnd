import { Router } from "express";
import { createIdeaStage, deleteStage, getAllStages, getStageById, updateStage } from "./controller.js";
import { validateCreateStageRequestBody } from "./middleware.js";

const stageRouter = Router();

stageRouter.post("/create-idea-stage", validateCreateStageRequestBody, createIdeaStage); // Create Stage
stageRouter.get("/get-all-stage", getAllStages); // Read All Stage
stageRouter.get("/get-stage/:id", getStageById); // Read Single Stage
stageRouter.put("/update-stage/:id", updateStage); // Update Stage
stageRouter.delete("/delete-stage/:id", deleteStage); // Delete Stage

export default stageRouter;
