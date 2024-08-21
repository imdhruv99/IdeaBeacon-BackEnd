import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";


export const validateBody = async (req, res, next) => {
  const createVertical = req.body;
  if (!createVertical) {
    logger.error("Bad request at vertical/middlewares.createVertical: Missing or invalid field");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  next();
};

export const validateRequestBodyToUpdate = async (req, res, next) => {
  const updateVertical = req.body;
  const { id } = req.params;

  if (isEmpty(id) || isEmpty(updateVertical)) {
    logger.error("Bad request at vertical/middlewares.update-vertical");
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
    logger.error("Bad request at vertical/middlewares.get-vertical-by-id");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  } else {
    next();
  }
};