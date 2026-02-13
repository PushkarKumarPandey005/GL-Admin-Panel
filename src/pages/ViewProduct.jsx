import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { useProduct } from "../hooks/useProduct";

const ViewProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) return <p className="text-white p-6">Loading...</p>;
  if (!product) return null;

  const images = product.productImg || [];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="bg-[#012032] ml-65 w-full min-h-screen p-6 text-white">
        <h1 className="text-2xl mb-6">Product Details</h1>

        <div className="flex gap-20">
          {/* LEFT — Image Gallery */}
          <div className="flex gap-10">
            <div className="flex flex-col gap-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImg(i)}
                  className={`w-24 h-20 object-cover rounded cursor-pointer border-2 ${
                    activeImg === i ? "border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>

            <div>
              <img
                src={images[activeImg]}
                alt="main"
                className="w-140 h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="text-sm space-y-3 w-full max-w-[420px]">
            {Object.entries(product)
              .filter(([key]) =>
                !["_id", "__v", "productImg"].includes(key)
              )
              .map(([key, value]) => {
                const labelMap = {
                  discountPrice: "Discount Price",
                  createdAt: "Created At",
                  updatedAt: "Updated At",
                };

                const label =
                  labelMap[key] ||
                  key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase());

                const formatDate = (dateStr) => {
                  const d = new Date(dateStr);
                  return d.toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                };

                // ✅ FIXED DATE LOGIC
                const dateFields = ["createdAt", "updatedAt"];

                const displayValue = dateFields.includes(key)
                  ? formatDate(value)
                  : value;

                return (
                  <div
                    key={key}
                    className="flex justify-between border-b border-white/10 pb-2"
                  >
                    <span className="font-semibold">{label}</span>
                    <span className="opacity-80 text-right break-words max-w-[220px]">
                      {displayValue}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
