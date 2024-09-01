import DemoDay from "../../models/demoDayModel.js";
import logger from "../../utils/logger.js";

// Create DemoDay
export const createDemoDay = async (demoDayData) => {
    logger.info("Creating Demo Day...");
    try {
        // Ensure only one DemoDay is marked as current
        if (demoDayData.isCurrent) {
            // Set all other DemoDays to not be current
            await DemoDay.updateMany({ isCurrent: true }, { isCurrent: false });
        }

        const demoDay = await DemoDay.create(demoDayData);

        logger.info(`Demo Day ${demoDay.number} for the year ${demoDay.year} is created and marked as current: ${demoDay.isCurrent}.`);
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
        return await DemoDay.find();
    } catch (err) {
        logger.error(`Error fetching Demo Days: ${err}`);
        throw err;
    }
};

// Read Single Demo Day by ID
export const getDemoDayById = async (id) => {
    logger.info(`Fetching Demo Day with id: ${id}`);
    try {
        const demoDay = await DemoDay.findById(id);

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

// Read Current Demo Day
export const getCurrentDemoDay = async () => {
    logger.info("Fetching the current Demo Day...");
    try {
        const currentDemoDay = await DemoDay.findOne({ isCurrent: true });

        if (!currentDemoDay) {
            logger.error("No current Demo Day found.");
            return null;
        }

        return currentDemoDay;
    } catch (err) {
        logger.error(`Error fetching current Demo Day: ${err.message}`);
        throw err;
    }
};

// Update Demo Day
export const updateDemoDay = async (id, demoDayData) => {
    logger.info(`Updating Demo Day with id: ${id}`);

    try {
        // If the updated data marks this Demo Day as current, ensure only one is current
        if (demoDayData.isCurrent) {
            await DemoDay.updateMany({ isCurrent: true }, { isCurrent: false });
        }

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
export const deleteDemoDay = async (id) => {
    logger.info(`Deleting Demo Day with id: ${id}`);
    try {
        const deletedDemoDay = await DemoDay.findByIdAndDelete(id);

        if (!deletedDemoDay) {
            logger.error(`Demo Day with id ${id} not found.`);
            return null;
        }

        logger.info(`Demo Day with id ${id} has been deleted.`);
        return deletedDemoDay;
    } catch (err) {
        logger.error(`Error deleting Demo Day: ${err}`);
        throw err;
    }
};
