import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";

// --- data same ---
const weeklyData = [
  { label: "Mon", mobile: 320, desktop: 200 },
  { label: "Tue", mobile: 280, desktop: 150 },
  { label: "Wed", mobile: 420, desktop: 180 },
  { label: "Thu", mobile: 500, desktop: 250 },
  { label: "Fri", mobile: 460, desktop: 230 },
  { label: "Sat", mobile: 600, desktop: 300 },
  { label: "Sun", mobile: 350, desktop: 180 },
];

const monthlyData = [
  { label: "Jan", mobile: 4200, desktop: 2100 },
  { label: "Feb", mobile: 5100, desktop: 2400 },
  { label: "Mar", mobile: 6100, desktop: 2800 },
  { label: "Apr", mobile: 7000, desktop: 3200 },
  { label: "May", mobile: 7500, desktop: 3500 },
];

const VisitorAnalytics = () => {
  const [mode, setMode] = useState("weekly");
  const chartData = mode === "weekly" ? weeklyData : monthlyData;

  const totalMobile = chartData.reduce((a, v) => a + v.mobile, 0);
  const totalDesktop = chartData.reduce((a, v) => a + v.desktop, 0);
  const total = totalMobile + totalDesktop;

  const mobilePercent = ((totalMobile / total) * 100).toFixed(1);
  const desktopPercent = ((totalDesktop / total) * 100).toFixed(1);

  return (
    <div className="bg-[#0b1020] px-3 py-3 rounded-xl text-white shadow-md w-full max-w-142.5">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">Visitor Analytics</h2>

        <div className="flex gap-1 bg-white/10 rounded-full p-[2px] text-[10px]">
          <button
            onClick={() => setMode("weekly")}
            className={`px-2 py-[2px] rounded-full ${
              mode === "weekly" ? "bg-white text-black" : "text-gray-300"
            }`}
          >
            W
          </button>
          <button
            onClick={() => setMode("monthly")}
            className={`px-2 py-[2px] rounded-full ${
              mode === "monthly" ? "bg-white text-black" : "text-gray-300"
            }`}
          >
            M
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1d2846" />
          <XAxis dataKey="label" stroke="#94a3b8" fontSize={10} />
          <YAxis stroke="#94a3b8" fontSize={10} />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #475569",
              fontSize: 10,
            }}
            formatter={(v) => [`${v}`, ""]}
          />

          <Legend wrapperStyle={{ fontSize: "10px" }} />

          <Line
            type="monotone"
            dataKey="mobile"
            stroke="#ff9800"
            strokeWidth={2}
            dot={false}
            name="Mobile"
          />
          <Line
            type="monotone"
            dataKey="desktop"
            stroke="#4ea3ff"
            strokeWidth={2}
            dot={false}
            name="Desktop"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Progress bars */}
      <div className="mt-3 text-[11px]">
        <p className="mb-1">Mobile ({mobilePercent}%)</p>
        <div className="w-full h-1.5 bg-gray-700 rounded-full">
          <div
            className="h-1.5 bg-orange-500 rounded-full"
            style={{ width: `${mobilePercent}%` }}
          />
        </div>

        <p className="mt-3 mb-1">Desktop ({desktopPercent}%)</p>
        <div className="w-full h-1.5 bg-gray-700 rounded-full">
          <div
            className="h-1.5 bg-blue-500 rounded-full"
            style={{ width: `${desktopPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalytics;
