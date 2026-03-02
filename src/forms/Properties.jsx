import { useState, useRef } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Properties = () => {
  const { mutate, isPending } = useAddProduct();
  const fileRef = useRef(null);

  const initialForm = {
    title: "", description: "", area: "", parking: "",
    furnished: "", location: "", price: "", ownerContact: "",
    priceNegotiable: false, purpose: "", bhk: "", images: [],
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (k !== "images") formData.append(k, v); });
    formData.append("type", "property");
    form.images.forEach((img) => formData.append("images", img));

    mutate(formData, {
      onSuccess: () => {
        alert("Your Product is successfully Created ✅");
        setForm(initialForm);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: () => alert("Something went wrong ❌"),
    });
  };

  const fields = [
    { name: "title",        label: "Property Title" },
    { name: "description",  label: "Description",    type: "textarea" },
    { name: "area",         label: "Area (sq.ft)" },
    { name: "parking",      label: "Parking" },
    { name: "furnished",    label: "Furnished" },
    { name: "location",     label: "Location" },
    { name: "price",        label: "Price" },
    { name: "ownerContact", label: "Owner Contact" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-5 mt-4">

      {/* LEFT — Main Fields */}
      <div className="flex-1 bg-white/5 rounded-xl p-4 sm:p-6">
        <h2 className="text-white font-semibold text-base sm:text-lg mb-2 opacity-70">
          Property Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
          {fields.map(({ name, label, type }) => (
            <div key={name} className={type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="text-white block mt-4 text-sm sm:text-base font-medium">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={form[name] || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1.5 rounded-lg bg-black/40 text-white p-2.5 text-sm
                             border border-white/10 focus:border-blue-500 outline-none transition resize-y"
                />
              ) : (
                <input
                  name={name}
                  value={form[name] || ""}
                  onChange={handleChange}
                  className="w-full h-10 mt-1.5 rounded-lg bg-black/40 text-white p-2.5 text-sm
                             border border-white/10 focus:border-blue-500 outline-none transition"
                />
              )}
            </div>
          ))}

          {/* BHK */}
          <div>
            <label className="text-white block mt-4 text-sm sm:text-base font-medium">BHK</label>
            <select
              name="bhk"
              value={form.bhk}
              onChange={handleChange}
              required
              className="w-full h-10 mt-1.5 rounded-lg bg-black/40 text-white p-2 text-sm
                         border border-white/10 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select BHK</option>
              {[1,2,3,4,5,6,7,8].map((num) => (
                <option key={num} value={num}>{num} BHK</option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-white block mt-4 text-sm sm:text-base font-medium">
              Property Purpose
            </label>
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="w-full h-10 mt-1.5 rounded-lg bg-black/40 text-white p-2 text-sm
                         border border-white/10 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Purpose</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
          </div>
        </div>

        {/* Negotiable */}
        <div className="flex items-center gap-3 mt-5">
          <input
            type="checkbox"
            name="priceNegotiable"
            checked={form.priceNegotiable}
            onChange={handleChange}
            className="w-4 h-4 sm:w-5 sm:h-5 accent-blue-500 cursor-pointer"
          />
          <label className="text-white text-sm sm:text-base cursor-pointer">
            Price Negotiable
          </label>
        </div>
      </div>

      {/* RIGHT — Images + Submit */}
      <div className="w-full lg:w-72 xl:w-80 bg-white/5 rounded-xl p-4 sm:p-6 flex flex-col">
        <h2 className="text-white font-semibold text-base sm:text-lg mb-2 opacity-70">
          Property Images
        </h2>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20
                          rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-900/10 transition mt-2">
          <svg className="w-7 h-7 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-400 text-xs sm:text-sm">Click to upload images</span>
          <input
            ref={fileRef}
            type="file"
            multiple
            onChange={handleImages}
            className="hidden"
          />
        </label>

        {form.images.length > 0 && (
          <div className="mt-3">
            <p className="text-green-400 text-xs sm:text-sm font-medium">
              ✅ {form.images.length} image(s) selected
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.images.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${i}`}
                  className="w-14 h-12 object-cover rounded-lg border border-white/20"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`mt-auto pt-6 w-full py-3 text-white text-sm sm:text-base font-semibold
                      rounded-xl border border-white/30 hover:bg-white/10 active:bg-white/20
                      transition ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : "Save Property"}
        </button>
      </div>
    </form>
  );
};

export default Properties;