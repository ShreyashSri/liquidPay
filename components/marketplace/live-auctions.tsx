"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"
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

export function LiveAuctions() {
  const [auctions, setAuctions] = useState([
    {
      id: "A12345",
      title: "Premium Renewable Energy Credits",
      type: "Solar",
      currentBid: 32.75,
      bidCount: 18,
      volume: 5000,
      timeLeft: "2h 15m",
      timePercentage: 35,
      status: "active",
    },
    {
      id: "A12346",
      title: "Amazon Rainforest Conservation",
      type: "REDD+",
      currentBid: 38.5,
      bidCount: 24,
      volume: 3500,
      timeLeft: "4h 30m",
      timePercentage: 65,
      status: "active",
    },
    {
      id: "A12347",
      title: "Industrial Methane Capture",
      type: "Industrial",
      currentBid: 22.25,
      bidCount: 12,
      volume: 7500,
      timeLeft: "1h 45m",
      timePercentage: 20,
      status: "active",
    },
    {
      id: "A12348",
      title: "Scottish Wind Farm Credits",
      type: "Wind",
      currentBid: 29.75,
      bidCount: 15,
      volume: 4200,
      timeLeft: "5h 10m",
      timePercentage: 75,
      status: "active",
    },
    {
      id: "A12349",
      title: "Kenyan Reforestation Project",
      type: "Nature-based",
      currentBid: 35.25,
      bidCount: 21,
      volume: 2800,
      timeLeft: "3h 20m",
      timePercentage: 50,
      status: "active",
    },
  ])

  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [showBidDialog, setShowBidDialog] = useState(false)

  const handlePlaceBid = (auction: any) => {
    setSelectedAuction(auction)
    setBidAmount((auction.currentBid + 0.25).toFixed(2))
    setShowBidDialog(true)
  }

  const submitBid = () => {
    // Update the auction with the new bid
    setAuctions(
      auctions.map((auction) =>
        auction.id === selectedAuction.id
          ? {
              ...auction,
              currentBid: Number.parseFloat(bidAmount),
              bidCount: auction.bidCount + 1,
            }
          : auction,
      ),
    )

    setShowBidDialog(false)
    alert(`Bid of $${bidAmount} placed successfully on ${selectedAuction.title}`)
  }

  return (
    <>
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle>Live Auctions</CardTitle>
          <CardDescription>Ongoing auctions for carbon credits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Current Bid</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auctions.map((auction) => (
                <TableRow
                  key={auction.id}
                  className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <TableCell>
                    <div className="font-medium">{auction.title}</div>
                    <div className="text-sm text-muted-foreground">{auction.id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{auction.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">${auction.currentBid.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{auction.bidCount} bids</div>
                  </TableCell>
                  <TableCell className="text-right">{auction.volume.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{auction.timeLeft}</span>
                    </div>
                    <Progress value={auction.timePercentage} className="h-1" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" className="button-gradient" onClick={() => handlePlaceBid(auction)}>
                      Place Bid
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showBidDialog} onOpenChange={setShowBidDialog}>
        <DialogContent className="sm:max-w-[425px] glass-card">
          <DialogHeader>
            <DialogTitle>Place a Bid</DialogTitle>
            <DialogDescription>
              {selectedAuction && `Bid on ${selectedAuction.title} (${selectedAuction.id})`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedAuction && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="current-bid" className="text-right">
                    Current Bid
                  </Label>
                  <div id="current-bid" className="col-span-3">
                    ${selectedAuction.currentBid.toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="min-bid" className="text-right">
                    Minimum Bid
                  </Label>
                  <div id="min-bid" className="col-span-3">
                    ${(selectedAuction.currentBid + 0.25).toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="your-bid" className="text-right">
                    Your Bid
                  </Label>
                  <Input
                    id="your-bid"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="col-span-3"
                    min={(selectedAuction.currentBid + 0.25).toFixed(2)}
                    step="0.25"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBidDialog(false)}>
              Cancel
            </Button>
            <Button
              className="button-gradient"
              onClick={submitBid}
              disabled={!bidAmount || Number.parseFloat(bidAmount) < selectedAuction?.currentBid + 0.25}
            >
              Place Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

