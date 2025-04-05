"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { Download, Filter, Search, ArrowUpRight, ArrowDownRight, FileText, BarChart3 } from "lucide-react"
import { useState } from "react"

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [transactionType, setTransactionType] = useState("all")

  const transactions = [
    {
      id: "TX123456",
      type: "buy",
      creditType: "Renewable Energy",
      amount: 500,
      price: 28.5,
      total: 14250,
      counterparty: "EcoSolutions Corp",
      date: "2023-06-15T10:30:00",
      status: "completed",
    },
    {
      id: "TX123457",
      type: "sell",
      creditType: "Forest Conservation",
      amount: 300,
      price: 32.75,
      total: 9825,
      counterparty: "Green Investments Ltd",
      date: "2023-06-14T14:45:00",
      status: "completed",
    },
    {
      id: "TX123458",
      type: "buy",
      creditType: "Methane Capture",
      amount: 750,
      price: 19.25,
      total: 14437.5,
      counterparty: "CleanAir Technologies",
      date: "2023-06-12T09:15:00",
      status: "completed",
    },
    {
      id: "TX123459",
      type: "sell",
      creditType: "Wind Energy",
      amount: 200,
      price: 24.5,
      total: 4900,
      counterparty: "Sustainable Future Inc",
      date: "2023-06-10T16:20:00",
      status: "completed",
    },
    {
      id: "TX123460",
      type: "buy",
      creditType: "Reforestation Project",
      amount: 350,
      price: 29.75,
      total: 10412.5,
      counterparty: "GreenEarth Partners",
      date: "2023-06-08T11:10:00",
      status: "pending",
    },
    {
      id: "TX123461",
      type: "stake",
      creditType: "Renewable Energy",
      amount: 1000,
      price: 0,
      total: 0,
      counterparty: "Yield Farming Pool",
      date: "2023-06-07T15:30:00",
      status: "completed",
    },
    {
      id: "TX123462",
      type: "unstake",
      creditType: "Forest Conservation",
      amount: 500,
      price: 0,
      total: 0,
      counterparty: "Yield Farming Pool",
      date: "2023-06-05T09:45:00",
      status: "completed",
    },
  ]

  // Filter transactions based on search term, type, and active tab
  const filteredTransactions = transactions.filter((tx) => {
    // Search filter
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.creditType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.counterparty.toLowerCase().includes(searchTerm.toLowerCase())

    // Type filter
    const matchesType = transactionType === "all" || tx.type === transactionType

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "buy" && tx.type === "buy") ||
      (activeTab === "sell" && tx.type === "sell") ||
      (activeTab === "yield" && (tx.type === "stake" || tx.type === "unstake"))

    return matchesSearch && matchesType && matchesTab
  })

  // Calculate transaction statistics
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.total, 0)
  const buyVolume = transactions.filter((tx) => tx.type === "buy").reduce((sum, tx) => sum + tx.total, 0)
  const sellVolume = transactions.filter((tx) => tx.type === "sell").reduce((sum, tx) => sum + tx.total, 0)

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Transactions</h1>
          <p className="text-muted-foreground">View and manage your carbon credit transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Total Volume</span>
                <span className="text-2xl font-bold">${totalVolume.toLocaleString()}</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+18.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Buy Volume</span>
                <span className="text-2xl font-bold">${buyVolume.toLocaleString()}</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+22.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">Sell Volume</span>
                <span className="text-2xl font-bold">${sellVolume.toLocaleString()}</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ArrowDownRight className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+14.7% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your carbon credit transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="stake">Stake</SelectItem>
                  <SelectItem value="unstake">Unstake</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="buy">Buys</TabsTrigger>
              <TabsTrigger value="sell">Sells</TabsTrigger>
              <TabsTrigger value="yield">Yield Farming</TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No transactions found matching your filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setTransactionType("all")
                  setActiveTab("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Credit Type</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                      <TableCell className="font-medium">{tx.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tx.type === "buy"
                              ? "default"
                              : tx.type === "sell"
                                ? "secondary"
                                : tx.type === "stake"
                                  ? "outline"
                                  : "outline"
                          }
                        >
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{tx.creditType}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {tx.counterparty
                                .split(" ")
                                .map((name) => name[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{tx.counterparty}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{tx.amount}</TableCell>
                      <TableCell className="text-right">
                        {tx.type === "buy" || tx.type === "sell" ? `$${tx.price.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {tx.type === "buy" || tx.type === "sell" ? `$${tx.total.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell className="text-right">{new Date(tx.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            tx.status === "completed"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }
                        >
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

