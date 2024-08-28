import mongoose from 'mongoose';

const siteStatisticsSchema = new mongoose.Schema({
    totalVisits: { type: Number, default: 0 },
}, { timestamps: true });

const SiteStatistics = mongoose.model('SiteStatistics', siteStatisticsSchema);

export default SiteStatistics;