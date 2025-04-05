"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const initialGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 50000,
    current: 35000,
    deadline: "Dec 2023",
    color: "from-yellow-500 to-yellow-300",
  },
  {
    id: 2,
    title: "New Laptop",
    target: 80000,
    current: 20000,
    deadline: "Mar 2024",
    color: "from-gray-400 to-gray-300",
  },
  {
    id: 3,
    title: "Vacation",
    target: 120000,
    current: 48000,
    deadline: "Jun 2024",
    color: "from-yellow-600 to-yellow-400",
  },
]

export default function SavingsGoals() {
  const [goals, setGoals] = useState(initialGoals)

  const calculatePercentage = (current, target) => {
    return Math.round((current / target) * 100)
  }

  return (
    <section className="w-full py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Savings Goals</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Set and track your financial goals with our gamified savings system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${goal.color}`}></div>
              <CardHeader>
                <CardTitle className="text-white">{goal.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  Target: ₹{goal.target.toLocaleString()} • Due: {goal.deadline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{calculatePercentage(goal.current, goal.target)}%</span>
                  </div>
                  <Progress value={calculatePercentage(goal.current, goal.target)} className="h-2 bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current</span>
                    <span className="text-white font-medium">₹{goal.current.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Remaining</span>
                    <span className="text-white font-medium">₹{(goal.target - goal.current).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border-none">
                  Add Funds
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="bg-gray-800 border-gray-700 shadow-lg flex flex-col items-center justify-center p-8 border-dashed">
            <PlusCircle className="h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">Create New Goal</h3>
            <p className="text-gray-500 text-center mb-4">Set up a new savings target to track your progress</p>
            <Button className="bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500 border-none">
              Add Goal
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

