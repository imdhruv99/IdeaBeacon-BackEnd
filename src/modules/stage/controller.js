import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as stageService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Stage
export const createStage = async (req, res) => {
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
    logger.error(`Error creating stage stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createStageErrorMessage });
  }
};

// Read All Stages
export const getAllStages = async (req, res) => {
  try {
    const stages = await stageService.getAllStages();
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: stages });
  } catch (error) {
    logger.error(`Error fetching stages: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createstageErrorMessage });
  }
};

// Read Single Stage
export const getStageById = async (req, res) => {
  try {
    const stage = await stageService.getStageById(req.params.id);
    if (!stage) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "stage not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: stage });
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
    const updatedStage = await stageService.updateStage(req.params.id, req.body);
    if (!updatedStage) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "stage not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: updatedStage });
  } catch (error) {
    logger.error(`Error updating stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateStageByIDError });
  }
};

// Delete Stage
export const deleteStage = async (req, res) => {
  try {
    const deletedStage = await stageService.deleteStage(req.params.id);
    if (!deletedStage) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Stage not found" });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: "Stage deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteStageError });
  }
};
