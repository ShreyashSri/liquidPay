"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Mock savings goals data
const savingsGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 50000,
    current: 35000,
    deadline: "Dec 2023",
  },
  {
    id: 2,
    name: "New Laptop",
    target: 80000,
    current: 20000,
    deadline: "Mar 2024",
  },
  {
    id: 3,
    name: "Vacation",
    target: 120000,
    current: 48000,
    deadline: "Jun 2024",
  },
];

export default function SavingsSummary() {
  const calculatePercentage = (current, target) => {
    return Math.round((current / target) * 100);
  };

  return (
    <div className="space-y-6">
      {savingsGoals.map((goal) => (
        <div key={goal.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-white">{goal.name}</h4>
            <span className="text-xs text-gray-400">Due: {goal.deadline}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">
              ₹{goal.current.toLocaleString()}
            </span>
            <span className="text-gray-400">
              ₹{goal.target.toLocaleString()}
            </span>
          </div>
          <Progress
            value={calculatePercentage(goal.current, goal.target)}
            className="h-2 bg-gray-700"
          />
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">
              {calculatePercentage(goal.current, goal.target)}% complete
            </span>
            <span className="text-gray-500">
              ₹{(goal.target - goal.current).toLocaleString()} to go
            </span>
          </div>
        </div>
      ))}

      <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
        Add New Goal
      </Button>
    </div>
  );
}
