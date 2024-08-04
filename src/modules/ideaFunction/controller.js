import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as functionService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Function
export const createFunction = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);

    const newFunctionFunction = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const createdFunction = await functionService.createFunction(newFunctionFunction);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createFunctionSuccessMessage, data: createdFunction });
  } catch (error) {
    logger.error(`Error creating function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createFunctionErrorMessage });
  }
};

// Read All Functions
export const getAllFunctions = async (req, res) => {
  try {
    const Functions = await functionService.getAllFunctions();
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: Functions });
  } catch (error) {
    logger.error(`Error fetching functions: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createFunctionErrorMessage });
  }
};

// Read Single Function
export const getFunctionById = async (req, res) => {
  try {
    const Function = await functionService.getFunctionById(req.params.id);
    if (!Function) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Function not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: Function });
  } catch (error) {
    logger.error(`Error fetching function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.findFunctionByIDError });
  }
};

// Update Function
export const updateFunction = async (req, res) => {
  try {
    const updatedFunction = await functionService.updateFunction(req.params.id, req.body);
    if (!updatedFunction) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Function not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: updatedFunction });
  } catch (error) {
    logger.error(`Error updating function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateFunctionByIDError });
  }
};

// Delete Function
export const deleteFunction = async (req, res) => {
  try {
    const deletedFunction = await functionService.deleteFunction(req.params.id);
    if (!deletedFunction) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Function not found" });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: "Function deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteFunctionError });
  }
};
