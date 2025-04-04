"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PredictionChart } from "@/components/prediction/prediction-chart"
import { PredictionFactors } from "@/components/prediction/prediction-factors"
import { PredictionScenarios } from "@/components/prediction/prediction-scenarios"
import { PredictionRecommendations } from "@/components/prediction/prediction-recommendations"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, RefreshCw } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function PredictionPage() {
  const [forecastPeriod, setForecastPeriod] = useState("30")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filters, setFilters] = useState({
    creditTypes: ["renewable", "forest", "methane"],
    includeMarketSentiment: true,
    includePolicyChanges: true,
    includeHistoricalData: true,
  })

  const handleRefresh = () => {
    alert("Refreshing AI predictions with the latest market data...")
    // In a real app, this would trigger a new prediction calculation
  }

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setShowFilterDialog(false)
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">AI Predictions</h1>
          <p className="text-muted-foreground">AI-powered forecasting and market insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Forecast period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
              <SelectItem value="180">6 Months</SelectItem>
              <SelectItem value="365">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setShowFilterDialog(true)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Market Price Forecast</CardTitle>
          <CardDescription>AI-predicted carbon credit price trends for the next {forecastPeriod} days</CardDescription>
        </CardHeader>
        <CardContent>
          <PredictionChart className="h-[400px]" forecastPeriod={Number.parseInt(forecastPeriod)} />
        </CardContent>
      </Card>

      <Tabs defaultValue="factors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="factors">Influencing Factors</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-6">
          <PredictionFactors />
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <PredictionScenarios />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <PredictionRecommendations />
        </TabsContent>
      </Tabs>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px] glass-card">
          <DialogHeader>
            <DialogTitle>Prediction Filters</DialogTitle>
            <DialogDescription>Customize which data is used in the AI prediction model</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <h4 className="font-medium">Credit Types</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-renewable"
                    checked={filters.creditTypes.includes("renewable")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({ ...filters, creditTypes: [...filters.creditTypes, "renewable"] })
                      } else {
                        setFilters({ ...filters, creditTypes: filters.creditTypes.filter((t) => t !== "renewable") })
                      }
                    }}
                  />
                  <Label htmlFor="filter-renewable">Renewable Energy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-forest"
                    checked={filters.creditTypes.includes("forest")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({ ...filters, creditTypes: [...filters.creditTypes, "forest"] })
                      } else {
                        setFilters({ ...filters, creditTypes: filters.creditTypes.filter((t) => t !== "forest") })
                      }
                    }}
                  />
                  <Label htmlFor="filter-forest">Forest Conservation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-methane"
                    checked={filters.creditTypes.includes("methane")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({ ...filters, creditTypes: [...filters.creditTypes, "methane"] })
                      } else {
                        setFilters({ ...filters, creditTypes: filters.creditTypes.filter((t) => t !== "methane") })
                      }
                    }}
                  />
                  <Label htmlFor="filter-methane">Methane Capture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-ocean"
                    checked={filters.creditTypes.includes("ocean")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({ ...filters, creditTypes: [...filters.creditTypes, "ocean"] })
                      } else {
                        setFilters({ ...filters, creditTypes: filters.creditTypes.filter((t) => t !== "ocean") })
                      }
                    }}
                  />
                  <Label htmlFor="filter-ocean">Ocean Carbon</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="font-medium">Data Sources</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-sentiment"
                    checked={filters.includeMarketSentiment}
                    onCheckedChange={(checked) => {
                      setFilters({ ...filters, includeMarketSentiment: !!checked })
                    }}
                  />
                  <Label htmlFor="filter-sentiment">Include Market Sentiment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-policy"
                    checked={filters.includePolicyChanges}
                    onCheckedChange={(checked) => {
                      setFilters({ ...filters, includePolicyChanges: !!checked })
                    }}
                  />
                  <Label htmlFor="filter-policy">Include Policy Changes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-historical"
                    checked={filters.includeHistoricalData}
                    onCheckedChange={(checked) => {
                      setFilters({ ...filters, includeHistoricalData: !!checked })
                    }}
                  />
                  <Label htmlFor="filter-historical">Include Historical Data</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Cancel
            </Button>
            <Button className="button-gradient" onClick={() => applyFilters(filters)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

