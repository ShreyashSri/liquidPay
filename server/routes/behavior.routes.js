import express from 'express';
import { getSpendingPatterns, getBehaviorInsights, getRecommendations } from '../controllers/behavior.controller.js';

const router = express.Router();

// Get spending patterns analysis
router.get('/patterns/:userId', getSpendingPatterns);

// Get behavior insights using Gemini
router.get('/insights/:userId', getBehaviorInsights);

// Get personalized recommendations using Gemini
router.get('/recommendations/:userId', getRecommendations);

export default router; 