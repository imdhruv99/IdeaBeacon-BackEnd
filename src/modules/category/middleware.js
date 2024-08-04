import { HttpStatusCodes } from "../../constants/index.js";

export const validateCreateCategoryRequestBody = (req, res, next) => {
  const { categoryName } = req.body;

  // Add any specific validation rules here
  if (!categoryName) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST.code)
      .json({ error: "Category name is not null/undefiend/empty string" });
  }

  next();
};

export const validateUpdateCategoryRequestBody = (req, res, next) => {
  const { categoryName } = req.body;

  // Add any specific validation rules here
  if (!categoryName) {
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({ error: `Missing required body param: "categoryName"` });
  }

  next();
};
