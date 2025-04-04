import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 280000 },
  { name: "Feb", value: 290000 },
  { name: "Mar", value: 275000 },
  { name: "Apr", value: 295000 },
  { name: "May", value: 305000 },
  { name: "Jun", value: 315000 },
  { name: "Jul", value: 325000 },
  { name: "Aug", value: 335000 },
  { name: "Sep", value: 345000 },
]

export function PortfolioPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Track your portfolio value over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="value">
          <TabsList className="mb-4">
            <TabsTrigger value="value">Portfolio Value</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="comparison">Market Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="value">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Portfolio Value"]} />
                  <Area type="monotone" dataKey="value" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="returns">
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Returns visualization will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Market comparison visualization will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

