import DemoDay from "../../models/demoDayModel.js";
import logger from "../../utils/logger.js";

// Create DemoDay
export const createDemoDay = async (demoDayData) => {
  logger.info("Creating Demo Day...");
  try {
    const demoDay = await DemoDay.create(demoDayData);

    logger.info(`Demo Day ${demoDay.number} for the year ${demoDay.year} is created.`);
    return demoDay;
  } catch (err) {
    logger.error(`Error creating Demo Day: ${err}`);
    throw err;
  }
};

// Read All Demo Days
export const getAllDemoDays = async () => {
  logger.info("Fetching all Demo Days...");
  try {
    return await DemoDay.find({ isActive: true }).populate("createdBy updatedBy");
  } catch (err) {
    logger.error(`Error fetching Demo Days: ${err}`);
    throw err;
  }
};

// Read Single Demo Day by ID
export const getDemoDayById = async (id) => {
  logger.info(`Fetching Demo Day with id: ${id}`);
  try {
    const demoDay = await DemoDay.findOne({ _id: id, isActive: true }).populate("createdBy updatedBy");

    if (!demoDay) {
      logger.error(`Demo Day with id ${id} not found.`);
      return null;
    }

    return demoDay;
  } catch (err) {
    logger.error(`Error fetching Demo Day: ${err.message}`);
    throw err;
  }
};

// Update Demo Day
export const updateDemoDay = async (id, demoDayData) => {
  logger.info(`Updating Demo Day with id: ${id}`);

  try {
    const updatedDemoDay = await DemoDay.findByIdAndUpdate(id, demoDayData, { new: true });

    if (!updatedDemoDay) {
      throw new Error(`Demo Day with id ${id} not found.`);
    }

    logger.info(`Demo Day with id ${id} has been updated.`);
    return updatedDemoDay;
  } catch (err) {
    logger.error(`Error updating Demo Day: ${err.message}`);
    throw err;
  }
};

// Delete Demo Day
export const deleteDemoDay = async (id, userId) => {
  logger.info(`Deleting Demo Day with id: ${id}`);
  try {
    const deletedDemoDay = await DemoDay.findByIdAndUpdate(
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
    logger.info(`Demo Day with id ${id} has been deleted.`);
    return deletedDemoDay;
  } catch (err) {
    logger.error(`Error deleting Demo Day: ${err}`);
    throw err;
  }
};
