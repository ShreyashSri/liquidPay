import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditBalanceChart } from "@/components/dashboard/credit-balance-chart"
import { TradingActivityChart } from "@/components/dashboard/trading-activity-chart"
import { CreditAllocationChart } from "@/components/dashboard/credit-allocation-chart"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ESGScoreCard } from "@/components/dashboard/esg-score-card"
import { CarbonFootprintCard } from "@/components/dashboard/carbon-footprint-card"
import { PredictionInsights } from "@/components/dashboard/prediction-insights"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download, Filter } from "lucide-react"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your carbon credit portfolio and market activity</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ESGScoreCard />
        <CarbonFootprintCard />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Credit Balance</CardTitle>
            <CardDescription>Total available credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,450</div>
            <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>+24.5% from last month</span>
            </div>
            <CreditBalanceChart className="mt-4 h-[80px]" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Activity</CardTitle>
                <CardDescription>Your trading volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <TradingActivityChart className="h-[300px]" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Credit Allocation</CardTitle>
                <CardDescription>Distribution of your carbon credits</CardDescription>
              </CardHeader>
              <CardContent>
                <CreditAllocationChart className="h-[300px]" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <MarketOverview />
            <RecentTransactions />
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trading Activity</CardTitle>
              <CardDescription>Detailed view of your trading history</CardDescription>
            </CardHeader>
            <CardContent>
              <TradingActivityChart className="h-[400px]" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <PredictionInsights />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Composition</CardTitle>
              <CardDescription>Breakdown of your carbon credit assets</CardDescription>
            </CardHeader>
            <CardContent>
              <CreditAllocationChart className="h-[400px]" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

