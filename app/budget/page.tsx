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

interface TransactionItem {
  _id: string;
  item: string;
  amount: number;
  time: string;
}

interface Transaction {
  date: string;
  needs: TransactionItem[];
  wants: TransactionItem[];
}

interface BudgetItem {
  _id?: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  description?: string;
}

interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
}

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
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
    category: "",
    amount: "",
    type: "expense",
    description: "",
  });

  const fetchBudgetItems = async () => {
    try {
      setIsLoading(true);
      console.log("Starting to fetch budget items...");
      
      // First check authentication
      const authResponse = await axios.get("http://localhost:8188/api/auth/checkAuth", {
        withCredentials: true,
      });
      console.log("Auth response:", authResponse.data);

      if (!authResponse.data.success || !authResponse.data.user) {
        console.log("Authentication failed");
        setError("User not authenticated");
        return;
      }

      const userId = authResponse.data.user._id;
      console.log("User ID:", userId);
      
      // Then fetch user's transactions
      const response = await axios.get(
        `http://localhost:8188/api/transactions/${userId}`,
        { withCredentials: true }
      );
      console.log("Transactions response:", response.data);

      if (response.data.success) {
        // Get all transactions from user model
        const transactions = response.data.transactions || [];
        console.log("Raw transactions:", transactions);
        
        // Flatten the transactions array to include both needs and wants
        const flattenedTransactions = transactions.flatMap((tx: Transaction) => {
          const needs = tx.needs.map((item: TransactionItem) => ({
            _id: item._id,
            category: item.item,
            amount: item.amount,
            type: "expense",
            date: tx.date,
            description: `Need: ${item.item} at ${item.time}`
          }));
          
          const wants = tx.wants.map((item: TransactionItem) => ({
            _id: item._id,
            category: item.item,
            amount: item.amount,
            type: "expense",
            date: tx.date,
            description: `Want: ${item.item} at ${item.time}`
          }));
          
          return [...needs, ...wants];
        });

        console.log("Flattened transactions:", flattenedTransactions);
        setBudgetItems(flattenedTransactions);
        calculateSummary(flattenedTransactions);
      } else {
        console.log("Failed to fetch transactions:", response.data.message);
        setError(response.data.message || "Failed to fetch transactions");
      }
    } catch (error: any) {
      console.error("Error in fetchBudgetItems:", error);
      console.error("Error response:", error.response?.data);
      setError(error.response?.data?.message || "Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetItems();
  }, []);

  const calculateSummary = (items: BudgetItem[]) => {
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

    const totalIncome = items
      .filter(item => item?.type === "income")
      .reduce((sum, item) => sum + (item?.amount || 0), 0);
    
    const totalExpenses = items
      .filter(item => item?.type === "expense")
      .reduce((sum, item) => sum + (item?.amount || 0), 0);
    
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
  
    if (!newItem.category || !newItem.amount || !newItem.type) {
      setError("Please fill in all required fields");
      return;
    }
  
    try {
      setIsAdding(true);
      setError(null);
  
      const now = new Date();
      const time = now.toTimeString().split(' ')[0].substring(0, 5);
  
      const response = await axios.post(
        `http://localhost:8188/api/transactions/postx/${userId}`,
        {
          date: now.toISOString(),
          type: newItem.type.toLowerCase(), // Ensure it's 'need' or 'want'
          category: newItem.category,
          amount: Number(newItem.amount),
          description: newItem.description || "",
          time: time
        },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        setNewItem({
          category: "",
          amount: "",
          type: "need", // or "want" as default
          description: "",
        });
        await fetchBudgetItems();
        setActiveTab("transactions");
      } else {
        setError(response.data.message || "Failed to add transaction");
      }
    } catch (error: any) {
      console.error("Error adding transaction:", error);
      setError(error.response?.data?.message || "Failed to add transaction");
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
            Add Transaction
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-800 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="add">Add Transaction</TabsTrigger>
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
                budgetItems.map((item) => (
                  <Card key={item._id} className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.category || 'Uncategorized'}
                          </h3>
                          <p className="text-gray-400">{item.description || 'No description'}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${item.type === "income" ? "text-green-500" : "text-red-500"}`}>
                            {item.type === "income" ? "+" : "-"}₹{(item.amount || 0).toLocaleString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {item.date ? new Date(item.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }) : 'No date'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-400">No transactions found. Add your first transaction!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Add New Transaction</CardTitle>
                <CardDescription className="text-gray-400">
                  Record your income or expense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addBudgetItem} className="space-y-4">
                  <div>
                    <Label className="text-white">Category</Label>
                    <Input
                      name="category"
                      value={newItem.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Salary, Groceries"
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
                    <Label className="text-white">Type</Label>
                    <select
                      name="type"
                      value={newItem.type}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2"
                      required
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white">Description (Optional)</Label>
                    <Input
                      name="description"
                      value={newItem.description}
                      onChange={handleInputChange}
                      placeholder="Add a note..."
                      className="bg-gray-700 border-gray-600 text-white"
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
                    Add Transaction
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