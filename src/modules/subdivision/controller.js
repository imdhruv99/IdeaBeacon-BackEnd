import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as subdivisionService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Subdivision
export const createSubdivisionController = async (req, res) => {
  try {
    const user = await findByOid(req.user.oid);

    const newSubdivision = {
      ...req.body,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const createdSubdivision = await subdivisionService.createSubdivision(newSubdivision);

    res
      .status(HttpStatusCodes.CREATED.code)
      .json({ status: true, message: responseStrings.createSubdivisionSuccessMessage, data: createdSubdivision });
  } catch (error) {
    logger.error(`Error creating subdivision Subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createSubdivisionErrorMessage });
  }
};

// Read All Subdivisions
export const getAllSubdivisionsController = async (req, res) => {
  try {
    const subdivisions = await subdivisionService.getAllSubdivisions();
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getAllSubdivisionSuccessMessage, data: subdivisions });
  } catch (error) {
    logger.error(`Error fetching subdivisions: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllSubdivisionErrorMessage });
  }
};

// Read Single Subdivision
export const getSubdivisionByIdController = async (req, res) => {
  try {
    const subdivision = await subdivisionService.getSubdivisionById(req.params.id);
    if (!subdivision) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.subdivisionNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getSubdivisionByIdSuccessMessage, data: subdivision });
  } catch (error) {
    logger.error(`Error fetching subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getSubdivisionByIdErrorMessage });
  }
};

// Update Subdivision
export const updateSubdivisionController = async (req, res) => {
  try {
    const updatedSubdivision = await subdivisionService.updateSubdivision(req.params.id, req.body);
    if (!updatedSubdivision) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.subdivisionNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.updateSubdivisionSuccessMessage, data: updatedSubdivision });
  } catch (error) {
    logger.error(`Error updating subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateSubdivisionErrorMessage });
  }
};

// Delete Subdivision
export const deleteSubdivisionController = async (req, res) => {
  try {
    const deletedSubdivision = await subdivisionService.deleteSubdivision(req.params.id);
    if (!deletedSubdivision) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json({ status: false, message: responseStrings.subdivisionNotFoundErrorMessage });
    }
    res
      .status(HttpStatusCodes.NO_CONTENT.code)
      .json({ status: true, message: responseStrings.deleteSubdivisionSuccessMessage });
  } catch (error) {
    logger.error(`Error deleting subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteSubdivisionErrorMessage });
  }
};

// get subdivision by function id
export const getSubdivisionByFunctionIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const subdivision = await subdivisionService.getSubdivisionByFunctionId(id);
    if (!subdivision) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({
        status: false,
        message: responseStrings.subdivisionNotFoundErrorMessage,
      });
    }
    res.status(HttpStatusCodes.OK.code).json({
      status: true,
      message: responseStrings.getSubdivisionByFunctionIdSuccessMessage,
      data: subdivision,
    });
  } catch (error) {
    logger.error(`Error fetching subdivision by functionId: ${error.message}`);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code).json({
      status: false,
      message: responseStrings.getSubdivisionByFunctionIdErrorMessage,
    });
  }
};
