import { Router } from "express";
import { createFunction, deleteFunction, getAllFunctions, getFunctionById, updateFunction } from "./controller.js";
import { validateCreateFunctionRequestBody } from "./middleware.js";

const functionRouter = Router();

functionRouter.post("/create-function", validateCreateFunctionRequestBody, createFunction); // Create Function
functionRouter.get("/get-all-function", getAllFunctions); // Read All Function
functionRouter.get("/get-function/:id", getFunctionById); // Read Single Function
functionRouter.put("/update-function/:id", updateFunction); // Update Function
functionRouter.delete("/delete-function/:id", deleteFunction); // Delete Function

export default functionRouter;
