import React from "react";
import { topSellingProducts } from "../data/data";

const TopSellingProducts = () => {
  return (
    <div className="w-full bg-[#0b1020] text-white rounded-xl px-3 py-3 flex flex-col">

      {/* Header */}
      <div className="sticky top-0 bg-[#0b1020] pb-2 z-10">
        <h2 className="text-sm sm:text-base font-semibold text-orange-400">
          Top Selling Products
        </h2>
      </div>

      {/* Scroll List */}
      <div className="mt-2 flex flex-col gap-2 sm:gap-3 overflow-y-auto pr-1 max-h-[260px] sm:max-h-[320px] hide-scrollbar">

        {topSellingProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 sm:px-3 py-2 hover:bg-white/10 transition gap-2"
          >
            {/* Left */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src={prod.image}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover flex-shrink-0"
                alt={prod.name}
              />
              <div className="flex flex-col min-w-0">
                <p className="text-[11px] sm:text-xs font-medium truncate">
                  {prod.name}
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-400">
                  {prod.sold} sold
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right flex-shrink-0">
              <p className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">
                ₹{prod.revenue.toLocaleString("en-IN")}
              </p>
              <div className="w-16 sm:w-20 h-1.5 bg-gray-700 rounded-full mt-1 ml-auto">
                <div
                  className="h-1.5 bg-orange-500 rounded-full transition-all"
                  style={{ width: `${prod.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {topSellingProducts.length === 0 && (
          <p className="text-center text-gray-500 text-xs py-6">
            No products found
          </p>
        )}

      </div>
    </div>
  );
};

export default TopSellingProducts;