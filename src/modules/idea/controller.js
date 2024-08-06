import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as ideaService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid, findUserByName } from "../user/service.js";
import { updateCategoryCount } from "../category/service.js";
import { findByName } from "../stage/service.js";
import { getAuditLogByIdeaId } from "../auditLog/service.js";

// Create Idea
export const createIdeaController = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);
    const stage = await findByName("Idea");

    let subdivisionId = req.body.subdivisionId;
    if (!subdivisionId) {
      subdivisionId = null;
    }

    const newIdea = {
      ...req.body,
      subdivisionId: subdivisionId,
      ideaStageId: stage._id,
      createdBy: user._id,
      updatedBy: user._id,
    };
    const createdIdea = await ideaService.createIdea(newIdea);

    const updateCategoryCounter = await updateCategoryCount(req.body.ideaCategoryId);
    logger.info(`Category count is increased for category ${updateCategoryCounter}`);
    
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
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getAllIdeaSuccessMessage, data: ideas });
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
    if (!auditLog) {
      return res
      .status(HttpStatusCodes.NOT_FOUND.code)
      .json({ status: false, message: responseStrings.auditLogNotFoundErrorMessage });
    }

    let data = {
      ideaData: idea,
      ideaAuditLogData: auditLog
    }

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
    const { stageId, categoryId, authorName, functionId, subdivisionId, month, year } = req.body;

    // serching user by name
    const authorId = await findUserByName(authorName);

    let query = {};

    if (stageId) query.ideaStageId = stageId;
    if (categoryId) query.ideaCategoryId = categoryId;
    if (authorId) query.createdBy = authorId._id;
    if (functionId) query.functionId = functionId;
    if (subdivisionId) query.subdivisionId = subdivisionId;

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

    // Fetch data from the "ideas" collection
    const ideas = await ideaService.filteredIdeas(query);
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.filterIdeaSuccessMessage, data: ideas });
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
    const updatedIdea = await ideaService.updateIdeaStageAndCount(req.params.id, req.body.ideaStageId ,userId);
    if (!updatedIdea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.ideaNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.updateIdeaSuccessMessage, data: updatedIdea });
  } catch (error) {
    logger.error(`Error updating idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateIdeaErrorMessage });
  }
}