import Subdivision from "../../models/subdivisionModel.js";
import logger from "../../utils/logger.js";

// Create Subdivision
export const createSubdivision = async (SubdivisionData) => {
  logger.info(`Creating Subdivision with title: ${SubdivisionData.subdivisionName}`);
  try {
    return await Subdivision.create(SubdivisionData);
  } catch (err) {
    logger.error(`Error creating Subdivision Subdivision: ${err}`);
    throw err;
  }
};

// Read All Subdivisions
export const getAllSubdivisions = async () => {
  logger.info("Fetching all Subdivisions");
  try {
    return await Subdivision.find().populate("subdivisionName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching Subdivisions: ${err}`);
    throw err;
  }
};

// Read Single Subdivision
export const getSubdivisionById = async (id) => {
  logger.info(`Fetching Subdivision with id: ${id}`);
  try {
    return await Subdivision.findById(id).populate("subdivisionName createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching Subdivision: ${err}`);
    throw err;
  }
};

// Update Subdivision
export const updateSubdivision = async (id, SubdivisionData) => {
  logger.info(`Updating Subdivision with id: ${id}`);
  try {
    return await Subdivision.findByIdAndUpdate(id, SubdivisionData, { new: true }).populate(
      "subdivisionName createdBy updatedBy"
    );
  } catch (err) {
    logger.error(`Error updating Subdivision: ${err}`);
    throw err;
  }
};

// Delete Subdivision
export const deleteSubdivision = async (id) => {
  logger.info(`Deleting Subdivision with id: ${id}`);
  try {
    return await Subdivision.findByIdAndDelete(id);
  } catch (err) {
    logger.error(`Error deleting Subdivision: ${err}`);
    throw err;
  }
};
