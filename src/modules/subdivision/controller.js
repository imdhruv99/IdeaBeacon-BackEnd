import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import * as subdivisionService from "./service.js";
import logger from "../../utils/logger.js";
import { findByOid } from "../user/service.js";

// Create Subdivision
export const createSubdivision = async (req, res) => {
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
export const getAllSubdivisions = async (req, res) => {
  try {
    const subdivisions = await subdivisionService.getAllSubdivisions();
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: subdivisions });
  } catch (error) {
    logger.error(`Error fetching subdivisions: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.findSubdivisionByIDError });
  }
};

// Read Single Subdivision
export const getSubdivisionById = async (req, res) => {
  try {
    const subdivision = await subdivisionService.getSubdivisionById(req.params.id);
    if (!subdivision) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Subdivision not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: subdivision });
  } catch (error) {
    logger.error(`Error fetching subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.findAllSubdivisionError });
  }
};

// Update Subdivision
export const updateSubdivision = async (req, res) => {
  try {
    const updatedSubdivision = await subdivisionService.updateSubdivision(req.params.id, req.body);
    if (!updatedSubdivision) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Subdivision not found" });
    }
    res.status(HttpStatusCodes.OK.code).json({ status: true, data: updatedSubdivision });
  } catch (error) {
    logger.error(`Error updating subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.updateSubdivisionByIDError });
  }
};

// Delete Subdivision
export const deleteSubdivision = async (req, res) => {
  try {
    const deletedSubdivision = await subdivisionService.deleteSubdivision(req.params.id);
    if (!deletedSubdivision) {
      return res.status(HttpStatusCodes.NOT_FOUND.code).json({ status: false, message: "Subdivision not found" });
    }
    res.status(HttpStatusCodes.NO_CONTENT.code).json({ status: true, message: "Subdivision deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting subdivision: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.deleteSubdivisionError });
  }
};
