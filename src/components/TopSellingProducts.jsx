import React from "react";
import { topSellingProducts } from "../data/data";

const TopSellingProducts = () => {
  return (
    <div className="w-full bg-[#0b1020] text-white rounded-xl px-3 py-3 flex flex-col">

      {/* Header */}
      <div className="sticky top-0 bg-[#0b1020] pb-2 z-10">
        <h2 className="text-sm font-semibold text-orange-400">
          Top Selling Products
        </h2>
      </div>

      {/* Scroll List */}
      <div className="mt-2 flex flex-col gap-3 overflow-y-auto pr-1 max-h-[300px]">

        {topSellingProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={prod.image}
                className="w-9 h-9 rounded-md object-cover"
                alt={prod.name}
              />

              <div className="flex flex-col">
                <p className="text-xs font-medium">{prod.name}</p>
                <p className="text-[10px] text-gray-400">
                  {prod.sold} sold
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-xs font-semibold">
                ₹{prod.revenue.toLocaleString("en-IN")}
              </p>

              <div className="w-20 h-1.5 bg-gray-700 rounded-full mt-1">
                <div
                  className="h-1.5 bg-orange-500 rounded-full"
                  style={{ width: `${prod.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TopSellingProducts;
