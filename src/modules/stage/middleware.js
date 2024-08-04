import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

export const validateBody = async (req, res, next) => {
  const stageName = req.body;
  if (!stageName) {
    logger.error("Bad request at stage/middlewares.createStage: Missing or invalid field");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  next();
};

export const validateRequestBodyToUpdate = async (req, res, next) => {
  const updateStage = req.body;
  const { id } = req.params;

  if (isEmpty(id) || isEmpty(updateStage)) {
    logger.error("Bad request at stage/middlewares.update-stage");
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
    logger.error("Bad request at stage/middlewares.get-stage-by-id");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  } else {
    next();
  }
};
