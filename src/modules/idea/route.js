import { Router } from "express";
import { createIdea, getAllIdeas, getIdeaById, updateIdea, deleteIdea } from "./controller.js";

const ideaRouter = Router();

ideaRouter.post('/create-idea', createIdea); // Create Idea
ideaRouter.get('/get-all-idea', getAllIdeas); // Read All Ideas
ideaRouter.get('/get-idea/:id', getIdeaById); // Read Single Idea
ideaRouter.put('/update-idea/:id', updateIdea); // Update Idea
ideaRouter.delete('/delete-idea/:id', deleteIdea); // Delete Idea

export default ideaRouter;
