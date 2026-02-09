import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { useProduct } from "../hooks/useProduct";

const ViewProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);

  const [activeImg, setActiveImg] = useState(0);

  if (isLoading) return <p className="text-white p-10">Loading...</p>;
  if (!product) return null;

  const images = product.productImg || [];

  return (
    <div className="flex">
      <div className="fixed left-0">
        <VerticalNavbar />
      </div>

      <div className="bg-[#012032] ml-85 w-full min-h-screen p-10 text-white">
        <h1 className="text-3xl mb-10">Product Details</h1>

        <div className="flex gap-20">

          {/* LEFT — Image Gallery */}
          <div className="flex gap-6">
            {/* thumbnails */}
            <div className="flex flex-col gap-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    activeImg === i ? "border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* main image */}
            <div>
              <img
                src={images[activeImg]}
                alt="main"
                className="w-200 h-120 ml-20 object-center rounded-xl shadow-lg"
              />
            </div>
          </div>

         
      {/* RIGHT — All Details */}
<div className="text-xl space-y-4 w-125">

  {Object.entries(product)
    .filter(([key]) =>
      !["_id", "__v", "productImg"].includes(key)
    )
    .map(([key, value]) => {

      // Pretty label
      const labelMap = {
        discountPrice: "Discount Price",
        createdAt: "Created At",
        updatedAt: "Updated At",
      };

      const label =
        labelMap[key] ||
        key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());

      // Date formatting
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

      const displayValue =
        key.toLowerCase().includes("date") ||
        key.toLowerCase().includes("at")
          ? formatDate(value)
          : value;

      return (
        <div
          key={key}
          className="flex justify-between border-b border-white/10 pb-2"
        >
          <span className="font-semibold">{label}</span>
          <span className="opacity-80 text-right max-w-62.5 wrap-break-word">
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
