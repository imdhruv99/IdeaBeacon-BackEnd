import { createUserController, getAllUsersController } from "./controller";
import { validateBody } from "./middleware.js";
import { Router } from "express";

const userRouter = Router();

const createUser = [validateBody, createUserController]
userRouter.post("/create-user", createUser);

const getAllUser = [getAllUsersController]
userRouter.get("/get-all-user", getAllUser);

export default userRouter;