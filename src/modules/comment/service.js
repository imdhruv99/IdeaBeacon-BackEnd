import Comment from "../../models/commentModel.js";
import logger from "../../utils/logger.js";

export const getCommentByIdeaId = async (ideaId) => {
  try {
    logger.info(`Fetching comments for idea with ID: ${ideaId}`);
    const ideaCommentDocument = await Comment.findOne({ ideaId }).populate({
      path: 'comments.userId',
      select: 'name',
    }).populate({
      path: 'comments.replies.userId',
      select: 'name',
    }).populate({
      path: 'comments',
      populate: {
        path: 'replies.userId',
        select: 'name',
      },
    });

    if (ideaCommentDocument) {
      logger.info(`Comments found for idea with ID: ${ideaId}`);
      return ideaCommentDocument;
    }
    logger.info(`No comments found for idea with ID: ${ideaId}`);
    return { comments: [] };
  } catch (err) {
    logger.error(`Error fetching idea in comment: ${err.message}`);
    throw err;
  }
};

export const createCommentForIdea = async (commentData) => {
  try {
    logger.info(`Creating new comment for idea with ID: ${commentData.ideaId}`);
    const newIdeaCommentData = {
      ideaId: commentData.ideaId,
      comments: [
        {
          comment: commentData.comment,
          userId: commentData.userId,
          replies: [],
        },
      ],
    };

    const newIdeaCommentDocument = await Comment.create(newIdeaCommentData);
    logger.info(`Successfully created new comment for idea with ID: ${commentData.ideaId}`);
    return newIdeaCommentDocument;
  } catch (err) {
    logger.error(`Error creating comment: ${err.message}`);
    throw err;
  }
};

export const addCommentToExistingIdea = async (ideaCommentDocument, newCommentData) => {
  try {
    logger.info(`Adding comment/reply to existing idea comment for idea with ID: ${ideaCommentDocument.ideaId}`);

    if (newCommentData.isReply) {
      logger.info(`Adding reply to comment with ID: ${newCommentData.commentId}`);
      const replyData = {
        comment: newCommentData.replyComment,
        userId: newCommentData.userId,
      };

      const commentIndex = ideaCommentDocument.comments.findIndex((comment) =>
        comment._id.equals(newCommentData.commentId)
      );

      if (commentIndex !== -1) {
        const existingReplies = ideaCommentDocument.comments[commentIndex].replies;
        const updatedReplies = existingReplies.concat(replyData);
        ideaCommentDocument.comments[commentIndex].replies = updatedReplies;
        logger.info(`Reply added to comment with ID: ${newCommentData.commentId}`);
      } else {
        logger.warn(`Comment with ID: ${newCommentData.commentId} not found`);
      }
    } else {
      logger.info(`Adding new comment to idea with ID: ${ideaCommentDocument.ideaId}`);
      const newComment = {
        comment: newCommentData.comment,
        userId: newCommentData.userId,
        ideaId: newCommentData.ideaId,
        replies: [],
      };

      ideaCommentDocument.comments = ideaCommentDocument.comments.concat(newComment);
      logger.info(`New comment added to idea with ID: ${ideaCommentDocument.ideaId}`);
    }


    const updatedIdeaCommentDocument = await ideaCommentDocument.save();
    logger.info(`Successfully updated idea comments for idea with ID: ${ideaCommentDocument.ideaId}`);
    return updatedIdeaCommentDocument;
  } catch (err) {
    logger.error(`Error adding comment to existing idea comment: ${err.message}`);
    throw err;
  }
};
