import React from "react";
import { lowStockItems } from "../data/data";

const LowStockItems = () => {
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

      <div className="w-full h-full flex flex-col rounded-2xl p-5 bg-[#0b1020] text-white">

        {/* FIXED HEADER */}
        <div className="sticky top-0 bg-[#0b1020] py-2 z-10">
          <h2 className="text-xl font-semibold text-red-400">Stock Analysis</h2>
        </div>

        {/* SCROLLABLE LIST */}
        <div className="mt-4 flex flex-col gap-5 pr-1 h-[calc(100%-60px)] overflow-y-auto hide-scrollbar">

          {lowStockItems.map((prod) => {
            const percent = Math.round((prod.stock / prod.totalStock) * 100);
            const progressColor =
              percent < 20 ? "bg-red-500" : "bg-yellow-400";

            return (
              <div
                key={prod.id}
                className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  {/* Product Details */}
                  <div>
                    <p className="text-base font-medium">{prod.name}</p>
                    <p className="text-sm text-gray-400">{prod.category}</p>

                    {/* Stock Count with Total */}
                    <p className="text-sm mt-1">
                      Stock:{" "}
                      <span
                        className={`font-semibold ${
                          prod.status === "Critical"
                            ? "text-red-500"
                            : "text-yellow-400"
                        }`}
                      >
                        {prod.stock}
                      </span>
                      <span className="text-gray-400"> / {prod.totalStock}</span>
                    </p>

                    {/* Progress Bar */}
                    <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
                      <div
                        className={`h-2 rounded-full ${progressColor}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE STATUS BADGE */}
                <div className="text-right">
                  <span
                    className={`text-xs px-3 py-1 rounded-full inline-block ${
                      prod.status === "Critical"
                        ? "bg-red-500/20 text-red-400 border border-red-500/40"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                    }`}
                  >
                    {prod.status}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default LowStockItems;
