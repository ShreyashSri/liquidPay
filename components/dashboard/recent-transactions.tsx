"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock transaction data
const transactions = [
  {
    id: 1,
    name: "Starbucks Coffee",
    date: "2023-11-15",
    amount: -450,
    category: "Food",
    type: "expense",
  },
  {
    id: 2,
    name: "Amazon Purchase",
    date: "2023-11-14",
    amount: -2500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 3,
    name: "Salary Deposit",
    date: "2023-11-10",
    amount: 45000,
    category: "Income",
    type: "income",
  },
  {
    id: 4,
    name: "Movie Tickets",
    date: "2023-11-08",
    amount: -800,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: 5,
    name: "Uber Ride",
    date: "2023-11-07",
    amount: -350,
    category: "Transport",
    type: "expense",
  },
  {
    id: 6,
    name: "Electricity Bill",
    date: "2023-11-05",
    amount: -1200,
    category: "Bills",
    type: "expense",
  },
];

export default function RecentTransactions() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-700 border-gray-600 text-white"
        />
      </div>

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-650 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-500/20"
                      : "bg-red-500/20"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{transaction.name}</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-white"
                  }`}
                >
                  {transaction.type === "income" ? "+" : ""}₹
                  {Math.abs(transaction.amount).toLocaleString()}
                </p>
                <Badge
                  variant="outline"
                  className="bg-gray-800 text-gray-300 border-gray-600"
                >
                  {transaction.category}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          className="text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          View All Transactions
        </Button>
      </div>
    </div>
  );
}
