"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"
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

interface CreditCardProps {
  id: string
  title: string
  type: string
  location: string
  price: number
  volume: number
  change: number
  verified: boolean
}

export function CreditCard({ id, title, type, location, price, volume, change, verified }: CreditCardProps) {
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [quantity, setQuantity] = useState("100")
  const [isHovered, setIsHovered] = useState(false)

  const handleBuy = () => {
    // Simulate purchase
    alert(
      `Successfully purchased ${quantity} ${title} credits for $${(Number.parseFloat(quantity) * price).toFixed(2)}`,
    )
    setShowBuyDialog(false)
  }

  return (
    <>
      <Card
        className="marketplace-card overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="marketplace-card-header">
            <div className="flex justify-between items-start">
              <Badge variant="secondary" className="bg-white/80 dark:bg-black/20">
                {type}
              </Badge>
              {verified && (
                <Badge variant="outline" className="bg-white/80 dark:bg-black/20 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Verified</span>
                </Badge>
              )}
            </div>
            <h3
              className="font-semibold text-lg mt-4 transition-transform duration-300"
              style={{ transform: isHovered ? "translateY(-5px)" : "none" }}
            >
              {title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="text-2xl font-bold gradient-text">${price.toFixed(2)}</div>
              </div>
              <div className={`flex items-center ${change > 0 ? "text-green-600" : "text-red-600"}`}>
                {change > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span>{Math.abs(change).toFixed(1)}%</span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-1">Available Volume</div>
            <div className="font-medium">{volume.toLocaleString()} credits</div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button className="flex-1 button-gradient" onClick={() => setShowBuyDialog(true)}>
            Buy Now
          </Button>
          <Button className="flex-1" variant="outline">
            <Link href={`/marketplace/${id}`}>Details</Link>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="sm:max-w-[425px] glass-card">
          <DialogHeader>
            <DialogTitle>Buy Carbon Credits</DialogTitle>
            <DialogDescription>Purchase {title} carbon credits at the current market price.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credit-type" className="text-right">
                Type
              </Label>
              <div id="credit-type" className="col-span-3">
                {type}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credit-price" className="text-right">
                Price
              </Label>
              <div id="credit-price" className="col-span-3">
                ${price.toFixed(2)} per credit
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credit-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="credit-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
                min="1"
                max={volume}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credit-total" className="text-right">
                Total
              </Label>
              <div id="credit-total" className="col-span-3 text-xl font-bold gradient-text">
                ${(Number.parseFloat(quantity || "0") * price).toFixed(2)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBuyDialog(false)}>
              Cancel
            </Button>
            <Button className="button-gradient" onClick={handleBuy}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

