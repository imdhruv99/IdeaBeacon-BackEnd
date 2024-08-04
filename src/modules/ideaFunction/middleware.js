import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

export const validateBody = async (req, res, next) => {
  const functionName = req.body;
  if (!functionName) {
    logger.error("Bad request at function/middlewares.createFunction: Missing or invalid field");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  next();
};

export const validateRequestBodyToUpdate = async (req, res, next) => {
  const updateFunction = req.body;
  const { id } = req.params;

  if (isEmpty(id) || isEmpty(updateFunction)) {
    logger.error("Bad request at function/middlewares.update-function");
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
    logger.error("Bad request at function/middlewares.get-function-by-id");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  } else {
    next();
  }
};
