import User from '../models/user.model.js';
import axios from "axios";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function fetchGeminiAnalysis(promptText) {
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
        
        // Extract JSON from the response
        const jsonMatch = resultText.match(/\{.*\}/s);
        if (jsonMatch) {
            return jsonMatch[0];
        }
        
        return resultText;
    } catch (error) {
        console.error("Gemini fetch error:", error.response?.data || error.message);
        throw error;
    }
}

// Get spending patterns analysis
export const getSpendingPatterns = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Process transactions to get spending patterns
        const weekdaySpending = processWeekdaySpending(user.transactions);
        const timeOfDaySpending = processTimeOfDaySpending(user.transactions);
        const locationSpending = processLocationSpending(user.transactions);

        res.status(200).json({
            success: true,
            weekdaySpending,
            timeOfDaySpending,
            locationSpending
        });
    } catch (error) {
        console.error("Error in getSpendingPatterns:", error);
        res.status(500).json({ success: false, message: "Error analyzing spending patterns" });
    }
};

// KEEP original behavior insights using Gemini
export const getBehaviorInsights = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Process transactions to get behavior data
        const transactionData = processTransactionData(user.transactions);
        
        const prompt = `
        Based on this user's transaction data: ${JSON.stringify(transactionData)},
        analyze their spending behaviors and identify both positive habits and impulse behaviors.
        
        For impulse behaviors, identify patterns like late-night shopping, frequent small purchases, 
        or subscription overload. For each behavior, include: id, title, description, impact (high/medium), 
        savings (potential monthly savings), icon (shopping/cafe/food/subscription), progress (percentage), 
        and details (detailed analysis).
        
        For positive habits, identify good financial behaviors like consistent savings, reduced entertainment 
        spending, or timely bill payments. For each habit, include: id, title, description, impact (high/medium), 
        trend (up), icon (trending up/film/credit card), progress (percentage), and details (detailed analysis).
        
        Respond in JSON format with two arrays: "impulse" and "positive".
        `;

        console.log("Generating behavior insights with Gemini AI...");
        const response = await fetchGeminiAnalysis(prompt);
        
        let behaviors;
        try {
            behaviors = JSON.parse(response);
        } catch (error) {
            console.error("Error parsing Gemini response:", error);
            return res.status(500).json({ 
                success: false, 
                message: "Error parsing AI response",
                rawResponse: response
            });
        }

        res.status(200).json({
            success: true,
            behaviors
        });
    } catch (error) {
        console.error("Error in getBehaviorInsights:", error);
        res.status(500).json({ success: false, message: "Error generating behavior insights" });
    }
};

// ADD NEW function for needs vs wants categorization
export const getNeedsWantsCategories = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Process transactions to get behavior data
        const transactionData = processTransactionData(user.transactions);
        
        const prompt = `
        Based on this user's transaction data: ${JSON.stringify(transactionData)},
        analyze their spending behaviors and categorize them into "needs" (essential expenses) and "wants" (non-essential/discretionary expenses).
        
        For "needs", identify essential expenses like groceries, utilities, rent/mortgage, transportation, healthcare, 
        insurance, and debt payments. For each need, include: id, title, description, impact (high/medium), 
        amount (monthly average spending), icon (home/grocery/health/transport), progress (percentage), 
        and details (detailed analysis).
        
        For "wants", identify non-essential expenses like dining out, entertainment, shopping, subscriptions, 
        hobbies, and luxury items. For each want, include: id, title, description, impact (high/medium), 
        amount (monthly average spending), icon (shopping/cafe/food/film/subscription), progress (percentage), 
        and details (detailed analysis).
        
        Respond in JSON format with two arrays: "needs" and "wants".
        `;

        console.log("Generating needs vs wants insights with Gemini AI...");
        const response = await fetchGeminiAnalysis(prompt);
        
        let categories;
        try {
            categories = JSON.parse(response);
        } catch (error) {
            console.error("Error parsing Gemini response:", error);
            return res.status(500).json({ 
                success: false, 
                message: "Error parsing AI response",
                rawResponse: response
            });
        }

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error("Error in getNeedsWantsCategories:", error);
        res.status(500).json({ success: false, message: "Error generating needs vs wants insights" });
    }
};

// Get personalized recommendations using Gemini
export const getRecommendations = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Process transactions to get behavior data
        const transactionData = processTransactionData(user.transactions);
        
        const prompt = `
        Based on this user's transaction data: ${JSON.stringify(transactionData)},
        generate personalized financial recommendations to help them improve their spending habits.
        
        For each recommendation, include: id, title, description, impact (high/medium), 
        savings (potential monthly savings), category (shopping/food/entertainment), and icon.
        
        Recommendations should be specific, actionable, and tailored to the user's spending patterns.
        Focus on areas where they can make meaningful savings without drastically changing their lifestyle.
        
        Respond in JSON format as an array of recommendations.
        `;

        console.log("Generating recommendations with Gemini AI...");
        const response = await fetchGeminiAnalysis(prompt);
        
        let recommendations;
        try {
            recommendations = JSON.parse(response);
        } catch (error) {
            console.error("Error parsing Gemini response:", error);
            return res.status(500).json({ 
                success: false, 
                message: "Error parsing AI response",
                rawResponse: response
            });
        }

        res.status(200).json({
            success: true,
            recommendations
        });
    } catch (error) {
        console.error("Error in getRecommendations:", error);
        res.status(500).json({ success: false, message: "Error generating recommendations" });
    }
};

// Helper functions to process transaction data
function processWeekdaySpending(transactions) {
    const weekdayData = [
        { day: "Monday", amount: 0 },
        { day: "Tuesday", amount: 0 },
        { day: "Wednesday", amount: 0 },
        { day: "Thursday", amount: 0 },
        { day: "Friday", amount: 0 },
        { day: "Saturday", amount: 0 },
        { day: "Sunday", amount: 0 }
    ];

    transactions.forEach(tx => {
        const dayOfWeek = moment(tx.date).format('dddd');
        const dayIndex = weekdayData.findIndex(d => d.day === dayOfWeek);
        
        if (dayIndex !== -1) {
            // Sum up all needs and wants
            const needsTotal = tx.needs.reduce((sum, item) => sum + item.amount, 0);
            const wantsTotal = tx.wants.reduce((sum, item) => sum + item.amount, 0);
            weekdayData[dayIndex].amount += needsTotal + wantsTotal;
        }
    });

    return weekdayData;
}

function processTimeOfDaySpending(transactions) {
    const timeData = [
        { time: "Morning (6AM-12PM)", amount: 0 },
        { time: "Afternoon (12PM-5PM)", amount: 0 },
        { time: "Evening (5PM-9PM)", amount: 0 },
        { time: "Night (9PM-6AM)", amount: 0 }
    ];

    transactions.forEach(tx => {
        tx.needs.forEach(item => {
            const hour = parseInt(item.time.split(':')[0]);
            let timeIndex = -1;
            
            if (hour >= 6 && hour < 12) timeIndex = 0;
            else if (hour >= 12 && hour < 17) timeIndex = 1;
            else if (hour >= 17 && hour < 21) timeIndex = 2;
            else timeIndex = 3;
            
            if (timeIndex !== -1) {
                timeData[timeIndex].amount += item.amount;
            }
        });
        
        tx.wants.forEach(item => {
            const hour = parseInt(item.time.split(':')[0]);
            let timeIndex = -1;
            
            if (hour >= 6 && hour < 12) timeIndex = 0;
            else if (hour >= 12 && hour < 17) timeIndex = 1;
            else if (hour >= 17 && hour < 21) timeIndex = 2;
            else timeIndex = 3;
            
            if (timeIndex !== -1) {
                timeData[timeIndex].amount += item.amount;
            }
        });
    });

    return timeData;
}

function processLocationSpending(transactions) {
    const locationData = [
        { location: "Online", amount: 0 },
        { location: "Physical Stores", amount: 0 },
        { location: "Restaurants", amount: 0 },
        { location: "Entertainment Venues", amount: 0 }
    ];

    // This is a simplified version - in a real app, you'd have more sophisticated
    // logic to categorize transactions by location
    transactions.forEach(tx => {
        tx.needs.forEach(item => {
            // Simple categorization based on item description
            if (item.item.toLowerCase().includes('online') || 
                item.item.toLowerCase().includes('amazon') || 
                item.item.toLowerCase().includes('netflix')) {
                locationData[0].amount += item.amount;
            } else if (item.item.toLowerCase().includes('store') || 
                      item.item.toLowerCase().includes('market')) {
                locationData[1].amount += item.amount;
            } else if (item.item.toLowerCase().includes('restaurant') || 
                      item.item.toLowerCase().includes('cafe')) {
                locationData[2].amount += item.amount;
            } else if (item.item.toLowerCase().includes('movie') || 
                      item.item.toLowerCase().includes('theatre') || 
                      item.item.toLowerCase().includes('concert')) {
                locationData[3].amount += item.amount;
            } else {
                // Default to physical stores if no match
                locationData[1].amount += item.amount;
            }
        });
        
        tx.wants.forEach(item => {
            // Same categorization logic for wants
            if (item.item.toLowerCase().includes('online') || 
                item.item.toLowerCase().includes('amazon') || 
                item.item.toLowerCase().includes('netflix')) {
                locationData[0].amount += item.amount;
            } else if (item.item.toLowerCase().includes('store') || 
                      item.item.toLowerCase().includes('market')) {
                locationData[1].amount += item.amount;
            } else if (item.item.toLowerCase().includes('restaurant') || 
                      item.item.toLowerCase().includes('cafe')) {
                locationData[2].amount += item.amount;
            } else if (item.item.toLowerCase().includes('movie') || 
                      item.item.toLowerCase().includes('theatre') || 
                      item.item.toLowerCase().includes('concert')) {
                locationData[3].amount += item.amount;
            } else {
                // Default to physical stores if no match
                locationData[1].amount += item.amount;
            }
        });
    });

    return locationData;
}

function processTransactionData(transactions) {
    // Process transactions into a format suitable for Gemini analysis
    const processedData = {
        totalTransactions: transactions.length,
        totalSpent: 0,
        needsTotal: 0,
        wantsTotal: 0,
        categories: {},
        recentTransactions: []
    };

    // Get the last 30 days of transactions
    const thirtyDaysAgo = moment().subtract(30, 'days');
    
    transactions.forEach(tx => {
        const txDate = moment(tx.date);
        
        // Calculate totals
        const needsTotal = tx.needs.reduce((sum, item) => sum + item.amount, 0);
        const wantsTotal = tx.wants.reduce((sum, item) => sum + item.amount, 0);
        
        processedData.needsTotal += needsTotal;
        processedData.wantsTotal += wantsTotal;
        processedData.totalSpent += needsTotal + wantsTotal;
        
        // Categorize transactions
        tx.needs.forEach(item => {
            if (!processedData.categories[item.item]) {
                processedData.categories[item.item] = { amount: 0, count: 0, type: 'need' };
            }
            processedData.categories[item.item].amount += item.amount;
            processedData.categories[item.item].count += 1;
        });
        
        tx.wants.forEach(item => {
            if (!processedData.categories[item.item]) {
                processedData.categories[item.item] = { amount: 0, count: 0, type: 'want' };
            }
            processedData.categories[item.item].amount += item.amount;
            processedData.categories[item.item].count += 1;
        });
        
        // Add recent transactions
        if (txDate.isAfter(thirtyDaysAgo)) {
            processedData.recentTransactions.push({
                date: txDate.format('YYYY-MM-DD'),
                needs: tx.needs,
                wants: tx.wants
            });
        }
    });

    return processedData;
}