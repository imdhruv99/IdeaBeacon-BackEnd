import Stage from "../../models/ideaStageModel.js";
import logger from "../../utils/logger.js";

// Create Idea
export const createStage = async (stageData) => {
  logger.info(`Creating idea with title: ${stageData.stageName}`);
  try {
    return await Stage.create(stageData);
  } catch (err) {
    logger.error(`Error creating idea stage: ${err}`);
    throw err;
  }
};

// Read All Ideas
export const getAllStages = async () => {
  logger.info("Fetching all ideas");
  try {
    return await Stage.find().populate("stageName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching stages: ${err}`);
    throw err;
  }
};

// Read Single Stage
export const getStageById = async (id) => {
  logger.info(`Fetching stage with id: ${id}`);
  try {
    return await Stage.findById(id).populate("stageName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching stage: ${err}`);
    throw err;
  }
};

// Update Stage
export const updateStage = async (id, ideaData) => {
  logger.info(`Updating idea with id: ${id}`);
  try {
    return await Stage.findByIdAndUpdate(id, ideaData, { new: true }).populate("stageName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error updating Stage: ${err}`);
    throw err;
  }
};

// Delete Stage
export const deleteStage = async (id) => {
  logger.info(`Deleting stage with id: ${id}`);
  try {
    return await Stage.findByIdAndDelete(id);
  } catch (err) {
    logger.error(`Error deleting idea: ${err}`);
    throw err;
  }
};
