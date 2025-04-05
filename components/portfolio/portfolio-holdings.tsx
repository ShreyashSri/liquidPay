"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortfolioHoldings() {
  const [holdings, setHoldings] = useState([
    {
      id: 1,
      name: "Renewable Energy Credits",
      type: "Solar",
      quantity: 5000,
      avgPrice: 26.5,
      currentPrice: 28.5,
      value: 142500,
      change: 7.55,
      unrealizedGain: 10000,
    },
    {
      id: 2,
      name: "Forest Conservation",
      type: "REDD+",
      quantity: 3500,
      avgPrice: 30.25,
      currentPrice: 32.75,
      value: 114625,
      change: 8.26,
      unrealizedGain: 8750,
    },
    {
      id: 3,
      name: "Methane Capture",
      type: "Industrial",
      quantity: 2500,
      avgPrice: 20.75,
      currentPrice: 19.25,
      value: 48125,
      change: -7.23,
      unrealizedGain: -3750,
    },
    {
      id: 4,
      name: "Wind Energy",
      type: "Renewable",
      quantity: 1500,
      avgPrice: 23.5,
      currentPrice: 24.5,
      value: 36750,
      change: 4.26,
      unrealizedGain: 1500,
    },
    {
      id: 5,
      name: "Reforestation Project",
      type: "Nature-based",
      quantity: 950,
      avgPrice: 27.25,
      currentPrice: 29.75,
      value: 28262.5,
      change: 9.17,
      unrealizedGain: 2375,
    },
  ])

  const [showTradeDialog, setShowTradeDialog] = useState(false)
  const [selectedHolding, setSelectedHolding] = useState<any>(null)
  const [tradeType, setTradeType] = useState("buy")
  const [tradeQuantity, setTradeQuantity] = useState("100")

  const handleTrade = (holding: any) => {
    setSelectedHolding(holding)
    setTradeQuantity("100")
    setTradeType("buy")
    setShowTradeDialog(true)
  }

  const executeTrade = () => {
    const quantity = Number.parseInt(tradeQuantity)

    if (tradeType === "buy") {
      // Buy more of this credit
      const newHoldings = holdings.map((h) => {
        if (h.id === selectedHolding.id) {
          const newQuantity = h.quantity + quantity
          const newValue = newQuantity * h.currentPrice
          const newAvgPrice = (h.quantity * h.avgPrice + quantity * h.currentPrice) / newQuantity
          const newUnrealizedGain = (h.currentPrice - newAvgPrice) * newQuantity

          return {
            ...h,
            quantity: newQuantity,
            avgPrice: newAvgPrice,
            value: newValue,
            unrealizedGain: newUnrealizedGain,
          }
        }
        return h
      })

      setHoldings(newHoldings)
      alert(`Successfully purchased ${quantity} ${selectedHolding.name} credits`)
    } else {
      // Sell some of this credit
      if (quantity > selectedHolding.quantity) {
        alert("Cannot sell more credits than you own")
        return
      }

      const newHoldings = holdings
        .map((h) => {
          if (h.id === selectedHolding.id) {
            const newQuantity = h.quantity - quantity
            const newValue = newQuantity * h.currentPrice
            // Keep the same average price when selling
            const newUnrealizedGain = (h.currentPrice - h.avgPrice) * newQuantity

            return {
              ...h,
              quantity: newQuantity,
              value: newValue,
              unrealizedGain: newUnrealizedGain,
            }
          }
          return h
        })
        .filter((h) => h.quantity > 0) // Remove holdings with zero quantity

      setHoldings(newHoldings)
      alert(`Successfully sold ${quantity} ${selectedHolding.name} credits`)
    }

    setShowTradeDialog(false)
  }

  return (
    <>
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle>Portfolio Holdings</CardTitle>
          <CardDescription>Your carbon credit assets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Avg. Price</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Unrealized Gain/Loss</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow
                  key={holding.id}
                  className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <TableCell className="font-medium">{holding.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{holding.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{holding.quantity.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${holding.avgPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${holding.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${holding.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {holding.change > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1"
                        >
                          <ArrowUp className="h-3 w-3" />
                          {holding.change.toFixed(1)}%
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1"
                        >
                          <ArrowDown className="h-3 w-3" />
                          {Math.abs(holding.change).toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-right ${holding.unrealizedGain >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    ${Math.abs(holding.unrealizedGain).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="glow-effect" onClick={() => handleTrade(holding)}>
                      Trade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent className="sm:max-w-[500px] glass-card">
          <DialogHeader>
            <DialogTitle>Trade Carbon Credits</DialogTitle>
            <DialogDescription>{selectedHolding && `Buy or sell ${selectedHolding.name} credits`}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="buy" value={tradeType} onValueChange={setTradeType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4 pt-4">
              {selectedHolding && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buy-price" className="text-right">
                      Current Price
                    </Label>
                    <div id="buy-price" className="col-span-3 font-medium">
                      ${selectedHolding.currentPrice.toFixed(2)} per credit
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buy-quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="buy-quantity"
                      type="number"
                      value={tradeQuantity}
                      onChange={(e) => setTradeQuantity(e.target.value)}
                      className="col-span-3"
                      min="1"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buy-total" className="text-right">
                      Total Cost
                    </Label>
                    <div id="buy-total" className="col-span-3 text-xl font-bold gradient-text">
                      ${(Number.parseInt(tradeQuantity || "0") * selectedHolding.currentPrice).toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="sell" className="space-y-4 pt-4">
              {selectedHolding && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sell-available" className="text-right">
                      Available
                    </Label>
                    <div id="sell-available" className="col-span-3 font-medium">
                      {selectedHolding.quantity.toLocaleString()} credits
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sell-price" className="text-right">
                      Current Price
                    </Label>
                    <div id="sell-price" className="col-span-3 font-medium">
                      ${selectedHolding.currentPrice.toFixed(2)} per credit
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sell-quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="sell-quantity"
                      type="number"
                      value={tradeQuantity}
                      onChange={(e) => setTradeQuantity(e.target.value)}
                      className="col-span-3"
                      min="1"
                      max={selectedHolding.quantity}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sell-total" className="text-right">
                      Total Proceeds
                    </Label>
                    <div id="sell-total" className="col-span-3 text-xl font-bold gradient-text">
                      ${(Number.parseInt(tradeQuantity || "0") * selectedHolding.currentPrice).toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTradeDialog(false)}>
              Cancel
            </Button>
            <Button
              className="button-gradient"
              onClick={executeTrade}
              disabled={
                !tradeQuantity ||
                Number.parseInt(tradeQuantity) <= 0 ||
                (tradeType === "sell" && selectedHolding && Number.parseInt(tradeQuantity) > selectedHolding.quantity)
              }
            >
              {tradeType === "buy" ? "Buy Credits" : "Sell Credits"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

