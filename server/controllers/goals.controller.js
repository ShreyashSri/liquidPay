import User from '../models/user.model.js';
import Goal from '../models/goal.model.js';
import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv";
import { buyCodi } from '../blockchain/codiService.js';
dotenv.config();

export const genGoals = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const summaryResponse = await fetch(`http://localhost:8188/api/summary/${userId}`);
        const summaryData = await summaryResponse.json();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      Based on this user's spending summary: ${JSON.stringify(summaryData)},
      and their name: ${user.fullname},
      generate 5 unique, personalized financial goals. Each goal should be motivational, brief, and suitable for young adults.
      Respond in JSON format like:
      [
        { "title": "Title1", "description": "Desc1" },
        ...
      ]
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        const goals = JSON.parse(response);

        await Goal.deleteMany({ userId }); // Remove previous goals
        const savedGoals = await Goal.insertMany(goals.map(goal => ({ ...goal, userId })));

        res.status(200).json({ message: "✅ Goals generated", goals: savedGoals });
    } catch (err) {
        console.error("Goal generation error:", err);
        res.status(500).json({ message: "Failed to generate goals", error: err.message });
    }
};

export const completeGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        await Goal.findByIdAndDelete(goalId);
        res.status(200).json({ message: "🎯 Goal completed and deleted" });
    } catch (err) {
        res.status(500).json({ message: "❌ Could not complete goal", error: err.message });
    }
};

export const dailyGoalPurgeAndReward = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "❌ User not found" });

        if (!user.walletAddress) {
            return res.status(400).json({ message: "⚠️ No wallet address found. No SIT reward given." });
        }

        const remainingGoals = await Goal.find({ userId: user._id });
        const completedCount = 5 - remainingGoals.length;

        if (completedCount <= 0) {
            await Goal.deleteMany({ userId }); // still purge if needed
            return res.status(200).json({ message: "No goals completed today. Purged existing goals." });
        }

        const reward = completedCount * 5;
        
        // Reward user with SIT tokens
        const tx = await buyCodi(user.walletID, reward);
        if (!tx) {
            return res.status(500).json({ message: "❌ Failed to send SIT tokens" });
        }

        user.saveITCoin += reward;

        await Goal.deleteMany({ userId });

        res.status(200).json({
            message: `✅ Rewarded ${reward} SIT tokens for ${completedCount} completed goals`,
            txHash: tx?.transactionHash || "N/A"
        });

    } catch (err) {
        console.error("Purge & reward error:", err);
        res.status(500).json({ message: "❌ Daily purge failed", error: err.message });
    }
};