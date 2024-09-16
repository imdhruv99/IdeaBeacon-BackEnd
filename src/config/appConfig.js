import dotenv from "dotenv";
import { createRoles } from "../modules/role/service.js";

dotenv.config();

export const initializeRoles = async () => {
    const roles = process.env.ROLES ? process.env.ROLES.split(",") : [];
    if (roles.length === 0) {
        throw new Error("No roles specified in the environment configuration.");
    }
    await createRoles(roles);
};
