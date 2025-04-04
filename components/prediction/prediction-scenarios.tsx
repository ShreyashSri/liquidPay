import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const baselineData = [
  { name: "Jul", price: 28.5 },
  { name: "Aug", price: 29.2 },
  { name: "Sep", price: 30.5 },
  { name: "Oct", price: 31.8 },
  { name: "Nov", price: 33.2 },
  { name: "Dec", price: 34.5 },
]

const bullishData = [
  { name: "Jul", price: 28.5 },
  { name: "Aug", price: 30.1 },
  { name: "Sep", price: 32.8 },
  { name: "Oct", price: 35.5 },
  { name: "Nov", price: 38.2 },
  { name: "Dec", price: 41.0 },
]

const bearishData = [
  { name: "Jul", price: 28.5 },
  { name: "Aug", price: 27.8 },
  { name: "Sep", price: 26.5 },
  { name: "Oct", price: 25.2 },
  { name: "Nov", price: 24.8 },
  { name: "Dec", price: 23.5 },
]

export function PredictionScenarios() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Scenarios</CardTitle>
        <CardDescription>Explore different potential market outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="baseline">
          <TabsList className="mb-4">
            <TabsTrigger value="baseline">Baseline</TabsTrigger>
            <TabsTrigger value="bullish">Bullish</TabsTrigger>
            <TabsTrigger value="bearish">Bearish</TabsTrigger>
          </TabsList>

          <TabsContent value="baseline">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Baseline Scenario</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  75% Probability
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                This scenario assumes current market trends continue with gradual policy implementation and steady
                demand growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">End of Period Price</div>
                  <div className="text-2xl font-bold">$34.50</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Price Change</div>
                  <div className="text-2xl font-bold text-green-600">+21.1%</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Volatility</div>
                  <div className="text-2xl font-bold">Medium</div>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={baselineData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[20, 45]} />
                  <Tooltip formatter={(value) => [`$${value}`, "Price"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Baseline Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="bullish">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Bullish Scenario</h3>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                >
                  15% Probability
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                This scenario assumes accelerated policy implementation, strong corporate commitments, and supply
                constraints.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">End of Period Price</div>
                  <div className="text-2xl font-bold">$41.00</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Price Change</div>
                  <div className="text-2xl font-bold text-green-600">+43.9%</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Volatility</div>
                  <div className="text-2xl font-bold">High</div>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bullishData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[20, 45]} />
                  <Tooltip formatter={(value) => [`$${value}`, "Price"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Bullish Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="bearish">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Bearish Scenario</h3>
                <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  10% Probability
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                This scenario assumes policy rollbacks, economic downturn affecting corporate commitments, and
                oversupply.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">End of Period Price</div>
                  <div className="text-2xl font-bold">$23.50</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Price Change</div>
                  <div className="text-2xl font-bold text-red-600">-17.5%</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Volatility</div>
                  <div className="text-2xl font-bold">Medium</div>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bearishData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[20, 45]} />
                  <Tooltip formatter={(value) => [`$${value}`, "Price"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Bearish Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

