import Idea from "../../models/ideaModel.js";
import logger from "../../utils/logger.js";
import { saveAuditLog } from "../auditLog/service.js";

// Create Idea
export const createIdea = async (ideaData) => {
  logger.info("Creating idea...");
  try {
    let idea = await Idea.create(ideaData);
    let logData = {
      eventName: "Idea Created",
      details: `Idea with name ${idea.title} is created`,
      ideaId: idea._id,
      createdBy: idea.createdBy,
      updatedBy: idea.updatedBy,
    };
    await saveAuditLog(logData);
    logger.info(`Idea with name ${idea.title} is created.`);
    return idea;
  } catch (err) {
    logger.error(`Error creating idea: ${err}`);
    throw err;
  }
};

// Read All Ideas
export const getAllIdeas = async () => {
  logger.info("Fetching all ideas");
  try {
    return await Idea.find().populate(
      "ideaCategoryId ideaStageId functionId subdivisionId createdBy updatedBy coauthors"
    );
  } catch (err) {
    logger.error(`Error fetching ideas: ${err}`);
    throw err;
  }
};

// Read Single Idea
export const getIdeaById = async (id) => {
  logger.info(`Fetching idea with id: ${id}`);
  try {
    return await Idea.findById(id).populate(
      "ideaCategoryId ideaStageId functionId subdivisionId createdBy updatedBy coauthors"
    );
  } catch (err) {
    logger.error(`Error fetching idea: ${err}`);
    throw err;
  }
};

// Update Idea
export const updateIdea = async (id, ideaData) => {
  logger.info(`Updating idea with id: ${id}`);
  try {
    return await Idea.findByIdAndUpdate(id, ideaData, { new: true }).populate(
      "ideaCategoryId ideaStageId functionId subdivisionId createdBy updatedBy coauthors"
    );
  } catch (err) {
    logger.error(`Error updating idea: ${err}`);
    throw err;
  }
};

// Delete Idea
export const deleteIdea = async (id) => {
  logger.info(`Deleting idea with id: ${id}`);
  try {
    return await Idea.findByIdAndDelete(id);
  } catch (err) {
    logger.error(`Error deleting idea: ${err}`);
    throw err;
  }
};

// Read Filtered Ideas
export const filteredIdeas = async (query) => {
  logger.info("Fetching filtered ideas");
  try {
    return await Idea.find(query);
  } catch (err) {
    logger.error(`Error fetching filtered ideas: ${err}`);
    throw err;
  }
};
