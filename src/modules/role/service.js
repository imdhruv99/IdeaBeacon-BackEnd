import Role from "../../models/roleModel.js";
import logger from "../../utils/logger.js";

export const createRoles = async (roles) => {
    logger.info("Creating roles from environment configuration.");
    try {
        for (const roleName of roles) {
            let role = await Role.findOne({ roleName: roleName });
            if (!role) {
                role = new Role({ roleName: roleName, description: roleName });
                await role.save();
                logger.info(`Role ${roleName} created successfully.`);
            } else {
                logger.info(`Role ${roleName} already exists.`);
            }
        }
    } catch (error) {
        logger.error(`Error creating roles: ${error.message}`);
        throw new Error(`Error creating roles: ${error.message}`);
    }
};

export const findRoleIdByName = async (roleName) => {
    logger.info(`Fetching role with name: ${roleName}`);
    try {
        const role = await Role.findOne({ roleName: roleName });
        if (!role) {
            logger.error(`Role with name ${roleName} not found.`);
            return null;
        }
        return role;
    } catch (error) {
        throw new Error(`Error finding role ID: ${error.message}`);
    }
};