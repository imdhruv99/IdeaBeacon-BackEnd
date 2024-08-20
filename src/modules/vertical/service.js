import IdeaVerticalCount from "../../models/ideaVerticalCountModel.js";
import Vertical from "../../models/ideaVerticalModel.js";
import logger from "../../utils/logger.js";

// Create Vertical
export const createVertical = async (verticalData) => {
  logger.info(`Creating vertical with title: ${verticalData.verticalName}`);
  try {
    return await Vertical.create(verticalData);
  } catch (err) {
    logger.error(`Error creating vertical: ${err}`);
    throw err;
  }
};

// Read All Verticals
export const getAllVerticals = async () => {
  logger.info("Fetching all verticals");
  try {
    return await Vertical.find().populate("verticalName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching verticals: ${err}`);
    throw err;
  }
};

// Read Single Vertical
export const getVerticalById = async (id) => {
  logger.info(`Fetching vertical with id: ${id}`);
  try {
    return await Vertical.findById(id).populate("verticalName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching vertical: ${err}`);
    throw err;
  }
};

// Update Vertical
export const updateVertical = async (id, ideaData) => {
  logger.info(`Updating vertical with id: ${id}`);
  try {
    return await Vertical.findByIdAndUpdate(id, ideaData, { new: true }).populate("verticalName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error updating Vertical: ${err}`);
    throw err;
  }
};

// Delete Vertical
export const deleteVertical = async (id) => {
  logger.info(`Deleting vertical with id: ${id}`);
  try {
    return await Vertical.findByIdAndDelete(id);
  } catch (err) {
    logger.error(`Error deleting vertical: ${err}`);
    throw err;
  }
};

// update vertical counter
export const updateVerticalCount = async (id) => {
  logger.info(`Updating vertical count with id: ${id}`);
  try {
    await IdeaVerticalCount.findOneAndUpdate(
      { vertical: id },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
  } catch (err) {
    logger.error(`Error updating vertical counter: ${err}`);
    throw err;
  }
}

// get vertical counter by id
export const getVerticalCount = async (id) => {
  logger.info(`Getting vertical count with id: ${id}`);
  try {
    const result = await IdeaVerticalCount.findOne({ vertical: id }).exec();
    if (result) {
      return result.count;
    } else {
      return 0;
    }
  } catch (err) {
    logger.error(`Error getting vertical count: ${err}`);
    throw err;
  }
};