import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as stageService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Stage
export const createStageController = async (req, res) => {
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
export const getAllStagesController = async (req, res) => {
  try {
    const stages = await stageService.getAllStages();
    const updatedStages = await Promise.all(
      stages.map(async (stage) => {
        logger.info(`Fetching count for stage with id: ${stage._id}`)
        const count = await stageService.getStageCount(stage._id);
        const stageObj = stage.toObject ? stage.toObject() : stage;
        return {
          ...stageObj,
          count
        };
      })
    );
    res.status(HttpStatusCodes.OK.code).json({
      status: true,
      message: responseStrings.getAllStageSuccessMessage,
      data: updatedStages
    });
  } catch (error) {
    logger.error(`Error fetching stages: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({
        status: false,
        message: responseStrings.getAllStageErrorMessage
      });
  }
};


// Read Single Stage
export const getStageByIdController = async (req, res) => {
  try {
    const stage = await stageService.getStageById(req.params.id);
    if (!stage) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.stageNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getStageByIdSuccessMessage, data: stage });
  } catch (error) {
    logger.error(`Error fetching stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getStageByIdErrorMessage });
  }
};

// Update Stage
export const updateStageController = async (req, res) => {
  try {
    const updatedStage = await stageService.updateStage(req.params.id, req.body);
    if (!updatedStage) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.stageNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.updateStageSuccessMessage, data: updatedStage });
  } catch (error) {
    logger.error(`Error updating stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateStageErrorMessage });
  }
};

// Delete Stage
export const deleteStageController = async (req, res) => {
  try {
    const deletedStage = await stageService.deleteStage(req.params.id);
    if (!deletedStage) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.stageNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: responseStrings.deleteStageSuccessMessage });
  } catch (error) {
    logger.error(`Error deleting stage: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteStageErrorMessage });
  }
};