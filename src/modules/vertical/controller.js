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
    const updatedVerticals = await Promise.all(
      verticals.map(async (vertical) => {
        logger.info(`Fetching count for vertical with id: ${vertical._id}`)
        const count = await verticalService.getVerticalCount(vertical._id);
        const verticalObj = vertical.toObject ? vertical.toObject() : vertical;
        return {
          ...verticalObj,
          count
        };
      })
    );
    res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getAllVerticalSuccessMessage, data: updatedVerticals });
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