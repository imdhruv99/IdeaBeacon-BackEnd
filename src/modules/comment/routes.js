import { Router } from "express";
import { handleIdeaCommentController } from "./controller.js";
import { validateCommentData } from "./middleware.js";

const commentRouter = Router();

const commentIdea = [validateCommentData, handleIdeaCommentController];
commentRouter.post("/idea-comment/:id", commentIdea);

export default commentRouter;
