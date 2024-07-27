const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

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

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: getLogFileName(), datePattern: 'YYYY-MM-DD' })
    ]
});

module.exports = logger;