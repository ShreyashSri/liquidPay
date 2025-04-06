import express from 'express';
import { 
    getSpendingPatterns, 
    getBehaviorInsights, 
    getNeedsWantsCategories, 
    getRecommendations 
} from '../controllers/behavior.controller.js';

const router = express.Router();

// Get spending patterns analysis
router.get('/patterns/:userId', getSpendingPatterns);

// Keep original behavior insights route
router.get('/insights/:userId', getBehaviorInsights);

// Add new route for needs vs wants categorization
router.get('/categories/:userId', getNeedsWantsCategories);

// Get personalized recommendations using Gemini
router.get('/recommendations/:userId', getRecommendations);

export default router;