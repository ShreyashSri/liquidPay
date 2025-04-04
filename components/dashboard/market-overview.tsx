import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp } from "lucide-react"

export function MarketOverview() {
  const marketData = [
    {
      id: 1,
      name: "Renewable Energy Credits",
      price: 28.5,
      change: 3.2,
      volume: "12,500",
      marketCap: "356M",
    },
    {
      id: 2,
      name: "Forest Conservation",
      price: 32.75,
      change: 5.7,
      volume: "8,750",
      marketCap: "287M",
    },
    {
      id: 3,
      name: "Methane Capture",
      price: 19.25,
      change: -1.3,
      volume: "15,000",
      marketCap: "289M",
    },
    {
      id: 4,
      name: "Wind Energy",
      price: 24.5,
      change: 2.1,
      volume: "10,200",
      marketCap: "250M",
    },
    {
      id: 5,
      name: "Reforestation Project",
      price: 29.75,
      change: 4.2,
      volume: "7,500",
      marketCap: "223M",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Top performing carbon credit types</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {item.change > 0 ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1"
                      >
                        <ArrowUp className="h-3 w-3" />
                        {item.change.toFixed(1)}%
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1"
                      >
                        <ArrowDown className="h-3 w-3" />
                        {Math.abs(item.change).toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.volume}</TableCell>
                <TableCell className="text-right">${item.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

