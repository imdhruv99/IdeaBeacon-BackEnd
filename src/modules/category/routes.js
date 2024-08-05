import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, getCategoryCountController, updateCategoryController } from "./controller.js";
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

const getCategoryCount = [validateID, getCategoryCountController]
categoryRouter.get("/get-category-count/:id", getCategoryCount);

export default categoryRouter;
