"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, ChartContainer } from "@/components/ui/chart"

const spendingData = [
  { name: "Food", value: 35, color: "#ffd700" },
  { name: "Entertainment", value: 20, color: "#c0c0c0" },
  { name: "Shopping", value: 15, color: "#9c9c9c" },
  { name: "Transport", value: 10, color: "#787878" },
  { name: "Bills", value: 20, color: "#505050" },
]

const monthlyData = [
  { month: "Jan", needs: 1200, wants: 800 },
  { month: "Feb", needs: 1100, wants: 900 },
  { month: "Mar", needs: 1300, wants: 750 },
  { month: "Apr", needs: 1250, wants: 650 },
  { month: "May", needs: 1400, wants: 600 },
  { month: "Jun", needs: 1350, wants: 500 },
]

const weeklySpending = [
  { day: "Mon", amount: 45 },
  { day: "Tue", amount: 80 },
  { day: "Wed", amount: 65 },
  { day: "Thu", amount: 120 },
  { day: "Fri", amount: 150 },
  { day: "Sat", amount: 180 },
  { day: "Sun", amount: 90 },
]

export default function SpendingInsights() {
  return (
    <section className="w-full py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Spending Insights</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Visualize your spending patterns and identify opportunities to save
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Spending Categories</CardTitle>
                  <CardDescription className="text-gray-400">Breakdown of your spending by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer>
                      <PieChart
                        data={spendingData}
                        index="name"
                        category="value"
                        colors={spendingData.map((item) => item.color)}
                        valueFormatter={(value) => `₹${value}`}
                        className="h-80"
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Needs vs. Wants</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your essential vs. non-essential spending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer>
                      <BarChart
                        data={monthlyData}
                        index="month"
                        categories={["needs", "wants"]}
                        colors={["#c0c0c0", "#ffd700"]}
                        valueFormatter={(value) => `₹${value}`}
                        className="h-80"
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Monthly Spending Trend</CardTitle>
                <CardDescription className="text-gray-400">
                  Track your spending patterns over the past 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer>
                    <LineChart
                      data={monthlyData}
                      index="month"
                      categories={["needs", "wants"]}
                      colors={["#c0c0c0", "#ffd700"]}
                      valueFormatter={(value) => `₹${value}`}
                      className="h-96"
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Weekly Spending</CardTitle>
                <CardDescription className="text-gray-400">Your spending pattern throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ChartContainer>
                    <BarChart
                      data={weeklySpending}
                      index="day"
                      categories={["amount"]}
                      colors={["#ffd700"]}
                      valueFormatter={(value) => `₹${value}`}
                      className="h-96"
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

