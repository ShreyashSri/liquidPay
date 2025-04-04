"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Renewable Energy", value: 400 },
  { name: "Forest Conservation", value: 300 },
  { name: "Methane Capture", value: 200 },
  { name: "Ocean Carbon", value: 100 },
]

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6"]

interface CreditAllocationChartProps {
  className?: string
}

export function CreditAllocationChart({ className }: CreditAllocationChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

