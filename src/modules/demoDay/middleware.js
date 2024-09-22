import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

// Validate Create DemoDay Request Body
export const validateCreateDemoDay = async (req, res, next) => {
  const { number, year } = req.body;

  if (isEmpty(number) || isEmpty(year)) {
    logger.error("Bad request at demoDay/middleware.validateCreateDemoDay: Missing required fields");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }
  next();
};

// Validate Update DemoDay Request Body
export const validateUpdateDemoDay = async (req, res, next) => {
  const { number, year } = req.body;
  const { id } = req.params;

  if (isEmpty(id)) {
    logger.error("Bad request at demoDay/middleware.validateUpdateDemoDay: Missing DemoDay ID");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  if (isEmpty(number) && isEmpty(year)) {
    logger.error("Bad request at demoDay/middleware.validateUpdateDemoDay: Missing fields to update");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }
  next();
};

// Validate ID Parameter
export const validateDemoDayID = async (req, res, next) => {
  const { id } = req.params;

  if (isEmpty(id)) {
    logger.error("Bad request at demoDay/middleware.validateDemoDayID: Missing DemoDay ID");
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  next();
};
