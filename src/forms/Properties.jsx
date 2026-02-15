import { useState } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Properties = () => {
  const { mutate, isPending } = useAddProduct();

  const [form, setForm] = useState({
    title: "",
    description: "",
    area: "",
    parking: "",
    furnished: "",
    location: "",
    price: "",
    ownerContact: "",
    priceNegotiable: false,
    purpose: "", // NEW FIELD
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImages = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      if (k !== "images") formData.append(k, v);
    });

    formData.append("type", "property");

    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i]);
    }

    mutate(formData);
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
                onChange={handleChange}
                className="w-full h-24 mt-2 rounded bg-black/40 text-white p-2"
              />
            ) : (
              <input
                name={name}
                onChange={handleChange}
                className="w-full h-10 mt-2 rounded bg-black/40 text-white p-2"
              />
            )}
          </div>
        ))}

        {/* PURPOSE FIELD */}
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

        {/* PRICE NEGOTIABLE */}
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
      <div className="w-[500px] mt-6 rounded-xl bg-white/5 p-6">

        <label className="text-white block mt-4 text-lg">
          Property Images
        </label>

        <input
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
          className="text-white mt-10 px-12 border py-2 text-lg rounded-xl"
        >
          {isPending ? "Saving..." : "Save"}
        </button>

      </div>
    </form>
  );
};

export default Properties;
