import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";


export const validateBody = async (req, res, next) => {
  const categoryName = req.body;
  if (!categoryName) {
    logger.error("Bad request at category/middlewares.createCategory: Missing or invalid field");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  next();
};

export const validateRequestBodyToUpdate = async (req, res, next) => {
  const updateCategory = req.body;
  const { id } = req.params;

  if (isEmpty(id) || isEmpty(updateCategory)) {
    logger.error("Bad request at category/middlewares.update-category");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }
  next();
};

export const validateID = async (req, res, next) => {
  let { id } = req.params;
  if (isEmpty(id)) {
    logger.error("Bad request at category/middlewares.get-category-by-id");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  } else {
    next();
  }
};