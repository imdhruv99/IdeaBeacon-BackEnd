import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('MongoDB Connected');

        // Initialize models to create collections
        await import('../models/userModel.js');
        await import('../models/ideaVerticalModel.js');
        await import('../models/ideaStageModel.js');
        await import('../models/functionModel.js');
        await import('../models/subdivisionModel.js');
        await import('../models/sharedIdeaModel.js');
        await import('../models/ideaModel.js');
        await import('../models/auditLogModel.js');
        await import('../models/roleModel.js');
        await import('../models/ideaStagesCountModels.js');
        await import('../models/ideaVerticalCountModel.js');

        logger.info('Collections are created if not existing');
    } catch (error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
