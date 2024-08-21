import { Router } from "express";
import { getAllTagsController } from "./controller.js";

const tagRouter = Router();

const getAllTags = [getAllTagsController]
tagRouter.get("/get-all-tag", getAllTags);

export default tagRouter;
