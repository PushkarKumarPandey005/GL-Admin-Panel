import { useState, useEffect, useRef } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Stationaries = () => {
  const { mutate, isPending } = useAddProduct();
  const fileRef = useRef(null);

  const initialForm = {
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    size: "",
    material: "",
    weight: "",
    color: "",
    brand: "",
    images: [],
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState([]);

  /* ---------- text change ---------- */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------- file change ---------- */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({ ...prev, images: files }));

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previewUrls);
  };

  /* ---------- cleanup preview ---------- */
  useEffect(() => {
    return () => preview.forEach((url) => URL.revokeObjectURL(url));
  }, [preview]);

  /* ---------- submit ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPending) return; // ⭐ double submit guard

    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (key !== "images") formData.append(key, val);
    });

    formData.append("type", "stationery");
    form.images.forEach((img) =>
      formData.append("images", img)
    );

    mutate(formData, {
      onSuccess: () => {
        alert("Your Product is successfully Created ✅");

        // ✅ reset form
        setForm(initialForm);

        // ✅ clear preview
        setPreview([]);

        // ✅ clear file input
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
      <div className="bg-white/2 mt-6 ml-6 rounded-xl w-150 h-220">
        {[
          ["title", "Product Title", "text"],
          ["description", "Description", "textarea"],
          ["price", "Price", "number"],
          ["discountPrice", "Discount Price", "number"],
          ["stock", "Stock", "number"],
          ["size", "Size", "text"],
          ["material", "Material", "text"],
          ["weight", "Weight", "text"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label className="text-white ml-6 block mt-4 text-lg">
              {label}
            </label>

            {type === "textarea" ? (
              <textarea
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-110 h-24 mt-2 rounded bg-white/5 text-white ml-6 p-2"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={form[name] || ""}
                onChange={handleChange}
                className="w-90 h-10 mt-2 rounded bg-white/5 text-white ml-6 p-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="w-130 mt-6 rounded-xl bg-white/2 h-260">
        <label className="text-white ml-6 block mt-4 text-lg">
          Product Images
        </label>

        <input
          ref={fileRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-110 mt-2 ml-6"
        />

        {preview.length > 0 && (
          <div className="flex gap-3 ml-6 mt-3 flex-wrap">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <label className="text-white ml-6 block mt-8 text-lg">
          Color
        </label>
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          className="w-70 h-10 mt-2 rounded bg-white/5 text-white ml-6 p-2"
        />

        <label className="text-white ml-6 block mt-4 text-lg">
          Brand
        </label>
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-70 h-10 mt-2 rounded bg-white/5 text-white ml-6 p-2"
        />

        <button
          type="submit"
          disabled={isPending}
          className={`text-white mt-10 ml-30 px-12 border py-2 text-lg rounded-xl ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Stationaries;