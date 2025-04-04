"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface MarketplaceFiltersProps {
  activeFilters: {
    types: string[]
    priceRange: [number, number]
    verified: boolean
    locations: string[]
  }
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      types: string[]
      priceRange: [number, number]
      verified: boolean
      locations: string[]
    }>
  >
}

export function MarketplaceFilters({ activeFilters, setActiveFilters }: MarketplaceFiltersProps) {
  const [localFilters, setLocalFilters] = useState(activeFilters)

  // Update local state when props change
  useEffect(() => {
    setLocalFilters(activeFilters)
  }, [activeFilters])

  const handleTypeChange = (type: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const newTypes = checked ? [...prev.types, type] : prev.types.filter((t) => t !== type)
      return { ...prev, types: newTypes }
    })
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const newLocations = checked ? [...prev.locations, location] : prev.locations.filter((l) => l !== location)
      return { ...prev, locations: newLocations }
    })
  }

  const handleVerifiedChange = (checked: boolean) => {
    setLocalFilters((prev) => ({ ...prev, verified: checked }))
  }

  const applyFilters = () => {
    setActiveFilters(localFilters)
  }

  const resetFilters = () => {
    const resetState = {
      types: [],
      priceRange: [10, 50] as [number, number],
      verified: true,
      locations: [],
    }
    setLocalFilters(resetState)
    setActiveFilters(resetState)
  }

  return (
    <Card className="glass-card animate-slide-left">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="font-medium">Credit Type</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="renewable"
                checked={localFilters.types.includes("Renewable")}
                onCheckedChange={(checked) => handleTypeChange("Renewable", checked as boolean)}
              />
              <Label htmlFor="renewable">Renewable Energy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="forest"
                checked={localFilters.types.includes("REDD+")}
                onCheckedChange={(checked) => handleTypeChange("REDD+", checked as boolean)}
              />
              <Label htmlFor="forest">Forest Conservation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="methane"
                checked={localFilters.types.includes("Industrial")}
                onCheckedChange={(checked) => handleTypeChange("Industrial", checked as boolean)}
              />
              <Label htmlFor="methane">Methane Capture</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ocean"
                checked={localFilters.types.includes("Blue Carbon")}
                onCheckedChange={(checked) => handleTypeChange("Blue Carbon", checked as boolean)}
              />
              <Label htmlFor="ocean">Ocean Carbon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nature"
                checked={localFilters.types.includes("Nature-based")}
                onCheckedChange={(checked) => handleTypeChange("Nature-based", checked as boolean)}
              />
              <Label htmlFor="nature">Nature-based</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-medium">Price Range</div>
          <Slider
            value={localFilters.priceRange}
            max={100}
            step={1}
            onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
            className="custom-range"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${localFilters.priceRange[0]}</span>
            <span>${localFilters.priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-medium">Verification Status</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={localFilters.verified}
                onCheckedChange={(checked) => handleVerifiedChange(checked as boolean)}
              />
              <Label htmlFor="verified">Verified</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-medium">Location</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="north-america"
                checked={localFilters.locations.includes("north-america")}
                onCheckedChange={(checked) => handleLocationChange("north-america", checked as boolean)}
              />
              <Label htmlFor="north-america">North America</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="europe"
                checked={localFilters.locations.includes("europe")}
                onCheckedChange={(checked) => handleLocationChange("europe", checked as boolean)}
              />
              <Label htmlFor="europe">Europe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="asia"
                checked={localFilters.locations.includes("asia")}
                onCheckedChange={(checked) => handleLocationChange("asia", checked as boolean)}
              />
              <Label htmlFor="asia">Asia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="africa"
                checked={localFilters.locations.includes("africa")}
                onCheckedChange={(checked) => handleLocationChange("africa", checked as boolean)}
              />
              <Label htmlFor="africa">Africa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="south-america"
                checked={localFilters.locations.includes("south-america")}
                onCheckedChange={(checked) => handleLocationChange("south-america", checked as boolean)}
              />
              <Label htmlFor="south-america">South America</Label>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-2">
          <Button className="w-full button-gradient" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

