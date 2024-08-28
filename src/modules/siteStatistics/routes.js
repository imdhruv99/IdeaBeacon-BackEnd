// src/modules/siteStatistics/routes.js
import express from 'express';
import { incrementSiteVisitStatisticController, getVisitCountController } from './controller.js';

const siteStatisticsRouter = express.Router();

const getSiteVisitStatistics = [getVisitCountController]
siteStatisticsRouter.get('/get-site-visit-count', getSiteVisitStatistics);

const incrementSiteVisitStatistics = [incrementSiteVisitStatisticController]
siteStatisticsRouter.put('/increment-site-visit-count', incrementSiteVisitStatistics);


export default siteStatisticsRouter;
