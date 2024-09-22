import Function from "../../models/functionModel.js";
import logger from "../../utils/logger.js";

// Create Function
export const createFunction = async (functionData) => {
  logger.info(`Creating function with title: ${functionData.functionName}`);
  try {
    return await Function.create(functionData);
  } catch (err) {
    logger.error(`Error creating function: ${err}`);
    throw err;
  }
};

// Read All Functions
export const getAllFunctions = async () => {
  logger.info("Fetching all functions");
  try {
    return await Function.find({ isActive: true }).populate("createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching functions: ${err}`);
    throw err;
  }
};

// Read Single Function
export const getFunctionById = async (id) => {
  logger.info(`Fetching function with id: ${id}`);
  try {
    return await Function.findOne({ _id: id, isActive: true }).populate("createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching function: ${err}`);
    throw err;
  }
};

// Update Function
export const updateFunction = async (id, functionData) => {
  logger.info(`Updating function with id: ${id}`);
  try {
    return await Function.findByIdAndUpdate(id, functionData, { new: true }).populate("createdBy updatedBy");
  } catch (err) {
    logger.error(`Error updating function: ${err}`);
    throw err;
  }
};

// Delete Function
export const deleteFunction = async (id, userId) => {
  logger.info(`Deleting function with id: ${id}`);
  try {
    const result = await Function.findByIdAndUpdate(
      id,
      {
        $set: {
          isActive: false,
          deletedBy: userId,
          deletedAT: new Date(),
        },
      },
      { new: true }
    );
    return result;
  } catch (err) {
    logger.error(`Error deleting function: ${err}`);
    throw err;
  }
};
