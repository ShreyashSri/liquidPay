"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", buy: 4000, sell: 2400 },
  { name: "Feb", buy: 3000, sell: 1398 },
  { name: "Mar", buy: 2000, sell: 9800 },
  { name: "Apr", buy: 2780, sell: 3908 },
  { name: "May", buy: 1890, sell: 4800 },
  { name: "Jun", buy: 2390, sell: 3800 },
  { name: "Jul", buy: 3490, sell: 4300 },
  { name: "Aug", buy: 4000, sell: 2400 },
  { name: "Sep", buy: 3000, sell: 1398 },
  { name: "Oct", buy: 2000, sell: 9800 },
  { name: "Nov", buy: 2780, sell: 3908 },
  { name: "Dec", buy: 1890, sell: 4800 },
]

interface TradingActivityChartProps {
  className?: string
}

export function TradingActivityChart({ className }: TradingActivityChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="buy" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
          <Area type="monotone" dataKey="sell" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

