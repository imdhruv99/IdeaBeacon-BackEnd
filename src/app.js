import express from 'express';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import cors from 'cors';


const app = express();

// Connect Database
connectDB().then(() => {
    logger.info('Database and collections initialization complete');
}).catch((error) => {
    logger.error(`Initialization error: ${error.message}`);
    process.exit(1);
});


// Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

export default app;
