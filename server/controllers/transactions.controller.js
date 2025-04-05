import mongoose from "mongoose";
import User from "../models/user.model.js"; // adjust if path differs
import moment from "moment"; // for date manipulation

export const getTx = async (req, res) => {
    try {
        const { id } = req.params; // user ID passed as query param
        const { duration } = req.query;

        if (!id || !['w', 'm', 'd'].includes(duration)) {
            return res.status(400).json({ error: "Invalid user ID or duration" });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const now = moment();
        let start;

        switch (duration) {
            case 'w':
                start = moment().startOf('week');
                break;
            case 'm':
                start = moment().startOf('month');
                break;
            case 'd':
                start = moment().startOf('day');
                break;
        }

        const filteredTx = user.transactions.filter((tx) =>
            moment(tx.date).isSameOrAfter(start)
        );

        res.status(200).json({
            user: user.username,
            range: duration,
            totalTransactions: filteredTx.length,
            transactions: filteredTx
        });
    } catch (err) {
        console.error("❌ Error fetching transactions:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getSpendingSummary = async (req, res) => {
    const { userId } = req.params;
    const { summary } = req.query; // expects "needs", "wants", or undefined

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        let totalNeeds = 0;
        let totalWants = 0;

        user.transactions.forEach(tx => {
            tx.entries.needs.forEach(n => totalNeeds += n.amount);
            tx.entries.wants.forEach(w => totalWants += w.amount);
        });

        if (summary === "needs") {
            return res.status(200).json({ totalNeeds });
        }

        if (summary === "wants") {
            return res.status(200).json({ totalWants });
        }

        // Return both by default
        res.status(200).json({ totalNeeds, totalWants });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postTransaction = async (req, res) => {
    try {
        const { userId } = req.params; 
        const { date, type, category, amount, description } = req.body;

        if (!userId || !date || !type || !category || !amount) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Format the date to store transactions grouped by date
        const formattedDate = new Date(date).toISOString().split("T")[0]; // "YYYY-MM-DD"

        // Find if entry exists for the same date
        let dayEntry = user.transactions.find(tx =>
            new Date(tx.date).toISOString().split("T")[0] === formattedDate
        );

        if (!dayEntry) {
            // Create a new entry for the date
            dayEntry = {
                date: new Date(date),
                entries: {
                    needs: [],
                    wants: [],
                }
            };
            user.transactions.push(dayEntry);
        }

        // Add transaction to either needs or wants
        if (type === "need") {
            dayEntry.entries.needs.push({ category, amount, description });
        } else if (type === "want") {
            dayEntry.entries.wants.push({ category, amount, description });
        } else {
            return res.status(400).json({ message: "Invalid type. Must be 'need' or 'want'." });
        }

        await user.save();
        res.status(200).json({ message: "Transaction added successfully." });

    } catch (err) {
        console.error("❌ Error in postTransaction:", err);
        res.status(500).json({ error: err.message });
    }
};

