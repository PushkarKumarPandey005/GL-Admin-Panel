import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";

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
    <div className="bg-[#0b1020] px-3 py-3 sm:px-4 sm:py-4 rounded-xl text-white shadow-md w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-3 gap-2">
        <div>
          <h2 className="text-sm sm:text-base font-semibold">Visitor Analytics</h2>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
            {mode === "weekly" ? "This Week" : "This Month"}
          </p>
        </div>

        <div className="flex gap-0.5 bg-white/10 rounded-full p-[2px] text-[10px] flex-shrink-0">
          {["weekly", "monthly"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2.5 py-0.5 rounded-full transition font-medium ${
                mode === m ? "bg-white text-black" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {m === "weekly" ? "W" : "M"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Pills */}
      <div className="flex gap-3 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-gray-300">
            Mobile <span className="text-white font-medium">{totalMobile.toLocaleString()}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-gray-300">
            Desktop <span className="text-white font-medium">{totalDesktop.toLocaleString()}</span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-36 sm:h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 8, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1d2846" />
            <XAxis dataKey="label" stroke="#94a3b8" fontSize={9} tick={{ fontSize: 9 }} />
            <YAxis stroke="#94a3b8" fontSize={9} tick={{ fontSize: 9 }} />
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid #475569",
                fontSize: 10,
                borderRadius: "8px",
              }}
              formatter={(v, name) => [`${v.toLocaleString()}`, name]}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Line
              type="monotone"
              dataKey="mobile"
              stroke="#ff9800"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              name="Mobile"
            />
            <Line
              type="monotone"
              dataKey="desktop"
              stroke="#4ea3ff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              name="Desktop"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Bars */}
      <div className="mt-3 space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] sm:text-xs text-gray-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
              Mobile
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-orange-400">
              {mobilePercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${mobilePercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] sm:text-xs text-gray-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Desktop
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-blue-400">
              {desktopPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${desktopPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalytics;