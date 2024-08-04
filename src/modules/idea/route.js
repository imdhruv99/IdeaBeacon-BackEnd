import { Router } from "express";
import { createIdea, getAllIdeas, getIdeaById, updateIdea, deleteIdea, filterIdeas } from "./controller.js";
import { validateFilterIdeaRequestBody } from "./middleware.js";

const ideaRouter = Router();

ideaRouter.post("/create-idea", createIdea); // Create Idea
ideaRouter.get("/get-all-idea", getAllIdeas); // Read All Ideas
ideaRouter.get("/get-idea/:id", getIdeaById); // Read Single Idea
ideaRouter.put("/update-idea/:id", updateIdea); // Update Idea
ideaRouter.delete("/delete-idea/:id", deleteIdea); // Delete Idea
ideaRouter.post("/filter", validateFilterIdeaRequestBody, filterIdeas); // Filter Idea

export default ideaRouter;
