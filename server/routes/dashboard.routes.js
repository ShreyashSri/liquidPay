import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getDashboardData } from '../controllers/dashboard.controller.js';

const router = express.Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Get dashboard data
router.get('/', verifyToken, getDashboardData);

export default router; 