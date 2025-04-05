"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function YieldFarming() {
  const [yieldPools, setYieldPools] = useState([
    {
      id: 1,
      name: "Renewable Energy Pool",
      stakedAmount: 2500,
      apy: 8.5,
      duration: "30 days",
      rewards: 53.12,
      progress: 65,
      status: "active",
    },
    {
      id: 2,
      name: "Forest Conservation Pool",
      stakedAmount: 1500,
      apy: 12.2,
      duration: "90 days",
      rewards: 45.75,
      progress: 30,
      status: "active",
    },
    {
      id: 3,
      name: "Methane Capture Pool",
      stakedAmount: 1000,
      apy: 6.8,
      duration: "60 days",
      rewards: 11.33,
      progress: 15,
      status: "active",
    },
    {
      id: 4,
      name: "Premium Carbon Pool",
      stakedAmount: 0,
      apy: 15.5,
      duration: "180 days",
      rewards: 0,
      progress: 0,
      status: "available",
    },
  ])

  const [showStakeDialog, setShowStakeDialog] = useState(false)
  const [showUnstakeDialog, setShowUnstakeDialog] = useState(false)
  const [selectedPool, setSelectedPool] = useState<any>(null)
  const [stakeAmount, setStakeAmount] = useState("500")
  const [creditType, setCreditType] = useState("renewable")

  const handleStake = (pool: any) => {
    setSelectedPool(pool)
    setStakeAmount("500")
    setCreditType("renewable")
    setShowStakeDialog(true)
  }

  const handleUnstake = (pool: any) => {
    setSelectedPool(pool)
    setShowUnstakeDialog(true)
  }

  const executeStake = () => {
    const amount = Number.parseInt(stakeAmount)

    // Update the pool with the staked amount
    setYieldPools(
      yieldPools.map((pool) =>
        pool.id === selectedPool.id
          ? {
              ...pool,
              stakedAmount: amount,
              status: "active",
              progress: 0,
              rewards: 0,
            }
          : pool,
      ),
    )

    setShowStakeDialog(false)
    alert(`Successfully staked ${amount} credits in ${selectedPool.name}`)
  }

  const executeUnstake = () => {
    // Update the pool to unstaked state
    setYieldPools(
      yieldPools.map((pool) =>
        pool.id === selectedPool.id
          ? {
              ...pool,
              stakedAmount: 0,
              status: "available",
              progress: 0,
              rewards: 0,
            }
          : pool,
      ),
    )

    setShowUnstakeDialog(false)
    alert(
      `Successfully unstaked ${selectedPool.stakedAmount} credits from ${selectedPool.name} and claimed ${selectedPool.rewards} reward credits`,
    )
  }

  return (
    <>
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <CardTitle>Yield Farming</CardTitle>
          <CardDescription>Stake your carbon credits to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pool</TableHead>
                <TableHead className="text-right">Staked Amount</TableHead>
                <TableHead className="text-right">APY</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Rewards</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yieldPools.map((pool) => (
                <TableRow key={pool.id} className="hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-colors">
                  <TableCell>
                    <div className="font-medium">{pool.name}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant={pool.status === "active" ? "default" : "outline"}>
                        {pool.status === "active" ? "Active" : "Available"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {pool.stakedAmount > 0 ? pool.stakedAmount.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">{pool.apy}%</TableCell>
                  <TableCell>{pool.duration}</TableCell>
                  <TableCell className="text-right">{pool.rewards > 0 ? `${pool.rewards} credits` : "-"}</TableCell>
                  <TableCell>
                    {pool.status === "active" ? (
                      <>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{pool.progress}%</span>
                          <span>100%</span>
                        </div>
                        <Progress value={pool.progress} className="h-2" />
                      </>
                    ) : (
                      <span className="text-muted-foreground text-sm">Not staked</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {pool.status === "active" ? (
                      <Button size="sm" variant="outline" className="glow-effect" onClick={() => handleUnstake(pool)}>
                        Unstake
                      </Button>
                    ) : (
                      <Button size="sm" className="button-gradient" onClick={() => handleStake(pool)}>
                        Stake
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stake Dialog */}
      <Dialog open={showStakeDialog} onOpenChange={setShowStakeDialog}>
        <DialogContent className="sm:max-w-[500px] glass-card">
          <DialogHeader>
            <DialogTitle>Stake Carbon Credits</DialogTitle>
            <DialogDescription>
              {selectedPool && `Stake your carbon credits in the ${selectedPool.name} to earn rewards`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {selectedPool && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pool-apy" className="text-right">
                    APY
                  </Label>
                  <div id="pool-apy" className="col-span-3 font-medium">
                    {selectedPool.apy}%
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pool-duration" className="text-right">
                    Duration
                  </Label>
                  <div id="pool-duration" className="col-span-3 font-medium">
                    {selectedPool.duration}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="credit-type" className="text-right">
                    Credit Type
                  </Label>
                  <Select value={creditType} onValueChange={setCreditType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select credit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="forest">Forest Conservation</SelectItem>
                      <SelectItem value="methane">Methane Capture</SelectItem>
                      <SelectItem value="wind">Wind Energy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stake-amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="stake-amount"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="col-span-3"
                    min="1"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estimated-reward" className="text-right">
                    Est. Reward
                  </Label>
                  <div id="estimated-reward" className="col-span-3 text-xl font-bold gradient-text">
                    {(
                      ((Number.parseInt(stakeAmount || "0") * selectedPool.apy) / 100) *
                      (Number.parseInt(selectedPool.duration) / 365)
                    ).toFixed(2)}{" "}
                    credits
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStakeDialog(false)}>
              Cancel
            </Button>
            <Button
              className="button-gradient"
              onClick={executeStake}
              disabled={!stakeAmount || Number.parseInt(stakeAmount) <= 0}
            >
              Stake Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unstake Dialog */}
      <Dialog open={showUnstakeDialog} onOpenChange={setShowUnstakeDialog}>
        <DialogContent className="sm:max-w-[500px] glass-card">
          <DialogHeader>
            <DialogTitle>Unstake Carbon Credits</DialogTitle>
            <DialogDescription>
              {selectedPool && `Unstake your credits from ${selectedPool.name} and claim rewards`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {selectedPool && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unstake-amount" className="text-right">
                    Staked Amount
                  </Label>
                  <div id="unstake-amount" className="col-span-3 font-medium">
                    {selectedPool.stakedAmount.toLocaleString()} credits
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unstake-progress" className="text-right">
                    Progress
                  </Label>
                  <div id="unstake-progress" className="col-span-3">
                    <Progress value={selectedPool.progress} className="h-2 mb-2" />
                    <span className="text-sm text-muted-foreground">{selectedPool.progress}% complete</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unstake-rewards" className="text-right">
                    Current Rewards
                  </Label>
                  <div id="unstake-rewards" className="col-span-3 text-xl font-bold gradient-text">
                    {selectedPool.rewards} credits
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md mt-2">
                  <p className="text-amber-800 dark:text-amber-300 text-sm">
                    <strong>Note:</strong> Unstaking before the end of the duration may result in reduced rewards.
                  </p>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnstakeDialog(false)}>
              Cancel
            </Button>
            <Button className="button-gradient" onClick={executeUnstake}>
              Unstake & Claim Rewards
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

