import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


// All Data Sets
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

const mapAllData = {
  day: dayData,
  week: weekData,
  month: monthlyData,
  year: yearData,
};

const RevenuCard = () => {
  const [mode, setMode] = useState("month");
  const chartData = mapAllData[mode];

  return (
    <div className="rounded-2xl">
      <div className="bg-[#0b1020] rounded-2xl p-5 text-white">
        
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-xs text-gray-400">{mode} wise revenue</p>
          </div>

          {/* Toggle Buttons */}

          <div className="flex gap-1 bg-white/5 rounded-full p-1 text-xs">
            {["day", "week", "month", "year"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-full transition ${
                  mode === m
                    ? "bg-white text-black"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {m[0].toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>


        {/* Summary */}
        <div className="flex  items-center gap-6 mb-3 text-xs text-gray-300">
          <div>
            <p className="uppercase tracking-wide text-[10px] text-gray-400">
              Current
            </p>
            <p className="text-base font-semibold">₹81,000</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full">
              +12.4%
            </span>
            <span className="text-[11px] text-gray-400">
              vs previous {mode}
            </span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-2 h-70 ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 15, left: -5, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey={mode === "month" ? "month" : "label"}
                stroke="#64748b"
              />
              <YAxis stroke="#64748b" />

              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #475569",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#e2e8f0" }}
                formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#fb923c", strokeWidth: 2, fill: "#0b1020" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default RevenuCard;
