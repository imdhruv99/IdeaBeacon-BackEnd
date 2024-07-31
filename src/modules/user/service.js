import { User } from '../../models/userModel.js';

// find by oid
export const findByOid = async (oid) => {
    logger.info(`Fetching record for user ${oid}`);
    try {
      return await User.findByOid({ oid: oid });
    } catch (err) {
      logger.error(`Error fetching record for user ${oid}: ${err}`);
      throw err;
    }
  };

// save user
export const saveUser = async (userData) => {
logger.info(`Saving user ${userData.oid}`);
try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
} catch (err) {
    logger.error(`Error saving user ${userData.oid}: ${err}`);
    throw err;
}
};

