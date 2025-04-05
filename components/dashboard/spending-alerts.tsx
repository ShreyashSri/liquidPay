"use client";

import { AlertCircle, TrendingUp, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock alerts data
const alerts = [
  {
    id: 1,
    title: "High Food Spending",
    description:
      "You've spent ₹5,200 on food this month, which is 30% higher than your usual spending.",
    type: "warning",
    date: "2 hours ago",
    icon: <CreditCard className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 2,
    title: "Subscription Renewal",
    description:
      "Your Netflix subscription (₹499) will renew tomorrow. Consider if you still need this service.",
    type: "info",
    date: "1 day ago",
    icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 3,
    title: "Savings Opportunity",
    description:
      "Based on your spending pattern, you could save an additional ₹2,000 this month by reducing entertainment expenses.",
    type: "success",
    date: "3 days ago",
    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
  },
];

export default function SpendingAlerts() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border ${
            alert.type === "warning"
              ? "bg-yellow-500/10 border-yellow-500/30"
              : alert.type === "success"
              ? "bg-green-500/10 border-green-500/30"
              : "bg-blue-500/10 border-blue-500/30"
          }`}
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0 mt-0.5">{alert.icon}</div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-1">
                {alert.title}
              </h4>
              <p className="text-xs text-gray-400 mb-2">{alert.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{alert.date}</span>
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-yellow-500 hover:text-yellow-400"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        className="w-full text-gray-300 border-gray-600 hover:bg-gray-700"
      >
        View All Alerts
      </Button>
    </div>
  );
}
