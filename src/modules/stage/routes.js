import { Router } from "express";
import { createStageController, deleteStageController, getAllStagesController, getStageByIdController, updateStageController } from "./controller.js";
import { validateBody, validateID, validateRequestBodyToUpdate } from "./middleware.js";

const stageRouter = Router();

const createStage = [validateBody, createStageController]
stageRouter.post("/create-stage", createStage);

const getAllStages = [getAllStagesController]
stageRouter.get("/get-all-stage", getAllStages);

const getStageById = [validateID, getStageByIdController]
stageRouter.get("/get-stage/:id", getStageById);

const updateStage = [validateRequestBodyToUpdate, updateStageController]
stageRouter.put("/update-stage/:id", updateStage);

const deleteStage = [validateID, deleteStageController]
stageRouter.delete("/delete-stage/:id", deleteStage);

export default stageRouter;
