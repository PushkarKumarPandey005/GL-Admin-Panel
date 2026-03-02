import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 65000 },
  { month: "May", revenue: 72000 },
  { month: "Jun", revenue: 81000 },
  { month: "Jul", revenue: 65000 },
  { month: "Aug", revenue: 72000 },
  { month: "Sep", revenue: 81000 },
];

const dayData = [
  { label: "Mon", revenue: 8000 },
  { label: "Tue", revenue: 12000 },
  { label: "Wed", revenue: 10000 },
  { label: "Thu", revenue: 15000 },
  { label: "Fri", revenue: 18000 },
  { label: "Sat", revenue: 9000 },
  { label: "Sun", revenue: 7000 },
];

const weekData = [
  { label: "W1", revenue: 35000 },
  { label: "W2", revenue: 42000 },
  { label: "W3", revenue: 39000 },
  { label: "W4", revenue: 46000 },
];

const yearData = [
  { label: "2021", revenue: 450000 },
  { label: "2022", revenue: 520000 },
  { label: "2023", revenue: 680000 },
  { label: "2024", revenue: 730000 },
];

const mapAllData = { day: dayData, week: weekData, month: monthlyData, year: yearData };

const currentValues = { day: 18000, week: 46000, month: 81000, year: 730000 };

const RevenuCard = () => {
  const [mode, setMode] = useState("month");
  const chartData = mapAllData[mode];

  return (
    <div className="bg-[#0b1020] rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-white shadow-md w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-semibold">Revenue</h2>
          <p className="text-[10px] sm:text-xs text-gray-400 capitalize">{mode} wise</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-0.5 sm:gap-1 bg-white/5 rounded-full p-[2px] text-[10px] sm:text-xs flex-shrink-0">
          {["day", "week", "month", "year"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full transition ${
                mode === m
                  ? "bg-white text-black font-medium"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {m[0].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
        <div>
          <p className="uppercase text-[9px] sm:text-[10px] text-gray-400">Current</p>
          <p className="text-sm sm:text-base font-semibold">
            ₹{currentValues[mode].toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] sm:text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-px rounded-full">
            +12.4%
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400">
            vs prev {mode}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-36 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 8, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey={mode === "month" ? "month" : "label"}
              stroke="#64748b"
              fontSize={9}
              tick={{ fontSize: 9 }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={9}
              tick={{ fontSize: 9 }}
              tickFormatter={(v) =>
                v >= 100000
                  ? `${(v / 100000).toFixed(1)}L`
                  : v >= 1000
                  ? `${(v / 1000).toFixed(0)}k`
                  : v
              }
            />
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid #475569",
                fontSize: 10,
                borderRadius: "8px",
              }}
              formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenuCard;