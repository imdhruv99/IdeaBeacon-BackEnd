import { Router } from "express";
import { handleIdeaCommentController } from "./controller.js";

const commentRouter = Router();

const commentIdea = [handleIdeaCommentController];
commentRouter.post("/idea-comment/:id", commentIdea);

export default commentRouter;
