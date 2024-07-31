import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; 

        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }

        await mongoose.connect(mongoURI);
        logger.info('MongoDB Connected');

        // Initialize models to create collections
        await import('../models/userModel.js');
        await import('../models/ideaCategoryModel.js');
        await import('../models/ideaStageModel.js');
        await import('../models/functionModel.js');
        await import('../models/subdivisionModel.js');
        await import('../models/sharedIdeaModel.js');
        await import('../models/ideaModel.js');
        await import('../models/auditLogModel.js');

        logger.info('Collections are created if not existing');
    } catch (error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
