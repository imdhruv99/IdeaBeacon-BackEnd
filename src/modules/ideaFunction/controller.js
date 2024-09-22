import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as functionService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Function
export const createFunctionController = async (req, res) => {
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
export const getAllFunctionsController = async (req, res) => {
  try {
    const Functions = await functionService.getAllFunctions();
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getAllFunctionSuccessMessage, data: Functions });
  } catch (error) {
    logger.error(`Error fetching functions: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllFunctionErrorMessage });
  }
};

// Read Single Function
export const getFunctionByIdController = async (req, res) => {
  try {
    const Function = await functionService.getFunctionById(req.params.id);
    if (!Function) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.functionNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getFunctionByIdSuccessMessage, data: Function });
  } catch (error) {
    logger.error(`Error fetching function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getFunctionByIdErrorMessage });
  }
};

// Update Function
export const updateFunctionController = async (req, res) => {
  try {
    const updatedFunction = await functionService.updateFunction(req.params.id, req.body);
    if (!updatedFunction) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.functionNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.updateFunctionSuccessMessage, data: updatedFunction });
  } catch (error) {
    logger.error(`Error updating function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateFunctionErrorMessage });
  }
};

// Delete Function
export const deleteFunctionController = async (req, res) => {
  try {
    const functionId = req.params.id;
    const userId = await findByOid(req.user.oid);
    const deletedFunction = await functionService.deleteFunction(functionId, userId);
    if (!deletedFunction) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.functionNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.NO_CONTENT.code)
      .json({ status: true, message: responseStrings.deleteFunctionSuccessMessage });
  } catch (error) {
    logger.error(`Error deleting function: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteFunctionErrorMessage });
  }
};
