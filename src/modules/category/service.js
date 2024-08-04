import Category from "../../models/ideaCategoryModel.js";
import logger from "../../utils/logger.js";

// Create Category
export const createCategory = async (categoryData) => {
  logger.info(`Creating category with title: ${categoryData.categoryName}`);
  try {
    return await Category.create(categoryData);
  } catch (err) {
    logger.error(`Error creating category: ${err}`);
    throw err;
  }
};

// Read All Categories
export const getAllCategories = async () => {
  logger.info("Fetching all categories");
  try {
    return await Category.find().populate("categoryName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching categories: ${err}`);
    throw err;
  }
};

// Read Single Category
export const getCategoryById = async (id) => {
  logger.info(`Fetching category with id: ${id}`);
  try {
    return await Category.findById(id).populate("categoryName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching category: ${err}`);
    throw err;
  }
};

// Update Category
export const updateCategory = async (id, ideaData) => {
  logger.info(`Updating category with id: ${id}`);
  try {
    return await Category.findByIdAndUpdate(id, ideaData, { new: true }).populate("categoryName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error updating Category: ${err}`);
    throw err;
  }
};

// Delete Category
export const deleteCategory = async (id) => {
  logger.info(`Deleting category with id: ${id}`);
  try {
    return await Category.findByIdAndDelete(id);
  } catch (err) {
    logger.error(`Error deleting category: ${err}`);
    throw err;
  }
};
