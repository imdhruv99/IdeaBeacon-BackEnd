import auditLog from "../../models/auditLogModel.js";

export const saveAuditLog = async (logData) => {
    try {
        logger.info("saving audit log");
        return await auditLog.create(logData);
    } catch (err) {

    }
}