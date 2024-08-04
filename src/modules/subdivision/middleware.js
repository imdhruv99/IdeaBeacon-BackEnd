import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

export const validateBody = async (req, res, next) => {
  const createSubdivision = req.body;
  if (!createSubdivision) {
    logger.error("Bad request at subdivision/middlewares.createSubdivision: Missing or invalid field");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  next();
};

export const validateRequestBodyToUpdate = async (req, res, next) => {
  const updateSubdivision = req.body;
  const { id } = req.params;

  if (isEmpty(id) || isEmpty(updateSubdivision)) {
    logger.error("Bad request at subdivision/middlewares.update-subdivision");
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
    logger.error("Bad request at subdivision/middlewares.get-subdivision-by-id");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  } else {
    next();
  }
};