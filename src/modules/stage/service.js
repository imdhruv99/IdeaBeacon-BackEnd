import Stage from "../../models/ideaStageModel.js";
import IdeaStageCount from "../../models/ideaStagesCountModels.js";
import logger from "../../utils/logger.js";

// Create Stage
export const createStage = async (stageData) => {
  logger.info(`Creating stage with title: ${stageData.stageName}`);
  try {
    return await Stage.create(stageData);
  } catch (err) {
    logger.error(`Error creating stage stage: ${err}`);
    throw err;
  }
};

// Read All Stages
export const getAllStages = async () => {
  logger.info("Fetching all stages");
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
export const updateStage = async (id, stageData) => {
  logger.info(`Updating stage with id: ${id}`);
  try {
    return await Stage.findByIdAndUpdate(id, stageData, { new: true }).populate("stageName createdBy updatedBy");
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
    logger.error(`Error deleting stage: ${err}`);
    throw err;
  }
};

// Find Stage By Name
export const findByName = async (name) => {
  logger.info(`Fetching record for user ${name}`);
  try {
    return await Stage.findOne({ stageName: name });
  } catch (err) {
    logger.error(`Error fetching record for user ${oid}: ${err}`);
    throw err;
  }
};

// get stage counter by id
export const getStageCount = async (id) => {
  logger.info(`Getting stage count with id: ${id}`);
  try {
    const result = await IdeaStageCount.findOne({ stage: id }).exec();
    if (result) {
      return result.count;
    } else {
      return 0;
    }
  } catch (err) {
    logger.error(`Error getting stage count: ${err}`);
    throw err;
  }
};