import User from '../models/user.model.js';
import Budget from '../models/budget.model.js';
import { verifyToken } from '../middlewares/verifyToken.js';

export const getBudgetItems = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from verifyToken middleware
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Get all budget items for this user
        const budgetItems = await Budget.find({ userId }).sort({ date: -1 });

        // Group items by date and separate into needs/wants
        const groupedByDate = {};
        
        budgetItems.forEach(item => {
            // Convert date to YYYY-MM-DD format
            const dateStr = item.date.toISOString().split('T')[0];
            
            // Create entry for this date if it doesn't exist
            if (!groupedByDate[dateStr]) {
                groupedByDate[dateStr] = {
                    _id: dateStr, // Use date as ID
                    date: dateStr,
                    needs: [],
                    wants: []
                };
            }
            
            // Determine if this is a need or want based on description
            if (item.description && item.description.startsWith('needs')) {
                groupedByDate[dateStr].needs.push({
                    _id: item._id,
                    item: item.category,
                    amount: item.amount,
                    time: item.description.split(' - ')[1] || ''
                });
            } else {
                // Default to wants if not specified or if specified as wants
                groupedByDate[dateStr].wants.push({
                    _id: item._id,
                    item: item.category,
                    amount: item.amount,
                    time: item.description ? item.description.split(' - ')[1] || '' : ''
                });
            }
        });

        // Convert object to array
        const result = Object.values(groupedByDate);
        
        res.status(200).json({ success: true, items: result });
    } catch (err) {
        console.error("Error fetching budget items:", err);
        res.status(500).json({ success: false, message: "Failed to fetch budget items", error: err.message });
    }
};

// Add an item to a daily budget
export const addBudgetItem = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { date, itemType, item } = req.body;
        
        if (!date || !itemType || !item || !item.item || !item.amount) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate itemType is 'needs' or 'wants'
        if (itemType !== 'needs' && itemType !== 'wants') {
            return res.status(400).json({ success: false, message: "Item type must be 'needs' or 'wants'" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Create a new budget item with the required fields according to your schema
        const budgetItem = new Budget({
            userId,
            date: new Date(date), // Convert string date to Date object
            category: item.item,  // Use item name as category
            amount: Number(item.amount),
            type: "expense",      // Since we're adding expenses, not income
            description: `${itemType} - ${item.time || new Date().toTimeString().substring(0, 5)}`,
            // This stores the "needs"/"wants" classification in the description for later retrieval
        });
        
        // Save the new budget item
        await budgetItem.save();

        res.status(201).json({ 
            success: true, 
            message: "Item added successfully", 
            item: budgetItem
        });
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).json({ success: false, message: "Failed to add item", error: err.message });
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