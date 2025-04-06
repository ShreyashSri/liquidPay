import User from '../models/user.model.js';
import Budget from '../models/budget.model.js';
import { verifyToken } from '../middlewares/verifyToken.js';

// Get all budget items for a user
export const getBudgetItems = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from verifyToken middleware
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Get transactions from user model
        const items = user.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.status(200).json({ success: true, items });
    } catch (err) {
        console.error("Error fetching budget items:", err);
        res.status(500).json({ success: false, message: "Failed to fetch budget items", error: err.message });
    }
};

// Add a new budget item
export const addBudgetItem = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from verifyToken middleware
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { category, amount, type, description } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Create new transaction
        const newTransaction = {
            category,
            amount: Number(amount),
            type,
            date: new Date(),
            description,
        };

        // Add transaction to user's transactions array
        user.transactions.push(newTransaction);
        await user.save();

        res.status(201).json({ 
            success: true, 
            message: "Transaction added successfully", 
            item: newTransaction 
        });
    } catch (err) {
        console.error("Error adding transaction:", err);
        res.status(500).json({ success: false, message: "Failed to add transaction", error: err.message });
    }
};

// Delete a budget item
export const deleteBudgetItem = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from verifyToken middleware
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { itemId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Find and remove the transaction
        const transactionIndex = user.transactions.findIndex(t => t._id.toString() === itemId);
        if (transactionIndex === -1) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        user.transactions.splice(transactionIndex, 1);
        await user.save();

        res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch (err) {
        console.error("Error deleting transaction:", err);
        res.status(500).json({ success: false, message: "Failed to delete transaction", error: err.message });
    }
};

// Update a budget item
export const updateBudgetItem = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from verifyToken middleware
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { itemId } = req.params;
        const { category, amount, type, description } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Find and update the transaction
        const transactionIndex = user.transactions.findIndex(t => t._id.toString() === itemId);
        if (transactionIndex === -1) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        user.transactions[transactionIndex] = {
            ...user.transactions[transactionIndex],
            category,
            amount: Number(amount),
            type,
            description,
        };

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Transaction updated successfully", 
            item: user.transactions[transactionIndex] 
        });
    } catch (err) {
        console.error("Error updating transaction:", err);
        res.status(500).json({ success: false, message: "Failed to update transaction", error: err.message });
    }
}; 