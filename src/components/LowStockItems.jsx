import React from "react";
import { lowStockItems } from "../data/data";

const LowStockItems = () => {
  return (
    <div className="w-full bg-[#0b1020] text-white rounded-xl px-3 py-3 flex flex-col hide-scrollbar">

      {/* Header */}
      <div className="sticky top-0 bg-[#0b1020] pb-2 z-10">
        <h2 className="text-xs sm:text-sm font-semibold text-red-400">
          Stock Analysis
        </h2>
      </div>

      {/* Scroll List */}
      <div className="mt-1 flex flex-col gap-2 pr-1 max-h-[260px] sm:max-h-[320px] overflow-y-auto hide-scrollbar">

        {lowStockItems.map((prod) => {
          const percent = Math.round((prod.stock / prod.totalStock) * 100);
          const progressColor = percent < 20 ? "bg-red-500" : "bg-yellow-400";

          return (
            <div
              key={prod.id}
              className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-2 hover:bg-white/10 transition gap-2"
            >
              {/* Left */}
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex flex-col min-w-0">
                  <p className="text-[11px] sm:text-xs font-medium truncate">
                    {prod.name}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">
                    {prod.category}
                  </p>

                  <div className="w-16 sm:w-20 h-1 bg-gray-700 rounded-full mt-1">
                    <div
                      className={`h-1 rounded-full ${progressColor} transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span
                  className={`text-[9px] sm:text-[10px] px-2 py-[2px] rounded-full whitespace-nowrap ${
                    prod.status === "Critical"
                      ? "bg-red-500/20 text-red-400 border border-red-500/40"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                  }`}
                >
                  {prod.stock}/{prod.totalStock}
                </span>
                <span
                  className={`text-[8px] sm:text-[9px] font-medium ${
                    prod.status === "Critical" ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {prod.status}
                </span>
              </div>
            </div>
          );
        })}

        {lowStockItems.length === 0 && (
          <p className="text-center text-gray-500 text-xs py-6">
            No low stock items
          </p>
        )}
      </div>
    </div>
  );
};

export default LowStockItems;