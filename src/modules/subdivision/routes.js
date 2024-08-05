import { Router } from "express";
import {
  createSubdivisionController,
  deleteSubdivisionController,
  getAllSubdivisionsController,
  getSubdivisionByIdController,
  updateSubdivisionController,
  getSubdivisionByFunctionIdController,
} from "./controller.js";
import { validateBody, validateID, validateRequestBodyToUpdate } from "./middleware.js";

const subdivisionRouter = Router();

const createSubdivision = [validateBody, createSubdivisionController];
subdivisionRouter.post("/create-subdivision", createSubdivision);

const getAllSubdivisions = [getAllSubdivisionsController];
subdivisionRouter.get("/get-all-subdivision", getAllSubdivisions);

const getSubdivisionById = [validateID, getSubdivisionByIdController];
subdivisionRouter.get("/get-subdivision/:id", getSubdivisionById);

const updateSubdivision = [validateRequestBodyToUpdate, updateSubdivisionController];
subdivisionRouter.put("/update-subdivision/:id", updateSubdivision);

const deleteSubdivision = [validateID, deleteSubdivisionController];
subdivisionRouter.delete("/delete-subdivision/:id", deleteSubdivision);

const getSubdivisionByFunctionId = [validateID, getSubdivisionByFunctionIdController];
subdivisionRouter.get("/get-all-subdivision-by-function-id/:id", getSubdivisionByFunctionId);

export default subdivisionRouter;
