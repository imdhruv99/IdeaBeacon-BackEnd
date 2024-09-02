import { Router } from "express";
import { getIdeaCommentByIdeaIdController, handleIdeaCommentController } from "./controller.js";
import { validateCommentData } from "./middleware.js";

const commentRouter = Router();

const commentIdea = [validateCommentData, handleIdeaCommentController];
commentRouter.post("/idea-comment/:id", commentIdea);

const getCommentIdea = [getIdeaCommentByIdeaIdController];
commentRouter.get("/get-idea-comment/:id", getCommentIdea);

export default commentRouter;
