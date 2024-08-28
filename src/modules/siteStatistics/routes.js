// src/modules/siteStatistics/routes.js
import express from 'express';
import { incrementSiteVisitStatisticController } from './controller.js';

const siteStatisticsRouter = express.Router();

const incrementSiteVisitStatistics = [incrementSiteVisitStatisticController]
siteStatisticsRouter.put('/increment-site-visit-count', incrementSiteVisitStatistics);


export default siteStatisticsRouter;
