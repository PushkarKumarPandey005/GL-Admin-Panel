import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { useProduct } from "../hooks/useProduct";

const ViewProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [activeImg, setActiveImg] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const labelMap = {
    discountPrice: "Discount Price",
    createdAt:     "Created At",
    updatedAt:     "Updated At",
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const SKIP = ["_id", "__v", "productImg"];
  const DATE_FIELDS = ["createdAt", "updatedAt"];

  if (isLoading) return (
    <div className="flex min-h-screen bg-[#012032] items-center justify-center">
      <svg className="animate-spin w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  );

  if (!product) return null;

  const images = product.productImg || [];

  return (
    <div className="flex min-h-screen bg-[#012032] text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <VerticalNavbar onToggle={(val) => setSidebarExpanded(val)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}`}>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-lg">Product Details</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="hidden lg:block text-2xl font-bold mb-6">Product Details</h1>

          <div className="flex flex-col xl:flex-row gap-6 xl:gap-10">

            {/* LEFT — Image Gallery */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 transition ${
                        activeImg === i ? "border-white opacity-100" : "border-transparent opacity-60 hover:opacity-80"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1">
                {images.length > 0 ? (
                  <img
                    src={images[activeImg]}
                    alt="main"
                    className="w-full sm:w-80 md:w-96 xl:w-[420px] h-56 sm:h-64 md:h-72 xl:h-80 object-cover rounded-2xl shadow-xl border border-white/10"
                  />
                ) : (
                  <div className="w-full sm:w-80 h-56 sm:h-64 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Product Details */}
            <div className="flex-1 bg-[#011826] rounded-2xl p-4 sm:p-5 border border-white/5 shadow-lg">
              <h2 className="text-base font-semibold text-gray-300 mb-3 pb-2 border-b border-white/10">
                Product Information
              </h2>
              <div className="space-y-2.5 text-sm">
                {Object.entries(product)
                  .filter(([key]) => !SKIP.includes(key))
                  .map(([key, value]) => {
                    const label =
                      labelMap[key] ||
                      key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

                    const displayValue = DATE_FIELDS.includes(key)
                      ? formatDate(value)
                      : typeof value === "boolean"
                      ? value ? "Yes" : "No"
                      : value ?? "—";

                    return (
                      <div key={key} className="flex justify-between items-start gap-4 border-b border-white/5 pb-2.5 last:border-0">
                        <span className="font-semibold text-gray-300 whitespace-nowrap flex-shrink-0">
                          {label}
                        </span>
                        <span className="opacity-75 text-right break-words max-w-[60%] sm:max-w-[220px]">
                          {String(displayValue)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;