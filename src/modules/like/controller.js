import * as likeService from "./service.js";
import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";

export const likeUnlikeIdeaController = async (req, res) => {
  try {
    const { ideaId, userId } = req.body;

    const existingIdea = await likeService.existingIdea(ideaId);
    const existingUserId = await likeService.existingLike(ideaId, userId);

    if (existingIdea && existingUserId) {
      const like = await likeService.unlikeIdea(existingIdea, existingUserId);

      res
        .status(HttpStatusCodes.OK.code)
        .json({ status: true, message: responseStrings.unlikeIdeaSuccessMessage, data: like });
    } else {
      const like = await likeService.likeIdea(existingIdea, userId);

      res
        .status(HttpStatusCodes.OK.code)
        .json({ status: true, message: responseStrings.likeIdeaSuccessMessage, data: like });
    }
  } catch (error) {
    logger.error(`Error like/unlike idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.likeIdeaErrorMessage });
  }
};
