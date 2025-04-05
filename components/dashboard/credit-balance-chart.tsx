"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

const data = [
  { value: 4000 },
  { value: 3000 },
  { value: 5000 },
  { value: 2780 },
  { value: 1890 },
  { value: 2390 },
  { value: 3490 },
  { value: 3490 },
  { value: 4000 },
  { value: 5000 },
  { value: 9000 },
  { value: 12450 },
]

interface CreditBalanceChartProps {
  className?: string
}

export function CreditBalanceChart({ className }: CreditBalanceChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

