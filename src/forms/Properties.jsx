import { useState, useRef } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Properties = () => {
  const { mutate, isPending } = useAddProduct();
  const fileRef = useRef(null);

  // ✅ initial state
  const initialForm = {
    title: "",
    description: "",
    area: "",
    parking: "",
    furnished: "",
    location: "",
    price: "",
    ownerContact: "",
    priceNegotiable: false,
    purpose: "",
    bhk: "",
    images: [],
  };

  const [form, setForm] = useState(initialForm);

  // ✅ text change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ image change (FIXED)
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));
  };

  // ✅ submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      if (k !== "images") formData.append(k, v);
    });

    formData.append("type", "property");
    form.images.forEach((img) => formData.append("images", img));

    mutate(formData, {
      onSuccess: () => {
        alert("Your Product is successfully Created ✅");

        // ✅ reset form
        setForm(initialForm);

        // ✅ reset file input safely
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: () => {
        alert("Something went wrong ❌");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-6">
      {/* LEFT */}
      <div className="bg-white/5 mt-6 ml-6 rounded-xl w-[600px] p-6">
        {[
          ["title", "Property Title"],
          ["description", "Description", "textarea"],
          ["area", "Area (sq.ft)"],
          ["parking", "Parking"],
          ["furnished", "Furnished"],
          ["location", "Location"],
          ["price", "Price"],
          ["ownerContact", "Owner Contact"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label className="text-white block mt-4 text-lg">
              {label}
            </label>

            {type === "textarea" ? (
              <textarea
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-full h-24 mt-2 rounded bg-black/40 text-white p-2"
              />
            ) : (
              <input
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-full h-10 mt-2 rounded bg-black/40 text-white p-2"
              />
            )}
          </div>
        ))}

        {/* BHK */}
        <div>
          <label className="text-white block mt-4 text-lg">BHK</label>
          <select
            name="bhk"
            value={form.bhk}
            onChange={handleChange}
            className="w-full h-10 mt-2 rounded bg-black/40 text-white p-2"
            required
          >
            <option value="">Select BHK</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} BHK
              </option>
            ))}
          </select>
        </div>

        {/* PURPOSE */}
        <div>
          <label className="text-white block mt-4 text-lg">
            Property Purpose
          </label>
          <select
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className="w-full h-10 mt-2 rounded bg-black/40 text-white p-2"
            required
          >
            <option value="">Select Purpose</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* NEGOTIABLE */}
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            name="priceNegotiable"
            checked={form.priceNegotiable}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-white text-lg">
            Price Negotiable
          </label>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-125 mt-6 rounded-xl bg-white/5 p-6">
        <label className="text-white block mt-4 text-lg">
          Property Images
        </label>

        <input
          ref={fileRef}
          type="file"
          multiple
          onChange={handleImages}
          className="w-full mt-2"
        />

        {form.images.length > 0 && (
          <p className="text-white mt-2 text-sm">
            {form.images.length} image(s) selected
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`text-white mt-10 px-12 border py-2 text-lg rounded-xl ${isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Properties;