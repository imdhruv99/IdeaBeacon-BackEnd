import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as categoryService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Category
export const createCategoryController = async (req, res) => {
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
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getAllCategorySuccessMessage, data: categories });
  } catch (error) {
    logger.error(`Error fetching Categorys: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllCategoryErrorMessage });
  }
};

// Read Single Category
export const getCategoryByIdController = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.categoryNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getCategoryByIdSuccessMessage, data: category });
  } catch (error) {
    logger.error(`Error fetching Category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getCategoryByIdErrorMessage });
  }
};

// Update Category
export const updateCategoryController = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.categoryNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.updateCategorySuccessMessage, data: updatedCategory });
  } catch (error) {
    logger.error(`Error updating category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateCategoryErrorMessage });
  }
};

// Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.categoryNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: responseStrings.deleteCategorySuccessMessage });
  } catch (error) {
    logger.error(`Error deleting category: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteCategoryErrorMessage });
  }
};

// Get Category Count
export const getCategoryCountController = async (req, res) => {
  try {
    const getCategoryCount = await categoryService.getCategoryCount(req.params.id);
    if (!getCategoryCount) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.getCategoryCountErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getCategoryCountSuccessMessage, data: getCategoryCount });
  } catch (error) {
    logger.error(`Error getting category counter: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getCategoryCountErrorMessage });
  }
}