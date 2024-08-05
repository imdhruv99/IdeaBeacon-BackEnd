import { Router } from "express";
import { createIdeaController, deleteIdeaController, filterIdeasController, getAllIdeasController, getIdeaByIdController, updateIdeaController, updateIdeaStageAndCountController } from "./controller.js";
import { validateBody, validateFilterIdeaRequestBody, validateID, validateRequestBodyToUpdate, validateDeleteParam } from "./middleware.js";

const ideaRouter = Router();

const createIdea = [validateBody, createIdeaController]
ideaRouter.post("/create-idea", createIdea); 

const getAllIdeas = [getAllIdeasController]
ideaRouter.get("/get-all-idea", getAllIdeas);

const getIdeaById = [validateID, getIdeaByIdController]
ideaRouter.get("/get-idea/:id", getIdeaById);

const updateIdea = [validateRequestBodyToUpdate, updateIdeaController]
ideaRouter.put("/update-idea/:id", updateIdea);

const deleteIdea = [validateDeleteParam, deleteIdeaController]
ideaRouter.delete("/delete-idea/:id", deleteIdea);

const filterIdeas = [validateFilterIdeaRequestBody, filterIdeasController]
ideaRouter.post("/filter", filterIdeas);

const updateIdeaStage = [validateRequestBodyToUpdate, updateIdeaStageAndCountController]
ideaRouter.put("/update-idea-stage/:id", updateIdeaStage);

export default ideaRouter;
