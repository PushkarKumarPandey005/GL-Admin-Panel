import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// WEEKLY DATA
const weeklyData = [
  { label: "Mon", mobile: 320, desktop: 200 },
  { label: "Tue", mobile: 280, desktop: 150 },
  { label: "Wed", mobile: 420, desktop: 180 },
  { label: "Thu", mobile: 500, desktop: 250 },
  { label: "Fri", mobile: 460, desktop: 230 },
  { label: "Sat", mobile: 600, desktop: 300 },
  { label: "Sun", mobile: 350, desktop: 180 },
];

// MONTHLY DATA
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

  // CALCULATE TOTALS
  const totalMobile = chartData.reduce((acc, val) => acc + val.mobile, 0);
  const totalDesktop = chartData.reduce((acc, val) => acc + val.desktop, 0);
  const total = totalMobile + totalDesktop;

  const mobilePercent = ((totalMobile / total) * 100).toFixed(1);
  const desktopPercent = ((totalDesktop / total) * 100).toFixed(1);

  return (
    <div className="bg-[#0b1020] p-5 rounded-xl text-white w-full h-[410px] shadow-lg">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Visitor Analytics</h2>

        {/* TOGGLE BUTTONS */}
        <div className="flex gap-2 bg-white/10 rounded-full p-1">
          <button
            onClick={() => setMode("weekly")}
            className={`px-3 py-1 text-sm rounded-full ${
              mode === "weekly" ? "bg-white text-black" : "text-gray-300"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 text-sm rounded-full ${
              mode === "monthly" ? "bg-white text-black" : "text-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1d2846" />
          <XAxis dataKey="label" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #475569",
              fontSize: 12,
            }}
            labelStyle={{ color: "#e2e8f0" }}
            formatter={(value) => [`${value} visitors`, ""]}
          />

          {/* SHOW LEGEND */}
          <Legend wrapperStyle={{ color: "white", fontSize: "12px" }} />

          {/* MOBILE LINE */}
          <Line
            type="monotone"
            dataKey="mobile"
            stroke="#ff9800"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#ffb74d", strokeWidth: 2, fill: "#0f1624" }}
            activeDot={{ r: 6 }}
            name="Mobile Visitors"
          />

          {/* DESKTOP LINE */}
          <Line
            type="monotone"
            dataKey="desktop"
            stroke="#4ea3ff"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#82caff", strokeWidth: 2, fill: "#0f1624" }}
            activeDot={{ r: 6 }}
            name="Desktop Visitors"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* DEVICE TRAFFIC PROGRESS BAR SECTION */}
      <div className="mt-4">
        <p className="text-sm mb-1">Mobile Visitors ({mobilePercent}%)</p>
        <div className="w-full h-2 bg-gray-700 rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full"
            style={{ width: `${mobilePercent}%` }}
          ></div>
        </div>

        <p className="text-sm mt-3 mb-1">Desktop Visitors ({desktopPercent}%)</p>
        <div className="w-full h-2 bg-gray-700 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${desktopPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalytics;
