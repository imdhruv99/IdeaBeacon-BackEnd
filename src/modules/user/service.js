import User from "../../models/userModel.js";
import logger from "../../utils/logger.js";

// find by oid
export const findByOid = async (oid) => {
  logger.info(`Fetching record for user ${oid}`);
  try {
    return await User.findOne({ oid: oid });
  } catch (err) {
    logger.error(`Error fetching record for user ${oid}: ${err}`);
    throw err;
  }
};

// save user
export const createUser = async (userData) => {
  logger.info(`Saving user ${userData.oid}`);
  try {
    return User.create(userData);
  } catch (err) {
    logger.error(`Error saving user ${userData.oid}: ${err}`);
    throw err;
  }
};

// Read All User
export const getAllUsers = async () => {
  logger.info("Fetching all Users");
  try {
    return await User.find();
  } catch (err) {
    logger.error(`Error fetching users: ${err}`);
    throw err;
  }
};

// Find user by name
export const findUserByName = async (name) => {
  logger.info(`Fetching record for user ${name}`);
  try {
    return await User.findOne({ name: name });
  } catch (err) {
    logger.error(`Error fetching record for user ${name}: ${err}`);
    throw err;
  }
};