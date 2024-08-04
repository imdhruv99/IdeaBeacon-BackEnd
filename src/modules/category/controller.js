import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as categoryService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);

    const newCategory = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const createdCategory = await categoryService.createCategory(newCategory);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createCategorySuccessMessage, data: createdCategory });
  } catch (error) {
    logger.error(`Error creating category Category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createCategoryErrorMessage });
  }
};

// Read All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: categories });
  } catch (error) {
    logger.error(`Error fetching Categorys: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createCategoryErrorMessage });
  }
};

// Read Single Category
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Category not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: category });
  } catch (error) {
    logger.error(`Error fetching Category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.findCategoryByIDError });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Category not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: updatedCategory });
  } catch (error) {
    logger.error(`Error updating category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateCategoryByIDError });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Category not found" });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: "Category deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteCategoryError });
  }
};
