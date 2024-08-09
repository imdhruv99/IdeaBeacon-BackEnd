import dotenv from "dotenv";

import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { createUser, findByOid, getAllUsers } from "./service.js";

dotenv.config();

export const createUserController = async (req, res) => {
  try {
    let userId = req.body.oid;

    let userData = {
      ...req.body,
      role: process.env.ROLE,
    };
        
    const existingUser = await findByOid(userId);

    if (existingUser) {
      logger.info(`User creation failed: User already exists for userId ${userId}`);
      return res
        .status(HttpStatusCodes.OK.code)
        .json({ status: false, message: responseStrings.userAlreadyExistErrorMessage});
    } else {
      const newUser = await createUser(userData);
      logger.info(`User created successfully: ${JSON.stringify(newUser)}`);

      res
        .status(HttpStatusCodes.CREATED.code)
        .json({ status: true, message: responseStrings.createUserSuccessMessage, data: newUser });
    }
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`, { stack: error.stack });
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.createUserErrorMessage });
  }
};

// Read All Users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res
      .status(HttpStatusCodes.OK.code)
      .json({ status: true, message: responseStrings.getAllUserSuccessMessage, data: users });
  } catch (error) {
    logger.error(`Error fetching ideas: ${error.message}`);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ status: false, message: responseStrings.getAllUserErrorMessage });
  }
};
