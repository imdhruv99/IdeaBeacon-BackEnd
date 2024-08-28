// src/modules/siteStatistics/controller.js
import { HttpStatusCodes, responseStrings } from '../../constants/index.js';
import { incrementVisitCount, getVisitCount } from './service.js';

// Read All Stages
export const getVisitCountController = async (req, res) => {
    try {
        const visitCount = await getVisitCount();
        res.status(HttpStatusCodes.OK.code).json({ status: true, message: responseStrings.getAllVisitStatisticSuccessMessage, data: visitCount });
    } catch (error) {
        logger.error(`Error fetching stages: ${error.message}`);
        res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
            .json({ status: false, message: responseStrings.getAllVisitStatisticErrorMessage });
    }
};

export const incrementSiteVisitStatisticController = async (req, res) => {
    try {
        const totalVisits = await incrementVisitCount();
        res
            .status(HttpStatusCodes.OK.code)
            .json({ status: true, message: responseStrings.incrementSiteVisitStatisticSuccessMessage, totalVisits });
    } catch (error) {
        logger.error(`Error incrementing site visit statistics: ${error.message}`);
        res
            .status(500)
            .json({ status: false, message: responseStrings.incrementSiteVisitStatisticErrorMessage });
    }
};