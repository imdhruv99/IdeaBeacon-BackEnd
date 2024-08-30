import { Router } from "express";
import { likeUnlikeIdeaController } from "./controller.js";

const likeRouter = Router();

const likeUnlikeIdea = [likeUnlikeIdeaController];
likeRouter.post("/like-idea", likeUnlikeIdea);

export default likeRouter;
