import { Router } from "express";
import { callbackController, loginController } from "./controller.js";

const authRouter = Router();

authRouter.get('/login', loginController);

authRouter.get('/callback', callbackController);

export default authRouter;