// src/config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB Connected');

        // Initialize models to create collections
        require('../models/userModel');
        require('../models/ideaCategoryModel');
        require('../models/ideaStageModel');
        require('../models/functionModel');
        require('../models/subdivisionModel');
        require('../models/sharedIdeaModel');
        require('../models/ideaModel');
        require('../models/auditLogModel');
        
        logger.info('Collections are created if not existing');
    } catch (error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
