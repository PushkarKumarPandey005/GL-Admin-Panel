import React from "react";
import { lowStockItems } from "../data/data";

const LowStockItems = () => {
  return (
    <div className="w-full bg-[#0b1020] text-white rounded-xl px-3 py-2 flex flex-col hide-scrollbar">

      {/* Header */}
      <div className="sticky top-0 bg-[#0b1020] pb-1 z-10">
        <h2 className="text-xs font-semibold text-red-400">
          Stock Analysis
        </h2>
      </div>

      {/* Scroll List */}
     <div className="mt-1 flex flex-col gap-2 pr-1 max-h-[260px] overflow-y-auto hide-scrollbar">


        {lowStockItems.map((prod) => {
          const percent = Math.round((prod.stock / prod.totalStock) * 100);
          const progressColor =
            percent < 20 ? "bg-red-500" : "bg-yellow-400";

          return (
            <div
              key={prod.id}
              className="flex items-center justify-between bg-white/5 rounded-md px-2 py-1.5 hover:bg-white/10 transition"
            >
              {/* Left */}
              <div className="flex items-center gap-2">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-8 h-8 rounded object-cover"
                />

                <div className="flex flex-col">
                  <p className="text-[11px] font-medium">{prod.name}</p>
                  <p className="text-[9px] text-gray-400">{prod.category}</p>

                  <div className="w-20 h-1 bg-gray-700 rounded-full mt-1">
                    <div
                      className={`h-1 rounded-full ${progressColor}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <span
                className={`text-[9px] px-2 py-[1px] rounded-full ${
                  prod.status === "Critical"
                    ? "bg-red-500/20 text-red-400 border border-red-500/40"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                }`}
              >
                {prod.stock}/{prod.totalStock}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default LowStockItems;
