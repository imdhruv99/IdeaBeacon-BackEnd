// src/modules/siteStatistics/service.js
import SiteStatistics from '../../models/siteStatisticsModel.js';

export const incrementVisitCount = async () => {
    try {
        // Find or create the site statistics document
        const stats = await SiteStatistics.findOne();
        if (stats) {
            stats.totalVisits += 1;
            await stats.save();
        } else {
            await SiteStatistics.create({ totalVisits: 1 });
        }
        return stats ? stats.totalVisits : 1;
    } catch (error) {
        throw new Error(`Error updating site visit count: ${error.message}`);
    }
};