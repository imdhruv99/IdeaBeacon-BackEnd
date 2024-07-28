import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __filename equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Generate timestamped log filename
const getLogFileName = () => {
    const now = new Date();
    return path.join(logDir, `${now.toISOString().split('T')[0]}.log`);
};

// Custom format to capitalize log level
const customFormat = format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: getLogFileName(), datePattern: 'YYYY-MM-DD' })
    ]
});

export default logger;
