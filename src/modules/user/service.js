import User from "../../models/userModel.js";
import logger from "../../utils/logger.js";

// find by oid
export const findByOid = async (oid) => {
    logger.info(`Fetching record for user ${oid}`);
    try {
        return await User.findOne({ oid: oid }).populate("role");
    } catch (err) {
        logger.error(`Error fetching record for user ${oid}: ${err}`);
        throw err;
    }
};

// save user
export const createUser = async (userData) => {
    logger.info(`Saving user ${userData.oid}`);
    try {
        return (await User.create(userData)).populate("role");
    } catch (err) {
        logger.error(`Error saving user ${userData.oid}: ${err}`);
        throw err;
    }
};

// Read All User
export const getAllUsers = async () => {
    logger.info("Fetching all Users");
    try {
        return await User.find().populate("role");
    } catch (err) {
        logger.error(`Error fetching users: ${err}`);
        throw err;
    }
};

// Find user by name
export const findUserByID = async (id) => {
    logger.info(`Fetching record for user ${id}`);
    try {
        return await User.findOne({ _id: id });
    } catch (err) {
        logger.error(`Error fetching record for user ${name}: ${err}`);
        throw err;
    }
};

// Update User
export const updateUser = async (id, updateData) => {
    logger.info(`Updating user information for ${id}`);
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).populate("role");
        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
