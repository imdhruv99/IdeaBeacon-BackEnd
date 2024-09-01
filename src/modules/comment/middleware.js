import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { isEmpty } from "../../utils/utils.js";

export const validateCommentData = (req, res, next) => {
  const createComment = req.body;
  if (!isEmpty(createComment)) {
    if (createComment.isReply) {
      if (
        isEmpty(createComment) ||
        isEmpty(createComment.replyComment) ||
        isEmpty(createComment.commentId) ||
        isEmpty(createComment.userId) ||
        isEmpty(createComment.ideaId)
      ) {
        logger.error(`Validation failed: Missing required fields in comment data.`);
        return res.status(HttpStatusCodes.BAD_REQUEST.code).json({
          status: false,
          message: responseStrings.missingPayload,
        });
      }
    } else if (
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
  }

  next();
};
