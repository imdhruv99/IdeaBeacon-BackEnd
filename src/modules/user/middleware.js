// const profile = req.body.profile;

import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

export const validateBody = (req, res, next) => {
    const createUser = req.body;
    if (
        isEmpty(createUser)
    ) {
        logger.error("Bad request at user/middlewares.createUser: Missing or invalid field");
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
          status: false,
          message: responseStrings.missingPayload,
        });
      }
      next();
}