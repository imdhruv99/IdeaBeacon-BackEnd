import auditLog from "../../models/auditLogModel.js";
import logger from "../../utils/logger.js";

export const saveAuditLog = async (logData) => {
    try {
      logger.info("Saving audit log");
      return await auditLog.create(logData);
    } catch (err) {
      logger.error(`Error while saving the audit log: ${err}`);
      throw err;
    }
  }