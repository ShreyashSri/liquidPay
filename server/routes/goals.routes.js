import express from 'express'
import { completeGoal, dailyGoalPurgeAndReward, genGoals, getGoals } from '../controllers/goals.controller.js';
import Goal from '../models/goals.model.js';

const router = express.Router();

// Get all goals for a user
router.get("/:userId", getGoals);

router.post("/generate/:userId", genGoals);

// ✅ Complete and delete a goal
router.delete("/complete/:goalId", completeGoal);

// 🧹 Daily purge: calculate completed goals, reward, and reset
router.post("/dailyreward/:userId", dailyGoalPurgeAndReward);


export default router;
