"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  ChartContainer,
} from "@/components/ui/chart";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import SpendingAlerts from "@/components/dashboard/spending-alerts";
import SavingsSummary from "@/components/dashboard/savings-summary";

interface MonthlySpendingData {
  month: string;
  amount: number;
}

interface WeeklyData {
  day: string;
  needs: number;
  wants: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface DashboardData {
  totalBalance: number;
  monthlySpending: number;
  savingsRate: number;
  spendingAlerts: number;
  monthlySpendingData: MonthlySpendingData[];
  weeklyData: WeeklyData[];
  categoryData: CategoryData[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = Cookies.get("token");

      // if (!token) {
      //   console.error("❌ No token found in cookies");
      //   return;
      // }

      try {
        const res = await axios.get("http://localhost:8188/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setData(res.data.data);
      } catch (error) {
        console.error("❌ Failed to fetch dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  const transactions = [
    {
      id: 1,
      name: "Grocery Shopping",
      date: "2025-04-04",
      amount: -1200,
      type: "Debit",
    },
    {
      id: 2,
      name: "Salary Credited",
      date: "2025-04-03",
      amount: 25000,
      type: "Credit",
    },
    {
      id: 3,
      name: "Electricity Bill",
      date: "2025-04-02",
      amount: -1800,
      type: "Debit",
    },
    {
      id: 4,
      name: "Coffee",
      date: "2025-04-01",
      amount: -150,
      type: "Debit",
    },
  ];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back! Here's your financial overview.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
            Connect Bank Account
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">
                Total Balance
              </CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">
                  ₹{data.totalBalance.toLocaleString()}
                </CardTitle>
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
              <CardDescription className="text-gray-400">
                Monthly Spending
              </CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">
                  ₹{data.monthlySpending.toLocaleString()}
                </CardTitle>
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
              <CardDescription className="text-gray-400">
                Savings Rate
              </CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">
                  {data.savingsRate.toFixed(1)}%
                </CardTitle>
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
              <CardDescription className="text-gray-400">
                Spending Alerts
              </CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">
                  {data.spendingAlerts}
                </CardTitle>
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
                <CardDescription className="text-gray-400">
                  Your spending patterns over time
                </CardDescription>
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
                          data={transactions}
                          index="month"
                          categories={["amount"]}
                          colors={["#ffd700"]}
                          valueFormatter={(value: number) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="weekly" className="pt-4">
                    <div className="h-80">
                      <ChartContainer>
                        <BarChart
                          data={data.weeklyData}
                          index="day"
                          categories={["needs", "wants"]}
                          colors={["#c0c0c0", "#ffd700"]}
                          valueFormatter={(value: number) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending by Category</CardTitle>
                <CardDescription className="text-gray-400">
                  Where your money goes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <PieChart
                      data={data.categoryData}
                      index="name"
                      category="value"
                      colors={data.categoryData.map((item) => item.color)}
                      valueFormatter={(value: number) => `${value}%`}
                      className="h-80"
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg font-semibold">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="divide-y divide-gray-700">
                  {transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{txn.name}</p>
                        <p className="text-xs text-gray-400">{txn.date}</p>
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          txn.amount > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {txn.amount > 0 ? "+" : "-"}₹{Math.abs(txn.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending Alerts</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered notifications to help you save
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpendingAlerts />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Savings Summary</CardTitle>
                <CardDescription className="text-gray-400">
                  Progress towards your financial goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsSummary />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
