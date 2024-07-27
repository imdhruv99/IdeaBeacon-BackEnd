const express = require('express');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const app = express();

// Connect Database
connectDB().then(() => {
    logger.info('Database and collections initialization complete');
}).catch((error) => {
    logger.error(`Initialization error: ${error.message}`);
    process.exit(1);
});

// Init Middleware
app.use(express.json());

module.exports = app;