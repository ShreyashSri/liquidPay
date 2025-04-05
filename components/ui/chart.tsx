"use client";

import {
  ResponsiveContainer,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
} from "recharts";

export const ChartContainer = ({ children }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  );
};

export const BarChart = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  className,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis dataKey={index} stroke="#fff" />
        <YAxis stroke="#fff" tickFormatter={valueFormatter} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a202c",
            color: "#fff",
            border: "none",
          }}
          itemStyle={{ color: "#fff" }}
          formatter={(value) => valueFormatter(value)}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export const LineChart = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  className,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis dataKey={index} stroke="#fff" />
        <YAxis stroke="#fff" tickFormatter={valueFormatter} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a202c",
            color: "#fff",
            border: "none",
          }}
          itemStyle={{ color: "#fff" }}
          formatter={(value) => valueFormatter(value)}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i]}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export const PieChart = ({
  data,
  index,
  category,
  colors,
  valueFormatter,
  className,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a202c",
            color: "#fff",
            border: "none",
          }}
          itemStyle={{ color: "#fff" }}
          formatter={(value) => valueFormatter(value)}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export const ChartTooltip = () => {
  return null;
};
