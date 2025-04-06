import User from '../models/user.model.js';
import moment from 'moment';

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from verifyToken middleware
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Get current month's transactions
        const currentMonth = moment().startOf('month');
        const monthlyTransactions = user.transactions.filter(tx =>
            moment(tx.date).isSameOrAfter(currentMonth)
        );

        // Calculate total balance (needs + wants)
        let totalBalance = 0;
        let totalNeeds = 0;
        let totalWants = 0;

        user.transactions.forEach(tx => {
            tx.needs.forEach(n => {
                totalNeeds += n.amount;
                totalBalance += n.amount;
            });
            tx.wants.forEach(w => {
                totalWants += w.amount;
                totalBalance += w.amount;
            });
        });

        // Calculate monthly spending
        const monthlySpending = monthlyTransactions.reduce((total, tx) => {
            let txTotal = 0;
            tx.needs.forEach(n => txTotal += n.amount);
            tx.wants.forEach(w => txTotal += w.amount);
            return total + txTotal;
        }, 0);

        // Calculate savings rate (assuming income is in needs)
        const savingsRate = totalNeeds > 0 ? ((totalNeeds - totalWants) / totalNeeds) * 100 : 0;

        // Generate monthly spending data for chart
        const monthlySpendingData = Array.from({ length: 6 }, (_, i) => {
            const month = moment().subtract(i, 'months');
            const monthTransactions = user.transactions.filter(tx =>
                moment(tx.date).isSame(month, 'month')
            );
            const monthTotal = monthTransactions.reduce((total, tx) => {
                let txTotal = 0;
                tx.needs.forEach(n => txTotal += n.amount);
                tx.wants.forEach(w => txTotal += w.amount);
                return total + txTotal;
            }, 0);
            return {
                month: month.format('MMM'),
                amount: monthTotal
            };
        }).reverse();

        // Generate weekly data for chart
        const weeklyData = Array.from({ length: 7 }, (_, i) => {
            const day = moment().subtract(i, 'days');
            const dayTransactions = user.transactions.filter(tx =>
                moment(tx.date).isSame(day, 'day')
            );
            const dayNeeds = dayTransactions.reduce((total, tx) =>
                total + tx.needs.reduce((sum, n) => sum + n.amount, 0), 0
            );
            const dayWants = dayTransactions.reduce((total, tx) =>
                total + tx.wants.reduce((sum, w) => sum + w.amount, 0), 0
            );
            return {
                day: day.format('ddd'),
                needs: dayNeeds,
                wants: dayWants
            };
        }).reverse();

        // Generate category data for pie chart
        const categoryData = [
            { name: "Needs", value: totalNeeds, color: "#ffd700" },
            { name: "Wants", value: totalWants, color: "#c0c0c0" }
        ];

        // Count spending alerts (example: transactions exceeding a threshold)
        const spendingAlerts = user.transactions.filter(tx => {
            const total = tx.needs.reduce((sum, n) => sum + n.amount, 0) +
                          tx.wants.reduce((sum, w) => sum + w.amount, 0);
            return total > 1000; // Example threshold
        }).length;

        res.status(200).json({
            success: true,
            data: {
                totalBalance,
                monthlySpending,
                savingsRate,
                spendingAlerts,
                monthlySpendingData,
                weeklyData,
                categoryData
            }
        });
    } catch (err) {
        console.error("Error fetching dashboard data:", err);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard data", error: err.message });
    }
};
