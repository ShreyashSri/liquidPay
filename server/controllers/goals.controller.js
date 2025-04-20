import User from '../models/user.model.js';
import Goal from '../models/goals.model.js';
import axios from "axios";
import dotenv from "dotenv";
import { buyCodi } from '../blockchain/codiService.js';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function fetchGeminiGoals(promptText) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: promptText }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        let resultText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
        
        // Clean up markdown formatting if present
        resultText = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Extract JSON array from the response
        const jsonMatch = resultText.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch) {
            return jsonMatch[0];
        }
        
        // If no JSON array found, try to find the last JSON-like structure
        const lastJsonMatch = resultText.match(/\{.*\}/g);
        if (lastJsonMatch) {
            return lastJsonMatch[lastJsonMatch.length - 1];
        }
        
        return resultText;
    } catch (error) {
        console.error("Gemini fetch error:", error.response?.data || error.message);
        throw error;
    }
}

// Get all goals for a user
export const getGoals = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const goals = await Goal.find({ userId });
        res.status(200).json({ success: true, goals });
    } catch (err) {
        console.error("Error fetching goals:", err);
        res.status(500).json({ success: false, message: "Failed to fetch goals", error: err.message });
    }
};

// Create a manual goal
export const createGoal = async (req, res) => {
    const { userId } = req.params;
    const { title, description, targetAmount, deadline, currentAmount, reward, isAI } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const newGoal = new Goal({
            userId,
            title,
            description,
            targetAmount: Number(targetAmount),
            currentAmount: Number(currentAmount || 0),
            deadline,
            reward: Number(reward),
            isCompleted: false,
            isAI: isAI || false
        });

        const savedGoal = await newGoal.save();
        res.status(201).json({ success: true, message: "Goal created successfully", goal: savedGoal });
    } catch (err) {
        console.error("Error creating goal:", err);
        res.status(500).json({ success: false, message: "Failed to create goal", error: err.message });
    }
};

// Function to check if 24 hours have passed since last goal generation
const hasGenerationCooldownPassed = async (userId) => {
    // Find the most recent AI goal generation timestamp
    const lastAIGoal = await Goal.findOne({ userId, isAI: true }).sort({ createdAt: -1 });
    
    // If no AI goals were ever generated, cooldown is not applicable
    if (!lastAIGoal) return true;
    
    const currentTime = new Date();
    const lastGenerationTime = new Date(lastAIGoal.createdAt);
    const hoursSinceLastGeneration = (currentTime - lastGenerationTime) / (1000 * 60 * 60);
    
    return hoursSinceLastGeneration >= 24;
};

export const genGoals = async (req, res) => {
    const { userId } = req.params;

    try {
        console.log("Starting goal generation for user:", userId);
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found:", userId);
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("User found:", user.fullname);

        // Check if 24 hours have passed since last goal generation
        const cooldownPassed = await hasGenerationCooldownPassed(userId);
        if (!cooldownPassed) {
            console.log("Cooldown period still active for user:", userId);
            
            // Calculate remaining hours in cooldown
            const lastAIGoal = await Goal.findOne({ userId, isAI: true }).sort({ createdAt: -1 });
            const lastGenerationTime = new Date(lastAIGoal.createdAt);
            const currentTime = new Date();
            const hoursSinceLastGeneration = (currentTime - lastGenerationTime) / (1000 * 60 * 60);
            const hoursRemaining = Math.ceil(24 - hoursSinceLastGeneration);
            
            return res.status(429).json({ 
                success: false, 
                message: `Goals can only be generated once every 24 hours. Please try again in ${hoursRemaining} hours.` 
            });
        }

        // Check if there are existing goals for this user
        const existingGoals = await Goal.find({ userId });
        
        // If there are existing goals, return those without generating new ones
        if (existingGoals.length > 0) {
            console.log("User has existing goals. Not generating new ones.");
            return res.status(200).json({ 
                success: true, 
                message: "Using existing goals", 
                goals: existingGoals 
            });
        }

        // At this point we know:
        // 1. The cooldown period has passed
        // 2. The user has no existing goals
        // So we can generate new goals

        let summaryData = {};
        try {
            console.log("Fetching summary data...");
            const summaryResponse = await fetch(`http://localhost:8188/api/summary/${userId}`);
            if (summaryResponse.ok) {
                const contentType = summaryResponse.headers.get("content-type");
                console.log("Summary response:", summaryResponse);
                if (contentType && contentType.includes("application/json")) {
                    summaryData = await summaryResponse.json();
                    console.log("Summary data received:", summaryData);
                } else {
                    console.warn("Summary endpoint returned non-JSON response. Content-Type:", contentType);
                }
            } else {
                console.warn("Summary endpoint returned error status:", summaryResponse.status);
            }
        } catch (error) {
            console.warn("Error fetching summary data:", error.message);
        }

        const prompt = `
      Based on this user's spending summary: ${JSON.stringify(summaryData)},
      and their name: ${user.fullname}, their age is ${user.age},
      generate 5 unique, personalized financial goals. Each goal should be motivational, brief, and suitable for young adults.
      For each goal, include these fields: title, description, targetAmount (a number between 5000-50000), deadline (a date 1-6 months from now), currentAmount (0), reward (5-10% of targetAmount), isCompleted (false), isAI (true).
      Don't give generalised goals make it as particular as possible.
      base the goals on the user's spending habits and financial situation.
      Goals should be realistic and achievable, but also challenging enough to encourage the user to save and invest.
      Take the data and frame the goals so specific that it should be tailored to user's needs.
      Reward should always be  5 SIT
      Go very specific including the name of the person in the description and the goal.
      Respond in JSON format like:
      [
        { "title": "Title1", "description": "Desc1", "targetAmount": 10000, "deadline": "2025-10-01", "currentAmount": 0, "reward": 5, "isCompleted": false, "isAI": true },
        ...
      ]
    `;

        console.log("Generating content with Gemini AI...");
        const response = await fetchGeminiGoals(prompt);
        console.log("Raw AI response:", response);

        let goals;
        try {
            goals = JSON.parse(response);
            if (!Array.isArray(goals)) {
                throw new Error("AI response is not an array");
            }
            console.log("Successfully parsed goals:", goals);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            console.error("Failed response:", response);
            return res.status(500).json({ 
                success: false, 
                message: "Failed to parse AI response", 
                error: error.message 
            });
        }

        try {
            console.log("Saving new goals...");
            const savedGoals = await Goal.insertMany(goals.map(goal => ({
                ...goal,
                userId,
                targetAmount: Number(goal.targetAmount),
                currentAmount: Number(goal.currentAmount),
                reward: Number(goal.reward)
            })));
            console.log("Goals saved successfully:", savedGoals);
            
            res.status(200).json({ success: true, message: "✅ Goals generated", goals: savedGoals });
        } catch (error) {
            console.error("Error saving goals:", error);
            return res.status(500).json({ 
                success: false, 
                message: "Failed to save generated goals", 
                error: error.message 
            });
        }
    } catch (err) {
        console.error("Goal generation error:", err);
        res.status(500).json({ success: false, message: "Failed to generate goals", error: err.message });
    }
};

export const completeGoal = async (req, res) => {
    const { goalId } = req.params;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });

        await Goal.findByIdAndDelete(goalId);
        res.status(200).json({ success: true, message: "🎯 Goal completed and deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "❌ Could not complete goal", error: err.message });
    }
};

export const dailyGoalPurgeAndReward = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "❌ User not found" });

        if (!user.walletID) {
            return res.status(400).json({ success: false, message: "⚠️ No wallet address found. No SIT reward given." });
        }

        const remainingGoals = await Goal.find({ userId: user._id });
        const completedCount = 5 - remainingGoals.length;

        if (completedCount <= 0) {
            await Goal.deleteMany({ userId }); // still purge if needed
            return res.status(200).json({ success: true, message: "No goals completed today. Purged existing goals." });
        }

        const reward = completedCount * 5;
        
        // Reward user with SIT tokens
        const tx = await buyCodi(user.walletID, reward);
        if (!tx) {
            return res.status(500).json({ success: false, message: "❌ Failed to send SIT tokens" });
        }

        user.saveITCoin += reward;
        await user.save();

        await Goal.deleteMany({ userId });

        res.status(200).json({
            success: true,
            message: `✅ Rewarded ${reward} SIT tokens for ${completedCount} completed goals`,
            txHash: tx?.transactionHash || "N/A"
        });

    } catch (err) {
        console.error("Purge & reward error:", err);
        res.status(500).json({ success: false, message: "❌ Daily purge failed", error: err.message });
    }
};

// Update goal progress
export const updateGoalProgress = async (req, res) => {
    const { goalId } = req.params;
    const { currentAmount } = req.body;

    try {
        const goal = await Goal.findById(goalId);
        if (!goal) return res.status(404).json({ success: false, message: "Goal not found" });

        goal.currentAmount = Number(currentAmount);
        
        // Check if goal is complete
        if (goal.currentAmount >= goal.targetAmount) {
            goal.isCompleted = true;
        }
        
        await goal.save();
        res.status(200).json({ success: true, message: "Goal progress updated", goal });
    } catch (err) {
        console.error("Error updating goal progress:", err);
        res.status(500).json({ success: false, message: "Failed to update goal progress", error: err.message });
    }
};

// Check goal generation status for a user
export const checkGoalGenerationStatus = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const lastAIGoal = await Goal.findOne({ userId, isAI: true }).sort({ createdAt: -1 });
        const existingGoals = await Goal.find({ userId });
        
        if (!lastAIGoal) {
            // User has never generated goals
            return res.status(200).json({
                success: true,
                canGenerateGoals: true,
                existingGoalsCount: existingGoals.length,
                message: "No goals have been generated before. You can generate goals now."
            });
        }
        
        const currentTime = new Date();
        const lastGenerationTime = new Date(lastAIGoal.createdAt);
        const hoursSinceLastGeneration = (currentTime - lastGenerationTime) / (1000 * 60 * 60);
        const canGenerate = hoursSinceLastGeneration >= 24;
        const hoursRemaining = Math.ceil(24 - hoursSinceLastGeneration);
        
        return res.status(200).json({
            success: true,
            canGenerateGoals: canGenerate,
            existingGoalsCount: existingGoals.length,
            lastGenerationTime: lastGenerationTime,
            hoursRemaining: canGenerate ? 0 : hoursRemaining,
            message: canGenerate 
                ? "You can generate new goals now." 
                : `You can generate new goals in ${hoursRemaining} hours.`
        });
    } catch (err) {
        console.error("Error checking goal generation status:", err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to check goal generation status", 
            error: err.message 
        });
    }
};