"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  Loader2
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

interface ExpenseItem {
  item: string;
  amount: number;
  time: string;
  _id: string;
}

interface DailyBudget {
  date: string;
  _id: string;
  needs: ExpenseItem[];
  wants: ExpenseItem[];
}

interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
}

interface Goal {
  _id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  reward: number;
  isCompleted: boolean;
  isAI: boolean;
  createdAt: Date;
}

type Transaction = {
  category: string;
  amount: number;
  date: string;
  type: 'need' | 'want';
};



type TransactionResponse = {
  user: string;
  range: string;
  totalTransactions: number;
  transactions: {
    date: string;
    needs: Transaction[];
    wants: Transaction[];
  }[];
};



export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // Put this at the top of your component



  const [budgetItems, setBudgetItems] = useState<DailyBudget[]>([]);
  const [summary, setSummary] = useState<BudgetSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("monthly");
  const [userId, setUserId] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState<boolean>(false);
  const [goalsError, setGoalsError] = useState<string | null>(null);
  const [monthlyData, setMonthlyData] = useState<DailyBudget[]>([]);
  const [weeklyData, setWeeklyData] = useState<DailyBudget[]>([]);


  const getGoals = async () => {
    if (!userId) {
      console.log("Cannot fetch goals: User ID is missing");
      return;
    }

    try {
      setIsLoadingGoals(true);
      setGoalsError(null);

      const response = await axios.get(
        `http://localhost:8188/api/goals/${userId}`,
        { withCredentials: true }
      );

      console.log("Goals Response:", response.data);

      if (response.data.success) {
        setGoals(response.data.goals);
      } else {
        console.error("Failed to fetch goals:", response.data.message);
        setGoalsError(response.data.message || "Failed to fetch goals");
      }
    } catch (error: any) {
      console.error("Error in getGoals:", error);
      setGoalsError(error.response?.data?.message || "Failed to fetch goals");
    } finally {
      setIsLoadingGoals(false);
    }
  };

  // Call this function when component mounts or userId changes
  useEffect(() => {
    if (userId) {
      getGoals();
    }
  }, [userId]);


  const fetchBudgetItems = async () => {
    try {
      setIsLoading(true);
      console.log("Starting to fetch budget items...");

      // Step 1: Check authentication
      const authResponse = await axios.get("http://localhost:8188/api/auth/checkAuth", {
        withCredentials: true,
      });
      console.log("Auth response:", authResponse.data);

      if (!authResponse.data.success || !authResponse.data.user) {
        console.log("Authentication failed");
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      const userId = authResponse.data.user._id;
      console.log("User ID:", userId);
      setUserId(userId);

      // Step 2: Fetch user's budget items
      const response = await axios.get(
        `http://localhost:8188/api/budget`,
        { withCredentials: true }
      );
      console.log("Budget response:", response.data);

      if (response.data.success) {
        const allItems = response.data.items || [];
        console.log("Budget items:", allItems);

        // Store all items for summary calculation
        const allItemsCopy = [...allItems];

        // Filter for days with transactions
        const daysWithTransactions = allItems.filter((day: DailyBudget) =>
          (day.needs && day.needs.length > 0) || (day.wants && day.wants.length > 0)
        );

        // Sort by date (newest first)
        daysWithTransactions.sort((a: DailyBudget, b: DailyBudget) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Get last 3 days (or fewer if there aren't 3)
        const lastThreeDays = daysWithTransactions.slice(0, 3);

        console.log("Last three days with transactions:", lastThreeDays);

        // Update budget items state with filtered data
        setBudgetItems(lastThreeDays);

        // Calculate summary based on all items
        calculateSummary(allItemsCopy);
      } else {
        console.log("Failed to fetch budget items:", response.data.message);
        setError(response.data.message || "Failed to fetch budget items");
      }
    } catch (error: any) {
      console.error("Error in fetchBudgetItems:", error);
      console.error("Error response:", error.response?.data);
      setError(error.response?.data?.message || "Failed to fetch budget items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetItems();
  }, []);

  const calculateSummary = (items: DailyBudget[]) => {
    console.log("Calculating summary for items:", items);
    if (!items || !Array.isArray(items)) {
      console.log("Invalid items array");
      setSummary({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        savingsRate: 0,
      });
      return;
    }

    // Calculate total of all needs and wants expenses
    let totalExpenses = 0;

    items.forEach(dailyBudget => {
      // Sum up all needs expenses
      if (dailyBudget.needs && Array.isArray(dailyBudget.needs)) {
        dailyBudget.needs.forEach(need => {
          totalExpenses += need.amount || 0;
        });
      }

      // Sum up all wants expenses
      if (dailyBudget.wants && Array.isArray(dailyBudget.wants)) {
        dailyBudget.wants.forEach(want => {
          totalExpenses += want.amount || 0;
        });
      }
    });

    // Placeholder for income - you might need to adjust this based on your actual data structure
    const totalIncome = 5000; // Example fixed income
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

    console.log("Calculated summary:", {
      totalIncome,
      totalExpenses,
      balance,
      savingsRate
    });

    setSummary({
      totalIncome,
      totalExpenses,
      balance,
      savingsRate,
    });
  };


  const getTotalExpensesForDay = (day: DailyBudget): number => {
    let total = 0;
    if (day.needs && Array.isArray(day.needs)) {
      day.needs.forEach(need => total += need.amount || 0);
    }
    if (day.wants && Array.isArray(day.wants)) {
      day.wants.forEach(want => total += want.amount || 0);
    }
    return total;
  };

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
  

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your dashboard...
      </div>
    );
  }

  const transformToDailyBudget = (groupedTx: any[]) => {
    return groupedTx.map((day) => ({
      _id: day.date, // Use the date as _id or generate a unique ID as needed
      date: day.date,
      needs: day.needs.map((t) => ({
        item: t.item,
        amount: t.amount,
        time: t.time,
        _id: t._id,
      })),
      wants: day.wants.map((t) => ({
        item: t.item,
        amount: t.amount,
        time: t.time,
        _id: t._id,
      })),
    }));
  };



  // Fetch transactions and transform the
  // m


  const fetchTransactions = async (duration: 'w' | 'm' | 'd') => {
    if (!userId) {
      console.error('❌ No userId found');
      return [];
    }

    try {
      setIsLoading(true);

      const response = await axios.get<TransactionResponse>(
        `http://localhost:8188/api/transactions/${userId}?duration=${duration}`,
        { withCredentials: true }
      );

      const fetchedGrouped = response.data.transactions || [];

      // Flatten the fetched grouped data into a list of transactions
      const flattenedTx: Transaction[] = fetchedGrouped.flatMap((day) => [
        ...day.needs.map((t) => ({ ...t, date: day.date, type: 'need' as const })),
        ...day.wants.map((t) => ({ ...t, date: day.date, type: 'want' as const }))
      ]);

      setTransactions(flattenedTx);

      // Transform grouped data to fit daily budget format
      const transformed = transformToDailyBudget(fetchedGrouped);
      return transformed;
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      setError('Failed to fetch transactions');
      return [];
    } finally {
      setIsLoading(false);
    }
  };


  const handleTabChange = async (tab: 'monthly' | 'weekly') => {
    setActiveTab(tab);

    const duration = tab === 'monthly' ? 'm' : 'w';
    const transformedData = await fetchTransactions(duration);

    if (tab === 'monthly') {
      setMonthlyData(transformedData);
    } else {
      setWeeklyData(transformedData); // optional if you still want to render somewhere else
    }
  };




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
                  ₹{ }
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
                  ₹{18956.5}
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
          {/* First row: Spending Overview (2 cols) and Spending by Category (1 col) */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Spending Overview</CardTitle>
                <CardDescription className="text-gray-400">
                  Your spending patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="monthly" value={activeTab} onValueChange={(value) => void handleTabChange(value as 'monthly' | 'weekly')}>
                  <TabsList className="bg-gray-700">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly"  className="pt-4">
                    <div className="h-80">
                      <ChartContainer>
                      <BarChart
                          data={monthlyData.map(item => ({
                            date: item.date,
                            needs: item.needs.reduce((acc, tx) => acc + tx.amount, 0),
                            wants: item.wants.reduce((acc, tx) => acc + tx.amount, 0)
                          }))}
                          index="date"
                          categories={["needs", "wants"]}
                          colors={["#c0c0c0", "#ffd700"]}
                          valueFormatter={(value: number) => `₹${value}`}
                          className="h-80"
                        />
                      </ChartContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="weekly"  className="pt-4">
                    <div className="h-80">
                      <ChartContainer>
                        <BarChart
                          data={weeklyData.map(item => ({
                            date: item.date,
                            needs: item.needs.reduce((acc, tx) => acc + tx.amount, 0),
                            wants: item.wants.reduce((acc, tx) => acc + tx.amount, 0)
                          }))}
                          index="date"
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
          </div>

          {/* Second row: Recent Transactions (spans full width) */}
          <div className="col-span-1 lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg font-semibold">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="divide-y divide-gray-700">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                    </div>
                  ) : budgetItems && budgetItems.length > 0 ? (
                    budgetItems
                      .filter(day => day.needs.length > 0 || day.wants.length > 0) // Only show days with transactions
                      .map((day) => (
                        <Card key={day._id} className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white flex justify-between">
                              <span>{new Date(day.date).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}</span>
                              <span className="text-red-500">₹{getTotalExpensesForDay(day).toLocaleString()}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {day.needs.length > 0 && (
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold text-white mb-2">Needs</h3>
                                {day.needs.map(need => (
                                  <div key={need._id} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
                                    <div>
                                      <p className="text-white">{need.item}</p>
                                      <p className="text-gray-400 text-sm">{need.time}</p>
                                    </div>
                                    <p className="text-red-500 font-medium">₹{need.amount.toLocaleString()}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {day.wants.length > 0 && (
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Wants</h3>
                                {day.wants.map(want => (
                                  <div key={want._id} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
                                    <div>
                                      <p className="text-white">{want.item}</p>
                                      <p className="text-gray-400 text-sm">{want.time}</p>
                                    </div>
                                    <p className="text-red-500 font-medium">₹{want.amount.toLocaleString()}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                  ) : (
                    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-400">No transactions found. Add your first expense!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>


          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Financial Goals</CardTitle>
              <CardDescription className="text-gray-400">
                Track your progress towards savings targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingGoals ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                </div>
              ) : goalsError ? (
                <div className="p-4 text-center">
                  <p className="text-red-400">Error loading goals: {goalsError}</p>
                </div>
              ) : goals && goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.map(goal => (
                    <div key={goal._id} className="bg-gray-700/40 rounded-lg p-4 border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{goal.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${goal.isCompleted ? 'bg-green-900/60 text-green-300' : 'bg-yellow-900/60 text-yellow-300'
                          }`}>
                          {goal.isCompleted ? 'Completed' : new Date(goal.deadline) > new Date() ? 'In Progress' : 'Overdue'}
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm mb-3">{goal.description}</p>

                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm mt-3">
                        <span className="text-gray-400">
                          Target: ₹{goal.targetAmount.toLocaleString()}
                        </span>
                        <span className="text-gray-400">
                          Deadline: {new Date(goal.deadline).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400 mb-4">No savings goals found.</p>
                  <Button variant="outline" className="border-yellow-600 text-yellow-500 hover:text-yellow-400">
                    {/* <PlusCircle className="h-4 w-4 mr-2" /> */}
                    Create Your First Goal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
}
