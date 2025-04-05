import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", renewable: 24.5, forest: 30.2, methane: 18.5, ocean: 32.1 },
  { name: "Feb", renewable: 25.1, forest: 31.5, methane: 17.8, ocean: 33.4 },
  { name: "Mar", renewable: 26.3, forest: 32.1, methane: 18.2, ocean: 34.2 },
  { name: "Apr", renewable: 27.2, forest: 31.8, methane: 19.1, ocean: 34.8 },
  { name: "May", renewable: 26.8, forest: 32.5, methane: 18.7, ocean: 35.1 },
  { name: "Jun", renewable: 28.1, forest: 32.2, methane: 19.5, ocean: 34.5 },
  { name: "Jul", renewable: 28.5, forest: 32.7, methane: 19.2, ocean: 35.2 },
]

export function MarketTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>Historical price data for different credit types</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price">
          <TabsList className="mb-4">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="volatility">Volatility</TabsTrigger>
          </TabsList>

          <TabsContent value="price">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="renewable"
                    stroke="#22c55e"
                    activeDot={{ r: 8 }}
                    name="Renewable Energy"
                  />
                  <Line type="monotone" dataKey="forest" stroke="#3b82f6" name="Forest Conservation" />
                  <Line type="monotone" dataKey="methane" stroke="#f59e0b" name="Methane Capture" />
                  <Line type="monotone" dataKey="ocean" stroke="#8b5cf6" name="Ocean Carbon" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="volume">
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Volume data visualization will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="volatility">
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Volatility data visualization will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

