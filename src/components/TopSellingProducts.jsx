import React from "react";
import { topSellingProducts } from "../data/data";

const TopSellingProducts = () => {
  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="w-full h-full rounded-2xl p-5 bg-[#0b1020] text-white flex flex-col">

        {/* FIXED / STICKY HEADER */}
        <div className="sticky top-0 bg-[#0b1020] py-1 z-10">
          <h2 className="text-xl font-semibold text-red-400">
            Top Selling Products
          </h2>
        </div>

        {/* SCROLLABLE PRODUCT LIST */}
        <div className="mt-4 flex flex-col gap-5 overflow-y-auto hide-scrollbar pr-1 h-[calc(100%-60px)]">

          {topSellingProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition"
                  >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <img
                  src={prod.image}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div>
                  <p className="text-base ml-12 font-mono">{prod.name}</p>
                  <p className="text-sm ml-8 text-gray-400">{prod.sold} units sold</p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <p className="text-base font-semibold">
                  ₹{prod.revenue.toLocaleString("en-IN")}
                </p>

                <div className="w-28 h-2 bg-gray-700 rounded-full mt-1">
                  <div
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: `${prod.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

      </div>
    </div>
    </>
  )
};

export default TopSellingProducts;
