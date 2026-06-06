import Website from '../models/Website.js';
import Analytics from '../models/Analytics.js';
import logger from '../utils/logger.js';
import { convertToCSV } from '../utils/csvExport.js';

export const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user.id });
    logger.info(`Fetched all websites for user: ${req.user.id}`);
    res.status(200).json({ success: true, data: websites });
  } catch (error) {
    logger.error(`Error fetching websites: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createWebsite = async (req, res) => {
  try {
    const { name, url, description, category, status } = req.body;

    const website = new Website({
      userId: req.user.id,
      name,
      url,
      description,
      category,
      status
    });

    await website.save();
    logger.info(`Website created: ${name}`);
    res.status(201).json({ success: true, data: website });
  } catch (error) {
    logger.error(`Error creating website: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website || website.userId.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Website not found' });
    }

    res.status(200).json({ success: true, data: website });
  } catch (error) {
    logger.error(`Error fetching website: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWebsite = async (req, res) => {
  try {
    const { name, url, description, category, status } = req.body;

    let website = await Website.findById(req.params.id);

    if (!website || website.userId.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Website not found' });
    }

    website.name = name || website.name;
    website.url = url || website.url;
    website.description = description || website.description;
    website.category = category || website.category;
    website.status = status || website.status;

    await website.save();
    logger.info(`Website updated: ${name}`);
    res.status(200).json({ success: true, data: website });
  } catch (error) {
    logger.error(`Error updating website: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWebsite = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website || website.userId.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Website not found' });
    }

    await Website.deleteOne({ _id: req.params.id });
    logger.info(`Website deleted: ${website.name}`);
    res.status(200).json({ success: true, message: 'Website deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting website: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const launchWebsite = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website || website.userId.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Website not found' });
    }

    website.launchCount += 1;
    website.lastLaunchDate = new Date();
    await website.save();

    // Log analytics
    await Analytics.create({
      websiteId: website._id,
      userId: req.user.id,
      launchDate: new Date()
    });

    logger.info(`Website launched: ${website.name}`);
    res.status(200).json({ success: true, message: 'Website launched', website });
  } catch (error) {
    logger.error(`Error launching website: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchWebsites = async (req, res) => {
  try {
    const { query, category, status } = req.query;

    let filter = { userId: req.user.id };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (category) filter.category = category;
    if (status) filter.status = status;

    const websites = await Website.find(filter);
    logger.info(`Searched websites with query: ${query}`);
    res.status(200).json({ success: true, data: websites });
  } catch (error) {
    logger.error(`Error searching websites: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportToCSV = async (req, res) => {
  try {
    const websites = await Website.find({ userId: req.user.id });
    const csv = convertToCSV(websites);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=websites.csv');
    res.send(csv);

    logger.info(`Websites exported to CSV`);
  } catch (error) {
    logger.error(`Error exporting to CSV: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalWebsites = await Website.countDocuments({ userId: req.user.id });
    const activeWebsites = await Website.countDocuments({ userId: req.user.id, status: 'Active' });
    const inactiveWebsites = await Website.countDocuments({ userId: req.user.id, status: 'Inactive' });

    res.status(200).json({
      success: true,
      data: {
        totalWebsites,
        activeWebsites,
        inactiveWebsites,
        inactivePercentage: ((inactiveWebsites / totalWebsites) * 100 || 0).toFixed(2)
      }
    });
  } catch (error) {
    logger.error(`Error fetching dashboard stats: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};