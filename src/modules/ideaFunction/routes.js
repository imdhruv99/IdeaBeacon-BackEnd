import { Router } from "express";
import { createFunctionController, deleteFunctionController, getAllFunctionsController, getFunctionByIdController, updateFunctionController } from "./controller.js";
import { validateBody, validateID, validateRequestBodyToUpdate } from "./middleware.js";

const functionRouter = Router();

const createFunction = [validateBody, createFunctionController]
functionRouter.post("/create-function", createFunction);

const getAllFunctions = [getAllFunctionsController]
functionRouter.get("/get-all-function", getAllFunctions);

const getFunctionById = [validateID, getFunctionByIdController]
functionRouter.get("/get-function/:id", getFunctionById);

const updateFunction = [validateRequestBodyToUpdate, updateFunctionController]
functionRouter.put("/update-function/:id", updateFunction);

const deleteFunction = [validateID, deleteFunctionController]
functionRouter.delete("/delete-function/:id", deleteFunction);

export default functionRouter;
