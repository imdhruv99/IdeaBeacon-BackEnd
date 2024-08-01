import dotenv from 'dotenv';
import logger from '../../utils/logger.js';

dotenv.config();


const authPassport = {
    auth: {
        clientId: process.env.AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                logger.info(message);
            },
            piiLoggingEnabled: false,
            loggingLevel: process.env.LOGGING_LEVEL,
        }
    }
};

export default authPassport;