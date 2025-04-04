"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary"
import { PortfolioPerformance } from "@/components/portfolio/portfolio-performance"
import { PortfolioHoldings } from "@/components/portfolio/portfolio-holdings"
import { PortfolioTransactions } from "@/components/portfolio/portfolio-transactions"
import { YieldFarming } from "@/components/portfolio/yield-farming"
import { Download, Filter } from "lucide-react"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { useState } from "react"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("holdings")

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Portfolio</h1>
          <p className="text-muted-foreground">Manage your carbon credit assets and investments</p>
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

      <PortfolioSummary />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="yield">Yield Farming</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="space-y-6">
          <PortfolioHoldings />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PortfolioPerformance />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <PortfolioTransactions />
        </TabsContent>

        <TabsContent value="yield" className="space-y-6">
          <YieldFarming />
        </TabsContent>
      </Tabs>
    </div>
  )
}

