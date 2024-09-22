import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as demoDayService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create DemoDay
export const createDemoDayController = async (req, res) => {
  try {
    // Create new DemoDay
    const user = await findByOid(req.user.oid);

    const newDemoDay = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const createdDemoDay = await demoDayService.createDemoDay(newDemoDay);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createDemoDaySuccessMessage, data: createdDemoDay });
  } catch (error) {
    logger.error(`Error creating Demo Day: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createDemoDayErrorMessage });
  }
};

// Read All DemoDays
export const getAllDemoDaysController = async (req, res) => {
  try {
    const demoDays = await demoDayService.getAllDemoDays();

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getAllDemoDaySuccessMessage, data: demoDays });
  } catch (error) {
    logger.error(`Error fetching Demo Days: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllDemoDayErrorMessage });
  }
};

// Read Single DemoDay by ID
export const getDemoDayByIdController = async (req, res) => {
  try {
    const demoDay = await demoDayService.getDemoDayById(req.params.id);

    if (!demoDay) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.demoDayNotFoundErrorMessage });
    }

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getDemoDayByIdSuccessMessage, data: demoDay });
  } catch (error) {
    logger.error(`Error fetching Demo Day: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getDemoDayByIdErrorMessage });
  }
};

// Update DemoDay
export const updateDemoDayController = async (req, res) => {
  try {
    const updatedDemoDay = await demoDayService.updateDemoDay(req.params.id, req.body);

    if (!updatedDemoDay) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.demoDayNotFoundErrorMessage });
    }

    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.updateDemoDaySuccessMessage, data: updatedDemoDay });
  } catch (error) {
    logger.error(`Error updating Demo Day: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateDemoDayErrorMessage });
  }
};

// Delete DemoDay
export const deleteDemoDayController = async (req, res) => {
  try {
    const demoDayId = req.params.id;
    const userId = await findByOid(req.user.oid);

    const deletedDemoDay = await demoDayService.deleteDemoDay(demoDayId, userId);
    if (!deletedDemoDay) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.demoDayNotFoundErrorMessage });
    }

    res
      .status(HttpStatusCodes.NO_CONTENT.code)
      .json({ status: true, message: responseStrings.deleteDemoDaySuccessMessage });
  } catch (error) {
    logger.error(`Error deleting Demo Day: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteDemoDayErrorMessage });
  }
};
