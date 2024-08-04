import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from "./controller.js";
import { validateBody, validateID, validateRequestBodyToUpdate } from "./middleware.js";

const categoryRouter = Router();

const createCategory = [validateBody, createCategoryController]
categoryRouter.post("/create-category", createCategory);

const getAllCategories = [getAllCategoriesController]
categoryRouter.get("/get-all-category", getAllCategories); 

const getCategoryById = [validateID, getCategoryByIdController]
categoryRouter.get("/get-category/:id", getCategoryById);

const updateCategory = [validateRequestBodyToUpdate, updateCategoryController ]
categoryRouter.put("/update-category/:id", updateCategory);

const deleteCategory = [validateID, deleteCategoryController]
categoryRouter.delete("/delete-category/:id", deleteCategory);

export default categoryRouter;
