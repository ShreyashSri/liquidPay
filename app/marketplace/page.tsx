"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { CreditCard } from "@/components/marketplace/credit-card"
import { MarketTrends } from "@/components/marketplace/market-trends"
import { LiveAuctions } from "@/components/marketplace/live-auctions"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { creditData } from "@/data/marketplace-data"

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredCredits, setFilteredCredits] = useState(creditData)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    types: [] as string[],
    priceRange: [10, 50] as [number, number],
    verified: true,
    locations: [] as string[],
  })

  // Apply filters
  useEffect(() => {
    let results = creditData

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (credit) =>
          credit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          credit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          credit.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Type filter
    if (activeFilters.types.length > 0) {
      results = results.filter((credit) => activeFilters.types.includes(credit.type))
    }

    // Price range filter
    results = results.filter(
      (credit) => credit.price >= activeFilters.priceRange[0] && credit.price <= activeFilters.priceRange[1],
    )

    // Verification filter
    if (activeFilters.verified) {
      results = results.filter((credit) => credit.verified)
    }

    // Location filter
    if (activeFilters.locations.length > 0) {
      results = results.filter((credit) => {
        const region = getRegionFromLocation(credit.location)
        return activeFilters.locations.includes(region)
      })
    }

    // Sort results
    switch (sortBy) {
      case "newest":
        // Assume id is related to newness
        results = [...results].sort((a, b) => b.id.localeCompare(a.id))
        break
      case "price-low":
        results = [...results].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results = [...results].sort((a, b) => b.price - a.price)
        break
      case "volume":
        results = [...results].sort((a, b) => b.volume - a.volume)
        break
    }

    setFilteredCredits(results)
  }, [searchTerm, sortBy, activeFilters])

  // Helper function to determine region from location
  const getRegionFromLocation = (location: string): string => {
    if (location.includes("USA") || location.includes("Canada") || location.includes("Mexico")) {
      return "north-america"
    } else if (location.includes("Brazil") || location.includes("Argentina") || location.includes("Colombia")) {
      return "south-america"
    } else if (location.includes("UK") || location.includes("Germany") || location.includes("France")) {
      return "europe"
    } else if (location.includes("China") || location.includes("Japan") || location.includes("India")) {
      return "asia"
    } else if (location.includes("Kenya") || location.includes("Nigeria") || location.includes("South Africa")) {
      return "africa"
    }
    return "other"
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Marketplace</h1>
          <p className="text-muted-foreground">Browse and trade carbon credits in real-time</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search credits..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : ""}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="auctions">Live Auctions</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {showFilters && (
              <div className="lg:col-span-1">
                <MarketplaceFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
              </div>
            )}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredCredits.length} of {creditData.length} results
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="volume">Trading Volume</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredCredits.length === 0 ? (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">No credits match your search criteria.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setActiveFilters({
                          types: [],
                          priceRange: [10, 50],
                          verified: true,
                          locations: [],
                        })
                      }}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCredits.map((credit) => (
                    <CreditCard
                      key={credit.id}
                      id={credit.id}
                      title={credit.title}
                      type={credit.type}
                      location={credit.location}
                      price={credit.price}
                      volume={credit.volume}
                      change={credit.change}
                      verified={credit.verified}
                    />
                  ))}
                </div>
              )}

              {filteredCredits.length > 0 && filteredCredits.length < creditData.length && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="auctions" className="space-y-6">
          <LiveAuctions />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <MarketTrends />
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>Track credits you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't added any credits to your watchlist yet.</p>
                <Button variant="outline">Browse Marketplace</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

