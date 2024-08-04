import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as ideaService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Idea
export const createIdea = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);

    const newIdea = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };
    const createdIdea = await ideaService.createIdea(newIdea);
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
export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await ideaService.getAllIdeas();
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: ideas });
  } catch (error) {
    logger.error(`Error fetching ideas: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};

// Read Single Idea
export const getIdeaById = async (req, res) => {
  try {
    const idea = await ideaService.getIdeaById(req.params.id);
    if (!idea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Idea not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: idea });
  } catch (error) {
    logger.error(`Error fetching idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};

// Update Idea
export const updateIdea = async (req, res) => {
  try {
    const updatedIdea = await ideaService.updateIdea(req.params.id, req.body);
    if (!updatedIdea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Idea not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: updatedIdea });
  } catch (error) {
    logger.error(`Error updating idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};

// Delete Idea
export const deleteIdea = async (req, res) => {
  try {
    const deletedIdea = await ideaService.deleteIdea(req.params.id);
    if (!deletedIdea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Idea not found" });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: "Idea deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};

// Read Filtered Ideas
export const filterIdeas = async (req, res) => {
  try {
    const { stageId, categoryId, authorId, functionId, subdivisionId, month, year } = req.body;

    let query = {};

    if (stageId) query.ideaStageId = stageId;
    if (categoryId) query.ideaCategoryId = categoryId;
    if (authorId) query.createdBy = authorId;
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
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: ideas });
  } catch (error) {
    logger.error(`Error deleting idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};
