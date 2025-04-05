import express from 'express'
import { completeGoal, dailyGoalPurgeAndReward, genGoals } from '../controllers/goals.controller';

const router = express.Router();

router.post("/generate/:userId", genGoals);

// ✅ Complete and delete a goal
router.delete("/complete/:goalId", completeGoal);

// 🧹 Daily purge: calculate completed goals, reward, and reset
router.post("/daily-reward", dailyGoalPurgeAndReward);


export default router;
