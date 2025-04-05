"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart, ChartContainer } from "@/components/ui/chart"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, CreditCard, AlertCircle } from "lucide-react"
import RecentTransactions from "@/components/dashboard/recent-transactions"
import SpendingAlerts from "@/components/dashboard/spending-alerts"
import SavingsSummary from "@/components/dashboard/savings-summary"

// Mock data
const monthlySpending = [
  { month: "Jan", amount: 4500 },
  { month: "Feb", amount: 5200 },
  { month: "Mar", amount: 4800 },
  { month: "Apr", amount: 5100 },
  { month: "May", amount: 4300 },
  { month: "Jun", amount: 4700 },
]

const categoryData = [
  { name: "Food", value: 35, color: "#ffd700" },
  { name: "Entertainment", value: 20, color: "#c0c0c0" },
  { name: "Shopping", value: 15, color: "#9c9c9c" },
  { name: "Transport", value: 10, color: "#787878" },
  { name: "Bills", value: 20, color: "#505050" },
]

const weeklyData = [
  { day: "Mon", needs: 500, wants: 300 },
  { day: "Tue", needs: 450, wants: 250 },
  { day: "Wed", needs: 600, wants: 400 },
  { day: "Thu", needs: 550, wants: 350 },
  { day: "Fri", needs: 700, wants: 500 },
  { day: "Sat", needs: 400, wants: 600 },
  { day: "Sun", needs: 350, wants: 450 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's your financial overview.</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
            Connect Bank Account
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Total Balance</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">₹42,500</CardTitle>
                <Wallet className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+5.2% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Monthly Spending</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">₹15,200</CardTitle>
                <CreditCard className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>-2.4% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Savings Rate</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">24%</CardTitle>
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>+3.1% from target</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Spending Alerts</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">3</CardTitle>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-yellow-500 text-sm">
                <span>2 high-priority alerts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending Overview</CardTitle>
                <CardDescription className="text-gray-400">Your spending patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="monthly">
                  <TabsList className="bg-gray-700">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly" className="pt-4">
                    <div className="h-80">
                      <ChartContainer>
                        <LineChart
                          data={monthlySpending}
                          index="month"
                          categories={["amount"]}
                          colors={["#ffd700"]}
                          valueFormatter={(value) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="weekly" className="pt-4">
                    <div className="h-80">
                      <ChartContainer>
                        <BarChart
                          data={weeklyData}
                          index="day"
                          categories={["needs", "wants"]}
                          colors={["#c0c0c0", "#ffd700"]}
                          valueFormatter={(value) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
                <CardDescription className="text-gray-400">Your latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending by Category</CardTitle>
                <CardDescription className="text-gray-400">Where your money goes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <PieChart
                      data={categoryData}
                      index="name"
                      category="value"
                      colors={categoryData.map((item) => item.color)}
                      valueFormatter={(value) => `${value}%`}
                      className="h-80"
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending Alerts</CardTitle>
                <CardDescription className="text-gray-400">AI-powered notifications to help you save</CardDescription>
              </CardHeader>
              <CardContent>
                <SpendingAlerts />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Savings Summary</CardTitle>
                <CardDescription className="text-gray-400">Progress towards your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsSummary />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

