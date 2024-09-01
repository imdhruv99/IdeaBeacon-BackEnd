import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";

// Middleware function for handling pre-processing before handleIdeaCommentController
export const validateCommentData = (req, res, next) => {
  try {
    const { comment, userId, ideaId } = req.body;

    // Check if the required fields are provided
    if (!comment || !userId || !ideaId) {
      logger.warn(`Validation failed: Missing required fields in comment data.`);
      return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
        status: false,
        message: responseStrings.missingCommentDataMessage, // Make sure this string exists in your constants
      });
    }

    logger.info(`Comment data validation successful for idea ID: ${ideaId}`);
    next(); // Pass control to the next middleware or the controller
  } catch (error) {
    logger.error(`Error in comment data validation: ${error.message}`);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code).json({
      status: false,
      message: responseStrings.validationErrorMessage, // Make sure this string exists in your constants
    });
  }
};
