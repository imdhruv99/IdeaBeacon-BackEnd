import * as commentService from "./service.js";
import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";

export const handleIdeaCommentController = async (req, res) => {
  try {
    const ideaId = req.params.id;

    logger.info(`Handling comment for idea with ID: ${ideaId}`);

    let ideaComment = await commentService.getCommentByIdeaId(ideaId);

    if (!ideaComment || !Array.isArray(ideaComment.comments) || ideaComment.comments.length === 0) {
      logger.info(`No existing comments found for idea with ID: ${ideaId}. Creating new comment.`);
      ideaComment = await commentService.createCommentForIdea(req.body);
      logger.info(`Successfully created new comment for idea with ID: ${ideaId}`);
    } else {
      logger.info(`Existing comments found for idea with ID: ${ideaId}. Adding new comment.`);
      ideaComment = await commentService.addCommentToExistingIdea(ideaComment, req.body);
      logger.info(`Successfully added new comment to idea with ID: ${ideaId}`);
    }

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.createCommentSuccessMessage, data: ideaComment });
    logger.info(`Response sent with status 200 for idea with ID: ${ideaId}`);
  } catch (error) {
    logger.error(`Error commenting on idea with ID: ${ideaId}: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createCommentErrorMessage });
  }
};

export const getIdeaCommentByIdeaIdController = async (req, res) => {
  try {
    const ideaId = req.params.id;
    logger.info(`Handling comment for idea with ID: ${ideaId}`);

    let ideaComment = await commentService.getCommentByIdeaId(ideaId);
    logger.info(`Existing comments found for idea with ID: ${ideaId}.`);

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getCommentByIdSuccessMessage, data: ideaComment });
    logger.info(`Response sent with status 200 for idea with ID: ${ideaId}`);
  } catch (error) {
    logger.error(`Error fetching idea comment with ID: ${ideaId}: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getCommentByIdErrorMessage });
  }
};
