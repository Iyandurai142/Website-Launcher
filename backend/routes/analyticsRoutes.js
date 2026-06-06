import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', analyticsController.getAllAnalytics);
router.get('/website/:websiteId', analyticsController.getAnalyticsByWebsite);
router.post('/track', analyticsController.trackVisit);
router.get('/stats/summary', analyticsController.getAnalyticsSummary);

export default router;