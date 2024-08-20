import { Router } from "express";
import { createVerticalController, deleteVerticalController, getAllCategoriesController, getVerticalByIdController, getVerticalCountController, updateVerticalController } from "./controller.js";
import { validateBody, validateID, validateRequestBodyToUpdate } from "./middleware.js";

const verticalRouter = Router();

const createVertical = [validateBody, createVerticalController]
verticalRouter.post("/create-vertical", createVertical);

const getAllCategories = [getAllCategoriesController]
verticalRouter.get("/get-all-vertical", getAllCategories);

const getVerticalById = [validateID, getVerticalByIdController]
verticalRouter.get("/get-vertical/:id", getVerticalById);

const updateVertical = [validateRequestBodyToUpdate, updateVerticalController]
verticalRouter.put("/update-vertical/:id", updateVertical);

const deleteVertical = [validateID, deleteVerticalController]
verticalRouter.delete("/delete-vertical/:id", deleteVertical);

const getVerticalCount = [validateID, getVerticalCountController]
verticalRouter.get("/get-vertical-count/:id", getVerticalCount);

export default verticalRouter;
