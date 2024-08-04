import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./controller.js";
import { validateCreateCategoryRequestBody, validateUpdateCategoryRequestBody } from "./middleware.js";

const categoryRouter = Router();

categoryRouter.post("/create-category", validateCreateCategoryRequestBody, createCategory); // Create Stage
categoryRouter.get("/get-all-category", getAllCategories); // Read All Stage
categoryRouter.get("/get-category/:id", getCategoryById); // Read Single Stage
categoryRouter.put("/update-category/:id", validateUpdateCategoryRequestBody, updateCategory); // Update Stage
categoryRouter.delete("/delete-category/:id", deleteCategory); // Delete Stage

export default categoryRouter;
