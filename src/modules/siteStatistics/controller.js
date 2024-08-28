// src/modules/siteStatistics/controller.js
import { HttpStatusCodes, responseStrings } from '../../constants/index.js';
import { incrementVisitCount } from './service.js';

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