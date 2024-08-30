import Like from "../../models/likeModel.js";
import logger from "../../utils/logger.js";

export const existingIdea = async (ideaId) => {
  try {
    let idea = await Like.findOne({ ideaId });

    if (idea) {
      logger.info(`Found existing ${ideaId} idea in likes schema.`);

      return idea;
    } else {
      logger.info(`Not found ${ideaId} idea in likes schema.`);
      logger.info(`Creating ${ideaId} idea for for likes schema.`);

      idea = new Like({
        ideaId,
        userIds: [],
      });
      await idea.save();
      return idea;
    }
  } catch (err) {
    logger.error(`Error fetching idea in likes: ${err.message}`);
    throw err;
  }
};

export const existingLike = async (ideaId, userId) => {
  try {
    let idea = await Like.findOne({ ideaId });

    if (idea && idea.userIds.includes(userId)) {
      logger.info(`Found existing like for ${ideaId} idea for ${userId} user.`);
      return userId;
    } else {
      logger.info(`Not found like for ${userId} user for ${ideaId} idea.`);
      return false;
    }
  } catch (err) {
    logger.error(`Error fetching user for idea in likes: ${err.message}`);
    throw err;
  }
};

export const likeIdea = async (idea, userId) => {
  try {
    const ideaId = idea.ideaId;
    if (!idea.userIds.includes(userId)) {
      logger.info(`Adding like to existing idea ${ideaId} for ${userId} user.`);

      idea.userIds.push(userId);
      await idea.save();
    }

    return idea;
  } catch (err) {
    logger.error(`Error like idea: ${err.message}`);
    throw err;
  }
};

export const unlikeIdea = async (idea, userId) => {
  try {
    const ideaId = idea.ideaId;

    idea.userIds = idea.userIds.filter((id) => id.toString() !== userId);

    logger.info(`Removing like to existing idea ${ideaId} for ${userId} user.`);
    if (idea.userIds.length === 0) {
      logger.info(`Deleting ${idea.ideaId._id} idea as there is no likes.`);
      await Like.deleteOne({ ideaId });
    } else {
      await idea.save(idea);
    }

    return idea;
  } catch (err) {
    logger.error(`Error unlike idea: ${err.message}`);
    throw err;
  }
};

export const getLikeCount = async (ideaId) => {
  try {
    let idea = await Like.findOne({ ideaId });
    if (idea) {
      return idea.userIds.length;
    } else {
      return 0;
    }
  } catch (err) {
    logger.error(`Error unlike idea: ${err.message}`);
    throw err;
  }
};
