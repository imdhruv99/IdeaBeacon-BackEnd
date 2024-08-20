import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as verticalService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Vertical
export const createVerticalController = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);

    const newVertical = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const createdVertical = await verticalService.createVertical(newVertical);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createVerticalSuccessMessage, data: createdVertical });
  } catch (error) {
    logger.error(`Error creating vertical Vertical: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createVerticalErrorMessage });
  }
};

// Read All Verticals
export const getAllVerticalsController = async (req, res) => {
  try {
    const verticals = await verticalService.getAllVerticals();
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getAllVerticalSuccessMessage, data: verticals });
  } catch (error) {
    logger.error(`Error fetching Verticals: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllVerticalErrorMessage });
  }
};

// Read Single Vertical
export const getVerticalByIdController = async (req, res) => {
  try {
    const vertical = await verticalService.getVerticalById(req.params.id);
    if (!vertical) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.verticalNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getVerticalByIdSuccessMessage, data: vertical });
  } catch (error) {
    logger.error(`Error fetching Vertical: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getVerticalByIdErrorMessage });
  }
};

// Update Vertical
export const updateVerticalController = async (req, res) => {
  try {
    const updatedVertical = await verticalService.updateVertical(req.params.id, req.body);
    if (!updatedVertical) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.verticalNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.updateVerticalSuccessMessage, data: updatedVertical });
  } catch (error) {
    logger.error(`Error updating vertical: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateVerticalErrorMessage });
  }
};

// Delete Vertical
export const deleteVerticalController = async (req, res) => {
  try {
    const deletedVertical = await verticalService.deleteVertical(req.params.id);
    if (!deletedVertical) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.verticalNotFoundErrorMessage });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: responseStrings.deleteVerticalSuccessMessage });
  } catch (error) {
    logger.error(`Error deleting vertical: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteVerticalErrorMessage });
  }
};

// Get Vertical Count
export const getVerticalCountController = async (req, res) => {
  try {
    const getVerticalCount = await verticalService.getVerticalCount(req.params.id);
    if (!getVerticalCount) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: responseStrings.getVerticalCountErrorMessage });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getVerticalCountSuccessMessage, data: getVerticalCount });
  } catch (error) {
    logger.error(`Error getting vertical counter: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getVerticalCountErrorMessage });
  }
}