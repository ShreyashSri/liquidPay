"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Users, Leaf, BarChart3, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  change: string
  iconBgClass: string
  iconClass: string
  delay: number
}

function StatCard({ icon, label, value, change, iconBgClass, iconClass, delay }: StatCardProps) {
  const [counted, setCounted] = useState(false)
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (counted || !valueRef.current) return

    const numericValue = Number.parseFloat(value.replace(/,/g, ""))
    const duration = 2000
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const counter = setTimeout(() => {
      const animate = () => {
        frame++
        const progress = frame / totalFrames
        const currentCount = Math.round(numericValue * progress)

        if (valueRef.current) {
          valueRef.current.textContent = currentCount.toLocaleString()
        }

        if (frame < totalFrames) {
          requestAnimationFrame(animate)
        } else {
          setCounted(true)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(counter)
  }, [value, delay, counted])

  return (
    <Card className="dashboard-card animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <span ref={valueRef} className="text-2xl font-bold">
              {value}
            </span>
          </div>
          <div className={`h-12 w-12 rounded-full ${iconBgClass} flex items-center justify-center`}>{icon}</div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
          <ArrowUpRight className="mr-1 h-4 w-4" />
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function HeroStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />}
        label="Total Credits Traded"
        value="2,400,000"
        change="+24.5% from last month"
        iconBgClass="bg-green-100 dark:bg-green-900/30"
        iconClass="text-green-600 dark:text-green-400"
        delay={0}
      />

      <StatCard
        icon={<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        label="Active Users"
        value="12,450"
        change="+18.2% from last month"
        iconBgClass="bg-blue-100 dark:bg-blue-900/30"
        iconClass="text-blue-600 dark:text-blue-400"
        delay={200}
      />

      <StatCard
        icon={<BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        label="Average Price"
        value="28.75"
        change="+5.3% from last month"
        iconBgClass="bg-purple-100 dark:bg-purple-900/30"
        iconClass="text-purple-600 dark:text-purple-400"
        delay={400}
      />

      <StatCard
        icon={<TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        label="Market Volume"
        value="14,200,000"
        change="+32.1% from last month"
        iconBgClass="bg-amber-100 dark:bg-amber-900/30"
        iconClass="text-amber-600 dark:text-amber-400"
        delay={600}
      />
    </div>
  )
}

