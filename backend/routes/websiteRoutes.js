import express from 'express';
import * as websiteController from '../controllers/websiteController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateWebsite } from '../middleware/validationMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', websiteController.getAllWebsites);
router.post('/', validateWebsite, websiteController.createWebsite);
router.get('/:id', websiteController.getWebsiteById);
router.put('/:id', validateWebsite, websiteController.updateWebsite);
router.delete('/:id', websiteController.deleteWebsite);
router.post('/:id/launch', websiteController.launchWebsite);
router.get('/search/query', websiteController.searchWebsites);
router.get('/export/csv', websiteController.exportToCSV);
router.get('/stats/dashboard', websiteController.getDashboardStats);

export default router;