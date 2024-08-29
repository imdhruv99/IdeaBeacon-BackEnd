import { Router } from "express";
import { createVerticalController, deleteVerticalController, getAllVerticalsController, getVerticalByIdController, updateVerticalController } from "./controller.js";
import { validateBody, validateID, validateRequestBodyToUpdate } from "./middleware.js";

const verticalRouter = Router();

const createVertical = [validateBody, createVerticalController]
verticalRouter.post("/create-vertical", createVertical);

const getAllVerticals = [getAllVerticalsController]
verticalRouter.get("/get-all-vertical", getAllVerticals);

const getVerticalById = [validateID, getVerticalByIdController]
verticalRouter.get("/get-vertical/:id", getVerticalById);

const updateVertical = [validateRequestBodyToUpdate, updateVerticalController]
verticalRouter.put("/update-vertical/:id", updateVertical);

const deleteVertical = [validateID, deleteVerticalController]
verticalRouter.delete("/delete-vertical/:id", deleteVertical);

export default verticalRouter;
