import { useState, useEffect, useRef } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Stationaries = () => {
  const { mutate, isPending } = useAddProduct();
  const fileRef = useRef(null);

  const initialForm = {
    title: "", description: "", price: "", discountPrice: "",
    stock: "", size: "", material: "", weight: "",
    color: "", brand: "", images: [],
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    return () => preview.forEach((url) => URL.revokeObjectURL(url));
  }, [preview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key !== "images") formData.append(key, val);
    });
    formData.append("type", "stationery");
    form.images.forEach((img) => formData.append("images", img));

    mutate(formData, {
      onSuccess: () => {
        alert("Your Product is successfully Created ✅");
        setForm(initialForm);
        setPreview([]);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: () => alert("Something went wrong ❌"),
    });
  };

  const leftFields = [
    { name: "title",         label: "Product Title",  type: "text" },
    { name: "description",   label: "Description",    type: "textarea" },
    { name: "price",         label: "Price",          type: "number" },
    { name: "discountPrice", label: "Discount Price", type: "number" },
    { name: "stock",         label: "Stock",          type: "number" },
    { name: "size",          label: "Size",           type: "text" },
    { name: "material",      label: "Material",       type: "text" },
    { name: "weight",        label: "Weight",         type: "text" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-5 mt-4">

      {/* LEFT — Main Fields */}
      <div className="flex-1 bg-white/5 rounded-xl p-4 sm:p-6">
        <h2 className="text-white font-semibold text-base sm:text-lg mb-2 opacity-70">
          Product Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
          {leftFields.map(({ name, label, type }) => (
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
                  type={type}
                  name={name}
                  value={form[name] || ""}
                  onChange={handleChange}
                  className="w-full h-10 mt-1.5 rounded-lg bg-black/40 text-white p-2.5 text-sm
                             border border-white/10 focus:border-blue-500 outline-none transition"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Images + Color + Brand + Submit */}
      <div className="w-full lg:w-72 xl:w-80 bg-white/5 rounded-xl p-4 sm:p-6 flex flex-col gap-4">
        <h2 className="text-white font-semibold text-base sm:text-lg opacity-70">
          Images & More
        </h2>

        {/* Image Upload */}
        <div>
          <label className="text-white text-sm sm:text-base font-medium block mb-1.5">
            Product Images
          </label>
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/20
                            rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-900/10 transition">
            <svg className="w-6 h-6 text-gray-400 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-400 text-xs">Click to upload images</span>
            <input
              ref={fileRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {preview.length > 0 && (
            <div className="mt-3">
              <p className="text-green-400 text-xs font-medium mb-2">
                ✅ {preview.length} image(s) selected
              </p>
              <div className="flex flex-wrap gap-2">
                {preview.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="w-14 h-12 object-cover rounded-lg border border-white/20"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Color */}
        <div>
          <label className="text-white text-sm sm:text-base font-medium block mb-1.5">Color</label>
          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="e.g. Red, Blue..."
            className="w-full h-10 rounded-lg bg-black/40 text-white p-2.5 text-sm
                       border border-white/10 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="text-white text-sm sm:text-base font-medium block mb-1.5">Brand</label>
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="e.g. Camlin, Natraj..."
            className="w-full h-10 rounded-lg bg-black/40 text-white p-2.5 text-sm
                       border border-white/10 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className={`mt-auto w-full py-3 text-white text-sm sm:text-base font-semibold
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
          ) : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default Stationaries;