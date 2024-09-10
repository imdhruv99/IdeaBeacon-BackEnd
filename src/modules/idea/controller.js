import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as ideaService from "./service.js";
import * as likeService from "../like/service.js";
import logger from "../../utils/logger.js";
import { findByOid, findUserByID } from "../user/service.js";
import { updateVerticalCount } from "../vertical/service.js";
import { findByName } from "../stage/service.js";
import { getAuditLogByIdeaId } from "../auditLog/service.js";
import { getCommentCount } from "../comment/service.js";

// Create Idea
export const createIdeaController = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);
    const stage = await findByName("Submitted");

    const newIdea = {
      ...req.body,
      ideaStageId: stage._id,
      createdBy: user._id,
      updatedBy: user._id,
    };
    const createdIdea = await ideaService.createIdea(newIdea);

    const updateVerticalCounter = await updateVerticalCount(req.body.ideaVerticalId);
    logger.info(`Vertical count is increased for vertical ${updateVerticalCounter}`);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createIdeaSuccessMessage, data: createdIdea });
  } catch (error) {
    logger.error(`Error creating idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};

// Read All Ideas
export const getAllIdeasController = async (req, res) => {
  try {
    const ideas = await ideaService.getAllIdeas();

    const updatedIdeas = await Promise.all(
      ideas.map(async (idea) => {
        logger.info(`Fetching like count for idea with id: ${idea._id}`);

        const likeCount = await likeService.getLikeCount(idea._id);
        const commentCount = await getCommentCount(idea._id);
        const ideaObj = idea.toObject ? idea.toObject() : idea;

        return {
          ...ideaObj,
          likeCount,
          commentCount,
        };
      })
    );

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getAllIdeaSuccessMessage, data: updatedIdeas });
  } catch (error) {
    logger.error(`Error fetching ideas: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllIdeaErrorMessage });
  }
};

// Read Single Idea
export const getIdeaByIdController = async (req, res) => {
  try {
    const idea = await ideaService.getIdeaById(req.params.id);

    if (!idea) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.ideaNotFoundErrorMessage });
    }
    const auditLog = await getAuditLogByIdeaId(req.params.id);

    const isLiked = await likeService.existingLike(idea._id, req.params.userId);
    if (!auditLog) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.auditLogNotFoundErrorMessage });
    }

    const ideaObj = idea.toObject ? idea.toObject() : stage;

    let data = {
      ideaData: { ...ideaObj, isLiked: isLiked ? true : false },
      ideaAuditLogData: auditLog,
    };

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getIdeaByIdSuccessMessage, data: data });
  } catch (error) {
    logger.error(`Error fetching idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getIdeaByIdErrorMessage });
  }
};

// Update Idea
export const updateIdeaController = async (req, res) => {
  try {
    const userId = await findByOid(req.user.oid);
    const updatedIdea = await ideaService.updateIdea(req.params.id, req.body, userId);
    if (!updatedIdea) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.ideaNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.updateIdeaSuccessMessage, data: updatedIdea });
  } catch (error) {
    logger.error(`Error updating idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateIdeaErrorMessage });
  }
};

// Delete Idea
export const deleteIdeaController = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const userId = await findByOid(req.user.oid);

    const updatedIdea = await ideaService.softDeleteIdea(ideaId, userId);
    if (!updatedIdea) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.ideaNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.NO_CONTENT.code)
      .json({ status: true, message: responseStrings.deleteIdeaSuccessMessage });
  } catch (error) {
    logger.error(`Error deleting idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteIdeaErrorMessage });
  }
};

// Read Filtered Ideas
export const filterIdeasController = async (req, res) => {
  try {
    const { stageId, verticalId, authorId, functionId, month, year } = req.body;
    let author = undefined;
    // searching user by name
    if (authorId !== "") {
      author = await findUserByID(authorId);
    }

    let query = {};

    if (stageId) query.ideaStageId = stageId;
    if (verticalId) query.ideaVerticalId = verticalId;
    if (authorId) query.createdBy = author._id;
    if (functionId) query.functionId = functionId;

    if (month || year) {
      query = {
        ...query,
        $expr: {
          $and: [
            month && { $eq: [{ $month: "$createdAt" }, month] },
            year && { $eq: [{ $year: "$createdAt" }, year] },
          ].filter(Boolean),
        },
      };
    }
    query.isActive = true;

    // Fetch data from the "ideas" collection
    const ideas = await ideaService.filteredIdeas(query);

    const updatedIdeas = await Promise.all(
      ideas.map(async (idea) => {
        logger.info(`Fetching like count for idea with id: ${idea._id}`);

        const likeCount = await likeService.getLikeCount(idea._id);
        const commentCount = await getCommentCount(idea._id);
        const ideaObj = idea.toObject ? idea.toObject() : idea;

        return {
          ...ideaObj,
          likeCount,
          commentCount,
        };
      })
    );

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.filterIdeaSuccessMessage, data: updatedIdeas });
  } catch (error) {
    logger.error(`Error fetching ideas: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.filterIdeaErrorMessage });
  }
};

// update idea stage and count controller
export const updateIdeaStageAndCountController = async (req, res) => {
  try {
    const userId = await findByOid(req.user.oid);
    const updatedIdea = await ideaService.updateIdeaStageAndCount(req.params.id, req.body.ideaStageId, userId);
    if (!updatedIdea) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.ideaNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.updateIdeaSuccessMessage, data: updatedIdea });
  } catch (error) {
    logger.error(`Error updating idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateIdeaErrorMessage });
  }
};
