"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  IndianRupee,
  Loader2,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
} from "lucide-react";
import axios from "axios";

// Updated interface to match the actual data structure
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

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useState<DailyBudget[]>([]);
  const [summary, setSummary] = useState<BudgetSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdding, setIsAdding] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Form state for new budget item
  const [newItem, setNewItem] = useState({
    item: "",
    amount: "",
    type: "needs", // Changed to "needs" or "wants"
    time: new Date().toTimeString().substring(0, 5),
  });

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
        const items = response.data.items || [];
        console.log("Budget items:", items);
        setBudgetItems(items);
        calculateSummary(items);
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

  const addBudgetItem = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userId) {
      setError("Please log in to add budget items");
      return;
    }
  
    if (!newItem.item || !newItem.amount) {
      setError("Please fill in all required fields");
      return;
    }
  
    try {
      setIsAdding(true);
      setError(null);
      
      console.log("Submitting form data:", newItem);
  
      // Format today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Use the correct endpoint and data structure
      const response = await axios.post(
        `http://localhost:8188/api/budget/add-item`,
        {
          date: today,
          itemType: newItem.type, // "needs" or "wants"
          item: {
            item: newItem.item,
            amount: Number(newItem.amount),
            time: newItem.time
          }
        },
        { withCredentials: true }
      );
      
      console.log("Response from server:", response.data);
  
      if (response.data.success) {
        console.log("Item added successfully");
        setNewItem({
          item: "",
          amount: "",
          type: "needs", // Reset to default
          time: new Date().toTimeString().substring(0, 5),
        });
        await fetchBudgetItems();
        setActiveTab("transactions");
      } else {
        console.log("Failed to add item:", response.data.message);
        setError(response.data.message || "Failed to add item");
      }
    } catch (error: any) {
      console.error("Error adding item:", error);
      console.error("Error response data:", error.response?.data);
      setError(error.response?.data?.message || "Failed to add item");
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  // Calculate total expenses for each day
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

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Budget Planner</h1>
            <p className="text-gray-400">
              Track your income and expenses to achieve your financial goals
            </p>
          </div>
          <Button
            onClick={() => setActiveTab("add")}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-800 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="add">Add Expense</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/20 rounded-full">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-400">Total Income</p>
                      <p className="text-2xl font-bold text-white">
                        ₹{(summary?.totalIncome || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/20 rounded-full">
                      <TrendingDown className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-400">Total Expenses</p>
                      <p className="text-2xl font-bold text-white">
                        ₹{(summary?.totalExpenses || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-full">
                      <PiggyBank className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-gray-400">Savings Rate</p>
                      <p className="text-2xl font-bold text-white">
                        {(summary?.savingsRate || 0).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <Wallet className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-400">Current Balance</p>
                    <p className={`text-3xl font-bold ${(summary?.balance || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ₹{(summary?.balance || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
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
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Add New Expense</CardTitle>
                <CardDescription className="text-gray-400">
                  Record your daily needs and wants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addBudgetItem} className="space-y-4">
                  <div>
                    <Label className="text-white">Item Name</Label>
                    <Input
                      name="item"
                      value={newItem.item}
                      onChange={handleInputChange}
                      placeholder="e.g., Groceries, Movie Ticket"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white">Amount (₹)</Label>
                    <Input
                      name="amount"
                      type="number"
                      value={newItem.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white">Category</Label>
                    <select
                      name="type"
                      value={newItem.type}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
                      required
                    >
                      <option value="needs">Needs</option>
                      <option value="wants">Wants</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white">Time</Label>
                    <Input
                      name="time"
                      type="time"
                      value={newItem.time}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isAdding}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white"
                  >
                    {isAdding ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Add Expense
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}