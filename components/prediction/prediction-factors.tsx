import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, Leaf, LineChart, TrendingUp, Wind } from "lucide-react"

export function PredictionFactors() {
  const factors = [
    {
      id: 1,
      name: "Policy Changes",
      impact: 85,
      direction: "up",
      description: "Recent government regulations are expected to increase demand for carbon credits.",
      icon: Leaf,
    },
    {
      id: 2,
      name: "Market Demand",
      impact: 75,
      direction: "up",
      description: "Growing corporate commitments to carbon neutrality are driving demand.",
      icon: TrendingUp,
    },
    {
      id: 3,
      name: "Supply Constraints",
      impact: 65,
      direction: "up",
      description: "Limited new project development is constraining supply growth.",
      icon: LineChart,
    },
    {
      id: 4,
      name: "Seasonal Factors",
      impact: 40,
      direction: "down",
      description: "Seasonal patterns typically show reduced trading activity in upcoming months.",
      icon: Wind,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {factors.map((factor) => (
        <Card key={factor.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{factor.name}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <factor.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardDescription>{factor.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Impact Strength</div>
                <div className="flex items-center gap-1">
                  {factor.direction === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium">{factor.impact}%</span>
                </div>
              </div>
              <Progress value={factor.impact} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

