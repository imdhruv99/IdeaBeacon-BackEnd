import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as stageService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Stage
export const createIdeaStage = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);

    const newStageStage = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const createdStage = await stageService.createStage(newStageStage);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createStageSuccessMessage, data: createdStage });
  } catch (error) {
    logger.error(`Error creating idea stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createStageErrorMessage });
  }
};

// Read All Stage
export const getAllStages = async (req, res) => {
  try {
    const ideas = await stageService.getAllStages();
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: ideas });
  } catch (error) {
    logger.error(`Error fetching stages: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createIdeaErrorMessage });
  }
};

// Read Single Idea
export const getStageById = async (req, res) => {
  try {
    const idea = await stageService.getStageById(req.params.id);
    if (!idea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Idea not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: idea });
  } catch (error) {
    logger.error(`Error fetching stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.findStageByIDError });
  }
};

// Update Stage
export const updateStage = async (req, res) => {
  try {
    const updatedIdea = await stageService.updateStage(req.params.id, req.body);
    if (!updatedIdea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Idea not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: updatedIdea });
  } catch (error) {
    logger.error(`Error updating idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateStageByIDError });
  }
};

// Delete Stage
export const deleteStage = async (req, res) => {
  try {
    const deletedIdea = await stageService.deleteStage(req.params.id);
    if (!deletedIdea) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Stage not found" });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: "Stage deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting idea: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteStageError });
  }
};
