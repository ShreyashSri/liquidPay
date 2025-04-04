"use client"

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts"
import { useEffect, useState } from "react"

// Generate data based on forecast period
const generateData = (forecastPeriod: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  // Historical data (past 6 months)
  const historicalData = Array.from({ length: 6 }).map((_, i) => {
    const monthIndex = (currentMonth - 5 + i) % 12
    return {
      name: months[monthIndex >= 0 ? monthIndex : monthIndex + 12],
      actual: 24.5 + Math.random() * 4 + i * 0.5,
      predicted: null,
      lower: null,
      upper: null,
    }
  })

  // Current month (transition point)
  const currentData = {
    name: months[currentMonth],
    actual: 28.5,
    predicted: 28.5,
    lower: 28.5,
    upper: 28.5,
  }

  // Future predictions
  const numFuturePeriods = Math.ceil(forecastPeriod / 30)
  const futureData = Array.from({ length: numFuturePeriods }).map((_, i) => {
    const monthIndex = (currentMonth + 1 + i) % 12
    const baseValue = 28.5 + (i + 1) * 1.3
    const volatility = (i + 1) * 0.8 // Increasing uncertainty over time

    return {
      name: months[monthIndex],
      actual: null,
      predicted: baseValue,
      lower: baseValue - volatility,
      upper: baseValue + volatility,
    }
  })

  return [...historicalData, currentData, ...futureData]
}

interface PredictionChartProps {
  className?: string
  forecastPeriod?: number
}

export function PredictionChart({ className, forecastPeriod = 30 }: PredictionChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Generate new data when forecast period changes
    const newData = generateData(forecastPeriod)
    setData([])
    setIsAnimating(true)

    // Animate the data points appearing
    const timeout = setTimeout(() => {
      setData(newData)
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [forecastPeriod])

  return (
    <div className={`${className} relative`}>
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorUpper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" />
          <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
            }}
          />
          <Legend />
          <ReferenceLine
            x="Jul"
            stroke="#6b7280"
            strokeDasharray="3 3"
            label={{
              value: "Current",
              position: "top",
              fill: "#6b7280",
              fontSize: 12,
            }}
          />

          {/* Confidence interval area */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="transparent"
            fillOpacity={1}
            fill="url(#colorUpper)"
            name="Confidence Interval"
          />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Historical Price"
            animationDuration={1500}
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#22c55e"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Predicted Price"
            animationDuration={1500}
            animationBegin={500}
          />

          <Line
            type="monotone"
            dataKey="upper"
            stroke="#22c55e"
            strokeWidth={1}
            strokeDasharray="3 3"
            dot={false}
            activeDot={false}
            name="Upper Bound"
            animationDuration={1500}
            animationBegin={1000}
          />

          <Line
            type="monotone"
            dataKey="lower"
            stroke="#22c55e"
            strokeWidth={1}
            strokeDasharray="3 3"
            dot={false}
            activeDot={false}
            name="Lower Bound"
            animationDuration={1500}
            animationBegin={1000}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

