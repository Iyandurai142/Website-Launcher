import Analytics from '../models/Analytics.js';
import Website from '../models/Website.js';
import logger from '../utils/logger.js';

export const getAllAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find({ userId: req.user.id })
      .populate('websiteId', 'name url');
    logger.info(`Fetched all analytics for user: ${req.user.id}`);
    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    logger.error(`Error fetching analytics: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalyticsByWebsite = async (req, res) => {
  try {
    const { websiteId } = req.params;

    // Verify user owns the website
    const website = await Website.findById(websiteId);
    if (!website || website.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const analytics = await Analytics.find({ websiteId, userId: req.user.id });
    logger.info(`Fetched analytics for website: ${websiteId}`);
    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    logger.error(`Error fetching website analytics: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const trackVisit = async (req, res) => {
  try {
    const { websiteId } = req.body;

    const analytics = await Analytics.create({
      websiteId,
      userId: req.user.id,
      launchDate: new Date()
    });

    logger.info(`Visit tracked for website: ${websiteId}`);
    res.status(201).json({ success: true, data: analytics });
  } catch (error) {
    logger.error(`Error tracking visit: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalyticsSummary = async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments({ userId: req.user.id });
    const uniqueWebsites = await Analytics.distinct('websiteId', { userId: req.user.id });

    const topWebsites = await Analytics.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: '$websiteId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'websites', localField: '_id', foreignField: '_id', as: 'website' } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalVisits,
        uniqueWebsites: uniqueWebsites.length,
        topWebsites
      }
    });
  } catch (error) {
    logger.error(`Error fetching analytics summary: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};