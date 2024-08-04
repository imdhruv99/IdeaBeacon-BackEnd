import { Router } from "express";
import {
  createSubdivision,
  deleteSubdivision,
  getAllSubdivisions,
  getSubdivisionById,
  updateSubdivision,
} from "./controller.js";
import { validateCreateSubdivisionRequestBody } from "./middleware.js";

const subdivisionRouter = Router();

subdivisionRouter.post("/create-subdivision", validateCreateSubdivisionRequestBody, createSubdivision); // Create Subdivision
subdivisionRouter.get("/get-all-subdivision", getAllSubdivisions); // Read All Subdivision
subdivisionRouter.get("/get-subdivision/:id", getSubdivisionById); // Read Single Subdivision
subdivisionRouter.put("/update-subdivision/:id", updateSubdivision); // Update Subdivision
subdivisionRouter.delete("/delete-subdivision/:id", deleteSubdivision); // Delete Subdivision

export default subdivisionRouter;
