import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

// Middleware function for handling pre-processing before handleIdeaCommentController
export const validateCommentData = (req, res, next) => {
  const createComment = req.body;

  if (
    isEmpty(createComment) ||
    isEmpty(createComment.comment) ||
    isEmpty(createComment.userId) ||
    isEmpty(createComment.ideaId)
  ) {
    logger.error(`Validation failed: Missing required fields in comment data.`);
    return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
      status: false,
      message: responseStrings.missingPayload,
    });
  }

  logger.info(`Comment data validation successful for idea ID: ${ideaId}`);
  next();
};
