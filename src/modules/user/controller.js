import dotenv from "dotenv";

import { HttpStatusCodes, responseStrings } from "../../constants/index.js";
import logger from "../../utils/logger.js";
import { createUser, findByOid, getAllUsers, updateUser } from "./service.js";
import { findRoleIdByName } from "../role/service.js";

dotenv.config();

export const createUserController = async (req, res) => {
    try {
        let userId = req.body.oid;

        const roleName = "ROLE_USER";
        const role = await findRoleIdByName(roleName);

        let userData = {
            ...req.body,
            role: role._id,
            countOfLoggedIn: 1,
        };

        const existingUser = await findByOid(userId);

        if (existingUser) {
            logger.info(`User already exists for userId ${userId}, Updating last login time and login count.`);

            const newCount = existingUser.countOfLoggedIn ? existingUser.countOfLoggedIn + 1 : 1;

            const updatedUser = await updateUser(existingUser._id, {
                lastLoggedInTime: userData.lastLoggedInTime,
                countOfLoggedIn: newCount,
            });

            logger.info(`User updated successfully: ${JSON.stringify(updatedUser)}`);

            return res
                .status(HttpStatusCodes.OK.code)
                .json({ status: true, message: responseStrings.userUpdatedSuccessMessage, data: updatedUser });
        } else {
            const newUser = await createUser(userData);
            logger.info(`User created successfully: ${JSON.stringify(newUser)}`);

            res.status(HttpStatusCodes.CREATED.code).json({
                status: true,
                message: responseStrings.createUserSuccessMessage,
                data: newUser,
            });
        }
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`, { stack: error.stack });
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: false,
            message: responseStrings.createUserErrorMessage,
        });
    }
};

// Read All Users
export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(HttpStatusCodes.OK.code).json({
            status: true,
            message: responseStrings.getAllUserSuccessMessage,
            data: users,
        });
    } catch (error) {
        logger.error(`Error fetching ideas: ${error.message}`);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code).json({
            status: false,
            message: responseStrings.getAllUserErrorMessage,
        });
    }
};
