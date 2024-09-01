import Idea from "../../models/ideaModel.js";
import IdeaStageCount from "../../models/ideaStagesCountModels.js";
import logger from "../../utils/logger.js";
import { saveAuditLog } from "../auditLog/service.js";
import { createTags } from "../tags/service.js";

// Create Idea
export const createIdea = async (ideaData) => {
  logger.info("Creating idea...");
  try {
    const tagIds = await createTags(ideaData.tags || []);
    ideaData.tags = tagIds;

    let idea = await Idea.create(ideaData);
    let logData = {
      eventName: "Idea Created",
      details: `Idea with name ${idea.title} is created`,
      ideaId: idea._id,
      createdBy: idea.createdBy,
      updatedBy: idea.updatedBy,
    };
    await saveAuditLog(logData);

    await IdeaStageCount.findOneAndUpdate(
      { stage: idea.ideaStageId._id },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

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
    return await Idea.find({ isActive: true }).populate(
      "ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId"
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
    const idea = await Idea.findOne({ _id: id, isActive: true }).populate(
      "ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId"
    );

    if (!idea) {
      logger.error(`Idea with id ${id} not found or is deleted.`);
      return null;
    }
    return idea;
  } catch (err) {
    logger.error(`Error fetching idea: ${err.message}`);
    throw err;
  }
};

// Update Idea
export const updateIdea = async (id, ideaData, userId) => {
  logger.info(`Updating idea with id: ${id}`);

  try {
    const tagIds = await createTags(ideaData.tags || []);
    ideaData.tags = tagIds;

    // Fetch the current idea to get existing details
    const existingIdea = await Idea.findOne({ _id: id, isActive: true }).populate(
      "ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId"
    );

    if (!existingIdea) {
      throw new Error(`Idea with id ${id} not found.`);
    }

    const updatedIdea = await Idea.findByIdAndUpdate(id, { ...ideaData, updatedBy: userId }, { new: true }).populate(
      "ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId"
    );

    const logData = {
      eventName: "Idea Updated",
      details: `Idea with name ${updatedIdea.title} has been updated.`,
      ideaId: updatedIdea._id,
      createdBy: updatedIdea.createdBy,
      updatedBy: updatedIdea.updatedBy,
    };

    await saveAuditLog(logData);

    logger.info(`Idea with name ${updatedIdea.title} has been updated.`);
    return updatedIdea;
  } catch (err) {
    logger.error(`Error updating idea: ${err.message}`);
    throw err;
  }
};

// Delete Idea
export const softDeleteIdea = async (id, userId) => {
  logger.info(`Soft deleting idea with id: ${id}`);
  try {
    const result = await Idea.findByIdAndUpdate(
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
    logger.error(`Error soft deleting idea: ${err}`);
    throw err;
  }
};

// Read Filtered Ideas
export const filteredIdeas = async (query) => {
  logger.info("Fetching filtered ideas");
  try {
    return await Idea.find(query).populate(
      "ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId"
    );
  } catch (err) {
    logger.error(`Error fetching filtered ideas: ${err}`);
    throw err;
  }
};

// update idea stage and count
export const updateIdeaStageAndCount = async (id, ideaStageId, userId) => {
  try {
    // Fetch the current idea to get existing details
    const existingIdea = await Idea.findOne({ _id: id, isActive: true }).populate(
      "ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId"
    );

    if (!existingIdea) {
      throw new Error(`Idea with id ${id} not found.`);
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      { ideaStageId: ideaStageId, updatedBy: userId },
      { new: true }
    ).populate("ideaVerticalId ideaStageId functionId createdBy updatedBy coauthors tags demoDayId");

    const logData = {
      eventName: "Idea Moved",
      details: `Idea with name ${updatedIdea.title} has been moved from ${existingIdea.ideaStageId.stageName} to ${updatedIdea.ideaStageId.stageName} Stage.`,
      ideaId: updatedIdea._id,
      createdBy: updatedIdea.createdBy,
      updatedBy: updatedIdea.updatedBy,
    };

    await saveAuditLog(logData);

    await Promise.all([
      IdeaStageCount.findOneAndUpdate(
        { stage: existingIdea.ideaStageId._id },
        { $inc: { count: -1 } },
        { new: true, upsert: true }
      ),
      IdeaStageCount.findOneAndUpdate({ stage: ideaStageId }, { $inc: { count: 1 } }, { new: true, upsert: true }),
    ]);

    logger.info(`Idea with name ${updatedIdea.title} has been updated.`);
    return updatedIdea;
  } catch (err) {
    logger.error(`Error updating idea: ${err.message}`);
    throw err;
  }
};
